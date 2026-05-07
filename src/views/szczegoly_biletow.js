(function () {
const { button, dashboardHeader, panel, statusBadge, escapeHtml } = window.SharedUI;

function renderSzczegolyBiletow() {
    const backLink = `<div style="margin-bottom:1.5rem"><a href="#" onclick="event.preventDefault();window.AppNavigation.setActivePage('zapytania')" style="color:var(--text-muted);text-decoration:none;font-weight:500;font-size:0.9rem;display:inline-flex;align-items:center;gap:0.5rem"><i class="fa-solid fa-arrow-left"></i> Wróć do listy zapytań</a></div>`;

    const participantsHtml = `
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Imię i nazwisko</th>
                    <th>Data ur.</th>
                    <th>Nr dokumentu</th>
                    <th>Ważność dok.</th>
                    <th>Nr biletu elektronicznego</th>
                    <th>Status biletu</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><strong>Jan Kowalski</strong></td>
                    <td>12.05.1980</td>
                    <td>ABC123456</td>
                    <td>20.10.2030</td>
                    <td>080-1234567890</td>
                    <td>${statusBadge('Wystawiony', 'success')}</td>
                    <td>
                        <button class="btn btn-sm btn-icon"><i class="fa-solid fa-pen"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><strong>Anna Kowalska</strong></td>
                    <td>24.08.1982</td>
                    <td>CDE987654</td>
                    <td>15.01.2029</td>
                    <td><em style="color:var(--text-muted)">Brak</em></td>
                    <td>${statusBadge('Do wystawienia', 'warning')}</td>
                    <td>
                        <button class="btn btn-sm btn-icon"><i class="fa-solid fa-pen"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;

    const modalHtml = `
    <div id="import-mail-modal" class="modal">
        <div class="modal-content" style="max-width:600px">
            <div class="modal-header">
                <h2>Import danych uczestników z maila</h2>
                <button class="btn btn-icon" onclick="document.getElementById('import-mail-modal').classList.remove('show')"><i class="fa-solid fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom:1rem;color:var(--text-muted)">Wklej tekst wiadomości e-mail zawierającej dane pasażerów. System automatycznie wykryje imiona, nazwiska, daty urodzenia i numery dokumentów.</p>
                <textarea class="form-control" rows="8" placeholder="Np.&#10;1. Jan Kowalski, ur. 12.05.1980, paszport: ABC123456 ważny do 20.10.2030&#10;2. Anna Kowalska 24-08-1982 DO: CDE987654 (15.01.2029)" style="font-family:monospace;margin-bottom:1rem"></textarea>
                <div style="background:var(--warning-color);color:#000;padding:0.75rem;border-radius:var(--radius);font-size:0.9rem;opacity:0.8">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> Moduł w przygotowaniu: Pokaże się tutaj zdekodowana lista do zatwierdzenia przed wgraniem.
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="document.getElementById('import-mail-modal').classList.remove('show')">Anuluj</button>
                <button class="btn btn-primary" onclick="alert('Mockup: Dane zostały zaimportowane!'); document.getElementById('import-mail-modal').classList.remove('show')"><i class="fa-solid fa-file-import"></i> Analizuj tekst</button>
            </div>
        </div>
    </div>
    `;

    const contactLogHtml = `
<div class="note-item">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem">
<span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">Wczoraj 10:15</span>
<div style="display:flex;gap:0.4rem;align-items:center">
<span style="font-size:0.72rem;background:#e0e7ff;color:#4338ca;padding:0.1rem 0.4rem;border-radius:3px;font-weight:600">Mail</span>
<span style="font-size:0.72rem;color:var(--text-muted)">Dział Biletów</span>
</div>
</div>
<p style="margin:0;font-size:0.82rem">Zapytanie o bilety do Madrytu dla 12 osób. Wysłano wycenę Lotów LOT-em.</p>
</div>
<div class="note-item">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem">
<span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">Dziś 09:30</span>
<div style="display:flex;gap:0.4rem;align-items:center">
<span style="font-size:0.72rem;background:#e0e7ff;color:#4338ca;padding:0.1rem 0.4rem;border-radius:3px;font-weight:600">Telefon</span>
<span style="font-size:0.72rem;color:var(--text-muted)">Jan Kowalski</span>
</div>
</div>
<p style="margin:0;font-size:0.82rem">Klient akceptuje ofertę biletów. Prosi o wystawienie faktury przedpłatowej.</p>
</div>
    `;

    return backLink + [
        dashboardHeader({
            title: 'FL-2026-001 — Madryt (Tylko Loty)',
            subtitle: 'Osoba Prywatna · Jan Kowalski · Sierpień 2026 · Opiekun: Dział Biletów',
            actions: [
                button({ label: 'Importuj uczestników', icon: 'fa-solid fa-file-import', variant: 'outline', attrs: { onclick: "event.preventDefault()" } }),
                button({ label: 'Wyślij ofertę', icon: 'fa-solid fa-paper-plane' }),
                button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' }),
                button({ label: 'Zmień status', variant: 'ghost' }),
            ]
        }),
        `<div class="dashboard-grid" style="grid-template-columns:2fr 3fr">
${panel({ title: 'Szczegóły zapytania - Bilety', body: `
<div class="info-table">
<div class="info-row"><span>Organizator</span><strong>Jan Kowalski (Grupa prywatna)</strong></div>
<div class="info-row"><span>Telefon</span><strong>012 345 67 89</strong></div>
<div class="info-row"><span>E-mail</span><strong>j.kowalski@example.com</strong></div>
<div class="info-row"><span>Kierunek</span><strong>Madryt (MAD)</strong></div>
<div class="info-row"><span>Termin limitu</span><strong>Sierpień 2026 — 10-17.08.2026</strong></div>
<div class="info-row"><span>Liczba osób</span><strong>12 pax</strong></div>
<div class="info-row"><span>Linie lotnicze</span><strong>LOT Polish Airlines</strong></div>
<div class="info-row"><span>Typ</span><strong>Tylko bilety lotnicze</strong></div>
</div>
`})}
${panel({ title: 'Kalkulator rezerwacji lotów', action: button({ label: 'Przelicz', icon: 'fa-solid fa-calculator', variant: 'outline' }), body: `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:0.75rem">
<label class="form-field"><span>Liczba osób</span><input type="number" value="12" /></label>
<label class="form-field"><span>Waluta</span><input type="text" value="PLN" /></label>
</div>
<p class="kalkulator-hint">Kalkulacja netto biletów.</p>
<div class="kalkulator-line"><span>Bilety lotnicze (LOT WAW→MAD→WAW, 12 miejsc netto)</span><span>13 200 zł</span></div>
<div class="kalkulator-line subtotal"><span>Koszty ogółem (13 200 zł)</span><span>→ 1 100 zł / os.</span></div>
<div class="kalkulator-line"><span>Fee serwisowe biura (100 zł/os.)</span><span>1 200 zł</span></div>
<div class="kalkulator-line total"><span>CENA OFERTY Biletowej (brutto)</span><span>14 400 zł</span></div>
<div style="display:flex;gap:0.5rem;margin-top:1rem">
${button({ label: 'Generuj PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' })}
${button({ label: 'Wystaw Fakturę', icon: 'fa-solid fa-file-invoice' })}
</div>
`})}
</div>`,
        `<div class="dashboard-grid">
${panel({
    title: 'Lista pasażerów i status wymiany biletów', 
    body: participantsHtml
})}
${panel({
    title: 'Log kontaktów — FL-2026-001',
    action: button({ label: 'Dodaj notatkę', icon: 'fa-solid fa-plus', variant: 'outline' }),
    body: `<div class="notes-list">${contactLogHtml}</div>`
})}
</div>`
    ].join('');
}

window.SzczegolyBiletowView = { renderSzczegolyBiletow };
})();
