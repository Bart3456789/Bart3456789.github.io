// =====================================================================
//  VERTALINGEN / TRANSLATIONS
//  Standaardtaal = Engels. Elke tekst op de site staat hier in 4 talen.
//  In de HTML koppel je een element met data-i18n="sleutel".
//  Projecten en skills vertaal je in data/*.json met {"en": "...", "nl": "...", "pl": "...", "ru": "..."}.
// =====================================================================
const LANGS = [
    ["en", "EN", "English"],
    ["nl", "NL", "Nederlands"],
    ["pl", "PL", "Polski"],
    ["ru", "RU", "Русский"]
];
const DEFAULT_LANG = "en";

const STRINGS = {
    // ---------------------------------------------------------------- ENGLISH
    en: {
        "lang.label": "Language",
        "nav.index": "Home", "nav.skills": "Skills", "nav.projects": "Projects", "nav.about": "About me", "nav.contact": "Contact",
        "nav.menu": "MENU", "nav.close": "CLOSE", "nav.aria": "Main menu",

        "title.index": "Home", "title.skills": "Skills", "title.projects": "Projects", "title.about": "About me", "title.contact": "Contact",
        "desc.index": "Portfolio of Bartosz Jaworski, web developer in training.",
        "desc.skills": "The technologies and tools Bartosz Jaworski works with.",
        "desc.projects": "Projects by Bartosz Jaworski: websites, web apps and games.",
        "desc.about": "About Bartosz Jaworski: background, languages, hobbies and focus.",
        "desc.contact": "Get in touch with Bartosz Jaworski.",

        "hero.tag": "NETRUNNER_ID: BJ-2077 // WEB DEVELOPER IN TRAINING",
        "hero.lead": 'I build <b data-words>websites</b><i class="caret" aria-hidden="true"></i><br>and everything in between.',
        "hero.words": ["websites", "games", "web apps", "3D worlds"],
        "hero.cta": "View projects &rarr;", "hero.contact": "Contact",
        "stat.projects": "Projects", "stat.tech": "Technologies", "stat.langs": "Languages", "stat.motivation": "Motivation",
        "hud.alt": "Portrait of Bartosz Jaworski",
        "hud.readout": "NAME&nbsp;&nbsp;&nbsp;: <b>B. JAWORSKI</b><br>CLASS&nbsp;&nbsp;: <b>WEB DEV</b><br>FOCUS&nbsp;&nbsp;: <b>WEB / UNITY / 3D</b><br>STATUS : <b>OPEN TO INTERNSHIPS</b>",
        "feat.eyebrow": "<b>01</b> Featured work",
        "feat.title": "Recent <em>projects</em>",
        "feat.lead": "A selection of what I have built. Click a project for screenshots, features and what I learned from it.",
        "feat.total": "<b data-all-count>&ndash;</b> projects in total",
        "feat.all": "All projects &rarr;",
        "doom.eyebrow": "<b>&gt;_</b> Easter egg",
        "doom.title": "Need a break?",
        "doom.text": "Play a round of DOOM, right here in your browser.",
        "doom.btn": "&#9654; Play DOOM",
        "doom.tip": "Click inside the game to activate the controls. ESC closes this window.",

        "skills.eyebrow": "<b>02</b> Skills",
        "skills.title": "My <em>toolkit</em>",
        "skills.lead": "The technologies I build with. Click a skill to see the projects I used it in.",
        "skills.usedIn": "Used in: {list}.",
        "skills.view": "View &rarr;",

        "projects.eyebrow": "<b>03</b> Projects",
        "projects.title": "My <em>work</em>",
        "projects.lead": "Click a project to see what it is about, what it was built with and what I learned from it.",
        "projects.filterAria": "Filter by technology",
        "projects.all": "All",
        "projects.emptyTitle": "No projects with {tool} yet",
        "projects.emptyText": "More work is coming soon.",
        "diff.label": "Difficulty", "diff.tech": "Technology", "diff.easy": "Easy", "diff.medium": "Medium", "diff.hard": "Hard", "diff.extreme": "Extreme",
        "projects.emptyFilter": "No projects match these filters",
        "projects.showAll": "Show all",

        "card.screenshot": "Screenshot of {title}",
        "card.details": "View details",
        "card.live": "&#9654; Live demo",
        "card.code": "&lt;/&gt; GitHub",

        "modal.close": "Close", "modal.prev": "&larr; Previous", "modal.next": "Next &rarr;",
        "modal.image": "Image {n}", "modal.built": "Built with", "modal.about": "About the project",
        "modal.noDesc": "No description yet.", "modal.features": "Features", "modal.learned": "What I learned",
        "modal.challenge": "Problem I solved",

        "about.eyebrow": "<b>04</b> About me",
        "about.title": "Hi, I'm <em>Bartosz</em>",
        "about.lead": "Developer in training who loves building websites, games and interactive projects. I learn the most by simply making things: trying an idea, getting stuck, solving it and improving it.",
        "about.alt1": "Photo of Bartosz", "about.alt2": "Another photo of Bartosz",
        "about.name": "Name", "about.langs": "Languages", "about.langsVal": "Dutch, English &amp; Polish",
        "about.hobbies": "Hobbies", "about.hobbiesVal": "Gaming, Gym", "about.focus": "Focus",
        "about.path": "My path",
        "about.t1": "Front-end basics", "about.t1d": "HTML, CSS and JavaScript: quizzes, games and interactive pages.",
        "about.t2": "Full-stack", "about.t2d": "PHP, databases and Bootstrap: logins, accounts and dynamic data.",
        "about.t3": "Game dev &amp; 3D", "about.t3d": "Prototypes in Unity with C# and models in Blender.",
        "about.cv": "&darr; Download CV", "about.contact": "Get in touch",
        "about.photo": "Photo {n}",

        "contact.eyebrow": "<b>05</b> Contact",
        "contact.title": "Let's <em>build</em>",
        "contact.lead": "Questions, a project or an internship? Send me a message and I will reply as soon as possible.",
        "contact.direct": "Direct", "contact.channels": "Channels", "contact.email": "E-mail",
        "contact.copy": "Copy", "contact.copied": "Copied ✓", "contact.copyPrompt": "Copy the e-mail address:",
        "form.name": "Name", "form.namePh": "Your name", "form.nameErr": "Please enter your name.",
        "form.email": "E-mail", "form.emailPh": "you@example.com", "form.emailErr": "Please enter a valid e-mail address.",
        "form.msg": "Message", "form.msgPh": "What would you like to get in touch about?", "form.msgErr": "Write a message of at least 10 characters.",
        "form.send": "Send message", "form.openMail": "Open mail ▸",
        "form.hint": "Opens your mail app with your message already filled in.",
        "form.subject": "Portfolio contact from {name}",
        "form.opening": "Your mail app is opening. Nothing happening? Then mail me directly at {mail}.",
        "form.sending": "Sending...",
        "form.ok": "Message sent. I will get back to you soon.",
        "form.bad": "Sending failed. Please try again later or mail me directly at {mail}.",

        "err.load": "&#9888; ERROR // Could not load <code>{file}</code>.",
        "err.local": "You are opening the site as a local file (file://). Browsers then block loading JSON. Start a local server, for example with the VS Code extension <code>Live Server</code>, or view the site on GitHub Pages.",
        "err.json": "Check that the file exists and contains valid JSON (watch the commas and quotes)."
    },

    // ---------------------------------------------------------------- NEDERLANDS
    nl: {
        "lang.label": "Taal",
        "nav.index": "Home", "nav.skills": "Skills", "nav.projects": "Projecten", "nav.about": "Over mij", "nav.contact": "Contact",
        "nav.menu": "MENU", "nav.close": "SLUIT", "nav.aria": "Hoofdmenu",

        "title.index": "Home", "title.skills": "Skills", "title.projects": "Projecten", "title.about": "Over mij", "title.contact": "Contact",
        "desc.index": "Portfolio van Bartosz Jaworski, web developer in opleiding.",
        "desc.skills": "De technieken en tools waar Bartosz Jaworski mee werkt.",
        "desc.projects": "Projecten van Bartosz Jaworski: websites, web-apps en games.",
        "desc.about": "Over Bartosz Jaworski: achtergrond, talen, hobby's en focus.",
        "desc.contact": "Neem contact op met Bartosz Jaworski.",

        "hero.tag": "NETRUNNER_ID: BJ-2077 // WEB DEVELOPER IN OPLEIDING",
        "hero.lead": 'Ik bouw <b data-words>websites</b><i class="caret" aria-hidden="true"></i><br>en alles daartussen.',
        "hero.words": ["websites", "games", "web-apps", "3D-werelden"],
        "hero.cta": "Bekijk projecten &rarr;", "hero.contact": "Contact",
        "stat.projects": "Projecten", "stat.tech": "Technieken", "stat.langs": "Talen", "stat.motivation": "Motivatie",
        "hud.alt": "Portret van Bartosz Jaworski",
        "hud.readout": "NAAM&nbsp;&nbsp;&nbsp;: <b>B. JAWORSKI</b><br>CLASS&nbsp;&nbsp;: <b>WEB DEV</b><br>FOCUS&nbsp;&nbsp;: <b>WEB / UNITY / 3D</b><br>STATUS : <b>OPEN VOOR STAGE</b>",
        "feat.eyebrow": "<b>01</b> Uitgelicht werk",
        "feat.title": "Recente <em>projecten</em>",
        "feat.lead": "Een selectie van wat ik gebouwd heb. Klik op een project voor screenshots, features en wat ik ervan leerde.",
        "feat.total": "<b data-all-count>&ndash;</b> projecten in totaal",
        "feat.all": "Alle projecten &rarr;",
        "doom.eyebrow": "<b>&gt;_</b> Easter egg",
        "doom.title": "Even pauze nodig?",
        "doom.text": "Speel een potje DOOM, gewoon hier in de browser.",
        "doom.btn": "&#9654; Speel DOOM",
        "doom.tip": "Klik in het spel om de controls te activeren. ESC sluit dit venster.",

        "skills.eyebrow": "<b>02</b> Skills",
        "skills.title": "Mijn <em>toolkit</em>",
        "skills.lead": "De technieken waar ik mee bouw. Klik op een skill om direct de projecten te zien waarin ik hem gebruikt heb.",
        "skills.usedIn": "Gebruikt in: {list}.",
        "skills.view": "Bekijk &rarr;",

        "projects.eyebrow": "<b>03</b> Projecten",
        "projects.title": "Mijn <em>werk</em>",
        "projects.lead": "Klik op een project om te zien waar het over gaat, waarmee het gebouwd is en wat ik ervan geleerd heb.",
        "projects.filterAria": "Filter op techniek",
        "projects.all": "Alles",
        "projects.emptyTitle": "Nog geen projecten met {tool}",
        "projects.emptyText": "Hier komt binnenkort werk bij.",
        "diff.label": "Moeilijkheid", "diff.tech": "Techniek", "diff.easy": "Makkelijk", "diff.medium": "Gemiddeld", "diff.hard": "Moeilijk", "diff.extreme": "Extreem",
        "projects.emptyFilter": "Geen projecten met deze filters",
        "projects.showAll": "Toon alles",

        "card.screenshot": "Screenshot van {title}",
        "card.details": "Bekijk details",
        "card.live": "&#9654; Live demo",
        "card.code": "&lt;/&gt; GitHub",

        "modal.close": "Sluiten", "modal.prev": "&larr; Vorige", "modal.next": "Volgende &rarr;",
        "modal.image": "Afbeelding {n}", "modal.built": "Gebouwd met", "modal.about": "Over het project",
        "modal.noDesc": "Nog geen beschrijving.", "modal.features": "Features", "modal.learned": "Wat ik leerde",
        "modal.challenge": "Probleem dat ik oploste",

        "about.eyebrow": "<b>04</b> Over mij",
        "about.title": "Hoi, ik ben <em>Bartosz</em>",
        "about.lead": "Developer in opleiding die graag websites, games en interactieve projecten bouwt. Ik leer het meest door gewoon te maken: een idee uitproberen, vastlopen, oplossen en verbeteren.",
        "about.alt1": "Foto van Bartosz", "about.alt2": "Nog een foto van Bartosz",
        "about.name": "Naam", "about.langs": "Talen", "about.langsVal": "Nederlands, Engels &amp; Pools",
        "about.hobbies": "Hobby's", "about.hobbiesVal": "Gaming, Gym", "about.focus": "Focus",
        "about.path": "Mijn pad",
        "about.t1": "Front-end basis", "about.t1d": "HTML, CSS en JavaScript: quizzen, games en interactieve pagina's.",
        "about.t2": "Full-stack", "about.t2d": "PHP, databases en Bootstrap: logins, accounts en dynamische data.",
        "about.t3": "Game dev &amp; 3D", "about.t3d": "Prototypes in Unity met C# en modellen in Blender.",
        "about.cv": "&darr; Download CV", "about.contact": "Neem contact op",
        "about.photo": "Foto {n}",

        "contact.eyebrow": "<b>05</b> Contact",
        "contact.title": "Let's <em>build</em>",
        "contact.lead": "Vragen, een project of een stageplek? Stuur een bericht, ik reageer zo snel mogelijk.",
        "contact.direct": "Direct", "contact.channels": "Kanalen", "contact.email": "E-mail",
        "contact.copy": "Kopieer", "contact.copied": "Gekopieerd ✓", "contact.copyPrompt": "Kopieer het e-mailadres:",
        "form.name": "Naam", "form.namePh": "Jouw naam", "form.nameErr": "Vul je naam in.",
        "form.email": "E-mail", "form.emailPh": "jij@example.com", "form.emailErr": "Vul een geldig e-mailadres in.",
        "form.msg": "Bericht", "form.msgPh": "Waar wil je contact over opnemen?", "form.msgErr": "Schrijf een bericht van minimaal 10 tekens.",
        "form.send": "Verstuur bericht", "form.openMail": "Open mail ▸",
        "form.hint": "Opent je mailprogramma met je bericht al ingevuld.",
        "form.subject": "Portfolio contact van {name}",
        "form.opening": "Je mailprogramma wordt geopend. Gebeurt er niets? Mail dan direct naar {mail}.",
        "form.sending": "Versturen...",
        "form.ok": "Bericht verstuurd. Ik neem snel contact met je op.",
        "form.bad": "Versturen is mislukt. Probeer het later opnieuw of mail direct naar {mail}.",

        "err.load": "&#9888; ERROR // Kon <code>{file}</code> niet laden.",
        "err.local": "Je opent de site als los bestand (file://). Browsers blokkeren dan het laden van JSON. Start een lokale server, bijvoorbeeld met de VS Code-extensie <code>Live Server</code>, of bekijk de site op GitHub Pages.",
        "err.json": "Controleer of het bestand bestaat en geldige JSON bevat (let op komma's en aanhalingstekens)."
    },

    // ---------------------------------------------------------------- POLSKI
    pl: {
        "lang.label": "Język",
        "nav.index": "Start", "nav.skills": "Umiejętności", "nav.projects": "Projekty", "nav.about": "O mnie", "nav.contact": "Kontakt",
        "nav.menu": "MENU", "nav.close": "ZAMKNIJ", "nav.aria": "Menu główne",

        "title.index": "Start", "title.skills": "Umiejętności", "title.projects": "Projekty", "title.about": "O mnie", "title.contact": "Kontakt",
        "desc.index": "Portfolio Bartosza Jaworskiego, web developera w trakcie nauki.",
        "desc.skills": "Technologie i narzędzia, z którymi pracuje Bartosz Jaworski.",
        "desc.projects": "Projekty Bartosza Jaworskiego: strony internetowe, aplikacje webowe i gry.",
        "desc.about": "O Bartoszu Jaworskim: doświadczenie, języki, hobby i zainteresowania.",
        "desc.contact": "Skontaktuj się z Bartoszem Jaworskim.",

        "hero.tag": "NETRUNNER_ID: BJ-2077 // WEB DEVELOPER W TRAKCIE NAUKI",
        "hero.lead": 'Tworzę <b data-words>strony</b><i class="caret" aria-hidden="true"></i><br>i wszystko pomiędzy.',
        "hero.words": ["strony", "gry", "aplikacje", "światy 3D"],
        "hero.cta": "Zobacz projekty &rarr;", "hero.contact": "Kontakt",
        "stat.projects": "Projekty", "stat.tech": "Technologie", "stat.langs": "Języki", "stat.motivation": "Motywacja",
        "hud.alt": "Portret Bartosza Jaworskiego",
        "hud.readout": "IMIĘ&nbsp;&nbsp;&nbsp;: <b>B. JAWORSKI</b><br>KLASA&nbsp;&nbsp;: <b>WEB DEV</b><br>FOKUS&nbsp;&nbsp;: <b>WEB / UNITY / 3D</b><br>STATUS : <b>SZUKAM STAŻU</b>",
        "feat.eyebrow": "<b>01</b> Wyróżnione prace",
        "feat.title": "Ostatnie <em>projekty</em>",
        "feat.lead": "Wybór tego, co zbudowałem. Kliknij projekt, aby zobaczyć zrzuty ekranu, funkcje i czego się nauczyłem.",
        "feat.total": "Łącznie projektów: <b data-all-count>&ndash;</b>",
        "feat.all": "Wszystkie projekty &rarr;",
        "doom.eyebrow": "<b>&gt;_</b> Easter egg",
        "doom.title": "Potrzebujesz przerwy?",
        "doom.text": "Zagraj w DOOM, tutaj w przeglądarce.",
        "doom.btn": "&#9654; Graj w DOOM",
        "doom.tip": "Kliknij w grę, aby aktywować sterowanie. ESC zamyka to okno.",

        "skills.eyebrow": "<b>02</b> Umiejętności",
        "skills.title": "Mój <em>toolkit</em>",
        "skills.lead": "Technologie, z których korzystam. Kliknij umiejętność, aby zobaczyć projekty, w których jej użyłem.",
        "skills.usedIn": "Użyte w: {list}.",
        "skills.view": "Zobacz &rarr;",

        "projects.eyebrow": "<b>03</b> Projekty",
        "projects.title": "Moje <em>prace</em>",
        "projects.lead": "Kliknij projekt, aby zobaczyć, o czym jest, czego użyłem do jego budowy i czego się nauczyłem.",
        "projects.filterAria": "Filtruj według technologii",
        "projects.all": "Wszystkie",
        "projects.emptyTitle": "Brak projektów z {tool}",
        "projects.emptyText": "Wkrótce pojawi się tu więcej prac.",
        "diff.label": "Poziom trudności", "diff.tech": "Technologia", "diff.easy": "Łatwy", "diff.medium": "Średni", "diff.hard": "Trudny", "diff.extreme": "Ekstremalny",
        "projects.emptyFilter": "Brak projektów dla tych filtrów",
        "projects.showAll": "Pokaż wszystkie",

        "card.screenshot": "Zrzut ekranu: {title}",
        "card.details": "Zobacz szczegóły",
        "card.live": "&#9654; Demo na żywo",
        "card.code": "&lt;/&gt; GitHub",

        "modal.close": "Zamknij", "modal.prev": "&larr; Poprzedni", "modal.next": "Następny &rarr;",
        "modal.image": "Obraz {n}", "modal.built": "Zbudowane z", "modal.about": "O projekcie",
        "modal.noDesc": "Brak opisu.", "modal.features": "Funkcje", "modal.learned": "Czego się nauczyłem",
        "modal.challenge": "Problem, który rozwiązałem",

        "about.eyebrow": "<b>04</b> O mnie",
        "about.title": "Cześć, jestem <em>Bartosz</em>",
        "about.lead": "Developer w trakcie nauki, który uwielbia tworzyć strony, gry i interaktywne projekty. Najwięcej uczę się przez działanie: testuję pomysł, utykam, rozwiązuję problem i ulepszam.",
        "about.alt1": "Zdjęcie Bartosza", "about.alt2": "Kolejne zdjęcie Bartosza",
        "about.name": "Imię", "about.langs": "Języki", "about.langsVal": "niderlandzki, angielski i polski",
        "about.hobbies": "Hobby", "about.hobbiesVal": "Gry, siłownia", "about.focus": "Fokus",
        "about.path": "Moja droga",
        "about.t1": "Podstawy front-endu", "about.t1d": "HTML, CSS i JavaScript: quizy, gry i interaktywne strony.",
        "about.t2": "Full-stack", "about.t2d": "PHP, bazy danych i Bootstrap: logowanie, konta i dynamiczne dane.",
        "about.t3": "Game dev i 3D", "about.t3d": "Prototypy w Unity z C# i modele w Blenderze.",
        "about.cv": "&darr; Pobierz CV", "about.contact": "Skontaktuj się",
        "about.photo": "Zdjęcie {n}",

        "contact.eyebrow": "<b>05</b> Kontakt",
        "contact.title": "Let's <em>build</em>",
        "contact.lead": "Pytania, projekt albo staż? Napisz wiadomość, odpowiem najszybciej, jak to możliwe.",
        "contact.direct": "Bezpośrednio", "contact.channels": "Kanały", "contact.email": "E-mail",
        "contact.copy": "Kopiuj", "contact.copied": "Skopiowano ✓", "contact.copyPrompt": "Skopiuj adres e-mail:",
        "form.name": "Imię", "form.namePh": "Twoje imię", "form.nameErr": "Wpisz swoje imię.",
        "form.email": "E-mail", "form.emailPh": "ty@example.com", "form.emailErr": "Wpisz poprawny adres e-mail.",
        "form.msg": "Wiadomość", "form.msgPh": "W jakiej sprawie piszesz?", "form.msgErr": "Napisz wiadomość, która ma co najmniej 10 znaków.",
        "form.send": "Wyślij wiadomość", "form.openMail": "Otwórz pocztę ▸",
        "form.hint": "Otwiera Twój program pocztowy z gotową wiadomością.",
        "form.subject": "Kontakt z portfolio od {name}",
        "form.opening": "Otwieram Twój program pocztowy. Nic się nie dzieje? Napisz bezpośrednio na {mail}.",
        "form.sending": "Wysyłanie...",
        "form.ok": "Wiadomość wysłana. Wkrótce się odezwę.",
        "form.bad": "Nie udało się wysłać. Spróbuj ponownie później lub napisz bezpośrednio na {mail}.",

        "err.load": "&#9888; ERROR // Nie udało się wczytać <code>{file}</code>.",
        "err.local": "Otwierasz stronę jako lokalny plik (file://). Przeglądarki blokują wtedy wczytywanie JSON. Uruchom lokalny serwer, np. rozszerzeniem VS Code <code>Live Server</code>, albo obejrzyj stronę na GitHub Pages.",
        "err.json": "Sprawdź, czy plik istnieje i zawiera poprawny JSON (uważaj na przecinki i cudzysłowy)."
    },

    // ---------------------------------------------------------------- РУССКИЙ
    ru: {
        "lang.label": "Язык",
        "nav.index": "Главная", "nav.skills": "Навыки", "nav.projects": "Проекты", "nav.about": "Обо мне", "nav.contact": "Контакты",
        "nav.menu": "МЕНЮ", "nav.close": "ЗАКРЫТЬ", "nav.aria": "Главное меню",

        "title.index": "Главная", "title.skills": "Навыки", "title.projects": "Проекты", "title.about": "Обо мне", "title.contact": "Контакты",
        "desc.index": "Портфолио Бартоша Яворского, начинающего веб-разработчика.",
        "desc.skills": "Технологии и инструменты, с которыми работает Бартош Яворский.",
        "desc.projects": "Проекты Бартоша Яворского: сайты, веб-приложения и игры.",
        "desc.about": "О Бартоше Яворском: опыт, языки, хобби и направления.",
        "desc.contact": "Связаться с Бартошем Яворским.",

        "hero.tag": "NETRUNNER_ID: BJ-2077 // ВЕБ-РАЗРАБОТЧИК (УЧУСЬ)",
        "hero.lead": 'Я создаю <b data-words>сайты</b><i class="caret" aria-hidden="true"></i><br>и всё, что между ними.',
        "hero.words": ["сайты", "игры", "веб-приложения", "3D-миры"],
        "hero.cta": "Смотреть проекты &rarr;", "hero.contact": "Контакты",
        "stat.projects": "Проекты", "stat.tech": "Технологии", "stat.langs": "Языки", "stat.motivation": "Мотивация",
        "hud.alt": "Портрет Бартоша Яворского",
        "hud.readout": "ИМЯ&nbsp;&nbsp;&nbsp;&nbsp;: <b>B. JAWORSKI</b><br>КЛАСС&nbsp;&nbsp;: <b>WEB DEV</b><br>ФОКУС&nbsp;&nbsp;: <b>WEB / UNITY / 3D</b><br>СТАТУС : <b>ИЩУ СТАЖИРОВКУ</b>",
        "feat.eyebrow": "<b>01</b> Избранные работы",
        "feat.title": "Последние <em>проекты</em>",
        "feat.lead": "Подборка того, что я сделал. Нажмите на проект, чтобы увидеть скриншоты, функции и то, чему я научился.",
        "feat.total": "Всего проектов: <b data-all-count>&ndash;</b>",
        "feat.all": "Все проекты &rarr;",
        "doom.eyebrow": "<b>&gt;_</b> Пасхалка",
        "doom.title": "Нужен перерыв?",
        "doom.text": "Сыграйте в DOOM прямо здесь, в браузере.",
        "doom.btn": "&#9654; Играть в DOOM",
        "doom.tip": "Нажмите на игру, чтобы включить управление. ESC закрывает это окно.",

        "skills.eyebrow": "<b>02</b> Навыки",
        "skills.title": "Мой <em>инструментарий</em>",
        "skills.lead": "Технологии, с которыми я работаю. Нажмите на навык, чтобы увидеть проекты, где я его использовал.",
        "skills.usedIn": "Используется в: {list}.",
        "skills.view": "Смотреть &rarr;",

        "projects.eyebrow": "<b>03</b> Проекты",
        "projects.title": "Мои <em>работы</em>",
        "projects.lead": "Нажмите на проект, чтобы узнать, о чём он, с помощью чего он сделан и чему я на нём научился.",
        "projects.filterAria": "Фильтр по технологии",
        "projects.all": "Все",
        "projects.emptyTitle": "Пока нет проектов с {tool}",
        "projects.emptyText": "Скоро здесь появятся новые работы.",
        "diff.label": "Сложность", "diff.tech": "Технология", "diff.easy": "Лёгкий", "diff.medium": "Средний", "diff.hard": "Сложный", "diff.extreme": "Экстрим",
        "projects.emptyFilter": "Нет проектов с такими фильтрами",
        "projects.showAll": "Показать все",

        "card.screenshot": "Скриншот: {title}",
        "card.details": "Подробнее",
        "card.live": "&#9654; Демо",
        "card.code": "&lt;/&gt; GitHub",

        "modal.close": "Закрыть", "modal.prev": "&larr; Назад", "modal.next": "Далее &rarr;",
        "modal.image": "Изображение {n}", "modal.built": "Технологии", "modal.about": "О проекте",
        "modal.noDesc": "Описания пока нет.", "modal.features": "Функции", "modal.learned": "Чему я научился",
        "modal.challenge": "Какую задачу я решил",

        "about.eyebrow": "<b>04</b> Обо мне",
        "about.title": "Привет, я <em>Бартош</em>",
        "about.lead": "Начинающий разработчик, который любит создавать сайты, игры и интерактивные проекты. Больше всего я учусь на практике: пробую идею, застреваю, нахожу решение и улучшаю результат.",
        "about.alt1": "Фото Бартоша", "about.alt2": "Ещё одно фото Бартоша",
        "about.name": "Имя", "about.langs": "Языки", "about.langsVal": "нидерландский, английский и польский",
        "about.hobbies": "Хобби", "about.hobbiesVal": "Игры, спортзал", "about.focus": "Фокус",
        "about.path": "Мой путь",
        "about.t1": "Основы фронтенда", "about.t1d": "HTML, CSS и JavaScript: викторины, игры и интерактивные страницы.",
        "about.t2": "Full-stack", "about.t2d": "PHP, базы данных и Bootstrap: вход, аккаунты и динамические данные.",
        "about.t3": "Геймдев и 3D", "about.t3d": "Прототипы в Unity на C# и модели в Blender.",
        "about.cv": "&darr; Скачать резюме", "about.contact": "Связаться",
        "about.photo": "Фото {n}",

        "contact.eyebrow": "<b>05</b> Контакты",
        "contact.title": "Let's <em>build</em>",
        "contact.lead": "Вопросы, проект или стажировка? Напишите мне, и я отвечу как можно скорее.",
        "contact.direct": "Напрямую", "contact.channels": "Каналы", "contact.email": "E-mail",
        "contact.copy": "Копировать", "contact.copied": "Скопировано ✓", "contact.copyPrompt": "Скопируйте адрес e-mail:",
        "form.name": "Имя", "form.namePh": "Ваше имя", "form.nameErr": "Введите ваше имя.",
        "form.email": "E-mail", "form.emailPh": "you@example.com", "form.emailErr": "Введите корректный адрес e-mail.",
        "form.msg": "Сообщение", "form.msgPh": "О чём вы хотите написать?", "form.msgErr": "Напишите сообщение длиной не менее 10 символов.",
        "form.send": "Отправить", "form.openMail": "Открыть почту ▸",
        "form.hint": "Откроет вашу почтовую программу с уже заполненным сообщением.",
        "form.subject": "Сообщение с портфолио от {name}",
        "form.opening": "Открываю вашу почтовую программу. Ничего не происходит? Напишите напрямую на {mail}.",
        "form.sending": "Отправка...",
        "form.ok": "Сообщение отправлено. Скоро отвечу.",
        "form.bad": "Не удалось отправить. Попробуйте позже или напишите напрямую на {mail}.",

        "err.load": "&#9888; ERROR // Не удалось загрузить <code>{file}</code>.",
        "err.local": "Вы открываете сайт как локальный файл (file://). В этом случае браузеры блокируют загрузку JSON. Запустите локальный сервер, например расширением VS Code <code>Live Server</code>, или откройте сайт на GitHub Pages.",
        "err.json": "Проверьте, что файл существует и содержит корректный JSON (обратите внимание на запятые и кавычки)."
    }
};

// Meervoud: "1 project" / "3 projects" in elke taal.
const PLURAL_PROJECTS = {
    en: n => `${n} project${n === 1 ? "" : "s"}`,
    nl: n => `${n} project${n === 1 ? "" : "en"}`,
    pl: n => `${n} ${n === 1 ? "projekt" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "projekty" : "projektów"}`,
    ru: n => {
        const a = n % 10, b = n % 100;
        return `${n} ${a === 1 && b !== 11 ? "проект" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "проекта" : "проектов"}`;
    }
};

// ---------------------------------------------------------------- huidige taal
const LANG = (() => {
    const ok = code => LANGS.some(([c]) => c === code);
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (ok(fromUrl)) { try { localStorage.setItem("lang", fromUrl); } catch (e) { /* privé-modus */ } return fromUrl; }
    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) { /* privé-modus */ }
    return ok(saved) ? saved : DEFAULT_LANG;
})();
document.documentElement.lang = LANG;

// t("sleutel", {naam: waarde}) geeft de vertaalde tekst terug (valt terug op Engels).
function t(key, vars) {
    let value = STRINGS[LANG][key] ?? STRINGS[DEFAULT_LANG][key] ?? key;
    if (vars && typeof value === "string") value = value.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
    return value;
}

// Tekst uit de JSON-bestanden: een gewone string, of {"en": ..., "nl": ...}.
function tr(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value[LANG] ?? value[DEFAULT_LANG] ?? value.nl ?? Object.values(value)[0];
    }
    return value;
}

function setLang(code) {
    try { localStorage.setItem("lang", code); } catch (e) { /* privé-modus */ }
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    location.replace(url);
}

// Vult alle elementen met data-i18n (inhoud), data-i18n-ph (placeholder), data-i18n-alt en data-i18n-aria.
function applyI18n(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    root.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    root.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    const page = document.body.dataset.page;
    if (page) {
        document.title = `${t("title." + page)} | BART//HUB`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = t("desc." + page);
    }
}
