// ============================================================
//  SITE SETTINGS
// ============================================================
const SITE = {
    brand: "BartHub",   // naam in de topbalk (kies je een nieuwe naam: pas het hier aan)
    email: "bartekjaworski416@gmail.com",
    // Contactformulier: plak hier je Formspree-link (https://formspree.io/f/xxxxxxxx).
    // Leeg laten = het formulier opent gewoon je mailprogramma.
    formEndpoint: ""
};

const AI_ICON = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<path fill="#a78bfa" d="M26 6l5.5 16.5L48 28l-16.5 5.5L26 50l-5.5-16.5L4 28l16.5-5.5z"/>' +
    '<path fill="#c4b5fd" d="M48 34l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg>');

const data = {
    projects: [
        {
            title: "Quiz pagina",
            image: "assets/img/project%60s/project1.png",
            tools: ["HTML", "CSS", "JavaScript"],
            text: "Een interactieve quizpagina met vragen, antwoorden en score. Ik leerde hoe je logica, feedback en DOM-updates samenbrengt in een duidelijke user flow.",
            learned: "JavaScript events, scoretelling en nette pagina-opbouw."
        },
        {
            title: "Slotmachine game",
            image: "assets/img/project%60s/project2.png",
            tools: ["HTML", "CSS", "JavaScript"],
            text: "Een browsergame met draaiende symbolen en winstcontrole. De focus lag op timing, functies en een speelse interface.",
            learned: "Game states, timing en herbruikbare functies."
        },
        {
            title: "Login website",
            image: "assets/img/project%60s/project3.png",
            tools: ["PHP", "Database", "HTML", "Bootstrap"],
            text: "Een login-website met formulieren, serverlogica en databasekoppeling. Hierdoor werd de stap van statisch naar dynamisch duidelijk.",
            learned: "Formulieren verwerken, data opslaan en Bootstrap layouts gebruiken."
        },
        {
            title: "Collectie pagina",
            image: "assets/img/project%60s/project4.png",
            tools: ["PHP", "Database", "HTML", "Bootstrap"],
            text: "Een collectiepagina waar items uit een database worden opgehaald en als overzichtelijke kaarten worden getoond.",
            learned: "Data ophalen, structureren en presenteren in cards."
        },
        {
            title: "Unity prototype",
            image: "assets/img/project%60s/project5.png",
            tools: ["Unity", "C#"],
            text: "Een simpel gameprototype in Unity met objecten, beweging en basis interactie. Dit project gaf een eerste stevige game-dev basis.",
            learned: "C# scripts, objectgedrag en prototype-denken."
        }
    ],
    // ----------------------------------------------------------
    //  GAMES / TROPHIES  (hier pas je alles zelf aan)
    //  - title:    naam zoals die op de kaart staat
    //  - wiki:     titel van het Wikipedia-artikel, daar komt de cover vandaan
    //  - image:    (optioneel) eigen link naar een afbeelding, wint van wiki
    //  - trophies: aantal trophies dat je in DEZE game hebt
    // ----------------------------------------------------------
    games: [
        { title: "Bloodborne",              wiki: "Bloodborne",                     trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Elden Ring",              wiki: "Elden Ring",                     trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "ARK: Survival Evolved",   wiki: "Ark: Survival Evolved",          trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Minecraft",               wiki: "Minecraft",                      trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Minecraft Dungeons",      wiki: "Minecraft Dungeons",             trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Resident Evil 7",         wiki: "Resident Evil 7: Biohazard",     trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Far Cry 5",               wiki: "Far Cry 5",                      trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Little Nightmares II",    wiki: "Little Nightmares II",           trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Subnautica: Below Zero",  wiki: "Subnautica: Below Zero",         trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "The Forest",              wiki: "The Forest (video game)",        trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Thief Simulator",         wiki: "Thief Simulator",                trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } },
        { title: "Doki Doki Literature Club", wiki: "Doki Doki Literature Club!",   trophies: { platinum: 1, gold: 0, silver: 0, bronze: 0 } }
    ],
    skills: [
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", text: "Structuur voor webpagina's." },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", text: "Styling, responsive design en layouts." },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", text: "Interactie, logica en dynamische content." },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", text: "JavaScript op de server: API's en backend-tools." },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", text: "Server-side pagina's en formulieren." },
        { name: "Symfony", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg", invert: true, text: "PHP-framework: Doctrine, Twig en CRUD-apps." },
        { name: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", text: "Gegevens opslaan, ophalen en tonen." },
        { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", invert: true, text: "Game prototypes en scenes bouwen." },
        { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", text: "3D objecten en visuele assets maken." },
        { name: "AI", icon: AI_ICON, text: "AI-tools gebruiken om sneller te bouwen en te leren." }
    ]
};

function getProjectFilter() {
    const params = new URLSearchParams(window.location.search);
    return params.get("skill") || "all";
}

function renderProjectFilters() {
    const target = document.querySelector("[data-project-filters]");
    if (!target) return;

    const skills = ["all", ...new Set([...data.skills.map(skill => skill.name), ...data.projects.flatMap(project => project.tools)])];
    const current = getProjectFilter().toLowerCase();

    target.innerHTML = skills.map(skill => {
        const isAll = skill === "all";
        const active = current === skill.toLowerCase() || (isAll && current === "all");
        const href = isAll ? "projects.html" : `projects.html?skill=${encodeURIComponent(skill)}`;
        return `<a href="${href}" class="btn btn-sm btn-outline-light fw-bold btn-filter ${active ? "active" : ""}">${isAll ? "All" : skill}</a>`;
    }).join("");
}

function renderProjects() {
    const target = document.querySelector("[data-projects]");
    if (!target) return;

    const filter = getProjectFilter().toLowerCase();
    const projects = filter === "all"
        ? data.projects
        : data.projects.filter(project => project.tools.some(tool => tool.toLowerCase() === filter));

    if (projects.length === 0) {
        target.innerHTML = `
            <div class="col-12">
                <div class="border border-secondary rounded-4 p-5 text-center bg-dark bg-opacity-75 glass">
                    <p class="h5 fw-bold mb-2">Nog geen projecten bij ${escapeHtml(getProjectFilter())}.</p>
                    <p class="text-white-50 mb-4">Hier komt binnenkort werk bij.</p>
                    <a href="projects.html" class="btn btn-void fw-bold">Bekijk alle projecten</a>
                </div>
            </div>`;
        return;
    }

    target.innerHTML = projects.map(project => `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="card h-100 text-white bg-dark bg-opacity-75 border border-secondary rounded-4 shadow-lg overflow-hidden glass hover-lift">
                <img src="${project.image}" class="card-img-top card-img-fixed bg-dark" alt="${project.title}">
                <div class="card-body d-flex flex-column p-4">
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${project.tools.map(tool => `<span class="badge rounded-pill bg-void-soft">${tool}</span>`).join("")}
                    </div>
                    <h2 class="h5 card-title fw-bold">${project.title}</h2>
                    <p class="card-text text-white-50">${project.text}</p>
                    <div class="mt-auto pt-3 border-top border-secondary">
                        <p class="small mb-0"><strong class="text-void">Geleerd:</strong> ${project.learned}</p>
                    </div>
                </div>
            </article>
        </div>
    `).join("");
}

// ---------- Game trophies ----------
const TROPHY_TYPES = [
    { key: "platinum", label: "Platinum" },
    { key: "gold",     label: "Gold" },
    { key: "silver",   label: "Silver" },
    { key: "bronze",   label: "Bronze" }
];

const TROPHY_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' +
    '<path d="M6 3h12v4a6 6 0 0 1-12 0V3z"/>' +
    '<path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<rect x="11" y="13" width="2" height="5"/><rect x="7" y="18" width="10" height="3" rx="1"/></svg>';

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function trophyCount(game, key) {
    const n = Number(game.trophies && game.trophies[key]);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

function trophyBadges(game) {
    return TROPHY_TYPES.map(type => {
        const count = trophyCount(game, type.key);
        return `<li class="trophy trophy-${type.key} ${count === 0 ? "is-empty" : ""}" title="${type.label}: ${count}">
                    ${TROPHY_ICON}<span class="trophy-count">${count}</span>
                </li>`;
    }).join("");
}

function renderTrophyTotals() {
    const target = document.querySelector("[data-trophy-totals]");
    if (!target) return;

    const cells = TROPHY_TYPES.map(type => {
        const total = data.games.reduce((sum, game) => sum + trophyCount(game, type.key), 0);
        return `
            <div class="col-6 col-md-3">
                <div class="totals-box trophy-${type.key} border border-secondary rounded-4 p-3 text-center h-100">
                    ${TROPHY_ICON}
                    <div class="totals-number fw-bold">${total}</div>
                    <div class="small text-white-50 text-uppercase">${type.label}</div>
                </div>
            </div>`;
    }).join("");

    target.innerHTML = cells;
}

function renderGames() {
    const target = document.querySelector("[data-games]");
    if (!target) return;

    target.innerHTML = data.games.map((game, index) => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <article class="card h-100 text-white bg-dark bg-opacity-75 border border-secondary rounded-4 shadow-lg overflow-hidden glass hover-lift">
                <div class="poster-frame" data-poster="${index}">
                    <div class="poster-fallback"><span>${escapeHtml(game.title)}</span></div>
                </div>
                <div class="card-body p-4">
                    <h2 class="h6 card-title fw-bold mb-3">${escapeHtml(game.title)}</h2>
                    <ul class="trophy-row list-unstyled d-flex flex-wrap gap-2 mb-0">${trophyBadges(game)}</ul>
                </div>
            </article>
        </div>
    `).join("");

    data.games.forEach((game, index) => loadGameCover(game, document.querySelector(`[data-poster="${index}"]`)));
}

// Cover ophalen: eigen link (image) > Wikipedia-cover (wiki) > nette placeholder met de titel.
async function findCoverUrl(game) {
    if (game.image) return game.image;
    if (!game.wiki) return null;

    const cacheKey = "cover:" + game.wiki;
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return cached;
    } catch (e) { /* sessionStorage kan geblokkeerd zijn */ }

    const title = encodeURIComponent(game.wiki.replace(/ /g, "_"));
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if (!response.ok) return null;

    const info = await response.json();
    const url = info.thumbnail && info.thumbnail.source
        ? info.thumbnail.source.replace(/\/\d+px-/, "/640px-")
        : (info.originalimage && info.originalimage.source);

    if (url) {
        try { sessionStorage.setItem(cacheKey, url); } catch (e) { /* negeren */ }
    }
    return url || null;
}

async function loadGameCover(game, frame) {
    if (!frame) return;
    try {
        const url = await findCoverUrl(game);
        if (!url) return;

        const img = new Image();
        img.className = "card-img-top poster-img bg-dark";
        img.alt = `Cover van ${game.title}`;
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.onload = () => frame.replaceChildren(img);
        img.src = url;   // mislukt het laden, dan blijft de placeholder staan
    } catch (e) {
        /* geen internet of Wikipedia down: placeholder blijft staan */
    }
}

function renderSkills() {
    const target = document.querySelector("[data-skills]");
    if (!target) return;

    target.innerHTML = data.skills.map(skill => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <a href="projects.html?skill=${encodeURIComponent(skill.name)}" class="card h-100 text-white text-decoration-none bg-dark bg-opacity-75 border border-secondary rounded-4 shadow-lg glass hover-lift">
                <div class="card-body text-center p-4">
                    <img src="${skill.icon}" class="skill-icon mb-3 ${skill.invert ? "skill-icon-invert" : ""}" alt="${skill.name} logo">
                    <h2 class="h5 fw-bold mb-2">${skill.name}</h2>
                    <p class="small text-white-50 mb-0">${skill.text}</p>
                </div>
            </a>
        </div>
    `).join("");

    // Laadt een icoon niet (bv. geen internet)? Dan een nette letter-tegel.
    target.querySelectorAll(".skill-icon").forEach(img => {
        img.addEventListener("error", () => {
            const badge = document.createElement("div");
            badge.className = "skill-icon skill-icon-fallback mb-3 mx-auto";
            badge.textContent = img.alt.replace(" logo", "").slice(0, 2);
            img.replaceWith(badge);
        }, { once: true });
    });
}

// ---------- Contact ----------
function setCopyEmail() {
    const button = document.querySelector("[data-copy-email]");
    if (!button) return;

    button.addEventListener("click", async () => {
        const original = button.textContent;
        try {
            await navigator.clipboard.writeText(SITE.email);
            button.textContent = "Gekopieerd!";
        } catch (e) {
            window.prompt("Kopieer het e-mailadres:", SITE.email);
            return;
        }
        setTimeout(() => { button.textContent = original; }, 2000);
    });
}

function setContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const button = form.querySelector("[data-submit-btn]");
    const hint = form.querySelector("[data-form-hint]");
    const status = form.querySelector("[data-form-status]");
    const useEndpoint = Boolean(SITE.formEndpoint);

    if (!useEndpoint) {
        button.textContent = "Open mail";
        hint.textContent = "Opent je mailprogramma met je bericht al ingevuld.";
    }

    const showStatus = (type, html) => {
        status.innerHTML = `<div class="alert alert-${type} mb-0" role="alert">${html}</div>`;
    };

    form.addEventListener("submit", async event => {
        event.preventDefault();
        status.innerHTML = "";
        form.classList.add("was-validated");

        if (!form.checkValidity()) {
            form.querySelector(":invalid").focus();
            return;
        }
        if (form.elements._gotcha.value) return;   // spam-bots vullen dit verborgen veld in

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();

        if (!useEndpoint) {
            const subject = `Portfolio contact van ${name}`;
            const body = `${message}\n\n--\n${name}\n${email}`;
            window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            showStatus("info", "Je mailprogramma wordt geopend. Gebeurt er niets? Mail dan direct naar " +
                `<a class="alert-link" href="mailto:${SITE.email}">${SITE.email}</a>.`);
            return;
        }

        const originalLabel = button.textContent;
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
            form.classList.remove("was-validated");
            showStatus("success", "Bedankt! Je bericht is verstuurd, ik neem snel contact met je op.");
        } catch (e) {
            showStatus("danger", "Versturen is mislukt. Probeer het later opnieuw of mail direct naar " +
                `<a class="alert-link" href="mailto:${SITE.email}">${SITE.email}</a>.`);
        } finally {
            button.disabled = false;
            button.textContent = originalLabel;
        }
    });
}

renderProjectFilters();
renderProjects();
renderTrophyTotals();
renderGames();
renderSkills();
setContactForm();
setCopyEmail();
