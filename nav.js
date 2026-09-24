document.addEventListener("DOMContentLoaded", function () {
    // 1. Definicja szablonu nagłówka i nawigacji
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

    // 2. Wstawienie nagłówka w miejsce <header id="main-header">
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // 3. Automatyczne podświetlanie aktywnej podstrony w menu
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // 4. Inicjalizacja motywu (synchroniczne odczytanie stanu z localStorage)
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

    // Jeśli na stronie głównej jest slajder, podmienia obrazki dzień/noc
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
