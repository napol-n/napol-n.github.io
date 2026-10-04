# NAPOL.SEC

Tanapol Chumtakhob's static cybersecurity portfolio. No backend, package install,
or build step is required for GitHub Pages.

Run locally from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000. Serve over HTTP so the browser can load JSON.

Content lives in `data/projects.json`, `data/skills.json`, `data/labs.json`,
`data/certifications.json`, and `data/platforms.json`. The short identity,
experience, education, and contact sections remain semantic HTML in `index.html`.
Project case studies use native `<details>` and can be linked directly, for example
`/#project-iam-001` or `/#project-netsec-001`. The research evidence summary is
`evidence/netsec-001.html` and works without JavaScript. All content is local; there are no runtime dependencies or
third-party embeds.

Validate before publishing:

```sh
python3 scripts/validate.py
node --check scripts/main.js
python3 scripts/validate.py --external --report /tmp/napol-link-results.json
```

The external check reports blocked requests separately from missing (404/410)
resources. A successful HTTP response alone does not verify a profile's contents.
JavaScript enhances the cards with native case-study disclosures. Every section
already includes static summaries and real evidence links for no-JavaScript or
failed-fetch conditions. No external fonts, trackers, runtime packages or APIs are used.

See [the audit and source ledger](docs/AUDIT.md) and
[local verification results](docs/VALIDATION.md). No commit or push is part of the
local editing workflow.


The Wi-Fi article and poster are private local source inputs, not site assets.
Only the sanitized, source-mapped evidence page belongs in this repository.
Research projects can use `caseSections`, `kind`, `status`, `institution`, and
`role` in projects.json without requiring a GitHub repository or source-code link.

## Portfolio v2 maintenance

Eight projects are ordered by the engineering/evidence narrative: Cloud & Kubernetes,
AppSec, Security Engineering, Okta, Entra automation, Terraform Entra, Wi-Fi research,
then Secure CI/CD. Cloud/Kubernetes and AppSec lead with control validation,
remediation, and explicit residual findings. `status` describes
project scope; AppSec `disposition` describes unresolved versus remediated findings.
The renderer uses DOM text nodes and validates destination protocols.

After editing JSON, refresh the compact static summaries and derived project count in index.html:

```sh
python3 scripts/update_fallbacks.py
python3 scripts/validate.py
```

This is an optional authoring utility, not a runtime or deployment build step.
The site can be served directly as committed HTML/CSS/JS/JSON.

`_config.yml` excludes unrelated local investigation material, documentation, and
Python maintenance scripts from standard GitHub Pages/Jekyll output. The local
investigation directory is also ignored by Git and is not portfolio evidence.
Any future custom raw-upload workflow must preserve these exclusions.

Preview review: Home → Experience → Projects → expanded case study → evidence,
then LinkedIn. Check at 320, 390, 768 and 1440 px, including mobile Menu / Escape,
keyboard focus, disclosures, reduced motion, no-JavaScript and failed-fetch fallbacks.
Verify Cloud/Kubernetes's final assessment and regression links, eight projects in
JSON order, and AppSec's 3 passed / 5 deferred disposition. The validator checks
unique project IDs, count, local anchors, and fallback synchronization. External
checks distinguish missing targets from blocked or unverified requests.
No deployment is part of this upgrade.
