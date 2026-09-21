#!/usr/bin/env python3
"""Refresh compact no-JavaScript summaries after editing JSON. No build required."""
import argparse
from html import escape
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

def link(item):
    url = item['url']
    external = url.startswith('https://')
    assert external or re.fullmatch(r'#[a-z0-9-]+|evidence/[a-z0-9-]+\.html(?:#[a-z0-9-]+)?', url)
    attrs = ' target="_blank" rel="noopener noreferrer"' if external else ''
    return f'<a href="{escape(url, quote=True)}"{attrs}>{escape(item["label"])} {"↗" if external else "→"}</a>'

def render(name, items):
    rows = []
    for item in items:
        if name == 'projects':
            rows.append(f'<article class="project-card" id="project-{item["id"].lower()}"><span class="record-id">{item["id"]} / {item["status"]}</span><h3>{escape(item["title"])}</h3><p>{escape(item["description"])}</p><p class="project-result"><span class="micro-label">RESULT</span>{escape(item["result"])}</p><div class="evidence-links">'+''.join(map(link,item['links'][:3]))+'</div></article>')
        elif name == 'certifications':
            rows.append(f'<article class="certification-card"><div class="cert-mark" aria-hidden="true">CC</div><div><span class="record-id">{escape(item["issuer"])} / INDUSTRY CERTIFICATION</span><h3>{escape(item["title"])}</h3><p class="prose">{escape(item["description"])}</p></div></article>')
        else:
            title = item.get('title', item.get('name'))
            actions = item.get('links', [{'label':'VIEW PROFILE','url':item.get('url')}])
            rows.append(f'<article class="skill-card"><span class="record-id">{escape(item["id"])}</span><h3>{escape(title)}</h3><p>{escape(item["description"])}</p><div class="evidence-links">'+''.join(map(link,actions))+'</div></article>')
    return '\n'.join(rows)

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    path=ROOT/'index.html';original=path.read_text();updated=original
    for name in ['projects','skills','labs','platforms','certifications']:
        body=render(name,json.loads((ROOT/'data'/f'{name}.json').read_text()))
        pattern=rf'(<!-- fallback:{name}:start -->).*?(<!-- fallback:{name}:end -->)'
        updated,count=re.subn(pattern,lambda m:m[1]+'\n'+body+'\n'+m[2],updated,flags=re.S)
        assert count==1, f'Missing fallback region: {name}'
    if args.check:
        assert updated==original,'JSON summaries changed: run python3 scripts/update_fallbacks.py'
        print('PASS: static summaries match JSON')
    else:
        path.write_text(updated)
        print('Updated static summaries')
if __name__=='__main__':main()
