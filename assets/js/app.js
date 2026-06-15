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
    anime: ["86.png", "devilmen crybaby.png", "goblin slayer.png", "terror in resonance.png", "the witch end the beast.png"],
    games: ["ARK Survival.png", "Bloodborne.png", "Doki Doki Literature Club .png", "Elden Ring.png", "Far Cry 5 .png", "Far Cry 5.png", "Little Nightmares 2.png", "Minecraft Dungeon.png", "Minecraft.png", "Resident evil 7.png", "Subnautica Zero.png", "The Forest.png", "Thief simulator.png"],
    skills: [
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", text: "Structuur voor webpagina's." },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", text: "Styling, responsive design en layouts." },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", text: "Interactie, logica en dynamische content." },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", text: "Server-side pagina's en formulieren." },
        { name: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", text: "Gegevens opslaan, ophalen en tonen." },
        { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", text: "Game prototypes en scenes bouwen." },
        { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", text: "3D objecten en visuele assets maken." }
    ]
};

function titleFromFile(fileName) {
    return fileName.replace(/\.png$/i, "").replace(/\s+/g, " ").trim();
}

function getProjectFilter() {
    const params = new URLSearchParams(window.location.search);
    return params.get("skill") || "all";
}

function renderProjectFilters() {
    const target = document.querySelector("[data-project-filters]");
    if (!target) return;

    const skills = ["all", ...new Set(data.projects.flatMap(project => project.tools))];
    const current = getProjectFilter().toLowerCase();

    target.innerHTML = skills.map(skill => {
        const isAll = skill === "all";
        const active = current === skill.toLowerCase() || (isAll && current === "all");
        const href = isAll ? "projects.html" : `projects.html?skill=${encodeURIComponent(skill)}`;
        return `<a href="${href}" class="btn btn-sm btn-outline-site btn-filter ${active ? "active" : ""}">${isAll ? "All" : skill}</a>`;
    }).join("");
}

function renderProjects() {
    const target = document.querySelector("[data-projects]");
    if (!target) return;

    const filter = getProjectFilter().toLowerCase();
    const projects = filter === "all"
        ? data.projects
        : data.projects.filter(project => project.tools.some(tool => tool.toLowerCase() === filter));

    target.innerHTML = projects.map(project => `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="card theme-card project-card h-100 text-white">
                <img src="${project.image}" class="card-img-top card-img-fixed" alt="${project.title}">
                <div class="card-body d-flex flex-column p-4">
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${project.tools.map(tool => `<span class="badge badge-soft">${tool}</span>`).join("")}
                    </div>
                    <h2 class="h5 card-title fw-bold">${project.title}</h2>
                    <p class="card-text text-site-muted">${project.text}</p>
                    <div class="mt-auto pt-3 border-top border-secondary-subtle">
                        <p class="small mb-0"><strong class="text-site-void">Geleerd:</strong> ${project.learned}</p>
                    </div>
                </div>
            </article>
        </div>
    `).join("");
}

function renderImageGallery(selector, folder, files, badgeText) {
    const target = document.querySelector(selector);
    if (!target) return;

    target.innerHTML = files.map(file => {
        const title = titleFromFile(file);
        return `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <article class="card theme-card gallery-card h-100 text-white">
                    <img src="assets/img/${folder}/${file}" class="card-img-top poster-img" alt="${title}">
                    <div class="card-body p-4">
                        <span class="badge badge-soft mb-2">${badgeText}</span>
                        <h2 class="h6 card-title fw-bold mb-0">${title}</h2>
                    </div>
                </article>
            </div>
        `;
    }).join("");
}

function renderSkills() {
    const target = document.querySelector("[data-skills]");
    if (!target) return;

    target.innerHTML = data.skills.map(skill => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <a href="projects.html?skill=${encodeURIComponent(skill.name)}" class="card theme-card skill-card h-100 text-decoration-none text-white">
                <div class="card-body text-center p-4">
                    <img src="${skill.icon}" class="skill-icon mb-3" alt="${skill.name} logo">
                    <h2 class="h5 fw-bold mb-2">${skill.name}</h2>
                    <p class="small text-site-muted mb-0">${skill.text}</p>
                </div>
            </a>
        </div>
    `).join("");
}

function setContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();
        const name = encodeURIComponent(form.elements.name.value.trim());
        const message = encodeURIComponent(form.elements.message.value.trim());
        const subject = name ? `Portfolio contact van ${name}` : "Portfolio contact";
        window.location.href = `mailto:bart@example.com?subject=${subject}&body=${message}`;
    });
}

renderProjectFilters();
renderProjects();
renderImageGallery("[data-anime]", "anime", data.anime, "Anime");
renderImageGallery("[data-games]", "games", data.games, "Trophy");
renderSkills();
setContactForm();

