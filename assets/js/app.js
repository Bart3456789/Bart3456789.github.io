// =====================================================================
//  SITE SETTINGS
// =====================================================================
const SITE = {
    brand: "BART",
    brandAccent: "HUB",
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
    ["skills.html", "Skills"],
    ["projects.html", "Projecten"],
    ["about.html", "Over mij"],
    ["contact.html", "Contact"]
];

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
const page = document.body.dataset.page || "";

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
        nav.className = "cp-nav";
        nav.innerHTML = `
            <div class="wrap">
                <a class="cp-brand glitch" data-text="${SITE.brand}//${SITE.brandAccent}" href="index.html">${SITE.brand}<span>//</span>${SITE.brandAccent}<small>v2.0</small></a>
                <button class="cp-burger" aria-label="Menu" aria-expanded="false">MENU</button>
                <nav class="cp-links" aria-label="Hoofdmenu">
                    ${PAGES.map(([href, label], i) => `<a href="${href}" class="${href === current ? "on" : ""}" ${href === current ? 'aria-current="page"' : ""}><i>${pad(i + 1)}</i>${label}</a>`).join("")}
                </nav>
            </div>`;
        const burger = $(".cp-burger", nav);
        burger.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            burger.setAttribute("aria-expanded", open);
            burger.textContent = open ? "SLUIT" : "MENU";
        });
    }

    const foot = $("[data-foot]");
    if (foot) {
        foot.className = "cp-foot";
        foot.innerHTML = `
            <div class="wrap">
                <span><i class="dot"></i>SYS.STATUS // ONLINE</span>
                <span>&copy; ${new Date().getFullYear()} Bartosz Jaworski</span>
                <span><a href="mailto:${SITE.email}">MAIL</a> &nbsp;/&nbsp; <a href="${SITE.github}" target="_blank" rel="noopener">GITHUB</a></span>
            </div>`;
    }
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

function loadError(target) {
    const local = location.protocol === "file:";
    target.innerHTML = `<div class="notice" style="grid-column:1/-1">
        &#9888; ERROR // Kon <code>${esc(SITE.projectsFile)}</code> niet laden.
        ${local
            ? "<br>Je opent de site als los bestand (file://). Browsers blokkeren dan het laden van JSON. Start een lokale server, bijvoorbeeld met de VS Code-extensie <code>Live Server</code>, of bekijk de site op GitHub Pages."
            : "<br>Controleer of het bestand bestaat en geldige JSON bevat (let op komma's en aanhalingstekens)."}
    </div>`;
}

// Knoppen voor live demo / broncode (alleen als die links in projects.json staan).
function linkButtons(project, small = false) {
    const links = project.links || {};
    const size = small ? " btn-sm" : "";
    return [
        links.live ? `<a class="btn${size}" href="${esc(links.live)}" target="_blank" rel="noopener">&#9654; Live demo</a>` : "",
        links.code ? `<a class="btn btn-ghost btn-cyan${size}" href="${esc(links.code)}" target="_blank" rel="noopener">&lt;/&gt; GitHub</a>` : ""
    ].join("");
}

function projectCard(project, index) {
    const links = linkButtons(project, true);
    return `
        <article class="p-card" style="animation-delay:${index * 70}ms">
            <div class="p-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(project.id)}.exe</span><b class="p-num">${pad(index + 1)}</b></div>
            <div class="p-media">
                <img src="${esc(project.image)}" alt="Screenshot van ${esc(project.title)}" loading="lazy">
            </div>
            <div class="p-body">
                ${project.tagline ? `<p class="p-tag">${esc(project.tagline)}</p>` : ""}
                <h3><button type="button" class="p-open" data-open="${esc(project.id)}">${esc(project.title)}</button></h3>
                ${project.challenge ? `<p class="p-challenge">${esc(project.challenge)}</p>` : ""}
                <ul class="chips">${project.tools.map(toolChip).join("")}</ul>
                ${links ? `<div class="p-links">${links}</div>` : ""}
                <span class="p-more">Bekijk details</span>
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

    const params = new URLSearchParams(location.search);
    let active = params.get("skill") || "all";

    // Eén filter: de technieken uit de projecten (volgorde = volgorde in skills.json).
    const tools = SKILLS.map(s => s.name).filter(name => projectsWith(name).length);

    function draw() {
        const shown = active === "all" ? projects : projectsWith(active);

        filterBox.innerHTML = ["all", ...tools].map(tool => {
            const on = same(active, tool);
            const n = tool === "all" ? projects.length : projectsWith(tool).length;
            return `<button type="button" class="chip chip-btn ${on ? "on" : ""}" data-filter="${esc(tool)}" aria-pressed="${on}">${tool === "all" ? "Alles" : esc(tool)}<span>${n}</span></button>`;
        }).join("");

        grid.innerHTML = shown.length
            ? shown.map(projectCard).join("")
            : `<div class="panel empty" style="grid-column:1/-1">
                   <h3>Nog geen projecten met ${esc(active)}</h3>
                   <p class="muted" style="margin:.8rem 0 1.4rem">Hier komt binnenkort werk bij.</p>
                   <button class="btn" type="button" data-filter="all">Toon alles</button>
               </div>`;

        bindCards(grid, shown);
        $$("[data-filter]").forEach(b => b.addEventListener("click", () => {
            active = b.dataset.filter;
            const url = new URL(location.href);
            if (active === "all") url.searchParams.delete("skill"); else url.searchParams.set("skill", active);
            history.replaceState(null, "", url);
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

    const featured = projects.filter(p => p.featured);
    const list = (featured.length ? featured : projects).slice(0, 3);
    grid.innerHTML = list.map(projectCard).join("");
    bindCards(grid, list);
    const all = $("[data-all-count]");
    if (all) all.textContent = projects.length;

    const total = $("[data-stat-projects]");
    if (total) total.textContent = projects.length;
    const techs = $("[data-stat-tech]");
    if (techs) techs.textContent = unique(projects.flatMap(p => p.tools)).length;
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
        <div class="modal-shell"><div class="modal-inner">
            <div class="modal-bar"><span data-m-file></span><button class="modal-close" type="button" data-m-close aria-label="Sluiten">&times;</button></div>
            <div class="modal-scroll" data-m-body></div>
            <div class="modal-nav">
                <button type="button" data-m-prev>&larr; Vorige</button>
                <button type="button" data-m-next>Volgende &rarr;</button>
            </div>
        </div></div>`;
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

    $("[data-m-file]", modal).textContent = `// project_file: ${p.id}.dat  [${pad(modalIndex + 1)}/${pad(modalList.length)}]`;
    $("[data-m-body]", modal).innerHTML = `
        <div class="modal-top">
            <div>
                <div class="modal-img"><img src="${esc(images[0])}" alt="Screenshot van ${esc(p.title)}" data-m-main></div>
                ${images.length > 1 ? `<div class="thumbs">${images.map((src, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-m-thumb="${esc(src)}" aria-label="Afbeelding ${i + 1}"><img src="${esc(src)}" alt=""></button>`).join("")}</div>` : ""}
            </div>
            <div>
                <h2 id="modal-title">${esc(p.title)}</h2>
                ${p.tagline ? `<p class="modal-tagline">&gt; ${esc(p.tagline)}</p>` : ""}
                <p class="label">Gebouwd met</p>
                <ul class="chips">${p.tools.map(toolChip).join("")}</ul>
                ${linkBtns ? `<div class="modal-links">${linkBtns}</div>` : ""}
                ${p.challenge ? `<p class="label" style="margin-top:1.4rem">Probleem dat ik oploste</p><div class="learned">${esc(p.challenge)}</div>` : ""}
            </div>
        </div>
        <div class="modal-cols">
            <div class="modal-desc">
                <p class="label">Over het project</p>
                ${desc.length ? desc.map(t => `<p>${esc(t)}</p>`).join("") : `<p class="muted">Nog geen beschrijving.</p>`}
            </div>
            <div>
                ${feats.length ? `<p class="label">Features</p><ul class="feat">${feats.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
                ${p.learned ? `<p class="label">Wat ik leerde</p><div class="learned">${esc(p.learned)}</div>` : ""}
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
        const text = skill.text || (skill.auto ? `Gebruikt in: ${projectsWith(skill.name).map(p => p.title).join(", ")}.` : "");
        const i = index + 1;
        return `
            <a class="s-card" href="projects.html?skill=${encodeURIComponent(skill.name)}" style="animation-delay:${i * 50}ms">
                <div class="s-top">
                    <img class="s-icon ${skill.invert ? "invert" : ""}" src="${esc(skill.iconUrl)}" alt="${esc(skill.name)} logo" loading="lazy">
                    <span class="s-count">${pad(i)}</span>
                </div>
                <h3>${esc(skill.name)}</h3>
                ${text ? `<p>${esc(text)}</p>` : ""}
                <div class="s-bar"><i style="width:${n ? Math.max(12, n / max * 100) : 4}%"></i></div>
                <div class="s-meta"><span>${n} project${n === 1 ? "" : "en"}</span><span>Bekijk &rarr;</span></div>
            </a>`;
    }).join("");

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
function initTypewriter() {
    const el = $("[data-words]");
    if (!el) return;
    const words = ["websites", "games", "web-apps", "3D-werelden"];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, c = words[0].length, deleting = true, wait = 14;
    setInterval(() => {
        if (wait-- > 0) return;
        c += deleting ? -1 : 1;
        el.textContent = words[w].slice(0, c);
        if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
        else if (!deleting && c === words[w].length) { deleting = true; wait = 16; }
    }, 85);
}

async function initTicker() {
    const el = $("[data-ticker]");
    if (!el) return;
    try { await loadData(); } catch (e) { /* ticker toont dan alleen de vaste woorden */ }
    const items = SKILLS.map(s => s.name).concat(["Responsive", "Clean code", "Game dev"]);
    const row = items.map(t => `${esc(t)}<span>&#9670;</span>`).join("");
    el.innerHTML = `<div>${row}${row}</div>`;
}

// =====================================================================
//  OVER MIJ: foto-slideshow
// =====================================================================
function initSlides() {
    const box = $("[data-slides]");
    if (!box) return;
    const imgs = $$("img", box);
    const dots = $("[data-slide-dots]");
    if (imgs.length < 2) { imgs[0]?.classList.add("on"); return; }
    let i = 0, timer;
    dots.innerHTML = imgs.map((_, n) => `<button type="button" aria-label="Foto ${n + 1}"></button>`).join("");
    const dotBtns = $$("button", dots);
    const show = n => {
        i = (n + imgs.length) % imgs.length;
        imgs.forEach((img, k) => img.classList.toggle("on", k === i));
        dotBtns.forEach((d, k) => d.classList.toggle("on", k === i));
    };
    const start = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 4500); };
    dotBtns.forEach((d, n) => d.addEventListener("click", () => { show(n); start(); }));
    show(0); start();
}

// =====================================================================
//  CONTACT
// =====================================================================
function initCopyEmail() {
    $$("[data-copy-email]").forEach(button => button.addEventListener("click", async () => {
        const original = button.textContent;
        try { await navigator.clipboard.writeText(SITE.email); button.textContent = "Gekopieerd ✓"; }
        catch (e) { window.prompt("Kopieer het e-mailadres:", SITE.email); return; }
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
        button.textContent = "Open mail ▸";
        hint.textContent = "Opent je mailprogramma met je bericht al ingevuld.";
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
            const subject = `Portfolio contact van ${name}`;
            const body = `${message}\n\n--\n${name}\n${email}`;
            location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            show("info", `Je mailprogramma wordt geopend. Gebeurt er niets? Mail dan direct naar ${mailLink}.`);
            return;
        }

        const label = button.textContent;
        button.disabled = true;
        button.textContent = "Versturen...";
        try {
            const response = await fetch(SITE.formEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ name, email, message, _replyto: email })
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            form.reset();
            form.classList.remove("validated");
            show("ok", "Bericht verstuurd. Ik neem snel contact met je op.");
        } catch (e) {
            show("bad", `Versturen is mislukt. Probeer het later opnieuw of mail direct naar ${mailLink}.`);
        } finally {
            button.disabled = false;
            button.textContent = label;
        }
    });
}

// =====================================================================
//  DOOM (easter egg op de homepage)
// =====================================================================
function initDoom() {
    const triggers = $$("[data-doom]");
    if (!triggers.length) return;
    const dlg = document.createElement("dialog");
    dlg.className = "modal doom";
    dlg.innerHTML = `
        <div class="modal-shell"><div class="modal-inner">
            <div class="modal-bar"><span>// doom.exe</span><button class="modal-close" type="button" aria-label="Sluiten">&times;</button></div>
            <div class="doom-screen"><iframe title="DOOM" src="about:blank" allowfullscreen></iframe></div>
            <div class="doom-tip">Klik in het spel om de controls te activeren — ESC sluit dit venster.</div>
        </div></div>`;
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
    triggers.forEach(t => t.addEventListener("click", e => {
        e.preventDefault();
        frame.src = "https://silentspacemarine.com/";
        dlg.showModal();
        document.body.classList.add("modal-open");
    }));
}

// =====================================================================
//  START
// =====================================================================
renderChrome();
initTypewriter();
initTicker();
initFeatured();
initProjectsPage();
initSkills();
initSlides();
initCopyEmail();
initContactForm();
initDoom();
