/**
 * Sprawdza, czy w danym miesiącu panuje noc w okolicach Kazunia.
 * Przybliżone godziny wschodu i zachodu dla środka każdego miesiąca.
 */
function isNightTime() {
    const now = new Date();
    const month = now.getMonth(); // 0 = Styczeń, 11 = Grudzień
    const currentHour = now.getHours() + (now.getMinutes() / 60);

    // Tabela: [wschód słońca, zachód słońca] w godzinach (np. 16.5 = 16:30)
    const sunSchedule = [
        [7.75, 16.0],  // Styczeń     (07:45 - 16:00)
        [7.0,  17.0],  // Luty        (07:00 - 17:00)
        [6.0,  18.0],  // Marzec      (06:00 - 18:00)
        [5.5,  19.75], // Kwiecień    (05:30 - 19:45)
        [4.75, 20.5],  // Maj         (04:45 - 20:30)
        [4.25, 21.0],  // Czerwiec    (04:15 - 21:00)
        [4.5,  20.75], // Lipiec      (04:30 - 20:45)
        [5.25, 20.0],  // Sierpień    (05:15 - 20:00)
        [6.0,  19.0],  // Wrzesień    (06:00 - 19:00)
        [6.75, 17.75], // Październik (06:45 - 17:45)
        [7.0,  15.75], // Listopad    (07:00 - 15:45)
        [7.75, 15.5]   // Grudzień    (07:45 - 15:30)
    ];

    const [sunrise, sunset] = sunSchedule[month];

    // Noc trwa od zachodu do wschodu słońca
    return currentHour < sunrise || currentHour >= sunset;
}

document.addEventListener("DOMContentLoaded", function () {
    // 1. Szablon Nagłówka z nowymi pozycjami w menu
    const headerHTML = `
        <nav>
            <a href="index.html" class="logo">Parafia Kazuń Bielany</a>
            
            <ul class="nav-links">
                <li><a href="ogloszenia.html">Ogłoszenia</a></li>
                <li><a href="intencje.html">Intencje</a></li>
                <li><a href="msze.html">Msze Święte</a></li>
                <li><a href="grupy.html">Grupy</a></li>
                <li><a href="historia.html">Historia</a></li>
                <li><a href="kancelaria.html">Kancelaria i kontakt</a></li>
                <li><a href="cmentarz.html">Cmentarz</a></li>
            </ul>

            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
                <span id="themeText">Tryb Nocny</span>
            </button>
        </nav>
    `;

    // 2. Stopka z danymi kontaktowymi i poprawnie podpiętymi Standardami Ochrony Małoletnich
    const footerHTML = `
        <div class="footer-container" style="justify-content: center; text-align: center; display: block; padding: 1.5rem 1rem;">
            <div class="footer-col" style="max-width: 600px; margin: 0 auto;">
                <h3>Parafia Kazuń Bielany</h3>
                <p>ul. Wojska Polskiego 1, 05-152 Czosnów</p>
                <p>📞 <a href="tel:+48...">+48...</a> &nbsp;|&nbsp; ✉️ <a href="mailto:parafia.kazun@gmail.com">parafia.kazun@gmail.com</a></p>
                
                <p style="margin-top: 1rem;">
                    <a href="standardy.html" style="color: var(--accent-gold, #c5a059); font-weight: bold; text-decoration: underline;">
                        🛡️ Standardy Ochrony Małoletnich
                    </a>
                </p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; Parafia Rzymskokatolicka Matki Bożej Szkaplerznej w Kazuniu Bielanach</p>
        </div>
    `;

    // 3. Szablon Paska Ciasteczek
    const cookieHTML = `
        <div id="cookie-banner" class="cookie-banner">
            <div class="cookie-content">
                <p>Ta strona używa plików cookies w celu zapewnienia prawidłowego działania oraz wygody przeglądania. Korzystając ze strony, wyrażasz zgode na ich używanie.</p>
                <button onclick="acceptCookies()" class="cookie-btn">Akceptuję</button>
            </div>
        </div>
    `;

    // Wstawienie nagłówka
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // Wstawienie stopki
    const footerElement = document.getElementById("main-footer");
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }

    // Wyświetlenie banneru ciasteczek (jeśli nie zostały wcześniej zaakceptowane)
    if (!localStorage.getItem("cookiesAccepted")) {
        document.body.insertAdjacentHTML("beforeend", cookieHTML);
    }

    // Automatyczne podświetlanie aktywnej podstrony w menu
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // Inicjalizacja motywu dla aktualnej sesji
    const savedTheme = sessionStorage.getItem("theme");
    let isDark = false;

    if (savedTheme !== null) {
        // Jeśli w trakcie TEJ SESJI użytkownik sam kliknął przycisk, zachowujemy jego wybór
        isDark = (savedTheme === "dark");
    } else {
        // Przy nowej wizycie (nowej sesji) zawsze decyduje tabela godzin wschodu/zachodu
        isDark = isNightTime();
    }

    applyTheme(isDark);
});

/* Obsługa akceptacji ciasteczek (zostaje w localStorage na stałe) */
function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    const banner = document.getElementById("cookie-banner");
    if (banner) {
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 300);
    }
}

/* Logika przełączania motywu dla obecnej sesji */
function toggleTheme() {
    const isDark = !document.body.classList.contains("dark-mode");
    sessionStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme(isDark);
}

function applyTheme(isDark) {
    const icon = document.getElementById("themeIcon");
    const text = document.getElementById("themeText");

    if (isDark) {
        document.body.classList.add("dark-mode");
        if (icon) icon.textContent = "☀️";
        if (text) text.textContent = "Tryb Dzień";
    } else {
        document.body.classList.remove("dark-mode");
        if (icon) icon.textContent = "🌙";
        if (text) text.textContent = "Tryb Nocny";
    }

    const sliderImages = document.querySelectorAll(".slider-img");
    sliderImages.forEach(img => {
        const daySrc = img.getAttribute("data-day-src");
        const nightSrc = img.getAttribute("data-night-src");

        if (isDark && nightSrc) {
            img.src = nightSrc;
        } else if (daySrc) {
            img.src = daySrc;
        }
    });
}
