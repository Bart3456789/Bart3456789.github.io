// VOID-look: navigatie, footer, spotlight-effect, typewriter en Doom-cover
const PAGES = [["skills.html", "Skills"], ["projects.html", "Work"], ["about.html", "Over mij"], ["contact.html", "Contact"]];
const page = document.body.dataset.page || "";
const currentFile = page === "index" ? "index.html" : page + ".html";
const activeFile = page === "gameTrophy" ? "about.html" : currentFile;

const nav = document.querySelector("[data-vd-nav]");
if (nav) {
    nav.className = "vd-nav";
    nav.innerHTML = `<a class="vd-brand" href="index.html">${SITE.brand}<i>._</i></a>
        <button class="vd-burger" aria-label="Menu">&#9776;</button>
        <nav class="vd-links">${PAGES.map(([h, t]) => `<a href="${h}" class="${h === activeFile ? "on" : ""}">${t}</a>`).join("")}</nav>`;
    nav.querySelector(".vd-burger").addEventListener("click", () => nav.classList.toggle("open"));
}

const foot = document.querySelector("[data-vd-foot]");
if (foot) {
    foot.className = "vd-foot";
    foot.innerHTML = `<span>&copy; ${new Date().getFullYear()} ${SITE.brand}</span>
        <span><a href="mailto:${SITE.email}">${SITE.email}</a> &middot; <a href="https://github.com/Bart3456789" target="_blank" rel="noopener">GitHub</a></span>`;
}

// paarse gloed volgt de muis; kaarten krijgen een eigen spotlight
document.addEventListener("pointermove", e => {
    document.documentElement.style.setProperty("--mx", e.clientX + "px");
    document.documentElement.style.setProperty("--my", e.clientY + "px");
    const card = e.target.closest && e.target.closest(".vd-card");
    if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", e.clientX - r.left + "px");
        card.style.setProperty("--y", e.clientY - r.top + "px");
    }
});

// homepage
document.querySelectorAll("[data-plat]").forEach(el => { el.textContent = data.games.reduce((n, g) => n + trophyCount(g, "platinum"), 0); });
document.querySelectorAll("[data-doom]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); openDoom(); }));

const words = document.querySelector("[data-words]");
if (words) {
    const list = ["websites", "games", "3D-werelden", "API's"];
    let w = 0, c = list[0].length, deleting = true;
    setInterval(() => {
        const word = list[w];
        c += deleting ? -1 : 1;
        words.textContent = word.slice(0, c);
        if (deleting && c === 0) { deleting = false; w = (w + 1) % list.length; }
        else if (!deleting && c === list[w].length) { deleting = true; c = list[w].length; }
    }, 110);
}

const doomCard = document.querySelector("[data-cover]");
if (doomCard) findCoverUrl({ wiki: doomCard.dataset.cover }).then(url => {
    if (!url) return;
    const img = new Image();
    img.onload = () => doomCard.style.setProperty("--bg", `url('${url}')`);
    img.src = url;
}).catch(() => {});
