const data = {
    projects: [
        {
            title: "Quiz pagina",
            image: "assets/img/project%60s/project1.png",
            tools: "HTML, CSS, JavaScript",
            text: "Een werkende quizpagina met vragen, interactie en score. Ik leerde hoe JavaScript logica en DOM-updates samen een interactieve pagina maken."
        },
        {
            title: "Slotmachine game",
            image: "assets/img/project%60s/project2.png",
            tools: "HTML, CSS, JavaScript",
            text: "Een kleine browsergame met draaiende symbolen en wincontrole. Ik leerde beter werken met timing, functies en spelregels in code."
        },
        {
            title: "Login website",
            image: "assets/img/project%60s/project3.png",
            tools: "PHP, database, HTML, Bootstrap",
            text: "Een website met inloggen en databasekoppeling. Ik leerde hoe formulieren, servercode en opgeslagen gegevens samenwerken."
        },
        {
            title: "Collectie pagina",
            image: "assets/img/project%60s/project4.png",
            tools: "PHP, database, HTML, Bootstrap",
            text: "Een collectiepagina waar items uit een database worden getoond. Ik leerde data ophalen, tonen en structureren in kaarten."
        },
        {
            title: "Unity prototype",
            image: "assets/img/project%60s/project5.png",
            tools: "Unity, C#",
            text: "Een simpel gameprototype gemaakt in Unity. Ik leerde werken met C# scripts, objecten, beweging en basis game development."
        }
    ],
    anime: [
        "86.png",
        "devilmen crybaby.png",
        "goblin slayer.png",
        "terror in resonance.png",
        "the witch end the beast.png"
    ],
    games: [
        "ARK Survival.png",
        "Bloodborne.png",
        "Doki Doki Literature Club .png",
        "Elden Ring.png",
        "Far Cry 5 .png",
        "Far Cry 5.png",
        "Little Nightmares 2.png",
        "Minecraft Dungeon.png",
        "Minecraft.png",
        "Resident evil 7.png",
        "Subnautica Zero.png",
        "The Forest.png",
        "Thief simulator.png"
    ],
    skills: [
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
        { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" }
    ]
};

function titleFromFile(fileName) {
    return fileName.replace(/\.png$/i, "").replace(/\s+/g, " ").trim();
}

function renderProjects() {
    const target = document.querySelector("[data-projects]");
    if (!target) return;

    target.innerHTML = data.projects.map(project => `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="card theme-card h-100">
                <img src="${project.image}" class="card-img-top card-img-fixed" alt="${project.title}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-site-accent text-site-dark align-self-start mb-3">${project.tools}</span>
                    <h2 class="h5 card-title">${project.title}</h2>
                    <p class="card-text mb-0">${project.text}</p>
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
                <article class="card theme-card h-100">
                    <img src="assets/img/${folder}/${file}" class="card-img-top poster-img" alt="${title}">
                    <div class="card-body">
                        <span class="badge bg-site-accent text-site-dark mb-2">${badgeText}</span>
                        <h2 class="h6 card-title mb-0">${title}</h2>
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
        <div class="col-6 col-md-4 col-xl-3">
            <a href="projects.html" class="card theme-card skill-card h-100 text-decoration-none text-site-dark">
                <div class="card-body text-center p-4">
                    <img src="${skill.icon}" class="skill-icon mb-3" alt="${skill.name} logo">
                    <h2 class="h5 mb-0">${skill.name}</h2>
                </div>
            </a>
        </div>
    `).join("");
}

function rotateAboutPhoto() {
    const image = document.querySelector("[data-about-photo]");
    if (!image) return;

    const photos = ["assets/img/me/1.png", "assets/img/me/2.png"];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % photos.length;
        image.src = photos[index];
    }, 3500);
}

renderProjects();
renderImageGallery("[data-anime]", "anime", data.anime, "Anime");
renderImageGallery("[data-games]", "games", data.games, "Trophy");
renderSkills();
rotateAboutPhoto();

