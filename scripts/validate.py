#!/usr/bin/env python3
"""Validate static resources/content; optionally check public links with --external."""
import argparse
import concurrent.futures
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.assets = [], [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'a': self.links.append(a)
        if tag == 'script' and a.get('src'): self.assets.append(a['src'])
        if tag == 'link' and a.get('rel') in ('stylesheet', 'icon'): self.assets.append(a['href'])

def walk(value):
    if isinstance(value, dict):
        for k, v in value.items():
            if k == 'url': yield v
            else: yield from walk(v)
    elif isinstance(value, list):
        for item in value: yield from walk(item)

def check_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 PortfolioLinkCheck'})
        with urllib.request.urlopen(req, timeout=25) as response:
            return {'url': url, 'status': response.status, 'final_url': response.url}
    except urllib.error.HTTPError as error:
        return {'url': url, 'status': error.code}
    except Exception as error:
        return {'url': url, 'status': 'unverified', 'reason': str(error)}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--external', action='store_true')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    pages = {}
    for path in [ROOT / 'index.html', *sorted((ROOT / 'evidence').glob('*.html'))]:
        page = Page(); page.feed(path.read_text())
        assert len(page.ids) == len(set(page.ids)), f'Duplicate HTML IDs: {path.name}'
        pages[path.resolve()] = page
    page = pages[(ROOT / 'index.html').resolve()]
    references = [(path, a['href']) for path, parsed in pages.items() for a in parsed.links]
    files = sorted((ROOT / 'data').glob('*.json'))
    for path in files:
        data = json.loads(path.read_text())
        references.extend((ROOT / 'index.html', url) for url in walk(data))
        if path.stem == 'projects':
            for p in data:
                project_id = 'project-' + p['id'].lower()
                if project_id not in page.ids: page.ids.append(project_id)
                assert p['links'], f'Missing evidence: {p["id"]}'
                assert all(p[k] for k in ['description', 'implemented', 'validation', 'limitations'])
                if p.get('repo'):
                    references.append((ROOT / 'index.html', 'https://github.com/napol-n/' + p['repo']))
    assert len(page.ids) == len(set(page.ids)), 'Duplicate rendered project IDs'
    urls = [url for _, url in references]
    for source, url in references:
        assert url != '#', 'Placeholder URL'
        parsed = urllib.parse.urlsplit(url)
        if parsed.scheme or parsed.netloc:
            assert parsed.scheme == 'https' and parsed.netloc, f'Unexpected URL: {url}'
            continue
        target = (source.parent / parsed.path).resolve() if parsed.path else source.resolve()
        assert target.is_relative_to(ROOT.resolve()), f'Outside site root: {url}'
        assert target.is_file(), f'Missing local destination: {url}'
        if parsed.fragment:
            assert target in pages and parsed.fragment in pages[target].ids, f'Missing anchor: {url}'
    for source, parsed in pages.items():
        for a in parsed.links:
            if a['href'].startswith('https://'):
                assert a.get('target') == '_blank'
                assert {'noopener', 'noreferrer'} <= set(a.get('rel', '').split())
        for asset in parsed.assets:
            path = source.parent / asset
            assert path.is_file() and path.stat().st_size > 0, f'Missing/empty asset: {asset}'
    for path in [*pages, ROOT/'scripts/main.js', *files]:
        content = path.read_text()
        assert not re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----', content), path
        assert not re.search(r'\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}', content), path
    assert ET.parse(ROOT / 'assets/favicon.svg').getroot().tag.endswith('svg')
    sys.dont_write_bytecode = True
    from update_fallbacks import render
    index = (ROOT / 'index.html').read_text()
    for path in files:
        assert render(path.stem, json.loads(path.read_text())) in index, f'Stale static summaries: {path.name}'
    assert 'osint-tiktok-investigation' in (ROOT / '_config.yml').read_text()
    print(f'PASS: {len(files)} JSON files; anchors, assets, SVG, static summaries, external-link attributes, and credential-pattern checks')
    if args.external:
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
            results = list(pool.map(check_url, sorted(set(u for u in urls if u.startswith('https://')))))
        for result in results: print(result['status'], result['url'])
        if args.report: args.report.write_text(json.dumps(results, indent=2) + '\n')
        assert not any(r['status'] in (404, 410) for r in results), 'Missing external targets'

if __name__ == '__main__': main()
