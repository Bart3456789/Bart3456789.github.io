// =====================================================================
//  SITE SETTINGS
// =====================================================================
const SITE = {
    name: "Bartosz Jaworski",
    initials: "BJ",
    role: "Web developer",
    tagline: "Web developer in training, crafting refined websites, web applications and games.",
    timeZone: "Europe/Amsterdam",   // voor de klok in de footer
    instagram: "https://www.instagram.com/bart_buzzz/",
    email: "bartekjaworski416@gmail.com",
    github: "https://github.com/Bart3456789",
    projectsFile: "data/projects.json",
    skillsFile: "data/skills.json",
    // Contactformulier: plak hier je Formspree-link (https://formspree.io/f/xxxxxxxx).
    // Leeg laten = het formulier opent gewoon je mailprogramma.
    formEndpoint: ""
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
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
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
        nav.className = "nav";
        nav.innerHTML = `
            <div class="wrap">
                <a class="brand" href="index.html"><b>${SITE.name}</b><small>${SITE.role}</small></a>
                <div class="nav-time" aria-hidden="true">Local time<b data-clock>--:--</b></div>
                <nav class="nav-links" aria-label="Main menu">
                    ${PAGES.slice(1).map(([href, label], i) => `<a href="${href}" class="${href === current ? "on" : ""}" ${href === current ? 'aria-current="page"' : ""}>${label}<sup>${pad(i + 1)}</sup></a>`).join("")}
                </nav>
                <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
            </div>`;

        // Volledig schermmenu voor telefoons (staat los van de header vanwege de blend-modus).
        let menu = $("#site-menu");
        if (!menu) { menu = document.createElement("div"); menu.id = "site-menu"; menu.className = "menu"; document.body.appendChild(menu); }
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
        menu.innerHTML = `
            <nav aria-label="Menu">${PAGES.map(([href, label], i) => `<a href="${href}" class="${href === current ? "on" : ""}"><small>${pad(i + 1)}</small><span>${label}</span></a>`).join("")}</nav>
            <div class="menu-foot"><span>${SITE.email}</span><span><i class="status-dot"></i>Internships &amp; freelance</span></div>`;
        const btn = $(".menu-btn", nav);
        btn.addEventListener("click", () => {
            const open = menu.classList.toggle("open");
            document.body.classList.toggle("menu-open", open);
            btn.setAttribute("aria-expanded", open);
            btn.textContent = open ? "Close" : "Menu";
        });
    }

    const foot = $("[data-foot]");
    if (foot) {
        foot.className = "foot";
        const cta = page === "contact" ? "" : `
                <div class="big-cta">
                    <div>
                        <span class="kicker">Have a project in mind?</span>
                        <a class="big-cta-link" href="contact.html"><h2>Let's talk <span class="arrow-big" aria-hidden="true">&rarr;</span></h2></a>
                    </div>
                    <div class="big-cta-row">
                        <a class="mail" href="mailto:${SITE.email}">${SITE.email.replace("@", "<wbr>@")}</a>
                        <a class="btn btn-sm btn-solid" href="contact.html">Contact</a>
                    </div>
                </div>`;
        foot.innerHTML = `
            <div class="wrap">
                ${cta}
                <div class="foot-row">
                    <nav class="foot-links" aria-label="Footer">${PAGES.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</nav>
                    <div class="foot-links">
                        <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
                        <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
                        <button type="button" data-doom>Play DOOM</button>
                    </div>
                </div>
                <div class="foot-bottom">
                    <span>&copy; ${new Date().getFullYear()} ${SITE.name}</span>
                    <span><i class="status-dot"></i>Open to internships &amp; freelance</span>
                    <span>NL <b data-clock>--:--</b></span>
                    <button type="button" class="to-top" data-to-top>Top &uarr;</button>
                </div>
            </div>`;
        $("[data-to-top]", foot).addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
}

// Maakt van regels tekst een kop die per regel omhoog schuift.
function splitMarkup(lines) {
    return lines.map(l => `<span class="line"><span>${l}</span></span>`).join("");
}

// Navigatie krijgt een achtergrond zodra je scrollt + gouden voortgangslijn bovenaan.
function initNavScroll() {
    const bar = document.createElement("div");
    bar.className = "progress";
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
        ticking = false;
        const nav = $("[data-nav]");
        if (nav) nav.classList.toggle("scrolled", scrollY > 10);
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
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
    if (!lvl) return "";
    const dots = LEVELS.length - LEVELS.indexOf(lvl);   // easy = 1 stipje, extreme = 4
    return `<span class="diff" data-level="${lvl}" title="Difficulty"><i aria-hidden="true">${LEVELS.map((_, i) => `<b class="${i < dots ? "on" : ""}"></b>`).join("")}</i>${LEVEL_NAMES[lvl]}</span>`;
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
// "code": "school" in projects.json = schoolproject waarvan de code privé is gezet door school.
const isSchool = value => same(value || "", "school");
// Link-filter op de projectenpagina: repo = echte code-link, live = live-demo, locked = code privé door school.
const LINK_TYPES = ["repo", "live", "locked"];
const LINK_NAMES = { repo: "Repo", live: "Live", locked: "Locked" };
function linkTypesOf(project) {
    const links = project.links || {};
    const types = [];
    if (links.code && !isSchool(links.code)) types.push("repo");
    if (links.live) types.push("live");
    if (isSchool(links.code)) types.push("locked");
    return types;
}

// Links naar live demo / broncode (alleen als die in projects.json staan).
function projectLinks(project) {
    const links = project.links || {};
    return [
        links.live ? `<a href="${esc(links.live)}" target="_blank" rel="noopener" aria-label="Live demo of ${esc(project.title)}">${icon("external")}Live</a>` : "",
        isSchool(links.code) ? `<span class="school-tag" title="The code of this school project is set to private by the school">${icon("lock")}School · private</span>`
            : links.code ? `<a href="${esc(links.code)}" target="_blank" rel="noopener" aria-label="Code of ${esc(project.title)} on GitHub">${icon("github")}Code</a>` : ""
    ].join("");
}

function projectCard(project, index) {
    const links = projectLinks(project);
    return `
        <article class="card reveal" style="--d:${(index % 3) * 100}ms">
            <div class="p-media reveal-img" style="--d:${(index % 3) * 100 + 100}ms">
                <img src="${esc(project.image)}" alt="Screenshot of ${esc(project.title)}" loading="lazy">
                <span class="p-index">${pad(index + 1)}</span>
            </div>
            <div class="p-body">
                <div class="p-meta">
                    <span class="p-tools">${project.tools.slice(0, 4).map(esc).join(" &middot; ")}</span>
                    ${levelBadge(project)}
                </div>
                <h3><button type="button" class="p-open" data-open="${esc(project.id)}">${esc(project.title)}</button></h3>
                ${project.tagline ? `<p class="p-tag">${esc(project.tagline)}</p>` : ""}
                <div class="p-foot">
                    <span class="p-more">Case study <span class="arrow">&rarr;</span></span>
                    ${links ? `<div class="p-links">${links}</div>` : ""}
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
    let linkType = LINK_TYPES.includes(params.get("links")) ? params.get("links") : "all";
    let filtersOpen = false;   // filtermenu (dropdown) open of dicht

    // Technieken uit de projecten (volgorde = volgorde in skills.json).
    const tools = SKILLS.map(s => s.name).filter(name => projectsWith(name).length);
    const byTool = (list, tool) => tool === "all" ? list : list.filter(p => p.tools.some(x => same(x, tool)));
    const byLevel = (list, lvl) => lvl === "all" ? list : list.filter(p => levelOf(p) === lvl);
    const byLinks = (list, type) => type === "all" ? list : list.filter(p => linkTypesOf(p).includes(type));
    // alle filters samen; "skip" laat er één weg (voor de aantallen per knop)
    const filtered = (skip) => {
        let list = projects;
        if (skip !== "skill") list = byTool(list, active);
        if (skip !== "level") list = byLevel(list, level);
        if (skip !== "links") list = byLinks(list, linkType);
        return list;
    };

    function setParam(key, value) {
        const url = new URL(location.href);
        if (value === "all") url.searchParams.delete(key); else url.searchParams.set(key, value);
        history.replaceState(null, "", url);
    }

    function draw() {
        const shown = filtered();

        const techRow = ["all", ...tools].map(tool => {
            const on = same(active, tool);
            const n = byTool(filtered("skill"), tool).length;
            return `<button type="button" class="f-btn ${on ? "on" : ""}" data-filter="${esc(tool)}" aria-pressed="${on}">${tool === "all" ? "All" : esc(tool)}<sup>${pad(n)}</sup></button>`;
        }).join("");
        const levelRow = ["all", ...LEVELS].map(lvl => {
            const on = level === lvl;
            const n = byLevel(filtered("level"), lvl).length;
            return `<button type="button" class="f-btn ${on ? "on" : ""}" data-level-filter="${lvl}" ${lvl !== "all" ? `data-level="${lvl}"` : ""} aria-pressed="${on}" ${n || on ? "" : "disabled"}>${lvl === "all" ? "All" : LEVEL_NAMES[lvl]}<sup>${pad(n)}</sup></button>`;
        }).join("");
        const linkRow = ["all", ...LINK_TYPES].map(type => {
            const on = linkType === type;
            const n = byLinks(filtered("links"), type).length;
            return `<button type="button" class="f-btn ${on ? "on" : ""}" data-links-filter="${type}" aria-pressed="${on}" ${n || on ? "" : "disabled"}>${type === "all" ? "All" : LINK_NAMES[type]}<sup>${pad(n)}</sup></button>`;
        }).join("");
        const activeCount = (active !== "all") + (level !== "all") + (linkType !== "all");
        const summary = [active !== "all" ? esc(active) : "", level !== "all" ? LEVEL_NAMES[level] : "", linkType !== "all" ? LINK_NAMES[linkType] : ""].filter(Boolean).join(" + ") || "All projects";
        filterBox.innerHTML = `
            <div class="filter-bar">
                <button type="button" class="filter-toggle" data-filter-toggle aria-expanded="${filtersOpen}" aria-controls="filter-panel">
                    <span class="ft-label">Filter${activeCount ? `<sup>${activeCount}</sup>` : ""}</span>
                    <span class="ft-summary">${summary}</span>
                    <span class="ft-chev" aria-hidden="true"></span>
                </button>
                <span class="filter-count">${pad(shown.length)} / ${pad(projects.length)}</span>
                ${activeCount ? `<button type="button" class="filter-clear" data-reset>Clear</button>` : ""}
            </div>
            <div class="filter-panel ${filtersOpen ? "open" : ""}" id="filter-panel">
                <div class="filter-panel-inner">
                    <div class="filter-row"><span class="filter-label">Technology</span><div class="filter-btns">${techRow}</div></div>
                    <div class="filter-row"><span class="filter-label">Difficulty</span><div class="filter-btns">${levelRow}</div></div>
                    <div class="filter-row"><span class="filter-label">Links</span><div class="filter-btns">${linkRow}</div></div>
                </div>
            </div>`;
        $("[data-filter-toggle]", filterBox).addEventListener("click", () => {
            filtersOpen = !filtersOpen;
            $("[data-filter-toggle]", filterBox).setAttribute("aria-expanded", filtersOpen);
            $(".filter-panel", filterBox).classList.toggle("open", filtersOpen);
        });

        grid.className = "cards";
        $$("[data-all-count]").forEach(el => { el.textContent = projects.length; });
        grid.innerHTML = shown.length
            ? shown.map(projectCard).join("")
            : `<div class="empty">
                   <h3>Nothing <em>here</em> yet</h3>
                   <p class="muted" style="margin:0 0 1.8rem">No projects match this combination. More work is on its way.</p>
                   <button class="btn" type="button" data-reset>Show all projects</button>
               </div>`;
        initReveal(grid);

        bindCards(grid, shown);
        $$("[data-filter]", filterBox).forEach(b => b.addEventListener("click", () => {
            active = b.dataset.filter; setParam("skill", active); draw();
        }));
        $$("[data-level-filter]", filterBox).forEach(b => b.addEventListener("click", () => {
            level = b.dataset.levelFilter; setParam("level", level); draw();
        }));
        $$("[data-links-filter]", filterBox).forEach(b => b.addEventListener("click", () => {
            linkType = b.dataset.linksFilter; setParam("links", linkType); draw();
        }));
        $$("[data-reset]", grid.parentElement).forEach(r => r.addEventListener("click", () => {
            active = level = linkType = "all";
            ["skill", "level", "links"].forEach(k => setParam(k, "all"));
            draw();
        }));
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

    // Homepage: de 4 moeilijkste projecten (extreme -> hard -> medium -> easy).
    const list = projects.map((p, i) => ({ p, i }))
        .sort((x, y) => levelRank(x.p) - levelRank(y.p) || x.i - y.i)
        .map(x => x.p).slice(0, 4);
    grid.className = "cards";
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
            <div class="modal-bar"><span data-m-file></span><button class="modal-close" type="button" data-m-close>Close<i aria-hidden="true"></i></button></div>
            <div class="modal-scroll" data-m-body></div>
            <div class="modal-nav">
                <button type="button" data-m-prev><small>&larr; Previous</small><span data-m-prev-name></span></button>
                <button type="button" data-m-next><small>Next &rarr;</small><span data-m-next-name></span></button>
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

// Sluiten met een korte animatie (het venster schuift terug naar rechts).
function closeProject(instant) {
    if (!modal || !modal.open) { onModalClosed(); return; }
    if (instant === true || modal.classList.contains("closing") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        modal.classList.remove("closing");
        modal.close();
        onModalClosed();
        return;
    }
    modal.classList.add("closing");
    setTimeout(() => { modal.classList.remove("closing"); if (modal.open) modal.close(); onModalClosed(); }, 420);
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
    const links = p.links || {};
    const linkList = [
        links.live ? `<a href="${esc(links.live)}" target="_blank" rel="noopener">${icon("external")}Live demo</a>` : "",
        isSchool(links.code) ? `<span class="school-note">${icon("lock")}School project: the code is set to private by the school, so it can't be shared.</span>`
            : links.code ? `<a href="${esc(links.code)}" target="_blank" rel="noopener">${icon("github")}Source code</a>` : ""
    ].join("");
    const desc = asList(p.description);
    const feats = asList(p.features);
    const n = modalList.length;
    const prev = modalList[(modalIndex - 1 + n) % n], next = modalList[(modalIndex + 1) % n];

    $("[data-m-file]", modal).textContent = `Case study — ${pad(modalIndex + 1)} / ${pad(n)}`;
    $("[data-m-prev-name]", modal).textContent = prev.title;
    $("[data-m-next-name]", modal).textContent = next.title;
    $("[data-m-body]", modal).innerHTML = `
        <div class="modal-head">
            ${levelBadge(p)}
            <h2 id="modal-title">${esc(p.title)}</h2>
            ${p.tagline ? `<p class="modal-tagline">${esc(p.tagline)}</p>` : ""}
        </div>
        <div class="modal-img"><img src="${esc(images[0])}" alt="Screenshot of ${esc(p.title)}" data-m-main></div>
        ${images.length > 1 ? `<div class="thumbs">${images.map((src, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-m-thumb="${esc(src)}" aria-label="Image ${i + 1}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
        <div class="specs">
            <div><p class="label">Difficulty</p><p>${levelOf(p) ? LEVEL_NAMES[levelOf(p)] : "&ndash;"}</p></div>
            <div><p class="label">Built with</p><ul class="chips">${p.tools.map(toolChip).join("")}</ul></div>
            <div><p class="label">Links</p><p>${linkList || '<span class="muted">Private project</span>'}</p></div>
        </div>
        <div class="modal-cols">
            <div class="modal-desc">
                <p class="label">The project</p>
                ${desc.length ? desc.map(t => `<p>${esc(t)}</p>`).join("") : `<p class="muted">No description yet.</p>`}
            </div>
            <div>
                ${p.challenge ? `<p class="label">The challenge</p><div class="note">${esc(p.challenge)}</div>` : ""}
                ${p.learned ? `<p class="label">What I learned</p><div class="note">${esc(p.learned)}</div>` : ""}
            </div>
        </div>
        ${feats.length ? `<p class="label" style="margin-top:1rem">Key features</p><ul class="feat">${feats.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}`;

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
            <a class="s-card reveal" href="projects.html?skill=${encodeURIComponent(skill.name)}" style="--d:${Math.min(index, 6) * 60}ms">
                <div class="s-top">
                    <img class="s-logo ${skill.invert ? "invert" : ""}" src="${esc(skill.iconUrl)}" alt="" loading="lazy" onerror="this.remove()">
                    <span class="s-count">${pad(i)}</span>
                </div>
                <h3>${esc(skill.name)}</h3>
                <p>${esc(text)}</p>
                <div class="s-bar"><i style="--w:${n ? Math.max(12, n / max * 100) : 4}%"></i></div>
                <div class="s-meta"><span>${n ? `${pad(n)} project${n === 1 ? "" : "s"}` : "Soon"}</span><span>View &rarr;</span></div>
            </a>`;
    }).join("");
    initReveal(target);
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
    // koppen: elke regel krijgt een eigen vertraging
    $$(".split", root).forEach(el => $$(".line", el).forEach((line, i) => line.style.setProperty("--i", i)));
    const items = $$(".reveal:not(.is-visible), .split:not(.is-visible), .reveal-img:not(.is-visible)", root);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        items.forEach(el => el.classList.add("is-visible"));
        return;
    }
    revealObserver = revealObserver || new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        $$(":scope > .reveal-img", entry.target).forEach(img => img.classList.add("is-visible"));
        revealObserver.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    // Een afbeelding die met clip-path verborgen is telt voor de browser als "niet zichtbaar",
    // daarom kijken we bij .reveal-img naar de (niet verborgen) ouder; die onthult hem dan.
    items.forEach(el => revealObserver.observe(el.classList.contains("reveal-img") && el.parentElement ? el.parentElement : el));
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
        const card = e.target.closest && e.target.closest(".s-card");
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
        try { await navigator.clipboard.writeText(SITE.email); button.textContent = "Copied"; toast("E-mail address copied"); }
        catch (e) { window.prompt("Copy the e-mail address:", SITE.email); return; }
        setTimeout(() => { button.textContent = original; }, 2000);
    }));
}

// =====================================================================
//  LUXE DETAILS
// =====================================================================
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

// Korte melding onderaan het scherm.
let toastTimer;
function toast(text) {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = text;
    el.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("on"), 2200);
}

// Intro-gordijn met je naam: alleen bij het eerste bezoek in deze sessie.
function initLoader() {
    let seen = false;
    try { seen = sessionStorage.getItem("intro.seen") === "1"; sessionStorage.setItem("intro.seen", "1"); } catch (e) { /* privé-modus */ }
    if (seen || calm()) return;
    // Laadscherm met een teller die rustig naar 100 loopt.
    const el = document.createElement("div");
    el.className = "loader";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="loader-top"><span>${SITE.name}</span><span>Loading portfolio</span></div>
        <div class="loader-count">0</div><div class="loader-bar"></div>`;
    document.body.appendChild(el);
    document.body.classList.add("modal-open");          // niet scrollen tijdens de intro
    const count = $(".loader-count", el), start = performance.now(), dur = 1600;
    const step = now => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        count.textContent = Math.round(eased * 100);
        el.style.setProperty("--p", eased);
        if (t < 1) return requestAnimationFrame(step);
        setTimeout(() => {
            el.classList.add("done");
            document.body.classList.remove("modal-open");
            setTimeout(() => el.remove(), 1300);
        }, 250);
    };
    requestAnimationFrame(step);
}


// Knoppen met .magnetic trekken een beetje naar de muis toe.
function initMagnetic() {
    if (!finePointer() || calm()) return;
    document.addEventListener("pointermove", e => {
        const el = e.target instanceof Element && e.target.closest(".magnetic");
        $$(".magnetic.pulled").forEach(m => { if (m !== el) { m.classList.remove("pulled"); m.style.transform = ""; } });
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * .28;
        const my = (e.clientY - r.top - r.height / 2) * .38;
        el.classList.add("pulled");
        el.style.transform = `translate(${mx}px, ${my}px)`;
    }, { passive: true });
}

// Live klok (Nederlandse tijd) in de footer.
let clockTimer;
function initClock() {
    const tick = () => {
        const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: SITE.timeZone });
        $$("[data-clock]").forEach(el => { el.innerHTML = el.closest(".nav") ? `${time} CET` : `${time}<small>CET</small>`; });
    };
    tick();
    clearInterval(clockTimer);
    clockTimer = setInterval(tick, 15000);
}

// Statement op de homepage: de woorden lichten één voor één op terwijl je scrollt.
let wordsHandler;
function initWordsReveal() {
    const el = $("[data-words-reveal]");
    if (wordsHandler) removeEventListener("scroll", wordsHandler);
    if (!el) return;
    if (!el.dataset.split) {
        // tekst (ook binnen <em>) opdelen in losse woorden
        const wrap = node => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
                        else { const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s); }
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1) wrap(child);
            });
        };
        wrap(el);
        el.dataset.split = "1";
    }
    const words = $$(".w", el);
    if (calm()) { words.forEach(w => w.classList.add("lit")); return; }
    wordsHandler = () => {
        const r = el.getBoundingClientRect();
        // 0 als de tekst onderaan binnenkomt, 1 als hij rond het midden staat
        const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle("lit", i < n));
    };
    addEventListener("scroll", wordsHandler, { passive: true });
    wordsHandler();
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
        frame.src = "about:blank";
        document.body.classList.remove("modal-open");
    };
    $(".modal-close", dlg).addEventListener("click", close);
    dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
    dlg.addEventListener("keydown", e => { if (e.key === "Escape") { e.preventDefault(); close(); } });
    dlg.addEventListener("close", close);
    dlg.open_ = () => {
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
    initClock();
    initWordsReveal();
    if (window.Scene) window.Scene.setPage(page);   // 3D-vorm schuift naar de plek voor deze pagina
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

        closeProject(true);
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
initLoader();
initPage();
initNavScroll();
initSpotlight();
initMagnetic();
initRouter();
