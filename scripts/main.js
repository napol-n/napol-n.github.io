"use strict";

// Repository-controlled JSON is rendered as text nodes, never interpreted as HTML.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function evidenceLink(item) {
  const value = String(item.url || "");
  const internal = /^#[a-z0-9-]+$/.test(value) || /^evidence\/[a-z0-9-]+\.html(?:#[a-z0-9-]+)?$/.test(value);
  const url = new URL(value, location.href);
  if (!internal && (url.protocol !== "https:" || url.username || url.password || !value.startsWith("https://"))) {
    throw new Error("Unsupported evidence destination");
  }
  const a = el("a", "", `${item.label} ${internal ? "→" : "↗"}`);
  a.href = value;
  if (!internal) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  return a;
}
function links(items = []) {
  const row = el("div", "evidence-links");
  items.forEach(item => row.append(evidenceLink(item)));
  return row;
}
function tags(items) {
  const row = el("div", "tags");
  row.setAttribute("aria-label", "Technologies");
  items.forEach(item => row.append(el("span", "", item)));
  return row;
}
function list(items) {
  const ul = el("ul");
  items.forEach(item => ul.append(el("li", "", item)));
  return ul;
}
function renderProject(p) {
  if (!/^[A-Z0-9-]+$/.test(p.id)) throw new Error("Invalid project ID");
  const card = el("article", `project-card${p.secondary ? " secondary-project" : ""}`);
  card.id = `project-${p.id.toLowerCase()}`;
  const header = el("div", "project-header");
  const status = p.status === "COMPLETE" ? ["complete", "COMPLETE"] : ["documented", "DOCUMENTED"];
  header.append(el("span", "project-id", `${p.id} / ${p.kind || "PERSONAL LAB"}`), el("span", `tag ${status[0]}`, status[1]));
  card.append(header, el("h3", "", p.title));
  if (p.subtitle) card.append(el("p", "project-subtitle", p.subtitle));
  card.append(el("p", "", p.description));
  if (p.institution) card.append(el("p", "research-credit", `${p.institution} · ${p.role}`));
  if (p.scope) card.append(el("p", "research-scope", p.scope));
  const result = el("p", "project-result");
  result.append(el("span", "micro-label", "RESULT"), document.createTextNode(p.result));
  card.append(result);
  if (p.metrics) {
    const metrics = el("dl", "project-metrics");
    p.metrics.forEach(m => {
      const pair = el("div");
      pair.append(el("dt", "", m.label), el("dd", "", m.value));
      metrics.append(pair);
    });
    card.append(metrics);
  }
  if (p.disposition) {
    const disposition = el("div", "disposition");
    disposition.append(el("p", "green", `${p.disposition.passed} remediated — retest passed`), el("p", "yellow", `${p.disposition.deferred} outstanding — remediation deferred`));
    card.append(disposition);
  }
  card.append(tags(p.technologies));
  const detail = el("details", "case-study");
  const summary = el("summary", "", "VIEW CASE STUDY");
  summary.setAttribute("aria-label", `Case study: ${p.title}`);
  const plus = el("span", "", "+"); plus.setAttribute("aria-hidden", "true"); summary.append(plus);
  const body = el("div", "case-content");
  const sections = p.caseSections || [
    {title: "Objective", text: p.why},
    {title: "Implementation", text: p.architecture, items: p.implemented},
    {title: "Security concept", text: p.securityDecisions},
    {title: "Verification", text: p.validation},
    {title: "Engineering lesson", text: p.lessons},
    {title: "Scope & limitations", text: p.limitations},
    {title: "Further evidence", links: p.links.slice(3)}
  ];
  sections.forEach(section => {
    if (!section.text && !section.items?.length && !section.links?.length) return;
    body.append(el("h4", "", section.title));
    if (section.text) body.append(el("p", "", section.text));
    if (section.items) body.append(list(section.items));
    if (section.links?.length) body.append(links(section.links));
  });
  detail.append(summary, body);
  card.append(detail, links(p.links.slice(0, 3)));
  return card;
}
function renderResource(item) {
  const card = el("article", "skill-card");
  card.append(el("span", "record-id", item.id), el("h3", "", item.title), el("p", "", item.description), links(item.links));
  return card;
}
function renderProfile(p) {
  const card = el("article", `skill-card platform-card${p.id === "IN" ? " linkedin-card" : ""}`);
  card.append(el("span", "record-id", `${p.id} / PROFILE`), el("h3", "", p.name), el("p", "", p.description), links([{label: "VIEW PROFILE", url: p.url}]));
  return card;
}
function renderCertification(c) {
  const card = el("article", "certification-card");
  const mark = el("div", "cert-mark", "CC"); mark.setAttribute("aria-hidden", "true");
  const body = el("div");
  body.append(el("span", "record-id", `${c.issuer} / INDUSTRY CERTIFICATION`), el("h3", "", c.title), el("p", "prose", c.description));
  card.append(mark, body);
  return card;
}
const sections = [
  ["projects", "project-grid", renderProject],
  ["skills", "skill-grid", renderResource],
  ["labs", "lab-grid", renderResource],
  ["platforms", "platform-grid", renderProfile],
  ["certifications", "certification-list", renderCertification]
];
async function loadSection([name, id, render]) {
  const container = document.getElementById(id);
  try {
    const response = await fetch(`data/${name}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) throw new Error("Expected content list");
    // Build before replacing the static fallback, so malformed records cannot empty a section.
    const nodes = data.map(render);
    container.replaceChildren(...nodes);
    container.dataset.loaded = "true";
    if (name === "projects") document.getElementById("project-count").textContent = String(data.length).padStart(2, "0");
  } catch {
    const note = el("p", "evidence-note", "Showing the summary index. Full evidence is available through the links below.");
    note.setAttribute("role", "status");
    container.prepend(note);
  }
}
function revealHashTarget() {
  // Preserve the previous engineering project permalink.
  const hash = location.hash === "#project-sec-001" ? "project-sec-eng-001" : location.hash.slice(1);
  const target = document.getElementById(hash);
  if (!target?.classList.contains("project-card")) return;
  const detail = target.querySelector("details");
  if (detail) detail.open = true;
  target.scrollIntoView({block: "start", behavior: "instant"});
}
Promise.all(sections.map(loadSection)).then(revealHashTarget);
window.addEventListener("hashchange", revealHashTarget);
document.addEventListener("click", event => {
  const anchor = event.target.closest('a[href^="#project-"]');
  if (anchor && anchor.hash === location.hash) revealHashTarget();
});

// Inline mobile disclosure: normal tab order, no modal or focus trap.
const menu = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-navigation");
const mobile = matchMedia("(max-width: 760px)");
function setMenu(open, restoreFocus = false) {
  nav.hidden = mobile.matches && !open;
  menu.setAttribute("aria-expanded", String(!nav.hidden));
  if (restoreFocus) menu.focus();
}
function syncMenu() { menu.hidden = !mobile.matches; setMenu(false); }
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", event => {
  const a = event.target.closest("a");
  if (!a || !mobile.matches) return;
  setMenu(false);
  const target = document.getElementById(a.hash.slice(1));
  if (target) { target.tabIndex = -1; target.focus({preventScroll: true}); }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && mobile.matches && !nav.hidden) setMenu(false, true);
});
nav.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (mobile.matches && !nav.contains(document.activeElement) && document.activeElement !== menu) setMenu(false);
  });
});
mobile.addEventListener("change", syncMenu);
syncMenu();
if ("IntersectionObserver" in window) {
  const navLinks = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of navLinks) {
        if (a.hash === `#${entry.target.id}`) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      }
    }
  }, {rootMargin: "-15% 0px -65% 0px", threshold: 0});
  document.querySelectorAll("main > section").forEach(section => observer.observe(section));
}
