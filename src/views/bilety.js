(function () {
const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

function renderBilety() {
const items = [
{ id: 'FL-2026-001', date: '10.08.2026', org: 'Jan Kowalski (Grupa prywatna)', dest: 'Madryt', pax: '12 os.', opiekun: 'Dział Biletów', status: 'Zaakceptowane', statusTone: 'success', airlines: 'LOT Polish Airlines' },
{ id: 'FL-2026-002', date: '15.09.2026', org: 'KS. Andrzej (Pielgrzymka)', dest: 'Rzym Fiumicino', pax: '40 os.', opiekun: 'Dział Biletów', status: 'W opracowaniu', statusTone: 'info', airlines: 'WizzAir / Ryanair' },
{ id: 'FL-2026-003', date: '05.10.2026', org: 'Firma IT XYZ', dest: 'Londyn', pax: '8 os.', opiekun: 'Dział Biletów', status: 'Nowe', statusTone: 'warning', airlines: 'British Airways' },
];

const rows = items.map(item => {
    return `
<tr style="cursor:pointer" data-no-demo="true" data-page="szczegoly_biletow" onclick="window.AppNavigation.setActivePage('szczegoly_biletow', {groupId: '${item.id}'})">
<td><strong>${escapeHtml(item.id)}</strong></td>
<td><strong>${escapeHtml(item.org)}</strong></td>
<td><strong>${escapeHtml(item.dest)}</strong><br><small>${escapeHtml(item.date)}</small></td>
<td>${escapeHtml(item.pax)}</td>
<td>${escapeHtml(item.airlines)}</td>
<td>${escapeHtml(item.opiekun)}</td>
<td>${statusBadge(item.status, item.statusTone)}</td>
<td>
<div style="display:flex;gap:0.4rem;flex-wrap:wrap" onclick="event.stopPropagation()">
${button({ label: 'Szczegóły', variant: 'outline', attrs: { onclick: "window.AppNavigation.setActivePage('szczegoly_biletow', {groupId: '" + item.id + "'})" } })}
</div>
</td>
</tr>`;
}).join('');

return `
${dashboardHeader('Bilety Lotnicze', 'Zarządzanie zapytaniami i rezerwacjami na same bilety lotnicze', [
    button({ label: 'Dodaj zapytanie na bilety', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true' } })
])}

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:1.5rem">
${statCard('Nowe zapytania', '1', 'fa-solid fa-receipt')}
${statCard('W opracowaniu', '1', 'fa-solid fa-clock')}
${statCard('Wystawione', '1', 'fa-solid fa-check-circle')}
</div>

${panel('Lista zamówień', `
<div class="table-responsive">
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Klient</th>
            <th>Kierunek / Termin</th>
            <th>PAX</th>
            <th>Linie lotnicze</th>
            <th>Opiekun</th>
            <th>Status</th>
            <th>Akcje</th>
        </tr>
    </thead>
    <tbody>
        ${rows}
    </tbody>
</table>
</div>
`)}
`;
}

window.BiletyView = { renderBilety };
})();
