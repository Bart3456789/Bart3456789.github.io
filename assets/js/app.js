// =====================================================================
//  SITE SETTINGS
// =====================================================================
const SITE = {
    name: "Bartosz Jaworski",
    initials: "BJ",
    tagline: "Web developer in training, building websites, web apps and games.",
    instagram: "https://www.instagram.com/bart_buzzz/",
    email: "bartekjaworski416@gmail.com",
    github: "https://github.com/Bart3456789",
    projectsFile: "data/projects.json",
    skillsFile: "data/skills.json",
    // Contactformulier: plak hier je Formspree-link (https://formspree.io/f/xxxxxxxx).
    // Leeg laten = het formulier opent gewoon je mailprogramma.
    formEndpoint: "",
    // Achtergrondmuziek: zet je mp3 op deze plek (of pas het pad aan). Leeg laten = geen muziek.
    music: "assets/audio/music.mp3",
    musicVolume: 0.35,      // 0 = stil, 1 = hard
    musicLoopDelay: 3000    // wachttijd (ms) voordat het nummer opnieuw begint
};

const PAGES = [
    ["index.html", "Home"],
    ["projects.html", "Projects"],
    ["skills.html", "Skills"],
    ["about.html", "About"],
    ["contact.html", "Contact"]
];

// Kleine lijn-icoontjes (inline SVG, geen extra bestanden nodig).
const ICONS = {
    code: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    play: '<path d="M7 5v14l11-7z"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

// Logo's komen van devicon.dev. Skills en projecten staan in de map data/.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
// Namen die niet gewoon in kleine letters op devicon staan.
const DEVICON_ALIASES = { "c#": "csharp", "c++": "cplusplus", "html": "html5", "css": "css3", "node.js": "nodejs", "node": "nodejs", "vue": "vuejs", "next.js": "nextjs", "three.js": "threejs", "sql": "azuresqldatabase", "database": "mysql", "golang": "go" };

// Wordt gevuld door loadData(): alle skills (uit skills.json + automatisch aangevulde uit projecten).
let SKILLS = [];

// =====================================================================
//  HELPERS
// =====================================================================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
let page = document.body.dataset.page || "";   // verandert bij het wisselen van pagina (zie ROUTER)

function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const pad = n => String(n).padStart(2, "0");
const same = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
const skillFor = name => SKILLS.find(s => same(s.name, name));
const asList = value => Array.isArray(value) ? value.filter(Boolean) : (value ? [value] : []);
const unique = list => list.filter((v, i) => list.findIndex(w => same(v, w)) === i);

// Logo bepalen: eigen 'icon' > 'devicon' naam > gok op basis van de naam.
function iconFor(skill) {
    if (skill.icon) return skill.icon;
    const key = String(skill.name).toLowerCase();
    const slug = skill.devicon || DEVICON_ALIASES[key] || key.replace(/[^a-z0-9]/g, "");
    return slug ? `${DEVICON}${slug}/${slug}-original.svg` : "";
}

function toolChip(tool) {
    const skill = skillFor(tool);
    const icon = skill && skill.iconUrl ? `<img src="${esc(skill.iconUrl)}" alt="" loading="lazy" onerror="this.remove()" ${skill.invert ? 'style="filter:invert(1)"' : ""}>` : "";
    return `<li class="chip">${icon}${esc(tool)}</li>`;
}

// =====================================================================
//  NAVIGATIE + FOOTER
// =====================================================================
function renderChrome() {
    const nav = $("[data-nav]");
    if (nav) {
        const current = page === "index" ? "index.html" : page + ".html";
        nav.className = "nav" + (scrollY > 10 ? " scrolled" : "");
        nav.innerHTML = `
            <div class="wrap">
                <a class="brand" href="index.html"><span class="brand-mark">${SITE.initials}</span>${SITE.name}</a>
                <button class="burger" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>
                <nav class="nav-links" aria-label="Main menu">
                    ${PAGES.filter(([href]) => href !== "contact.html").map(([href, label]) => `<a href="${href}" class="${href === current ? "on" : ""}" ${href === current ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
                    <a href="contact.html" class="btn btn-sm ${current === "contact.html" ? "btn-ghost" : "btn-accent"} nav-cta" ${current === "contact.html" ? 'aria-current="page"' : ""}>Contact</a>
                </nav>
            </div>`;
        const burger = $(".burger", nav);
        burger.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            burger.setAttribute("aria-expanded", open);
            burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
    }

    const foot = $("[data-foot]");
    if (foot) {
        foot.className = "foot";
        foot.innerHTML = `
            <div class="wrap">
                <div class="foot-top">
                    <div>
                        <a class="brand" href="index.html"><span class="brand-mark">${SITE.initials}</span>${SITE.name}</a>
                        <p>${SITE.tagline}</p>
                    </div>
                    <div class="foot-cols">
                        <div><h4>Pages</h4><ul>${PAGES.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></div>
                        <div><h4>Elsewhere</h4><ul>
                            <li><a href="mailto:${SITE.email}">E-mail</a></li>
                            <li><a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a></li>
                            <li><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
                        </ul></div>
                        <div><h4>Need a break?</h4><ul><li><button type="button" data-doom>Play DOOM &rarr;</button></li></ul></div>
                    </div>
                </div>
                <div class="foot-bottom">
                    <span>&copy; ${new Date().getFullYear()} ${SITE.name}</span>
                    <span><i class="status-dot"></i>Open to internships</span>
                </div>
            </div>`;
    }
}

// Navigatie krijgt een achtergrond zodra je scrollt.
function initNavScroll() {
    const update = () => { const nav = $("[data-nav]"); if (nav) nav.classList.toggle("scrolled", scrollY > 10); };
    addEventListener("scroll", update, { passive: true });
    update();
}

// =====================================================================
//  PROJECTEN LADEN (uit data/projects.json)
// =====================================================================
let projectsCache = null;
let dataPromise = null;

async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(url + " → HTTP " + response.status);
    return response.json();
}

// Laadt projects.json en skills.json één keer en koppelt ze aan elkaar.
function loadData() {
    if (!dataPromise) dataPromise = (async () => {
        const [projectJson, skillJson] = await Promise.all([
            fetchJson(SITE.projectsFile),
            fetchJson(SITE.skillsFile).catch(() => ({}))   // zonder skills.json werkt de site ook
        ]);

        const list = Array.isArray(projectJson) ? projectJson : projectJson.projects;
        projectsCache = (list || [])
            .filter(p => p && p.title)
            .map((p, i) => ({
                ...p,
                id: p.id || "project-" + (i + 1),
                tools: unique(asList(p.tools))
            }));

        const skills = (Array.isArray(skillJson) ? skillJson : skillJson.skills || []).filter(s => s && s.name);
        // Techniek in een project maar niet in skills.json? Dan voegen we hem automatisch toe.
        projectsCache.flatMap(p => p.tools).forEach(tool => {
            if (!skills.some(s => same(s.name, tool))) skills.push({ name: tool, auto: true });
        });
        SKILLS = skills.map(s => ({ ...s, iconUrl: iconFor(s) }));
        return projectsCache;
    })();
    return dataPromise;
}

const projectsWith = tool => projectsCache.filter(p => p.tools.some(t => same(t, tool)));

// Moeilijkheid: van zwaar naar makkelijk (zo staan ze ook op de projectenpagina).
const LEVELS = ["extreme", "hard", "medium", "easy"];
const LEVEL_NAMES = { extreme: "Extreme", hard: "Hard", medium: "Medium", easy: "Easy" };
const levelOf = p => LEVELS.includes(String(p.difficulty).toLowerCase()) ? String(p.difficulty).toLowerCase() : "";
const levelRank = p => { const i = LEVELS.indexOf(levelOf(p)); return i === -1 ? LEVELS.length : i; };
function levelBadge(p) {
    const lvl = levelOf(p);
    return lvl ? `<span class="diff" data-level="${lvl}" title="Difficulty">${LEVEL_NAMES[lvl]}</span>` : "";
}

function loadError(target) {
    const local = location.protocol === "file:";
    target.innerHTML = `<div class="notice">
        Could not load <code>${esc(SITE.projectsFile)}</code>.
        ${local
            ? "<br>You are opening the site as a local file (file://). Browsers then block loading JSON. Start a local server, for example with the VS Code extension <code>Live Server</code>, or view the site on GitHub Pages."
            : "<br>Check that the file exists and contains valid JSON (watch the commas and quotes)."}
    </div>`;
}

// Knoppen voor live demo / broncode (alleen als die links in projects.json staan).
function linkButtons(project) {
    const links = project.links || {};
    return [
        links.live ? `<a class="btn btn-accent" href="${esc(links.live)}" target="_blank" rel="noopener">${icon("external")}Live demo</a>` : "",
        links.code ? `<a class="btn btn-ghost" href="${esc(links.code)}" target="_blank" rel="noopener">${icon("github")}View code</a>` : ""
    ].join("");
}

function linkIcons(project) {
    const links = project.links || {};
    return [
        links.live ? `<a class="icon-link" href="${esc(links.live)}" target="_blank" rel="noopener" aria-label="Live demo of ${esc(project.title)}" title="Live demo">${icon("external")}</a>` : "",
        links.code ? `<a class="icon-link" href="${esc(links.code)}" target="_blank" rel="noopener" aria-label="Code of ${esc(project.title)} on GitHub" title="View code">${icon("github")}</a>` : ""
    ].join("");
}

function projectCard(project, index) {
    const links = linkIcons(project);
    return `
        <article class="card reveal" style="--d:${(index % 3) * 90}ms">
            <div class="p-media">
                <img src="${esc(project.image)}" alt="Screenshot of ${esc(project.title)}" loading="lazy">
            </div>
            <div class="p-body">
                <div class="p-top">
                    <ul class="chips">${project.tools.slice(0, 4).map(toolChip).join("")}</ul>
                </div>
                <h3><button type="button" class="p-open" data-open="${esc(project.id)}">${esc(project.title)}</button></h3>
                ${project.tagline ? `<p class="p-tag">${esc(project.tagline)}</p>` : ""}
                ${project.challenge ? `<p class="p-challenge">${esc(project.challenge)}</p>` : ""}
                <div class="p-foot">
                    ${levelBadge(project) || `<span class="p-more">View details <span class="arrow">&rarr;</span></span>`}
                    ${links ? `<div class="p-links">${links}</div>` : (levelBadge(project) ? `<span class="p-more">Details <span class="arrow">&rarr;</span></span>` : "")}
                </div>
            </div>
        </article>`;
}

function bindCards(root, list) {
    $$("[data-open]", root).forEach(card => card.addEventListener("click", () => openProject(card.dataset.open, list)));
}

// ---------- projecten-pagina ----------
async function initProjectsPage() {
    const grid = $("[data-projects]");
    if (!grid) return;
    const filterBox = $("[data-filters]");

    let projects;
    try { projects = await loadData(); } catch (e) { loadError(grid); return; }

    // Volgorde: extreme -> hard -> medium -> easy (binnen een niveau blijft de volgorde uit projects.json).
    projects = projects.map((p, i) => ({ p, i })).sort((x, y) => levelRank(x.p) - levelRank(y.p) || x.i - y.i).map(x => x.p);

    const params = new URLSearchParams(location.search);
    let active = params.get("skill") || "all";
    let level = LEVELS.includes(params.get("level")) ? params.get("level") : "all";

    // Technieken uit de projecten (volgorde = volgorde in skills.json).
    const tools = SKILLS.map(s => s.name).filter(name => projectsWith(name).length);
    const byTool = (list, tool) => tool === "all" ? list : list.filter(p => p.tools.some(x => same(x, tool)));
    const byLevel = (list, lvl) => lvl === "all" ? list : list.filter(p => levelOf(p) === lvl);

    function setParam(key, value) {
        const url = new URL(location.href);
        if (value === "all") url.searchParams.delete(key); else url.searchParams.set(key, value);
        history.replaceState(null, "", url);
    }

    function draw() {
        const shown = byLevel(byTool(projects, active), level);

        const techRow = ["all", ...tools].map(tool => {
            const on = same(active, tool);
            const n = byTool(byLevel(projects, level), tool).length;
            return `<button type="button" class="f-btn ${on ? "on" : ""}" data-filter="${esc(tool)}" aria-pressed="${on}">${tool === "all" ? "All" : esc(tool)}<span>${n}</span></button>`;
        }).join("");
        const levelRow = ["all", ...LEVELS].map(lvl => {
            const on = level === lvl;
            const n = byLevel(byTool(projects, active), lvl).length;
            return `<button type="button" class="f-btn ${on ? "on" : ""}" data-level-filter="${lvl}" ${lvl !== "all" ? `data-level="${lvl}"` : ""} aria-pressed="${on}" ${n || on ? "" : "disabled"}>${lvl === "all" ? "All" : LEVEL_NAMES[lvl]}<span>${n}</span></button>`;
        }).join("");
        filterBox.innerHTML = `
            <div class="filter-row"><span class="filter-label">Technology</span><div class="filter-btns">${techRow}</div></div>
            <div class="filter-row"><span class="filter-label">Difficulty</span><div class="filter-btns">${levelRow}</div></div>`;

        grid.innerHTML = shown.length
            ? shown.map(projectCard).join("")
            : `<div class="empty">
                   <h3>No projects match these filters</h3>
                   <p class="muted" style="margin:0 0 1.4rem">Try another combination, more work is coming soon.</p>
                   <button class="btn btn-ghost" type="button" data-reset>Show all projects</button>
               </div>`;
        initReveal(grid);

        bindCards(grid, shown);
        $$("[data-filter]", filterBox).forEach(b => b.addEventListener("click", () => {
            active = b.dataset.filter; setParam("skill", active); draw();
        }));
        $$("[data-level-filter]", filterBox).forEach(b => b.addEventListener("click", () => {
            level = b.dataset.levelFilter; setParam("level", level); draw();
        }));
        const reset = $("[data-reset]", grid);
        if (reset) reset.addEventListener("click", () => { active = level = "all"; setParam("skill", "all"); setParam("level", "all"); draw(); });
    }
    draw();

    // direct link naar een project: projects.html?project=quiz
    const deep = params.get("project");
    if (deep && projects.some(p => p.id === deep)) openProject(deep, projects);
}

// ---------- homepage: uitgelichte projecten ----------
async function initFeatured() {
    const grid = $("[data-featured]");
    if (!grid) return;
    let projects;
    try { projects = await loadData(); } catch (e) { loadError(grid); return; }

    const featured = projects.filter(p => p.featured);
    const list = (featured.length ? featured : projects).slice(0, 3);
    grid.innerHTML = list.map(projectCard).join("");
    bindCards(grid, list);
    initReveal(grid);
    $$("[data-all-count]").forEach(el => { el.textContent = projects.length; });

    // Getallen invullen; elementen met data-count tellen daarna rustig op (zie initCounters).
    const setStat = (sel, n) => $$(sel).forEach(el => { if (el.hasAttribute("data-count")) el.dataset.count = n; else el.textContent = n; });
    setStat("[data-stat-projects]", projects.length);
    setStat("[data-stat-tech]", unique(projects.flatMap(p => p.tools)).length);
    initCounters();
}

// =====================================================================
//  PROJECT DETAIL-VENSTER
// =====================================================================
let modal, modalList = [], modalIndex = 0;

function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("dialog");
    modal.className = "modal";
    modal.setAttribute("aria-labelledby", "modal-title");
    modal.innerHTML = `
        <div class="modal-inner">
            <div class="modal-bar"><span data-m-file></span><button class="modal-close" type="button" data-m-close aria-label="Close">&times;</button></div>
            <div class="modal-scroll" data-m-body></div>
            <div class="modal-nav">
                <button type="button" data-m-prev>${icon("left")}Previous</button>
                <button type="button" data-m-next>Next${icon("right")}</button>
            </div>
        </div>`;
    document.body.appendChild(modal);

    $("[data-m-close]", modal).addEventListener("click", closeProject);
    $("[data-m-prev]", modal).addEventListener("click", () => stepProject(-1));
    $("[data-m-next]", modal).addEventListener("click", () => stepProject(1));
    modal.addEventListener("click", e => { if (e.target === modal) closeProject(); });   // klik op de achtergrond
    modal.addEventListener("close", onModalClosed);   // vangnet, sommige browsers sturen dit event niet
    modal.addEventListener("keydown", e => {
        if (e.key === "Escape") { e.preventDefault(); closeProject(); }
        if (e.key === "ArrowRight") stepProject(1);
        if (e.key === "ArrowLeft") stepProject(-1);
    });
    return modal;
}

function openProject(id, list) {
    ensureModal();
    modalList = list && list.length ? list : (projectsCache || []);
    modalIndex = Math.max(0, modalList.findIndex(p => p.id === id));
    fillModal();
    if (!modal.open) modal.showModal();
    document.body.classList.add("modal-open");
}

function stepProject(dir) {
    if (modalList.length < 2) return;
    modalIndex = (modalIndex + dir + modalList.length) % modalList.length;
    fillModal();
}

function closeProject() {
    if (modal && modal.open) modal.close();
    onModalClosed();
}

function onModalClosed() {
    document.body.classList.remove("modal-open");
    if (page === "projects") {
        const url = new URL(location.href);
        url.searchParams.delete("project");
        history.replaceState(null, "", url);
    }
}

function fillModal() {
    const p = modalList[modalIndex];
    if (!p) return;

    const images = [p.image, ...asList(p.gallery)].filter(Boolean);
    const linkBtns = linkButtons(p);
    const desc = asList(p.description);
    const feats = asList(p.features);

    $("[data-m-file]", modal).textContent = `Project ${modalIndex + 1} of ${modalList.length}`;
    $("[data-m-body]", modal).innerHTML = `
        <div class="modal-top">
            <div>
                <div class="modal-img"><img src="${esc(images[0])}" alt="Screenshot of ${esc(p.title)}" data-m-main></div>
                ${images.length > 1 ? `<div class="thumbs">${images.map((src, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-m-thumb="${esc(src)}" aria-label="Image ${i + 1}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
            </div>
            <div>
                ${levelBadge(p)}
                <h2 id="modal-title">${esc(p.title)}</h2>
                ${p.tagline ? `<p class="modal-tagline">${esc(p.tagline)}</p>` : ""}
                <p class="label">Built with</p>
                <ul class="chips">${p.tools.map(toolChip).join("")}</ul>
                ${linkBtns ? `<div class="modal-links">${linkBtns}</div>` : ""}
            </div>
        </div>
        <div class="modal-cols">
            <div class="modal-desc">
                <p class="label">About the project</p>
                ${desc.length ? desc.map(t => `<p>${esc(t)}</p>`).join("") : `<p class="muted">No description yet.</p>`}
                ${feats.length ? `<p class="label" style="margin-top:1.5rem">Features</p><ul class="feat">${feats.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
            </div>
            <div>
                ${p.challenge ? `<p class="label">Challenge</p><div class="note">${esc(p.challenge)}</div>` : ""}
                ${p.learned ? `<p class="label">What I learned</p><div class="note">${esc(p.learned)}</div>` : ""}
            </div>
        </div>`;

    $$("[data-m-thumb]", modal).forEach(btn => btn.addEventListener("click", () => {
        $("[data-m-main]", modal).src = btn.dataset.mThumb;
        $$("[data-m-thumb]", modal).forEach(b => b.classList.toggle("on", b === btn));
    }));
    $("[data-m-body]", modal).scrollTop = 0;
    $(".modal-nav", modal).style.display = modalList.length > 1 ? "" : "none";

    if (page === "projects") {
        const url = new URL(location.href);
        url.searchParams.set("project", p.id);
        history.replaceState(null, "", url);
    }
}

// =====================================================================
//  SKILLS
// =====================================================================
async function initSkills() {
    const target = $("[data-skills]");
    if (!target) return;

    try { await loadData(); } catch (e) { loadError(target); return; }
    const countFor = name => projectsWith(name).length;
    const max = Math.max(1, ...SKILLS.map(s => countFor(s.name)));

    target.innerHTML = SKILLS.map((skill, index) => {
        const n = countFor(skill.name);
        const text = skill.text || (skill.auto ? `Used in: ${projectsWith(skill.name).map(p => p.title).join(", ")}.` : "");
        const i = index + 1;
        return `
            <a class="card s-card reveal" href="projects.html?skill=${encodeURIComponent(skill.name)}" style="--d:${(index % 4) * 70}ms">
                <div class="s-top">
                    <img class="s-icon ${skill.invert ? "invert" : ""}" src="${esc(skill.iconUrl)}" alt="${esc(skill.name)} logo" loading="lazy">
                    <span class="s-count">${pad(i)}</span>
                </div>
                <h3>${esc(skill.name)}</h3>
                ${text ? `<p>${esc(text)}</p>` : ""}
                <div class="s-bar"><i style="--w:${n ? Math.max(12, n / max * 100) : 4}%"></i></div>
                <div class="s-meta"><span>${n ? `Used in ${n} project${n === 1 ? "" : "s"}` : "Not in a project yet"}</span><span>View <span class="arrow">&rarr;</span></span></div>
            </a>`;
    }).join("");
    initReveal(target);

    $$(".s-icon", target).forEach(img => img.addEventListener("error", () => {
        const box = document.createElement("div");
        box.className = "s-icon s-fallback";
        box.textContent = img.alt.replace(" logo", "").slice(0, 2);
        img.replaceWith(box);
    }, { once: true }));
}

// =====================================================================
//  HOMEPAGE: typewriter + ticker
// =====================================================================
// Woord in de kop wisselt rustig (schuift omhoog en vervaagt).
let wordTimer;
function initWordRotator() {
    const el = $("[data-words]");
    if (!el) return;
    const words = ["websites.", "web apps.", "games.", "3D worlds."];
    el.innerHTML = `<span>${words[0]}</span>`;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0;
    clearInterval(wordTimer);
    wordTimer = setInterval(() => {
        if (!el.isConnected) { clearInterval(wordTimer); return; }
        w = (w + 1) % words.length;
        const old = el.lastElementChild;
        const next = document.createElement("span");
        next.className = "in";
        next.textContent = words[w];
        el.appendChild(next);
        old.classList.add("out");
        requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove("in")));
        setTimeout(() => old.remove(), 600);
    }, 2600);
}

// Rij met logo's van alle technieken (uit skills.json + projecten), loopt langzaam door.
async function initLogos() {
    const el = $("[data-logos]");
    if (!el) return;
    try { await loadData(); } catch (e) { el.remove(); return; }
    const row = SKILLS.map(s => `<span class="logo-item"><img src="${esc(s.iconUrl)}" alt="" loading="lazy" onerror="this.remove()" ${s.invert ? 'class="invert"' : ""}>${esc(s.name)}</span>`).join("");
    el.innerHTML = `<div class="logos-track">${row}${row}</div>`;
}

// Elementen met .reveal komen in beeld zodra je ernaar scrollt.
let revealObserver;
function initReveal(root = document) {
    const items = $$(".reveal:not(.is-visible)", root);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        items.forEach(el => el.classList.add("is-visible"));
        return;
    }
    revealObserver = revealObserver || new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    items.forEach(el => revealObserver.observe(el));
}

// Getallen met data-count tellen op van 0 naar de waarde zodra ze in beeld komen.
function initCounters() {
    $$("[data-count]").forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        if (!Number.isFinite(target) || el.dataset.done === String(target)) return;
        el.dataset.done = String(target);
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target; return; }
        const run = () => {
            const start = performance.now(), dur = 1200;
            const step = now => {
                const t = Math.min(1, (now - start) / dur);
                el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        if (!("IntersectionObserver" in window)) return run();
        const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { io.disconnect(); run(); } });
        io.observe(el);
    });
}

// Zachte lichtvlek op kaarten die de muis volgt.
function initSpotlight() {
    if (!matchMedia("(hover: hover)").matches) return;
    document.addEventListener("pointermove", e => {
        const card = e.target.closest && e.target.closest(".card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
}

// <span data-icon="mail"> wordt het bijbehorende icoon.
function initIcons(root = document) {
    $$("[data-icon]", root).forEach(el => { if (!el.firstChild) el.innerHTML = icon(el.dataset.icon); });
}

// =====================================================================
//  OVER MIJ: foto-slideshow
// =====================================================================
let slideTimer;
function initSlides() {
    const box = $("[data-slides]");
    if (!box) return;
    const imgs = $$("img", box);
    const dots = $("[data-slide-dots]");
    if (imgs.length < 2) { imgs[0]?.classList.add("on"); return; }
    let i = 0;
    dots.innerHTML = imgs.map((_, n) => `<button type="button" aria-label="Photo ${n + 1}"></button>`).join("");
    const dotBtns = $$("button", dots);
    const show = n => {
        i = (n + imgs.length) % imgs.length;
        imgs.forEach((img, k) => img.classList.toggle("on", k === i));
        dotBtns.forEach((d, k) => d.classList.toggle("on", k === i));
    };
    const start = () => { clearInterval(slideTimer); slideTimer = setInterval(() => box.isConnected ? show(i + 1) : clearInterval(slideTimer), 4500); };
    dotBtns.forEach((d, n) => d.addEventListener("click", () => { show(n); start(); }));
    show(0); start();
}

// =====================================================================
//  CONTACT
// =====================================================================
function initCopyEmail() {
    $$("[data-copy-email]").forEach(button => button.addEventListener("click", async () => {
        const original = button.textContent;
        try { await navigator.clipboard.writeText(SITE.email); button.textContent = "Copied ✓"; }
        catch (e) { window.prompt("Copy the e-mail address:", SITE.email); return; }
        setTimeout(() => { button.textContent = original; }, 2000);
    }));
}

function initContactForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    const button = $("[data-submit-btn]", form);
    const hint = $("[data-form-hint]", form);
    const status = $("[data-form-status]", form);
    const useEndpoint = Boolean(SITE.formEndpoint);

    if (!useEndpoint) {
        button.textContent = "Open mail app";
        hint.textContent = "Opens your mail app with your message already filled in.";
    }
    const show = (type, html) => { status.innerHTML = `<div class="${type}" role="alert">${html}</div>`; };
    const mailLink = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;

    form.addEventListener("submit", async event => {
        event.preventDefault();
        status.innerHTML = "";
        form.classList.add("validated");
        if (!form.checkValidity()) { $(":invalid", form).focus(); return; }
        if (form.elements._gotcha.value) return;   // spam-bots vullen dit verborgen veld in

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();

        if (!useEndpoint) {
            const subject = `Portfolio contact from ${name}`;
            const body = `${message}\n\n--\n${name}\n${email}`;
            location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            show("info", `Your mail app is opening. Nothing happening? Then mail me directly at ${mailLink}.`);
            return;
        }

        const label = button.textContent;
        button.disabled = true;
        button.textContent = "Sending...";
        try {
            const response = await fetch(SITE.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ name, email, message, _replyto: email })
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            form.reset();
            form.classList.remove("validated");
            show("ok", "Message sent. I will get back to you soon.");
        } catch (e) {
            show("bad", `Sending failed. Please try again later or mail me directly at ${mailLink}.`);
        } finally {
            button.disabled = false;
            button.textContent = label;
        }
    });
}

// =====================================================================
//  DOOM (easter egg op de homepage)
// =====================================================================
let doomDialog;
function initDoom() {
    const triggers = $$("[data-doom]");
    if (!triggers.length) return;
    if (doomDialog) { bindDoom(triggers); return; }
    const dlg = doomDialog = document.createElement("dialog");
    dlg.className = "modal doom";
    dlg.innerHTML = `
        <div class="modal-inner">
            <div class="modal-bar"><span>DOOM &middot; a little break</span><button class="modal-close" type="button" aria-label="Close">&times;</button></div>
            <div class="doom-screen"><iframe title="DOOM" src="about:blank" allowfullscreen></iframe></div>
            <div class="doom-tip">Click inside the game to activate the controls. Press Esc to close.</div>
        </div>`;
    document.body.appendChild(dlg);
    const frame = $("iframe", dlg);
    const close = () => {
        if (dlg.open) dlg.close();
        if (frame.src !== "about:blank") Music.resumeAfterGame();
        frame.src = "about:blank";
        document.body.classList.remove("modal-open");
    };
    $(".modal-close", dlg).addEventListener("click", close);
    dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
    dlg.addEventListener("keydown", e => { if (e.key === "Escape") { e.preventDefault(); close(); } });
    dlg.addEventListener("close", close);
    dlg.open_ = () => {
        Music.pauseForGame();
        frame.src = "https://silentspacemarine.com/";
        dlg.showModal();
        document.body.classList.add("modal-open");
    };
    bindDoom(triggers);
}
function bindDoom(triggers) {
    triggers.forEach(t => t.addEventListener("click", e => { e.preventDefault(); doomDialog.open_(); }));
}

// =====================================================================
//  ACHTERGRONDMUZIEK
//  - start bij de eerste klik/toets (browsers blokkeren geluid daarvoor)
//  - speelt door bij het wisselen van pagina (zie ROUTER hieronder)
//  - na het einde: SITE.musicLoopDelay ms stilte, dan opnieuw
//  - aan/uit-knop rechtsonder; de keuze wordt onthouden
// =====================================================================
const Music = (() => {
    const store = {
        get: (k, s = localStorage) => { try { return s.getItem(k); } catch (e) { return null; } },
        set: (k, v, s = localStorage) => { try { s.setItem(k, v); } catch (e) { /* privé-modus */ } }
    };
    let audio, button, loopTimer, fadeTimer, pausedForGame = false;
    const wantsMusic = () => store.get("music.off") !== "1";

    function setButton() {
        if (!button) return;
        const on = audio && (!audio.paused || loopTimer);
        button.classList.toggle("on", Boolean(on));
        button.setAttribute("aria-pressed", on ? "true" : "false");
        button.querySelector("span").textContent = on ? "Music on" : "Music off";
        button.title = on ? "Turn music off" : "Turn music on";
    }

    function fadeIn() {
        clearInterval(fadeTimer);
        audio.volume = 0;
        fadeTimer = setInterval(() => {
            audio.volume = Math.min(SITE.musicVolume, audio.volume + SITE.musicVolume / 20);
            if (audio.volume >= SITE.musicVolume) clearInterval(fadeTimer);
        }, 60);
    }

    function play() {
        if (!audio || !wantsMusic() || pausedForGame) return;
        const p = audio.play();
        if (p && p.then) p.then(() => { fadeIn(); setButton(); }).catch(() => setButton());
    }

    function stop() {
        clearTimeout(loopTimer); loopTimer = null;
        if (audio) audio.pause();
        setButton();
    }

    function init() {
        if (!SITE.music || audio) return;
        audio = new Audio(SITE.music);
        audio.preload = "auto";
        audio.volume = SITE.musicVolume;

        // Na een harde refresh verder waar je was (niet opnieuw beginnen).
        const saved = parseFloat(store.get("music.t", sessionStorage));
        if (saved > 0) audio.addEventListener("loadedmetadata", () => {
            if (saved < audio.duration - 1) audio.currentTime = saved;
        }, { once: true });
        audio.addEventListener("timeupdate", () => store.set("music.t", String(audio.currentTime), sessionStorage));

        // Einde: even stil, dan opnieuw vanaf het begin.
        audio.addEventListener("ended", () => {
            store.set("music.t", "0", sessionStorage);
            loopTimer = setTimeout(() => {
                loopTimer = null;
                audio.currentTime = 0;
                play();
            }, SITE.musicLoopDelay);
        });
        audio.addEventListener("play", setButton);
        audio.addEventListener("pause", setButton);
        // Bestand niet gevonden? Dan geen knop tonen.
        audio.addEventListener("error", () => { if (button) button.hidden = true; });

        button = document.createElement("button");
        button.type = "button";
        button.className = "music-btn";
        button.innerHTML = `<i aria-hidden="true"><b></b><b></b><b></b><b></b></i><span>Music off</span>`;
        button.addEventListener("click", e => {
            e.stopPropagation();
            if (audio.paused && !loopTimer) { store.set("music.off", "0"); play(); }
            else { store.set("music.off", "1"); stop(); }
        });
        document.body.appendChild(button);
        setButton();

        // Probeer meteen te spelen; lukt dat niet, dan bij de eerste klik of toets.
        play();
        const firstTouch = () => {
            ["pointerdown", "keydown"].forEach(t => document.removeEventListener(t, firstTouch, true));
            if (audio.paused && !loopTimer) play();
        };
        ["pointerdown", "keydown"].forEach(t => document.addEventListener(t, firstTouch, true));
    }

    return {
        init,
        pauseForGame() { if (audio && !audio.paused) { pausedForGame = true; audio.pause(); } },
        resumeAfterGame() { if (pausedForGame) { pausedForGame = false; play(); } }
    };
})();

// =====================================================================
//  ROUTER: wisselt van pagina zonder de hele site te herladen,
//  zodat de muziek gewoon doorspeelt. Links naar andere sites,
//  downloads en links met target="_blank" werken zoals altijd.
// =====================================================================
function initPage() {
    renderChrome();
    initIcons();
    initReveal();
    initCounters();
    initWordRotator();
    initLogos();
    initFeatured();
    initProjectsPage();
    initSkills();
    initSlides();
    initCopyEmail();
    initContactForm();
    initDoom();
}

async function goTo(href, push = true) {
    const url = new URL(href, location.href);
    const oldMain = document.querySelector("main");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
        if (!calm) oldMain.classList.add("is-leaving");   // oude pagina vervaagt terwijl de nieuwe laadt
        const [response] = await Promise.all([
            fetch(url.pathname, { cache: "no-cache" }),
            new Promise(r => setTimeout(r, calm ? 0 : 180))
        ]);
        if (!response.ok) throw new Error("HTTP " + response.status);
        const doc = new DOMParser().parseFromString(await response.text(), "text/html");
        const newMain = doc.querySelector("main");
        if (!newMain) throw new Error("no <main>");

        closeProject();
        if (doomDialog && doomDialog.open) doomDialog.close();
        const fresh = document.importNode(newMain, true);
        if (!calm) fresh.classList.add("is-entering");
        oldMain.replaceWith(fresh);
        page = doc.body.dataset.page || "";
        document.body.dataset.page = page;
        document.title = doc.title;
        const desc = doc.querySelector('meta[name="description"]');
        const meta = document.querySelector('meta[name="description"]');
        if (desc && meta) meta.content = desc.content;

        if (push) history.pushState(null, "", url);
        window.scrollTo({ top: 0, behavior: "instant" });
        initPage();
        if (url.hash && document.querySelector(url.hash)) document.querySelector(url.hash).scrollIntoView();
        const main = document.querySelector("main");
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
    } catch (e) {
        location.href = url.href;   // vangnet: gewoon normaal laden
    }
}

function initRouter() {
    if (location.protocol === "file:") return;   // los bestand: fetch werkt niet, gewoon normaal laden
    document.addEventListener("click", e => {
        const link = e.target.closest("a[href]");
        if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.target && link.target !== "_self") return;
        if (link.hasAttribute("download")) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || !/(\.html|\/)$/.test(url.pathname)) return;
        if (url.pathname === location.pathname && url.search === location.search && url.hash) return;   // anker op dezelfde pagina
        e.preventDefault();
        goTo(url.href);
    });
    window.addEventListener("popstate", () => goTo(location.href, false));
}

// =====================================================================
//  START
// =====================================================================
initPage();
initNavScroll();
initSpotlight();
initRouter();
Music.init();
