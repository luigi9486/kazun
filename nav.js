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
    // 1. Szablon Nagłówka z pozycjami w menu (z owiniętymi tekstami w <span> dla animacji kafelków)
    const headerHTML = `
        <nav>
        <a href="index.html" class="logo">
    <span>Parafia Matki Bożej Szkaplerznej w Kazuniu Bielany</span>
</a>

        
            
            <ul class="nav-links">
                <li><a href="ogloszenia.html"><span>Ogłoszenia</span></a></li>
                <li><a href="intencje.html"><span>Intencje mszalne</span></a></li>
                <li><a href="msze.html"><span>Msze Święte i Nabożeństwa</span></a></li>
                <li><a href="grupy.html"><span>Grupy</span></a></li>
                <li><a href="historia.html"><span>O Parafii</span></a></li>
                <li><a href="kancelaria.html"><span>Kancelaria i kontakt</span></a></li>
                <li><a href="cmentarz.html"><span>Cmentarz</span></a></li>
                <li><a href="galerie.html"><span>Galerie</span></a></li>
            </ul>

            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
                <span id="themeText">Tryb Nocny</span>
            </button>
        </nav>
    `;

    // 2. Stopka z danymi kontaktowymi, kolorowymi ikonami mediów społecznościowych i administratorem
    const footerHTML = `
        <div class="footer-container" style="justify-content: center; text-align: center; display: block; padding: 1.5rem 1rem;">
            <div class="footer-col" style="max-width: 700px; margin: 0 auto; line-height: 1.6;">
                <h3>Parafia Kazuń Bielany</h3>
                <p>ul. Kościelna 1, 05-152 Czosnów</p>
                <p>📞 <strong>Proboszcz ks. Adam Wyszyński:</strong> <a href="tel:+48503163823" style="color: inherit; text-decoration: underline;">503 163 823</a></p>
                <p>📞 <strong>Wikariusz ks. Jerzy Zychla:</strong> <a href="tel:+48603592841" style="color: inherit; text-decoration: underline;">603 592 841</a></p>
                <p>✉️ E-mail: <a href="mailto:parafiakazun@parafiakazun.pl" style="color: inherit; text-decoration: underline;">parafiakazun@parafiakazun.pl</a></p>
                <p>💳 Nr konta: <span style="font-family: monospace; font-weight: bold;">27 8009 1046 0017 4600 2002 0001</span></p>
                
                <!-- Wyraziste, kolorowe ikony Facebooka i YouTube pod numerem konta -->
                <div style="margin: 1.2rem 0; display: flex; justify-content: center; gap: 1.2rem;">
                    <!-- Facebook -->
                    <a href="https://www.facebook.com/profile.php?id=61595422286482" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #1877F2; color: #ffffff; border-radius: 50%; text-decoration: none; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s ease, box-shadow 0.2s ease;" title="Facebook Parafii" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        f
                    </a>
                    <!-- YouTube -->
                    <a href="https://www.youtube.com/channel/UCl-gnQzXj_2EBS38i8b2vxQ" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #FF0000; color: #ffffff; border-radius: 50%; text-decoration: none; font-size: 1.1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s ease, box-shadow 0.2s ease;" title="Kanał YouTube" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        ▶
                    </a>
                </div>

                <p style="font-size: 0.9rem; opacity: 0.85; margin-top: 0.6rem;">💻 Administrator strony: <a href="mailto:parafiakazunbielany@gmail.com" style="color: inherit; text-decoration: underline;">parafiakazunbielany@gmail.com</a></p>
                
                <p style="margin-top: 1.2rem;">
                    <a href="standardy.html" style="color: var(--accent-gold, #c5a059); font-weight: bold; text-decoration: underline;">
                        🛡️ Standardy Ochrony Małoletnich
                    </a>
                </p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; Parafia Rzymskokatolicka Matki Bożej Szkaplerznej w Kazuniu Bielany</p>
        </div>
    `;

    // 3. Szablon paska ciasteczek
    const cookieHTML = `
        <div id="cookie-banner" class="cookie-banner">
            <div class="cookie-content">
                <p>Ta strona używa plików cookies w celu zapewnienia prawidłowego działania oraz wygody przeglądania. Korzystając ze strony, wyrażasz zgodę na ich używanie.</p>
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

    // Wyświetlenie banneru ciasteczek, jeśli nie zostały wcześniej zaakceptowane
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
        // Używamy wyboru użytkownika z tej sesji
        isDark = (savedTheme === "dark");
    } else {
        // Przy nowej wizycie decyduje harmonogram wschodu/zachodu słońca
        isDark = isNightTime();
    }

    applyTheme(isDark);
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
