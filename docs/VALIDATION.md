# Portfolio v2 validation — 2026-09-21

Current results supersede the historical verification records below. The workflow
was AUDIT → PLAN → IMPLEMENT → RUN LOCALLY → VALIDATE → HUMAN REVIEW.
Human review remains the owner's next step; no publication has occurred.

## Files in this pass

Modified existing working files: `.gitignore`, `index.html`, `themes/console.css`,
`scripts/main.js`, `scripts/validate.py`, `data/projects.json`, `data/skills.json`,
`data/platforms.json`, `data/certifications.json`, `README.md`, `docs/AUDIT.md`,
and `docs/VALIDATION.md`.

Created: `_config.yml`, `scripts/update_fallbacks.py`.

Retained without changes in this pass: valid `assets/favicon.svg`,
`data/labs.json`, `evidence/netsec-001.html`, and unrelated local investigation
contents. Some of these were already modified/untracked relative to HEAD on entry.

## Content and evidence

- Seven ordered projects: Security Engineering, AppSec, Okta, Entra automation,
  Terraform Entra, controlled Wi-Fi academic research, secondary Secure CI/CD.
- AppSec COMPLETE and 10/10 labs; 8 findings, High 0 / Medium 6 / Low 2;
  3 remediated/retest-passed and 5 outstanding/remediation-deferred.
- BFLA, SQL injection, and DOM XSS disclosures describe implementation, result,
  and verification criteria with real links to reports and retest evidence.
- Card-level results for every project, with implementation and limitations behind
  native details/summary. Only actual evidence destinations are rendered.
- LinkedIn in hero, Cyber Profiles, contact and footer; no unverified profile stats.
- Owner-confirmed internship and CC, concise education, Thailand location.
- Current GitHub trees/readmes and selected implementation files checked for all
  six source repositories. 22 project file links match inspected trees.
- Supplemental Brutus, Nonyx, WebStrike, DNS and TLS note sources were fetched;
  their subject matter supports the retained high-level lab descriptions.

## Design and background

Existing NAPOL.SEC console identity, section structure and native static stack
retained. Stronger type hierarchy, solid readable surname, cyan engineering links,
green completion/results, yellow deferred state, and neutral documented status.
Red remains in the selective macOS-style window controls.

Background uses fixed CSS navy/teal gradients, 112px and 28px grids, quiet radial
illumination, five original clipped mint/emerald polygons, outlined squares and
translucent circular nodes. Mobile reduces facet size/opacity and hides small
ornaments. No image assets, canvas, WebGL, external fonts, or motion dependencies.
The background is motionless; reduced motion disables other nonessential effects.

## Test results

Local static server: `python3 -m http.server 8000 --bind 127.0.0.1`

Preview: **http://127.0.0.1:8000/**

| Check | Current result |
| --- | --- |
| Static HTML | Both pages pass html-validate standard rules (format-only void-style/whitespace rules disabled) |
| JSON / paths | Five JSON files parse; local resources and cross-page anchors resolve |
| Favicon | Valid, nonempty SVG XML; retained existing original mark |
| JS | `node --check scripts/main.js` passes |
| Browser console | No errors/uncaught exceptions on normal load at all six tested widths |
| Responsive | Chrome at 320, 375, 768, 1024, 1440 and 1920 px; no page or main-content horizontal overflow |
| Accessibility | Axe WCAG 2/2.1/2.2 A/AA: zero detected violations at all six widths with disclosures expanded |
| Research page | Mobile Axe check passes; return link opens the Wi-Fi case study |
| Keyboard | Visible focus and skip link; all seven case studies open with Enter and close with Space |
| Mobile menu | Semantic toggle, accurate expanded/controls state, normal Tab order, Escape closes and restores focus |
| Navigation | All ten mobile destinations close menu and focus target; viewport changes reset menu state |
| Deep links | AppSec opens below sticky header; previous SEC-001 permalink redirects locally to SEC-ENG-001 content |
| Action wiring | 40 project/profile/hero/contact/footer external action clicks reach their intended URL in a new tab with no opener; test intercepts navigation, with external HTTP validation done separately |
| Reduced motion | Computed scroll behavior auto; zero animated/transitioning elements |
| No JavaScript | Seven project summaries, six profiles, certification, all navigation and evidence links remain usable |
| Bad JSON | Malformed project JSON preserves static summaries; independent sections still load |
| Text rendering | Harmless markup supplied as a JSON title stays literal text; no element is created |
| Maintenance | Static summaries match JSON; refresh utility is optional authoring tooling, not a deployment build step |
| Whitespace | `git diff --check` passes |
| Security patterns | No private-key blocks, GitHub tokens, JWT values, private JWK parameters, email or private-IP literals detected in published sources |

External destinations: **41 unique URLs**, **39 HTTP 200**, **TryHackMe 429**,
**LinkedIn 999**. No 404/410. Blue Team Labs Online redirects to login; HTTP 200
is not proof that the profile or achievements are publicly inspectable. No
profile contents or training statistics were inferred from these checks.

Visual review: desktop hero, complete desktop page, mobile hero and AppSec card.
The first resize assertion ran before the browser delivered its media-query event;
waiting for the actual menu state resolved the test timing issue. No menu code
workaround was needed.

Temporary validation tools and artifacts are outside the repository:

- `/tmp/napol-v2-browser/`: Playwright, axe-core, html-validate and test harnesses.
- `/tmp/napol-v2-browser-results.json`: six-width geometry/console/axe results.
- `/tmp/napol-v2-interactions.json`: navigation, action and fallback results.
- `/tmp/napol-v2-links.json`: HTTP status/redirect results.
- `/tmp/napol-v2-hero-1440.png`, `/tmp/napol-v2-hero-375.png`,
  `/tmp/napol-v2-appsec-mobile.png`: focused screenshots.
- `/tmp/napol-v2-before/`: starting working-file copies for this pass.

## Security / privacy boundary

No credentials, tenant artifacts, captures, client records or source screenshots
were added. The unrelated local investigation directory is untouched and now
ignored by Git and excluded from standard Jekyll output. See AUDIT.md for source
limitations. These are current-file pattern checks, not an exhaustive Git-history
or upstream-image secret audit. The server is loopback-only; the generic Python
preview is not a hardened public server and does not enforce Jekyll exclusions.

## Known limitations and human review

1. Review the visual design on the local preview and actual phone; this pass tested
   Chrome, not Safari/WebKit or physical devices. Automated Axe is not a manual
   screen-reader review.
2. Confirm owner-specific availability, education and internship wording before
   publication. No dates/metrics beyond supplied information were invented.
3. Entra's current verification helpers retain source issues; documented past
   audit results are not a claim that all current scripts run unchanged.
4. AppSec has five deferred findings and supporting-publication gaps. Retest
   summaries are repository evidence, not tests rerun by this portfolio task.
5. Wi-Fi originals were not supplied in this pass; retained public summary is
   explicitly a source-mapped author summary. Approve its wording as co-author.
6. No independent public ISC2 issuer-verification URL was available. No credential
   ID/date was invented; no resume or email was introduced.
7. LinkedIn/THM inspection is restricted; BTLO requires sign-in.
8. Standard Jekyll exclusions are configured but no Pages build or deployment was
   performed. A custom raw-upload workflow must preserve the exclusions.
9. Branch-based source URLs can change; the audit records inspected tree SHAs.
10. The working tree was already dirty. No staging, commit, push or PR occurred;
    `git diff --stat` describes all tracked changes against HEAD, including prior
    work, and does not include untracked files.

---

# Historical validation (prior passes; not the current test run)

# Local verification — 2026-09-10

## Files changed

Updated: `index.html`, `themes/console.css`, `scripts/main.js`,
`data/projects.json`, `assets/favicon.svg`.

Added: `data/skills.json`, `data/labs.json`, `data/certifications.json`,
`data/platforms.json`, `scripts/validate.py`, `README.md`, `docs/AUDIT.md`,
`docs/VALIDATION.md`.

## Content and evidence

- All ten requested navigation sections, numbered 00–09.
- Five project case studies covering service recovery/automation, Okta,
  Microsoft Entra ID, Terraform IAM, and secure CI/CD/technical GRC.
- Native disclosures for implementation, architecture, security decisions,
  validation, lessons, and limitations. Stable project anchors open their case study.
- Four selected lab/write-up cards; secondary archive and MITM study links.
- Six skill domains tied to project or investigation evidence.
- SOC internship summary and transferable responsibilities, with no client incidents.
- CC clearly linked to its LinkedIn listing; training profiles kept separate.
- Five public cyber/GitHub profile cards, compact education, LinkedIn contact.
- No placeholder project, invented resume, unsupported SAML/centralized logging,
  badge totals, rankings, skill percentages, or completion claims.
- 28 data-file GitHub file references checked against live repository trees.
  Sources and editorial qualifications are recorded in [AUDIT.md](AUDIT.md).

## Design

Original split hero, outlined surname, card grid, console panels, numbered sections,
and static GitHub Pages architecture retained. Added restrained terminal controls,
black/gray surfaces, blue evidence/navigation accents, green evidence indicators,
yellow section/status accents, and a red SOC label. Removed the visible scanline
and blinking cursor. Added persistent horizontally scrollable mobile navigation,
readable prose, visible keyboard focus, and reduced-motion support. Replaced the
empty favicon with a small SVG console mark. Added canonical and Open Graph metadata.

## Validation results

Served locally with Python at http://localhost:8000.

| Check | Result |
| --- | --- |
| JSON | All five content files parse |
| Static resources | HTML stylesheet/script/favicon paths exist and are nonempty; browser requests succeed |
| Internal links | All rendered anchors resolve; no `#` placeholders |
| External link attributes | All rendered HTTPS anchors use `_blank` and `noopener noreferrer` |
| JavaScript | `node --check` passes; no browser console errors or uncaught exceptions during normal loading |
| Whitespace | `git diff --check` passes |
| Responsive | Chromium 153 and WebKit 26.6 at 1440, 1280, 1024, 768, 390 and 320 px: no page/content overflow |
| Accessibility | Axe WCAG 2 A/AA and 2.1 AA scan: zero detected violations at all 12 browser/width combinations, with disclosures expanded |
| Keyboard | Case-study summaries open with Enter in both browser engines |
| Deep links | Direct project hashes open the corresponding case study and position it below the sticky header |
| Reduced motion | Browser checks use reduced motion; CSS disables animations/transitions and smooth scrolling |
| Failure handling | Simulated missing project JSON shows a usable GitHub fallback; other content still loads |
| JavaScript disabled | Static identity, experience, education and contact remain; no-script repository link is visible |
| Visual review | Reviewed full desktop/mobile screenshots and focused desktop hero, mobile hero, and expanded mobile case study |
| Sensitive material | No lab screenshots, certificates, keys, credentials or SOC incident artifacts copied; pattern checks found no private-key blocks or GitHub tokens in portfolio content |
| Deployment | Relative local asset/data paths; no backend, framework, build step, or runtime external dependency added |

The external HTTP check covered 33 distinct URLs extracted from static HTML and JSON:
31 returned 200, TryHackMe returned 429, and LinkedIn returned 999. No 404/410 was
observed. Featured repository roots were also inspected directly during research.
BTLO redirects to sign-in despite HTTP 200; a successful response is not evidence
that a profile's achievements are visible. HTB HTML identifies Tanapol / @N0pol;
CyberDefenders HTML identifies Napol. No training metrics were added.

Browser tests used temporary Playwright and axe dependencies under `/tmp/napol-browser`;
no npm dependencies or browser artifacts were added to the site repository.
Raw session results: `/tmp/napol-browser-results.json`, `/tmp/napol-link-results.json`.
Screenshots: `/tmp/napol-desktop-hero.png`, `/tmp/napol-mobile-hero.png`,
`/tmp/napol-mobile-case.png`, plus full-page Chromium/WebKit captures.

## Known limitations

- WebKit testing covers the Safari engine; this is not a manual check in the Safari
  application or on physical iPhone hardware. Automated accessibility tests do not
  replace a screen-reader/user review.
- Exact internship dates/duties are owner-supplied. Public corroboration is partial.
- No independent CC issuer-verification URL or resume asset was located.
- Training platforms restrict automated inspection; no completeness/achievement
  claims are made from HTTP status alone.
- Case-study content summarizes existing source/evidence. IAM labs were not executed
  against tenants. Current Entra verification helpers have code issues noted in the
  audit and case-study limitations. The CI test-results prose is partial.
- Dynamic cards require JavaScript and HTTP serving; direct `file://` previews do
  not reliably load JSON. Main biographical/contact content remains static.
- No deployment was performed. Existing remote content remains unchanged.

## Recommended next steps

1. Review the local site, especially identity/availability and internship wording.
2. Add an actual resume file and issuer-verifiable CC link when available.
3. Fix Entra verification helpers and complete the CI/CD evidence documentation in
   their source repositories, then update the related case-study limitations.
4. Commit and publish only after local review. No commit or push was performed.


# NETSEC-001 and second-pass verification — 2026-09-11

The first mandatory task was completed before general review: read the supplied
article and poster; add and verify NETSEC-001; then review the remaining site.

## Changes in this pass

Updated `data/projects.json`, `data/skills.json`, `scripts/main.js`,
`themes/console.css`, `index.html`, `scripts/validate.py`, `README.md`,
`docs/AUDIT.md`, and this report. Added `evidence/netsec-001.html`.

- NETSEC-001 is the third of six featured projects, following Security Engineering
  and Okta. No unsupported standalone AppSec project was inserted.
- Title/subtitle, academic category, COMPLETE status, SUT institution, and
  co-author/student researcher role are visible. Controlled-device scope is visible
  before expanding the card.
- Case study includes all 12 requested sections, 00 Overview through 11 Evidence.
- Local evidence page includes article/poster source maps, conceptual architecture,
  a six-row qualified findings table, defensive takeaways, and ethical scope.
- Source buttons lead to clearly labeled summaries, not missing raw downloads.
- Wireshark, HTTP/TLS, wireless security, MITM, DNS, traffic analysis, and Burp Suite
  are represented through grouped project evidence links.
- Home, About, and Education now connect directly to the academic project.
- Renderer accepts narrowly validated local evidence-page paths and research
  records without a fabricated GitHub repository or source-code button.
- Static validation now checks local evidence pages, cross-page fragments/assets,
  and repository roots generated by the project renderer.
- No original article, poster, capture, screenshot, credential, or source metadata
  was added to the repository. Source hashes and interpretation notes are in AUDIT.md.

## Section review

| Area | Second-pass outcome |
| --- | --- |
| Home | Six-project count; Wi-Fi research introduced and linked; existing terminal identity preserved |
| About | Academic wireless work connected to engineering and defensive controls |
| Experience | Retained owner-supplied SOC dates/responsibilities; no incident artifacts introduced |
| Projects | Six real projects; academic status and evidence type distinguished from personal labs |
| Skills | Seven evidence-linked domains; network research and HTTP/TLS tool evidence added |
| Certifications | CC remains a LinkedIn listing; no unverified issuer URL or course badges added |
| Cyber Profiles | All five cards retained; no invented training statistics |
| Education | Direct link to co-authored SUT project and DGT poster summary |
| Contact | LinkedIn/GitHub actions retained; no private contact details imported from source files |
| UI / recruiter flow | Original design preserved; summary → case study → evidence page → return link works |

## Results

- NETSEC-specific test: Chromium and WebKit at 1440, 390, and 320 px. All 12
  headings, COMPLETE label, scope notice, six-project count, evidence navigation,
  return link, keyboard disclosure, and evidence-page accessibility passed.
- General review: both engines at 1440, 1280, 1024, 768, 390, and 320 px.
  Zero detected WCAG A/AA violations, console errors, broken resources, invalid
  anchors/external attributes, or document/content horizontal overflow.
- Expanded case-study deep links remain below the sticky header. JSON-failure and
  no-JavaScript fallbacks pass; the new research evidence page itself needs no JS.
- Evidence table has deliberate keyboard-accessible horizontal scrolling on
  narrow screens, without causing page overflow.
- Reviewed NETSEC card/mobile and evidence/desktop screenshots, plus final full-page
  desktop layout. Browser engine tests are not physical-device/Safari-app tests.
- External check: 38 URLs, 36 HTTP 200, TryHackMe 429, LinkedIn 999; no 404/410.
  BTLO's successful response may still lead to sign-in.
- JSON, JavaScript syntax, static paths, cross-page anchors, and diff whitespace pass.
- NETSEC content scan found no email/IP/MAC patterns or other collaborators' names.
  Only sanitized prose and source references were added.

Temporary reports: `/tmp/netsec-check-results.json`,
`/tmp/napol-browser-results.json`, `/tmp/napol-second-pass-links.json`.

## Remaining qualifications

The original article's abstract/lab section describes researcher-owned devices,
while a later field-test section uses different participant wording. The published
case study explicitly covers the controlled-lab subset; field findings are omitted.
The evidence page is an author-supplied source summary, not independent verification
or a public copy of the originals. No TLS break, generalized success percentage,
professional penetration-testing engagement, or journal acceptance is claimed.

Prior source limitations remain: no issuer CC verification URL in the site, no
reviewed resume asset in the repository, and the Entra helper issues noted earlier.
No separate earlier “SECOND-PASS REVIEW” prompt is present in this conversation;
this pass follows the section/check list in the latest request and prior quality
requirements. No commit, push, or deployment was performed.
