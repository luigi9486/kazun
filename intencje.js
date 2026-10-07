// Identyfikator Twojego Arkusza Google "Parafia Kazuń"
const SPREADSHEET_ID = '1K_-KbC3fgJ7_MKPBn920MTatdV2u8bQviCN7riFcX8U';
// Nazwa zakładki w Arkuszu
const SHEET_NAME = 'Intencje';

document.addEventListener("DOMContentLoaded", function () {
    pobierzIntencje();
});

async function pobierzIntencje() {
    const container = document.getElementById("intencje-container");
    if (!container) return;

    container.innerHTML = "<p style='text-align: center; padding: 2rem;'>Ładowanie intencji mszalnych...</p>";

    try {
        const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
        const response = await fetch(url);
        const text = await response.text();

        const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonText);

        const rows = data.table.rows;
        if (!rows || rows.length <= 1) {
            container.innerHTML = "<p style='text-align: center;'>Brak intencji mszalnych do wyświetlenia.</p>";
            return;
        }

        const wiersze = rows.slice(1).map(r => ({
            data: r.c[0] ? (r.c[0].f || r.c[0].v) : '',
            tytul: r.c[1] ? r.c[1].v : '',
            tresc: r.c[2] ? r.c[2].v : ''
        })).filter(item => item.tytul || item.tresc);

        if (wiersze.length === 0) {
            container.innerHTML = "<p style='text-align: center;'>Brak intencji mszalnych do wyświetlenia.</p>";
            return;
        }

        const najnowsze = wiersze[wiersze.length - 1];
        const archiwum = wiersze.slice(0, wiersze.length - 1).reverse();

        let html = `
            <!-- NAJNOWSZE INTENCJE -->
            <div class="hero-box" style="border-left-width: 6px;">
                <h2 style="font-size: 1.6rem; color: var(--accent-gold); margin-bottom: 0.5rem;">
                    📖 ${najnowsze.tytul}
                </h2>
                <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 1.2rem;">Tydzień: ${najnowsze.data}</p>
                <div style="white-space: pre-wrap; line-height: 1.7; font-size: 1.05rem;">${najnowsze.tresc}</div>
            </div>
        `;

        if (archiwum.length > 0) {
            html += `<h3 style="color: var(--accent-gold); font-family: 'Georgia', serif; margin: 2.5rem 0 1rem;">🗄️ Archiwum Intencji</h3>`;
            
            archiwum.forEach(item => {
                html += `
                    <details>
                        <summary>${item.tytul} <small style="font-weight: normal; opacity: 0.7;">(${item.data})</small></summary>
                        <div class="details-content" style="white-space: pre-wrap; margin-top: 1rem; line-height: 1.6;">
                            ${item.tresc}
                        </div>
                    </details>
                `;
            });
        }

        container.innerHTML = html;

    } catch (error) {
        console.error("Błąd pobierania intencji:", error);
        container.innerHTML = "<p style='color: red; text-align: center;'>Błąd podczas ładowania intencji mszalnych.</p>";
    }
}
