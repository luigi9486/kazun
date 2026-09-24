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
                <li><a href="cmentarz.html" target=">Cmentarz</a></li>
            </ul>

            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
                <span id="themeText">Tryb Nocny</span>
            </button>
        </nav>
    `;

    // 2. Stopka z danymi kontaktowymi i Standardami Ochrony Małoletnich
    const footerHTML = `
        <div class="footer-container" style="justify-content: center; text-align: center; display: block; padding: 1.5rem 1rem;">
            <div class="footer-col" style="max-width: 600px; margin: 0 auto;">
                <h3>Parafia Kazuń Bielany</h3>
                <p>ul. Wojska Polskiego 1, 05-152 Czosnów</p>
                <p>📞 <a href="tel:+48...">+48...</a> &nbsp;|&nbsp; ✉️ <a href="mailto:parafia.kazun@gmail.com">parafia.kazun@gmail.com</a></p>
                
                <p style="margin-top: 1rem;">
                    <a href="standardy.html" target="_blank" style="color: var(--accent-gold, #c5a059); font-weight: bold; text-decoration: underline;">
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
                <p>Ta strona używa plików cookies w celu zapewnienia prawidłowego działania oraz wygody przeglądania. Korzystając ze strony, wyrażasz zgody na ich używanie.</p>
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

    // Inicjalizacja motywu
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "dark");
});

/* Obsługa akceptacji ciasteczek */
function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    const banner = document.getElementById("cookie-banner");
    if (banner) {
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 300);
    }
}

/* Logika przełączania motywu */
function toggleTheme() {
    const isDark = !document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
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
