# Portfolio v2 audit — 2026-09-21

This section supersedes the historical audit below. The working tree already
contained uncommitted portfolio upgrades at the start of this pass. Those changes
were preserved and extended. No staging, commit, push, PR, or deployment occurred.

## Current state and plan

Audited every portfolio HTML, CSS, JavaScript, JSON, asset, maintenance script and
document, plus the repository file inventory and unrelated local investigation
material for accidental-publication risk. Compared the live site with the local
checkout. The live site retained the earlier ACTIVE AppSec state; the checkout
already had ten sections, six projects, basic accessibility and an original valid
SVG favicon. AppSec was absent locally, LinkedIn was absent from Cyber Profiles,
Bangkok was still hard-coded, and project status/evidence semantics were weak.

Plan communicated before edits: extend the static site, retain NAPOL.SEC and the
existing sections, verify claims, add AppSec and direct retest evidence, improve
card results and progressive disclosure, build the CSS grid/facet background,
add a keyboard-accessible mobile menu and static fallbacks, run a local server,
validate, and leave the work for human review.

## Fresh evidence review

GitHub's browser-indexed AppSec page was stale and said the repository was empty.
Fresh GitHub API trees and raw source files established current evidence instead.
The following are tree snapshots inspected on 2026-09-21, not claims that the
remote branches will remain unchanged:

| Repository | Inspected tree SHA | Evidence used |
| --- | --- | --- |
| [Security engineering](https://github.com/napol-n/security-engineering-automation-lab) | de334d2ab5f9b29bfbea07e49d687d29c8661452 | README, incident paths, health check and log analyzer source |
| [AppSec](https://github.com/napol-n/application-security-vulnerability-management-lab) | c775a3c7a18fc98b830ed32aeb9037adab7c3a09 | README, final report, final disposition matrix, pre/post comparison |
| [Okta](https://github.com/napol-n/okta-iam-automation-lab) | 30c415c55c253efe6dbe7a1009d9ca81a2e7e149 | README, OAuth security model, token implementation, System Log evidence index |
| [Entra automation](https://github.com/napol-n/entra-iam-automation-lab) | 800ce85c95feea9a8f7781245b5386c5f9f8900d | README, audit evidence index, token and verification helper source |
| [Terraform Entra](https://github.com/napol-n/terraform-entra-iam-lifecycle-lab) | 1625ce6cd92c557c35eee647184775970eb0575f | README, main.tf, lifecycle/drift/import evidence index |
| [Secure CI/CD](https://github.com/napol-n/iso27001-secure-cicd) | ea88e2e558cc9d8ac51d348b428448f46a460a02 | Workflow, scanner, control mapping, partial test-results document |

### Claim decisions

- SEC-ENG-001: wrong upstream app:8001 versus app:8000; 502 → 200 recovery;
  secsvc traversal blocked by root:root 700, corrected to secsvc 750; heartbeat
  verification and Python checks. DOCUMENTED avoids inventing project completion.
- APPSEC-001: COMPLETE, 10/10 labs, eight findings, High 0 / Medium 6 / Low 2.
  Three remediated/retest-passed (L04-02, L05-01, L06-01); five outstanding/deferred.
  UI/backend authorization, query semantics/product identity, and DOM/execution
  verification are summarized without publishing exploit payloads or raw sessions.
  The report retains supporting-artifact publication gaps for L03-02 and L07-01.
- Okta: COMPLETE follows owner confirmation and completed documented lifecycle.
  Authentication via private_key_jwt is separate from API scopes and administrative
  authorization. System Log records support lifecycle and MFA claims.
- Entra: remains a separate project. Certificate identity, Graph permissions,
  read-back and audit verification are described. Undefined `upn` and malformed
  request construction remain in current helpers; the case study retains that
  reproducibility limitation. No tenant operations were run.
- Terraform: actual code represents final disabled-user state. Earlier group
  transitions, drift and import are documented evidence. Tenant-specific test
  identifiers present upstream were not copied into the portfolio. State/private
  keys were not downloaded or published.
- CI/CD: real GitHub Actions workflow invokes a small Python regex scanner over
  application Python files. The README is thin and test-results document partial.
  A secondary educational project is appropriate; no professional ISO consulting
  or comprehensive scanning claim is made.
- Wi-Fi: retain the existing sanitized summary and controlled academic framing.
  Original article/poster were not present for fresh inspection in this pass.
  The existing source ledger and owner-provided project description are the basis;
  the local page is explicitly a summary, not independent/public original evidence.
  Removed the long attack-flow subsection from the project disclosure to improve
  focus on observed results and defensive controls.
- Internship dates/duties, current student stage, availability, and ISC2 CC are
  owner-confirmed. LinkedIn blocked automated inspection; no profile contents,
  issuer ID, issue date, location beyond Thailand, metrics, or email were invented.

## Privacy and publication boundary

The unrelated `osint-tiktok-investigation/` folder predates this task and contains
personal investigation material. It was not used as portfolio content or changed.
Added an anchored Git ignore and a standard GitHub Pages/Jekyll exclusion; docs
and Python maintenance files are also excluded from Jekyll output. A future custom
raw-upload deployment must implement the same exclusion. The local Python server
serves the checkout and is bound only to loopback; it is not a publication server.

Published HTML/JS/JSON/CSS/evidence-page pattern checks found no private keys,
GitHub tokens, JWT values, private JWK parameters, email addresses or private-IP
literals. No screenshots, captures, state files, credentials, client SOC records,
or original research documents were added. Pattern checks do not establish that
all upstream screenshots or Git history are free of sensitive material.

---

# Historical audit (prior passes; retained for source provenance)

# Portfolio audit — 2026-09-10

## Existing site

Clean working tree before editing. Static GitHub Pages site: index.html,
themes/console.css, scripts/main.js, data/projects.json, assets/favicon.svg.
The favicon was empty. Two project cards used placeholder URLs. The mobile
breakpoint removed navigation. Existing layout, outlined surname, numbered
sections, typography, and console panels were retained.

## Source ledger

Public README, documentation, source files, and repository trees were inspected.
Evidence links below are source references, not a claim that labs were rerun.
No source credentials, tenant identifiers, incident records, or screenshots were
copied into this portfolio.

| Source | Evidence inspected | Editorial decision |
| --- | --- | --- |
| [GitHub repositories](https://github.com/napol-n?tab=repositories) | Public repository inventory | Prioritize five engineering/IAM/control projects; omit generic coursework, template profile, bot experiments |
| [Security engineering](https://github.com/napol-n/security-engineering-automation-lab) | README, docs/architecture.md, scripts/health_check.py, scripts/log_analyzer.py, evidence/day04-log-analysis-automation.md and incident documents | Feature service troubleshooting and local verification. Remove unsupported centralized logging and broad detection-engineering claims |
| [Okta](https://github.com/napol-n/okta-iam-automation-lab) | README, architecture, JML, OAuth/security, lessons, token implementation, evidence index | Feature scoped OAuth, private_key_jwt, lifecycle automation, group access, MFA and audit evidence. Do not claim SAML implementation |
| [Entra](https://github.com/napol-n/entra-iam-automation-lab) | README, MSAL authentication source, lifecycle/verification file inventory, evidence index and committed screenshot paths | Feature Graph, certificate workload identity, account/session/group offboarding. Note stale “Planned Evidence” heading |
| [Terraform IAM](https://github.com/napol-n/terraform-entra-iam-lifecycle-lab) | README, main.tf, evidence index and screenshot paths | Explain final disabled-user configuration versus historical lifecycle evidence; feature drift and import |
| [Secure CI/CD](https://github.com/napol-n/iso27001-secure-cicd) | README, scanner, workflow, control mapping, partial test-results document, screenshot paths | Educational regex gate and project-authored ISO control mapping; no ISO certification/compliance or full vulnerability-management claim |
| [WriteUp](https://github.com/napol-n/WriteUp) | Brutus, Nonyx and WebStrike investigation notes; wider file inventory | Select Unix logs, memory forensics and web-attack PCAP investigation; no ranks or platform completion counts |
| [Older BTLO repository](https://github.com/napol-n/Writeup-Blue-Team-BTLO) | README and LabNonyx.md | Sparse/empty content; use substantive Nonyx notes in WriteUp instead |
| [DNS-Spoofing](https://github.com/napol-n/DNS-Spoofing) | README and DNS_Spoofing.md | Controlled resolver-redirection lab; does not prove a full Evil Twin wireless implementation |
| [WireSharkTLS](https://github.com/napol-n/WireSharkTLS) | README | TLS inspection study guide using browser session keys; not cryptographic compromise |
| [PROXYMAN](https://github.com/napol-n/PROXYMAN) | README | Incomplete formatting/example-oriented MITM proxy guide; retain only under secondary learning notes |
| [LinkedIn](https://www.linkedin.com/in/tanapol-chumtakhob-a10503273/) | Indexed Thai-localized public profile: SUT, final-semester IT/Security Analyst track, Cyber Defense TH, ISC2 CC listing | Direct requests return HTTP 999. Exact internship dates/duties/tools supplied by owner and existing site. Credential listing is not independent issuer verification |
| [Existing portfolio](https://napol-n.github.io/) | Direct HTML confirms the existing local layout and OPEN_TO_WORK metadata | Preserve existing OPEN_TO_WORK context. No resume file found |
| [HTB](https://profile.hackthebox.com/profile/019ca703-e228-717c-9a32-04ece74d3461) | Direct HTML confirms Tanapol Chumtakhob / @N0pol; badge details unavailable | Profile link only; no badges, certificates or metrics |
| [BTLO](https://blueteamlabs.online/home/user/635ae2640b49ae2dc26e81) | Direct request redirects to sign-in; profile details unavailable | Profile link only |
| [TryHackMe](https://tryhackme.com/p/Napol19) | Public URL requested; automated content unavailable | Profile link only |
| [CyberDefenders](https://cyberdefenders.org/p/Napol) | Direct and indexed Napol profile; achievement data not available | Profile link only; omit stale rank |

## Claim boundaries

- Identity, employment summary, availability, and education incorporate the owner's
  explicit background. Public corroboration is partial; exact SOC dates and duties
  are not independently verified. Only transferable responsibilities are published.
- CC is supported by an indexed LinkedIn listing and the owner's statement. No
  issuer credential URL was located, so the button says “LinkedIn listing.”
- AppSec is supported narrowly by the scanner and WebStrike learning notes.
- No invented dates, ranks, metrics, completion statuses, learning paths, or
  production deployments. [OK] denotes available implementation evidence.
- The ISO mapping describes the project's own mapping; this audit does not assert
  conformity with the standard or validate its normative interpretation.
- Screenshots remain at their existing public repositories. Portfolio summaries do
  not reproduce their identifiers or confidential employer/client material.

## Planned changes (audit completed before edits)

Retain the static structure; add six supporting sections and Entra/CI projects;
replace placeholder projects; add structured skills, labs, certifications and
platform data; create native disclosure case studies; introduce semantic terminal
colors, focus states, reduced motion, usable mobile navigation, SEO and favicon.

## Source review caveats

The current Entra verify_user.py and verify_membership.py reference an undefined
`upn`; the membership helper also constructs a malformed request. The portfolio
therefore separates documented audit results from reproducibility of every current
script. Fix these in their source repository before presenting the suite as fully
reproducible. Okta mover error handling also needs hardening before production use.


## NETSEC-001 source update — 2026-09-11

The original research article and DGT Showcase 2025 poster have now been supplied
in local Office documents. This resolves the original audit's lack of evidence
for a major Evil Twin/MITM academic project. Both sources identify Tanapol as a
co-author at SUT. The project is now featured as completed academic research.

Read the article's abstract, workflow descriptions, Figures 1–5, results Tables
2–6, discussion, conclusion, and the poster's methods/tool/results blocks. Diagram
images were extracted to temporary storage and visually inspected; no images or
raw documents were copied to the site. Public content maps the observations back
to source figures/tables through `evidence/netsec-001.html`.

The article describes researcher-owned lab devices but also contains a later
field-test section referring to real users. The portfolio explicitly features
only the controlled-lab subset. This avoids treating the whole article as one
controlled experiment. A clarification was offered to the owner; no broader
participant authorization is inferred from the source. Field results are omitted.

The privacy inspection identified an author contact email, collaborator/advisor
information, Office author/editor metadata, and screenshot captions referencing
network/device identifiers. The sanitized summary excludes these, as well as
raw requests, cookies, credentials, and captures. Source figures are described
in prose without reproducing the originals. The supplied article has incomplete
editorial fields; no journal acceptance or peer-review claim is made.

Table 4 specifically reports HTTPS metadata visibility without payload access.
Table 5 records failed HSTS/pinning interception cases. Table 6 reports some
certificate/TLS failures. These qualifications govern the summaries; the poster's
broad descriptions are not generalized into a TLS break or universal interception.
No new attack experiments were performed.

NETSEC-001 follows the engineering and Okta projects. No standalone Application
Security & Vulnerability Management project was added because its implementation
was not established in the sources reviewed; the existing CI control remains the
supported application-security engineering evidence.

Source fingerprints (originals remain outside the repository):

- Research article — SHA-256 `9de49de43b667f7be873cef82a09ca36dfe56ab5e0c1b046459e395ab164a4de`

- DGT Showcase 2025 poster — SHA-256 `552ff70260b89432728ca20fec2234d45e9e5c27c43a7ccbf430f22fefd27b65`
