// Identyfikator Arkusza Google "Parafia Kazuń"
const SPREADSHEET_ID = '1K_-KbC3fgJ7_MKPBn920MTatdV2u8bQviCN7riFcX8U';

document.addEventListener("DOMContentLoaded", function () {
    ladujSkrotOgloszen();
    ladujSkrotIntencji();
});

// 1. POBIERANIE SKRÓTU NAJNOWSZYCH OGŁOSZEŃ
async function ladujSkrotOgloszen() {
    const container = document.getElementById("home-ogloszenia");
    if (!container) return;

    try {
        const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent('Ogloszenia')}`;
        const response = await fetch(url);
        const text = await response.text();
        const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonText);

        const rows = data.table.rows;
        if (!rows || rows.length <= 1) {
            container.innerHTML = "<p>Brak aktualnych ogłoszeń.</p>";
            return;
        }

        // Pobieramy ostatni (najnowszy) wiersz
        const wiersze = rows.slice(1).map(r => ({
            data: r.c[0] ? (r.c[0].f || r.c[0].v) : '',
            tytul: r.c[1] ? r.c[1].v : '',
            tresc: r.c[2] ? r.c[2].v : ''
        })).filter(item => item.tytul || item.tresc);

        const najnowsze = wiersze[wiersze.length - 1];

        container.innerHTML = `
            <div class="post-card">
                <div class="post-meta">📅 ${najnowsze.data}</div>
                <h4 style="color: var(--accent-gold, #d69e2e); margin-bottom: 0.8rem;">📢 ${najnowsze.tytul}</h4>
                <div style="white-space: pre-wrap; line-height: 1.6; max-height: 180px; overflow: hidden; position: relative;">
                    ${najnowsze.tresc}
                </div>
                <a href="ogloszenia.html" class="btn-more" style="display: inline-block; margin-top: 1rem; color: var(--accent-gold, #d69e2e); font-weight: bold; text-decoration: none;">
                    Czytaj wszystkie ogłoszenia →
                </a>
            </div>
        `;
    } catch (error) {
        console.error("Błąd pobierania skrótu ogłoszeń:", error);
        container.innerHTML = "<p>Nie udało się załadować ogłoszeń. <a href='ogloszenia.html'>Przejdź do ogłoszeń</a></p>";
    }
}

// 2. POBIERANIE SKRÓTU NAJNOWSZYCH INTENCJI
async function ladujSkrotIntencji() {
    const container = document.getElementById("home-intencje");
    if (!container) return;

    try {
        const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent('Intencje')}`;
        const response = await fetch(url);
        const text = await response.text();
        const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonText);

        const rows = data.table.rows;
        if (!rows || rows.length <= 1) {
            container.innerHTML = "<p>Brak aktualnych intencji.</p>";
            return;
        }

        const wiersze = rows.slice(1).map(r => ({
            data: r.c[0] ? (r.c[0].f || r.c[0].v) : '',
            tytul: r.c[1] ? r.c[1].v : '',
            tresc: r.c[2] ? r.c[2].v : ''
        })).filter(item => item.tytul || item.tresc);

        const najnowsze = wiersze[wiersze.length - 1];

        container.innerHTML = `
            <div class="post-card">
                <div class="post-meta">📅 Tydzień: ${najnowsze.data}</div>
                <h4 style="color: var(--accent-gold, #d69e2e); margin-bottom: 0.8rem;">📖 ${najnowsze.tytul}</h4>
                <div style="white-space: pre-wrap; line-height: 1.6; max-height: 180px; overflow: hidden; position: relative;">
                    ${najnowsze.tresc}
                </div>
                <a href="intencje.html" class="btn-more" style="display: inline-block; margin-top: 1rem; color: var(--accent-gold, #d69e2e); font-weight: bold; text-decoration: none;">
                    Zobacz pełne intencje mszalne →
                </a>
            </div>
        `;
    } catch (error) {
        console.error("Błąd pobierania skrótu intencji:", error);
        container.innerHTML = "<p>Nie udało się załadować intencji. <a href='intencje.html'>Przejdź do intencji</a></p>";
    }
}
