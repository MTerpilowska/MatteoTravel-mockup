(function () {
const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

function renderZapytania() {
const items = [
{ id: 'ZAP-2026-041', date: 'Dziś, 09:14', org: 'ks. Tomasz Błaszczyk', parish: 'Parafia MB Loretańskiej, Łódź', dest: 'Ziemia Święta', when: 'Październik 2026', pax: '40–50 os.', budget: '4 500–5 500 zł/os.', type: 'Pielgrzymka', opiekun: 'Anna K.', status: 'Nowe', statusTone: 'warning', source: 'Strona WWW' },
{ id: 'ZAP-2026-040', date: 'Wczoraj, 16:32', org: 'Liceum Ogólnokształcące nr 3', parish: 'Szkoła, Kraków', dest: 'Rzym', when: 'Czerwiec 2026', pax: '50 os.', budget: '3 200–3 800 zł/os.', type: 'Wycieczka szkolna', opiekun: 'Marek W.', status: 'W opracowaniu', statusTone: 'info', source: 'Formularz WWW' },
{ id: 'ZAP-2026-038', date: '25.03.2026', org: 'ks. Henryk Hendzel', parish: 'Parafia MB Różańcowej, Rzeszów', dest: 'Fatima + Santiago', when: 'Maj 2026', pax: '35 os.', budget: '5 200 zł/os.', type: 'Pielgrzymka', opiekun: 'Anna K.', status: 'Zaakceptowane', statusTone: 'success', source: 'Polecenie' },
{ id: 'ZAP-2026-035', date: '22.03.2026', org: 'ZHP Hufiec Gdańsk', parish: 'Organizacja harcerska', dest: 'Włochy — Rzym/Asyż', when: 'Lipiec 2026', pax: '60 os.', budget: '2 800–3 200 zł/os.', type: 'Obóz/Wycieczka', opiekun: 'Piotr S.', status: 'Wysłane', statusTone: 'purple', source: 'Polecenie' },
{ id: 'ZAP-2026-030', date: '18.03.2026', org: 'ks. Marek Nowak', parish: 'Parafia Narodzenia Pańskiego, Wrocław', dest: 'Lourdes', when: 'Sierpień 2026', pax: '30 os.', budget: '4 100 zł/os.', type: 'Pielgrzymka', opiekun: 'Anna K.', status: 'W opracowaniu', statusTone: 'info', source: 'CRM — retencja' },
{ id: 'ZAP-2026-025', date: '12.03.2026', org: 'Parafia Wniebowzięcia', parish: 'Parafia, Katowice', dest: 'Grecja — Meteory', when: 'Wrzesień 2026', pax: '45 os.', budget: '3 700 zł/os.', type: 'Pielgrzymka', opiekun: 'Marek W.', status: 'Odrzucone', statusTone: 'neutral', source: 'Strona WWW' },
];

const rows = items.map(item => `
<tr style="cursor:pointer" data-no-demo="true" data-page="szczegoly_zapytania" onclick="window.AppNavigation.setActivePage('szczegoly_zapytania')">
<td><strong>${escapeHtml(item.id)}</strong><br><small style="color:var(--text-muted)">${escapeHtml(item.date)}</small></td>
<td>
<strong>${escapeHtml(item.org)}</strong><br>
<small>${escapeHtml(item.parish)}</small>
</td>
<td><strong>${escapeHtml(item.dest)}</strong><br><small>${escapeHtml(item.when)}</small></td>
<td>${escapeHtml(item.pax)}</td>
<td><span class="type-pill">${escapeHtml(item.type)}</span></td>
<td><small style="color:var(--text-muted)">${escapeHtml(item.source)}</small></td>
<td>${escapeHtml(item.opiekun)}</td>
<td>${statusBadge(item.status, item.statusTone)}</td>
<td>
<div style="display:flex;gap:0.4rem;flex-wrap:wrap" onclick="event.stopPropagation()">
${button({ label: 'Kalkulator', variant: 'outline' })}
${item.statusTone === 'warning' ? button({ label: '→ CRM', variant: 'ghost' }) : ''}
${item.statusTone === 'success' ? button({ label: 'Zamień w imprezę', icon: 'fa-solid fa-rocket', variant: 'ghost' }) : ''}
</div>
</td>
</tr>
`).join('');

const pipeline = [
{ label: 'Nowe', count: 5, icon: 'fa-solid fa-envelope-open-text', color: '#f59e0b', bg: '#fef3c7' },
{ label: 'W opracowaniu', count: 8, icon: 'fa-solid fa-laptop-file', color: '#3b82f6', bg: '#dbeafe' },
{ label: 'Wysłane do org.', count: 11, icon: 'fa-solid fa-paper-plane', color: '#8b5cf6', bg: '#ede9fe' },
{ label: 'Zaakceptowane', count: 4, icon: 'fa-solid fa-handshake', color: '#10b981', bg: '#d1fae5' },
{ label: 'Odrzucone/Odłożone', count: 6, icon: 'fa-solid fa-circle-xmark', color: '#94a3b8', bg: '#f1f5f9' },
];

const pipelineMarkup = pipeline.map(p => `
<div class="pipeline-stage">
<div class="pipeline-icon" style="background:${p.bg};color:${p.color}"><i class="${escapeHtml(p.icon)}"></i></div>
<div class="pipeline-info">
<span class="pipeline-label">${escapeHtml(p.label)}</span>
<strong class="pipeline-count">${p.count}</strong>
</div>
</div>
`).join('<div class="pipeline-arrow"><i class="fa-solid fa-chevron-right"></i></div>');

return [
dashboardHeader({
title: 'Zapytania i Oferty',
subtitle: 'Rejestr wszystkich zapytań — od pierwszego kontaktu do zaakceptowanej oferty i uruchomienia imprezy',
actions: [
button({ label: 'Eksport CSV', icon: 'fa-solid fa-download', variant: 'outline' }),
button({ label: 'Nowe zapytanie', icon: 'fa-solid fa-plus' })
]
}),
`<div class="stats-grid">
${statCard({ title: 'Wszystkie zapytania', value: '34', icon: 'fa-solid fa-inbox', iconTone: 'blue' })}
${statCard({ title: 'Nowe (do obsługi)', value: '5', icon: 'fa-solid fa-bell', iconTone: 'orange', trend: 'Najstarsze: 2 dni', trendTone: 'negative' })}
${statCard({ title: 'Konwersja mies.', value: '36%', icon: 'fa-solid fa-percent', iconTone: 'green', trend: '+4pp vs. poprzedni', trendTone: 'positive' })}
${statCard({ title: 'Śr. czas odpowiedzi', value: '18h', icon: 'fa-solid fa-stopwatch', iconTone: 'purple' })}
</div>`,
panel({
title: 'Lejek zapytań',
body: `<div class="pipeline-row">${pipelineMarkup}</div>`
}),
panel({
title: 'Lista zapytań',
action: `<div style="display:flex;gap:0.5rem;align-items:center">
<input type="text" class="inline-select" style="width:160px" placeholder="Szukaj..." />
<select class="inline-select"><option>Wszystkie statusy</option><option>Nowe</option><option>W opracowaniu</option><option>Wysłane</option><option>Zaakceptowane</option></select>
<select class="inline-select"><option>Wszyscy opiekunowie</option><option>Anna K.</option><option>Marek W.</option><option>Piotr S.</option></select>
<select class="inline-select"><option>Wszystkie źródła</option><option>Strona WWW</option><option>Polecenie</option><option>CRM — retencja</option><option>Facebook Ads</option></select>
</div>`,
body: `<div class="table-container">
<table class="data-table">
<thead><tr><th>Nr / Data</th><th>Organizator</th><th>Kierunek / Termin</th><th>Liczba os.</th><th>Typ</th><th>Źródło</th><th>Opiekun</th><th>Status</th><th></th></tr></thead>
<tbody>${rows}</tbody>
</table>
</div>`
}),
].join('');
}

function renderSzczegolyZapytania() {
const backLink = `<div style="margin-bottom:1.5rem"><a href="#" onclick="event.preventDefault();window.AppNavigation.setActivePage('zapytania')" style="color:var(--text-muted);text-decoration:none;font-weight:500;font-size:0.9rem;display:inline-flex;align-items:center;gap:0.5rem"><i class="fa-solid fa-arrow-left"></i> Wróć do listy zapytań</a></div>`;

const offerVersions = [
{ v: 'v1', date: '20.03.2026', autor: 'Anna K.', status: 'Wysłana', statusTone: 'purple', cena: '5 490 zł/os.', opis: 'Fatima + Lizbona + Santiago — wersja robocza. Lot Ryanair KRK→OPO.' },
{ v: 'v2', date: '23.03.2026', autor: 'Anna K.', status: 'Wysłana', statusTone: 'purple', cena: '5 290 zł/os.', opis: 'Korekta: zmiana hotelu w Fatimie (Recinto → tańsza opcja). Lot LOT bez zmiany.' },
{ v: 'v3 (fin.)', date: '25.03.2026', autor: 'Anna K.', status: 'Zaakceptowana', statusTone: 'success', cena: '5 190 zł/os.', opis: 'Finalna — dodany Porto extra, cena obniżona o 100 zł/os. Zaakceptowana przez ks. Hendzel.' },
];
const offerTimelineHtml = offerVersions.map(v => `
<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.65rem 0.75rem;border-radius:8px;margin-bottom:0.35rem;background:${v.statusTone === 'success' ? '#f0fdf4' : 'var(--bg-main)'}">
<div style="width:38px;height:38px;border-radius:50%;background:${v.statusTone === 'success' ? '#d1fae5' : '#e0e7ff'};color:${v.statusTone === 'success' ? '#166534' : '#4338ca'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.68rem;font-weight:800">${escapeHtml(v.v)}</div>
<div style="flex:1">
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.2rem">
<strong style="font-size:0.85rem">${escapeHtml(v.cena)}</strong>
${statusBadge(v.status, v.statusTone)}
<span style="font-size:0.72rem;color:var(--text-muted)">${escapeHtml(v.date)} · ${escapeHtml(v.autor)}</span>
</div>
<div style="font-size:0.8rem">${escapeHtml(v.opis)}</div>
<div style="display:flex;gap:0.35rem;margin-top:0.4rem">
${button({ label: 'PDF oferty', icon: 'fa-solid fa-file-pdf', variant: 'ghost' })}
${v.statusTone !== 'success' ? button({ label: 'Wyślij ponownie', icon: 'fa-solid fa-paper-plane', variant: 'ghost' }) : ''}
</div>
</div>
</div>
`).join('');

const contactLog = [
{ date: '25.03.2026 14:22', who: 'Anna K.', type: 'Telefon', text: 'ks. Hendzel zaakceptował ofertę v3 (5 190 zł/os.). Prośba o podanie listy nazwisk do 10.04.' },
{ date: '23.03.2026 11:05', who: 'Anna K.', type: 'E-mail', text: 'Wysłana oferta v2 z korektą hotelu w Fatimie. Oczekiwanie na odpowiedź.' },
{ date: '21.03.2026 10:30', who: 'Anna K.', type: 'Telefon', text: 'ks. Hendzel zapytał o możliwość obniżenia ceny. Sprawdzić Hotel Recinto — tańsze daty.' },
{ date: '20.03.2026 09:15', who: 'System', type: 'System', text: 'Zapytanie przypisane do Anna K. — Portugalia + Santiago, maj 2026, 35 os.' },
];
const contactLogHtml = contactLog.map(e => `
<div class="note-item">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem">
<span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">${escapeHtml(e.date)}</span>
<div style="display:flex;gap:0.4rem;align-items:center">
<span style="font-size:0.72rem;background:#e0e7ff;color:#4338ca;padding:0.1rem 0.4rem;border-radius:3px;font-weight:600">${escapeHtml(e.type)}</span>
<span style="font-size:0.72rem;color:var(--text-muted)">${escapeHtml(e.who)}</span>
</div>
</div>
<p style="margin:0;font-size:0.82rem">${escapeHtml(e.text)}</p>
</div>
`).join('');

return backLink + [
dashboardHeader({
title: 'ZAP-2026-040 — Rzym · Liceum nr 3 · 50 os.',
subtitle: 'Wycieczka szkolna · Czerwiec 2026 · Opiekun: Marek W.',
actions: [
button({ label: 'Wyślij ofertę', icon: 'fa-solid fa-paper-plane' }),
button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' }),
button({ label: 'Zmień status', variant: 'ghost' }),
]
}),
`<div class="dashboard-grid" style="grid-template-columns:2fr 3fr">
${panel({ title: 'Szczegóły zapytania', body: `
<div class="info-table">
<div class="info-row"><span>Organizator</span><strong>Liceum Ogólnokształcące nr 3</strong></div>
<div class="info-row"><span>Kontakt</span><strong>mgr Anna Wiśniewska (dyrektor)</strong></div>
<div class="info-row"><span>Telefon</span><strong>012 345 67 89</strong></div>
<div class="info-row"><span>E-mail</span><strong>dyrekcja@lo3krakow.edu.pl</strong></div>
<div class="info-row"><span>Kierunek</span><strong>Rzym (Watykan, Koloseum, Asyż)</strong></div>
<div class="info-row"><span>Termin</span><strong>Czerwiec 2026 — preferowane: 5–12.06</strong></div>
<div class="info-row"><span>Liczba osób</span><strong>50 (uczniowie + 4 opiekunów)</strong></div>
<div class="info-row"><span>Budżet / os.</span><strong>3 200–3 800 zł</strong></div>
<div class="info-row"><span>Typ</span><strong>Wycieczka szkolna</strong></div>
<div class="info-row"><span>Opiekun</span><strong>Marek W.</strong></div>
<div class="info-row"><span>Uwagi</span><strong>Autokar bez ogranicz. KM · wczesne śniadania d.3</strong></div>
</div>
<div style="margin-top:1rem">
<div class="notes-list">
<div class="note-item"><span style="font-size:0.75rem;color:var(--text-muted)">Wczoraj 16:32</span><p>Zapytanie złożone przez formularz WWW. Przypisane do Marka W.</p></div>
<div class="note-item"><span style="font-size:0.75rem;color:var(--text-muted)">Dziś 09:10</span><p>Marek W.: Dostępność OK — Wizz Air KRK→FCO w 1. tygodniu czerwca. Sprawdzam hotel.</p></div>
</div>
</div>
` })}
${panel({ title: 'Kalkulator oferty — Rzym · 50 os. · 7 dni', action: button({ label: 'Przelicz', icon: 'fa-solid fa-calculator', variant: 'outline' }), body: `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:0.75rem">
<label class="form-field"><span>Liczba osób</span><input type="number" value="50" /></label>
<label class="form-field"><span>Liczba nocy</span><input type="number" value="6" /></label>
</div>
<p class="kalkulator-hint">Kalkulacja na podstawie aktualnych cen dostawców.</p>
<div class="kalkulator-line"><span>Lot (Wizz Air KRK→FCO→KRK, 50 miejsc)</span><span>61 000 zł</span></div>
<div class="kalkulator-line"><span>Hotel (Casa La Salle, 6 nocy, 25 pok. DBL)</span><span>56 700 zł</span></div>
<div class="kalkulator-line"><span>Autokar lokalny (7 dni)</span><span>6 200 zł</span></div>
<div class="kalkulator-line"><span>Pilot / przewodnik lokalny</span><span>2 800 zł</span></div>
<div class="kalkulator-line"><span>Muzea Watykańskie + wstępy grupowe</span><span>6 250 zł</span></div>
<div class="kalkulator-line"><span>Ubezpieczenie Allianz (50 os.)</span><span>2 750 zł</span></div>
<div class="kalkulator-line subtotal"><span>Koszty ogółem (135 700 zł)</span><span>→ 2 714 zł / os.</span></div>
<div class="kalkulator-line"><span>Marża biuro (20%)</span><span>27 140 zł</span></div>
<div class="kalkulator-line"><span>TFG (0,4% od obrotu)</span><span>651 zł</span></div>
<div class="kalkulator-line total"><span>CENA OFERTY / os.</span><span>3 249 zł</span></div>
<div style="display:flex;gap:0.5rem;margin-top:1rem">
${button({ label: 'Generuj PDF oferty', icon: 'fa-solid fa-file-pdf', variant: 'outline' })}
${button({ label: 'Wyślij do organizatora', icon: 'fa-solid fa-paper-plane' })}
</div>
` })}
</div>`,
`<div class="dashboard-grid">
${panel({
title: 'Historia oferty — ZAP-2026-038 · ks. Hendzel · Portugalia + Santiago (zaakceptowana)',
action: `<div style="display:flex;gap:0.5rem;align-items:center">` +
statusBadge('Zaakceptowana', 'success') +
button({ label: 'Utwórz imprezę →', icon: 'fa-solid fa-rocket' }) +
`</div>`,
body: `
<div style="margin-bottom:0.85rem;padding:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:0.82rem;color:#166534;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem">
<span><i class="fa-solid fa-circle-check" style="margin-right:0.4rem"></i><strong>Oferta zaakceptowana przez ks. Henryk Hendzel — 25.03.2026.</strong> Kolejny krok: utwórz imprezę i przypisz uczestników.</span>
${button({ label: 'Otwórz w CRM', icon: 'fa-solid fa-address-card', variant: 'outline' })}
</div>
<div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.6rem">Wersje oferty — historia</div>
${offerTimelineHtml}
`
})}
${panel({
title: 'Log kontaktów — ZAP-2026-038',
action: button({ label: 'Dodaj notatkę', icon: 'fa-solid fa-plus', variant: 'outline' }),
body: `<div class="notes-list">${contactLogHtml}</div>`
})}
</div>`
].join('');
}

window.ZapytaniaView = { renderZapytania, renderSzczegolyZapytania };
})();
