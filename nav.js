document.addEventListener("DOMContentLoaded", function () {
    // 1. Szablon Nagłówka
    const headerHTML = `
        <nav>
            <a href="index.html" class="logo">Parafia Kazuń Bielany</a>
            
            <ul class="nav-links">
                <li><a href="index.html#ogloszenia">Ogłoszenia</a></li>
                <li><a href="index.html#intencje">Intencje</a></li>
                <li><a href="index.html#msze">Msze Święte</a></li>
                <li><a href="historia.html">Historia</a></li>
                <li><a href="kancelaria.html">Kancelaria i kontakt</a></li>
            </ul>

            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
                <span id="themeText">Tryb Nocny</span>
            </button>
        </nav>
    `;

    // 2. Szablon Rozbudowanej Stopki
    const footerHTML = `
        <div class="footer-container">
            <!-- Kolumna 1: Dane i Kontakt -->
            <div class="footer-col">
                <h3>Parafia Kazuń Bielany</h3>
                <p>ul. Wojska Polskiego 1<br>05-152 Czosnów</p>
                <p>📞 <a href="tel:+48227850021">+48 22 785 00 21</a></p>
                <p>✉️ <a href="mailto:parafia.kazun@gmail.com">parafia.kazun@gmail.com</a></p>
            </div>

            <!-- Kolumna 2: Godziny Kancelarii -->
            <div class="footer-col">
                <h3>Kancelaria Parafialna</h3>
                <p><strong>Środa:</strong> 15:00 – 17:00</p>
                <p><strong>Sobota:</strong> 10:00 – 12:00</p>
                <p><em>(Pogrzeb: o każdej porze)</em></p>
            </div>

            <!-- Kolumna 3: Szybkie Linki -->
            <div class="footer-col">
                <h3>Szybki Kontakt</h3>
                <p><a href="kancelaria.html">Sprawy sakramentalne</a></p>
                <p><a href="kancelaria.html#mapa">Mapa i dojazd</a></p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; Parafia Rzymskokatolicka Matki Bożej Szkaplerznej w Kazuniu Bielanach</p>
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
    if (savedTheme === "dark") {
        applyTheme(true);
    }
});

/* Logika przełączania motywu */
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
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
