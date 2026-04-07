(function () {
  const { button, panel, statusBadge, escapeHtml } = window.SharedUI;
  function renderSzczegolyGrupy() {
/* ===== HOTELS — Egipt Żebrowska ===== */
var hotels = [
{ id: "h1", nights: '3 noce', dates: '24–27.01', miejsce: 'Kair', hotel: 'Azal Pyramids Hotel', adres: 'Al Haram Giza, 12511 Cairo', typ: 'HB', usd: '$7 000', status: 'Wpłacono częściowo', statusTone: 'warning', note: 'Zaliczki w toku', payments: [
    { type: 'Depozyt 1', amount: '$2 000', date: '25.09.2025', method: 'Przelew', status: 'Rozliczone', statusTone: 'success', note: 'Transza I wpłacona' },
    { type: 'Depozyt 2', amount: '$5 000', date: '12.11.2025', method: 'Przelew', status: 'Rozliczone', statusTone: 'success', note: 'Transza II wpłacona' }
]},
{ id: "h2", nights: '1 noc', dates: '27–28.01', miejsce: 'pociąg nocny', hotel: 'Wagon sypialny — trasa Kair–Luksur', adres: '—', typ: '—', usd: '$5 000', status: 'Wpłacono', statusTone: 'success', note: 'Obejmuje prowizję i koszty', payments: [
    { type: 'Dopłata 100%', amount: '$5 000', date: '27.01.2026', method: 'Przelew', status: 'Rozliczone', statusTone: 'success', note: 'Koszty przelewu +40 USD' }
]},
{ id: "h3", nights: '2 noce', dates: '28–30.01', miejsce: 'Hurghada', hotel: 'Bella Vista Hurghada Hotel', adres: 'Sheraton Rd, Hurghada, Red Sea', typ: 'HB', usd: '$15 120', status: 'Oczekuje', statusTone: 'neutral', note: 'Czeka na przelew z biura', payments: [
    { type: 'Reszta kwoty', amount: '$15 120', date: '21.01.2026', method: 'Przelew', status: 'Oczekujące', statusTone: 'neutral', note: 'Dopłata — przelew zaplanowany na 21.01.2026' }
]},
{ id: "h4", nights: '1 noc', dates: '30–31.01', miejsce: 'Kair', hotel: 'Azal Pyramids + wstępy', adres: 'Al Haram, Giza', typ: 'HB', usd: '$9 000', status: 'Cash na miejscu', statusTone: 'warning', note: 'Płatność pilotowi w gotówce', payments: [
    { type: 'Płatność końcowa', amount: '$9 000', date: '30.01.2026', method: 'Gotówka', status: 'Cash na miejscu', statusTone: 'warning', note: 'Rozliczenie w Kairze u pilota' }
]},
];


var hotelRows = hotels.map(function(h) {
var paymentsHtml = '';
if (h.payments && h.payments.length > 0) {
  paymentsHtml = 
    '<table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; background: #ffffff;">' +
      '<thead style="background: rgba(0,0,0,0.02); border-bottom: 1px solid var(--border-color);">' +
        '<tr>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600; padding-left: 1rem;">Typ wpłaty</th>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600;">Kwota</th>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600;">Data / Termin</th>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600;">Sposób zapłaty</th>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600;">Status</th>' +
          '<th style="padding: 0.5rem; text-align: left; font-weight: 600;">Uwagi</th>' +
          '<th style="padding: 0.5rem; text-align: right; font-weight: 600; padding-right: 1rem;">Akcje</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        h.payments.map(function(p) {
          return '<tr>' +
          '<td style="padding: 0.5rem; padding-left: 1rem;">' + escapeHtml(p.type) + '</td>' +
          '<td style="padding: 0.5rem; font-weight: 700; color: var(--primary-color)">' + escapeHtml(p.amount) + '</td>' +
          '<td style="padding: 0.5rem;">' + escapeHtml(p.date) + '</td>' +
          '<td style="padding: 0.5rem;">' + escapeHtml(p.method) + '</td>' +
          '<td style="padding: 0.5rem;">' + statusBadge(p.status, p.statusTone) + '</td>' +
          '<td style="padding: 0.5rem;"><small style="color:var(--text-muted)">' + escapeHtml(p.note || '') + '</small></td>' +
          '<td style="padding: 0.5rem; text-align: right; padding-right: 1rem;">' +
            '<button style="border:none;background:transparent;cursor:pointer;padding:0.25rem;margin-left:0.25rem;" title="Edytuj transzę" onclick="window.showEditPaymentModal(\'' + p.type + '\', \'' + p.amount + '\', \'' + p.date + '\', \'' + p.method + '\', \'' + p.status + '\', \'' + escapeHtml(p.note || '') + '\')"><i class="fa-solid fa-pen" style="font-size:0.9rem; color:var(--text-muted)"></i></button>' +
            '<button style="border:none;background:transparent;cursor:pointer;padding:0.25rem;margin-left:0.25rem;" title="Usuń"><i class="fa-solid fa-trash" style="font-size:0.9rem; color:var(--danger-color)"></i></button>' +
          '</td>' +
          '</tr>';
        }).join('') +
      '</tbody>' +
    '</table>';
}

var modaledHtmlSafe = paymentsHtml.replace(/'/g, "&#39;").replace(/"/g, "&quot;");

return '<tr>' +
'<td style="text-align:center;font-weight:700;font-size:0.8rem">' + escapeHtml(h.dates) + '</td>' +
'<td><span style="font-size:0.75rem;background:#e0e7ff;color:#3730a3;padding:0.1rem 0.4rem;border-radius:4px;font-weight:600">' + escapeHtml(h.nights) + '</span></td>' +
'<td><strong>' + escapeHtml(h.miejsce) + '</strong></td>' +
'<td>' +
'<strong style="font-size:0.82rem">' + escapeHtml(h.hotel) + '</strong>' +
(h.adres !== '—' ? '<br><small style="color:var(--text-muted)">' + escapeHtml(h.adres) + '</small>' : '') +
'</td>' +
'<td style="text-align:center"><span class="type-pill">' + escapeHtml(h.typ) + '</span></td>' +
'<td style="font-weight:700;color:var(--text-main); white-space: nowrap;">' + 
  escapeHtml(h.usd) + 
  (paymentsHtml ? '<button title="Szczegóły płatności" style="border:none;background:transparent;cursor:pointer;padding:0.25rem;margin-left:0.5rem;" onclick="window.showPaymentsModal(this.dataset.html, this.dataset.title)" data-title="' + escapeHtml(h.hotel).replace(/'/g, "&#39;").replace(/"/g, "&quot;") + '" data-html="' + modaledHtmlSafe + '"><i class="fa-solid fa-circle-info" style="font-size:0.9rem; color:var(--primary-color)"></i></button>' : '') +
'</td>' +
'<td>' + statusBadge(h.status, h.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(h.note) + '</small></td>' +
'</tr>';
}).join('');


/* ===== DODATKOWE REZERWACJE ===== */
var dodRez = [
{ ico: 'fa-ship', typ: 'Rejs Nilu (Didanos)', opis: 'Hurghada — rejs wieczorny', termin: '29.01.2026', kwota: '$3 000', waluta: 'USD', status: 'cash na miejscu', statusTone: 'warning', kto: 'Alicja Aziz' },
{ ico: 'fa-monument', typ: 'Wstępy do piramid', opis: 'Kair — 2 firmy lokalne (piramidy Gizy + Sfinks)', termin: '31.01.2026', kwota: '$6 000', waluta: 'USD', status: 'cash na miejscu', statusTone: 'warning', kto: 'Alicja Aziz' },
{ ico: 'fa-bus', typ: 'Autokar lokalny', opis: 'Transport na miejscu — Regency (cały wyjazd)', termin: 'przez cały wyjazd', kwota: 'w cenie hotelu', waluta: '—', status: 'uwzględnione', statusTone: 'success', kto: 'Iza Strzelak' },
{ ico: 'fa-church', typ: 'Msza na lotnisku WAW', opis: 'Lotnisko Chopina — sala odpraw — g. 14:00', termin: '24.01.2026', kwota: 'bezpłatna', waluta: '—', status: 'potwierdzona', statusTone: 'success', kto: 'BOK' },
{ ico: 'fa-radio', typ: 'Radyjka — wysyłka', opis: 'OrlenPaczka: Cichej Łąki 5, Piaseczno', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane 13.02', statusTone: 'success', kto: 'BOK' },
{ ico: 'fa-briefcase', typ: 'Teczki pilota — wysyłka', opis: 'InPost: 603901479635210133492690', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane InPost', statusTone: 'success', kto: 'BOK' },
];
var dodRezRows = dodRez.map(function(r) {
return '<tr>' +
'<td><div style="display:flex;align-items:center;gap:0.5rem">' +
'<div style="width:30px;height:30px;background:var(--primary-light);color:var(--primary-color);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid ' + r.ico + '" style="font-size:0.75rem"></i></div>' +
'<strong style="font-size:0.82rem">' + escapeHtml(r.typ) + '</strong>' +
'</div></td>' +
'<td><small>' + escapeHtml(r.opis) + '</small></td>' +
'<td><small>' + escapeHtml(r.termin) + '</small></td>' +
'<td><strong>' + escapeHtml(r.kwota) + '</strong> <small style="color:var(--text-muted)">' + escapeHtml(r.waluta) + '</small></td>' +
'<td>' + statusBadge(r.status, r.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(r.kto) + '</small></td>' +
'</tr>';
}).join('');

/* ===== HISTORIA ZMIAN ===== */
var historia = [
{ date: '24.01.2026', type: 'info', icon: 'fa-plane-departure', text: 'Wyjazd grupy — Egipt Żebrowska/Lipka. Skład: 44 os. + pilot Alicja Aziz.' },
{ date: '23.01.2026', type: 'payment', icon: 'fa-receipt', text: 'Faktura za zmianę nazwisk LOT opłacona: f.0566/01/26 minus f.k.0080/01/26 = <strong>5 558,40 zł</strong> paid.' },
{ date: '22.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Michał Kosiorek</strong> → wchodzi <strong>Sławomir Zaręba</strong>. Zmiana nazwiska na bilecie (dopłata za zmianę).' },
{ date: '21.01.2026', type: 'payment', icon: 'fa-money-bill-transfer', text: 'Dopłata Hotel Bella Vista Hurghada: <strong>$15 120</strong> — przelew (faktura 0238/01/26/F/BSP 84 406 zł — LOT f.końcowa paid).' },
{ date: '21.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Stefan i Teresa Jaworscy</strong> (2 os.) → wchodzą <strong>Aldona Skrońska</strong> i <strong>Mariusz Kozioł</strong>. Zmiana nazwisk na bilety.' },
{ date: '13.01.2026', type: 'payment', icon: 'fa-circle-check', text: 'Faktura końcowa LOT opłacona: <strong>84 406 zł</strong> (f. 0238/01/26/F/BSP) — LOT paid.' },
{ date: '05.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Alicja Myśliwiec</strong> → wchodzi <strong>Barbara Grzesiak</strong>. Rezygnacja: <strong>Zuzanna Krazy</strong> → wchodzi <strong>Violetta Zdanowska</strong>.' },
{ date: '12.11.2025', type: 'payment', icon: 'fa-receipt', text: 'II depozyt hotelowy (Azal Pyramids): <strong>$5 000</strong> paid (koszty przelewu 40 USD). II depozyt —  pociąg nocny: $5 000.' },
{ date: '25.09.2025', type: 'payment', icon: 'fa-receipt', text: 'I depozyt: <strong>$2 000</strong> → Azal Pyramids Kair.' },
{ date: '29.10.2025', type: 'cancel', icon: 'fa-ban', text: '<strong>Anulacja MT-2026-EG-00</strong> — EGIPT NA SPRZEDAŻ. Powód: nie ma nikogo. Rezerwacja lotu ZVEQA4 anulowana. Podjęta decyzja o nowym terminie.' },
];
var historiaHtml = historia.map(function(e) {
var dotColors = { info: '#3b82f6', payment: '#10b981', change: '#f59e0b', cancel: '#ef4444', add: '#8b5cf6' };
var bgColors = { info: '#eff6ff', payment: '#f0fdf4', change: '#fff7ed', cancel: '#fef2f2', add: '#f5f3ff' };
var col = dotColors[e.type] || '#6b7280';
var bg = bgColors[e.type] || '#f8fafc';
return '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;border-radius:8px;margin-bottom:0.4rem;background:' + bg + '">' +
'<div style="width:30px;height:30px;border-radius:50%;background:' + col + '1a;color:' + col + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
'<i class="fa-solid ' + e.icon + '" style="font-size:0.75rem"></i>' +
'</div>' +
'<div>' +
'<div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;margin-bottom:0.15rem">' + escapeHtml(e.date) + '</div>' +
'<div style="font-size:0.82rem;line-height:1.45">' + e.text + '</div>' +
'</div>' +
'</div>';
}).join('');

/* ===== DOCUMENTS CHECKLIST ===== */
var docs = [
{ name: 'Strona tytułowa', done: true }, { name: 'Program wyjazdu', done: true },
{ name: 'Kosztorys', done: true }, { name: 'Rozpiska dla pilota', done: true },
{ name: 'Lista uczestników', done: true }, { name: 'Rooming list', done: true },
{ name: 'Lista wpłat', done: true }, { name: 'Authority Letter', done: true },
{ name: 'Certyfikat Uniqa', done: true }, { name: 'Ubezpieczenie grupy', done: true },
{ name: 'Bilety lotnicze', done: true }, { name: 'Wjazdówki', done: true },
{ name: 'Msze Święte', done: true }, { name: 'Przewodnicy lokalni', done: true },
{ name: 'Vouchery hotelowe', done: true }, { name: 'Koperty uczestników', done: true },
{ name: 'Lista wsiadania', done: true }, { name: 'Plakat / grafika MS', done: true },
];
var docGrid = docs.map(function(d) {
return '<div class="doc-item ' + (d.done ? 'done' : 'pending') + '">' +
'<i class="fa-solid ' + (d.done ? 'fa-circle-check' : 'fa-circle-xmark') + '"></i>' +
'<span>' + escapeHtml(d.name) + '</span>' +
'</div>';
}).join('');

/* ===== TRIP SEQUENCE (hotel timeline) for Żebrowska ===== */
var hotelSeq = [
{ ikona: 'fa-plane-arrival', kolor: '#3b82f6', dates: '24.01', label: 'Przylot Kair — lotnisko CAI' },
{ ikona: 'fa-hotel', kolor: '#7c3aed', dates: '24–27.01', label: 'Kair — Azal Pyramids Hotel (3 noce, HB)' },
{ ikona: 'fa-train', kolor: '#f59e0b', dates: '27/28.01', label: 'Pociąg nocny — Kair → Luksur (1 noc)' },
{ ikona: 'fa-monument', kolor: '#f59e0b', dates: '28.01', label: 'Zwiedzanie Luksur' },
{ ikona: 'fa-hotel', kolor: '#10b981', dates: '28–30.01', label: 'Hurghada — Bella Vista Hotel (2 noce, HB)' },
{ ikona: 'fa-ship', kolor: '#10b981', dates: '29.01', label: 'Rejs Nilu — Didanos (wieczorny)' },
{ ikona: 'fa-hotel', kolor: '#7c3aed', dates: '30/31.01', label: 'Kair — Azal Pyramids (1 noc) + wstępy do piramid' },
{ ikona: 'fa-plane-departure', kolor: '#3b82f6', dates: '31.01', label: 'Wylot Kair CAI → WAW' },
];
var seqHtml = hotelSeq.map(function(s, i) {
return '<div class="trip-timeline-row">' +
'<div style="display:flex;flex-direction:column;align-items:center;gap:0">' +
'<div style="width:32px;height:32px;border-radius:50%;background:' + s.kolor + '18;color:' + s.kolor + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
'<i class="fa-solid ' + s.ikona + '" style="font-size:0.8rem"></i>' +
'</div>' +
(i < hotelSeq.length - 1 ? '<div style="width:2px;height:18px;background:var(--border-color);margin:2px 0"></div>' : '') +
'</div>' +
'<div style="flex:1;padding-bottom:' + (i < hotelSeq.length - 1 ? '0' : '0') + '">' +
'<span style="font-size:0.72rem;font-weight:700;color:var(--text-muted);margin-right:0.5rem">' + escapeHtml(s.dates) + '</span>' +
'<span style="font-size:0.82rem">' + escapeHtml(s.label) + '</span>' +
'</div>' +
'</div>';
}).join('');

/* ===== KARTA GRUPY — Egipt Żebrowska ===== */
var kartaGrupy = '<div class="group-card-detail">' +
'<div class="group-card-hero">' +
'<div class="group-card-hero-top">' +
'<div>' +
'<div class="group-card-code">MT-2026-EG-01 · Pielgrzymka · Egipt</div>' +
'<h2 class="group-card-title">Egipt — Piramidy, Pociąg Nocny, Hurghada</h2>' +
'<div class="group-card-meta">' +
'<span><i class="fa-solid fa-user-tie"></i> Izabela Żebrowska / ks. Wojciech Lipka</span>' +
'<span><i class="fa-solid fa-calendar"></i> 24–31 stycznia 2026 (7 nocy)</span>' +
'<span><i class="fa-solid fa-location-dot"></i> Egipt — Kair, Luksur, Hurghada</span>' +
'<span><i class="fa-solid fa-user"></i> BOK: Kamila (K) · Bilety: Edyta (E)</span>' +
'</div>' +
'</div>' +
'<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
statusBadge('Zakończona', 'success') +
button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' }) +
'</div>' +
'</div>' +
'<div class="group-card-tabs">' +
'<button class="group-tab active" data-tab="przeglad">Przegląd</button>' +
'<button class="group-tab" data-tab="hotele">Hotele</button>' +
'<button class="group-tab" data-tab="bilety">Bilety lotnicze</button>' +
'<button class="group-tab" data-tab="transport">Transport</button>' +
'<button class="group-tab" data-tab="pasazerowie">Pasażerowie <span class="tab-badge">44</span></button>' +
'<button class="group-tab" data-tab="dod-rezerwacje">Dod. rezerwacje <span class="tab-badge">6</span></button>' +
'<button class="group-tab" data-tab="dokumenty">Dokumenty</button>' +
'<button class="group-tab" data-tab="historia">Historia zmian <span class="tab-badge">10</span></button>' +
'</div>' +
'</div>' +
'<div class="group-card-body">' +
'<div class="group-tab-panel active" data-panel="przeglad">' +
'<div class="group-overview-grid">' +
'<div class="group-info-col">' +
panel({ title: 'Informacje ogólne', body:
'<div class="info-table">' +
'<div class="info-row"><span>Organizatorzy</span><strong>Izabela Żebrowska + ks. Wojciech Lipka</strong></div>' +
'<div class="info-row"><span>Pilot</span><strong>Alicja Aziz</strong></div>' +
'<div class="info-row"><span>Kontrahent (in-dest.)</span><strong>Iza Strzelak (SENT)</strong></div>' +
'<div class="info-row"><span>Kierunek</span><strong>Egipt — Kair · Luksur · Hurghada</strong></div>' +
'<div class="info-row"><span>Termin</span><strong>24–31 stycznia 2026 (7 nocy, 8 dni)</strong></div>' +
'<div class="info-row"><span>Transport główny</span><strong>Samolot LOT (WAW)</strong></div>' +
'<div class="info-row"><span>Autokar na miejscu</span><strong>Regency — całodobowo</strong></div>' +
'<div class="info-row"><span>Msza na lotnisku</span><strong>WAW — 24.01.2026 g. 14:00</strong></div>' +
'<div class="info-row"><span>Transport na lotnisko</span><strong style="color:var(--text-muted)">NIE</strong></div>' +
'<div class="info-row"><span>Autor oferty</span><strong>Ania</strong></div>' +
'<div class="info-row"><span>Gratisy</span><strong>80 USD/os. (karta)</strong></div>' +
'<div class="info-row"><span>Prowizja biuro</span><strong>2%</strong></div>' +
'</div>'
}) +
panel({ title: 'Bilety lotnicze — szczegóły', body:
'<div class="info-table">' +
'<div class="info-row"><span>Bilety grupowe (44 os.)</span><strong style="font-family:monospace">W6Y73A</strong></div>' +
'<div class="info-row"><span>Bilet indywidualny (1 os.)</span><strong style="font-family:monospace">TD236Z</strong></div>' +
'<div class="info-row"><span>Faktura końcowa LOT</span><strong>84 406 zł — f. 0238/01/26/F/BSP</strong></div>' +
'<div class="info-row"><span>Opłacono</span><strong>13.01.2026</strong></div>' +
'<div class="info-row"><span>Faktury za zmiany nazwisk</span><strong>f. 0566 → po odjęciu f.k. 0080 = 5 558,40 zł</strong></div>' +
'<div class="info-row"><span>Zmiana nazwisk paid</span><strong>23.01.2026</strong></div>' +
'</div>' +
'<div style="display:flex;gap:0.5rem;margin-top:0.75rem">' +
button({ label: 'Exportuj bilety PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
button({ label: 'Dodaj korektę', icon: 'fa-solid fa-plus', variant: 'ghost' }) +
'</div>'
}) +
'</div>' +
'<div class="group-status-col">' +
'<div class="group-status-cards">' +
'<div class="group-stat-big">' +
'<span>Uczestnicy (finalne)</span>' +
'<strong>44 / 45</strong>' +
'<div class="big-progress"><div style="width:98%;height:100%;border-radius:5px;background:var(--primary-color)"></div></div>' +
'<small>1 miejsce na gratisa · 3 zmiany uczestników w trakcie</small>' +
'</div>' +
'<div class="group-stat-big accent-green">' +
'<span>Płatności LOT (f. końcowa)</span>' +
'<strong>84 406 zł</strong>' +
'<div class="big-progress"><div style="width:100%;height:100%;border-radius:5px;background:var(--success-color)"></div></div>' +
'<small>Wszystkie faktury opłacone ✓</small>' +
'</div>' +
'<div class="group-stat-big accent-green">' +
'<span>Płatności hotelowe</span>' +
'<strong>$31 120 USD</strong>' +
'<div class="big-progress"><div style="width:100%;height:100%;border-radius:5px;background:var(--success-color)"></div></div>' +
'<small>Dep. + dopłaty + cash na miejscu ✓</small>' +
'</div>' +
'</div>' +
panel({ title: 'Umowy i dokumentacja', body:
'<div class="info-table">' +
'<div class="info-row"><span>Umowy — wysłano</span><strong style="color:var(--success-color)"><i class="fa-solid fa-check"></i> Wysłane</strong></div>' +
'<div class="info-row"><span>Mailingi do p. Leszka</span><strong>12.01.2026</strong></div>' +
'<div class="info-row"><span>Wysyłka radyjek (OrlenPaczka)</span><strong>19.01.2026 · 2102007626042</strong></div>' +
'<div class="info-row"><span>Zwrot radyjek</span><strong style="color:var(--success-color)">InPost odebrany 13.02.2026</strong></div>' +
'<div class="info-row"><span>Wysyłka teczek (InPost)</span><strong>19.01.2026 · 603901...90</strong></div>' +
'<div class="info-row"><span>Zwrot teczek</span><strong style="color:var(--success-color)">InPost odebrany 16.02.2026</strong></div>' +
'</div>'
}) +
'</div>' +  /* end group-status-col */
'</div>' +  /* end group-overview-grid */
'</div>' +  /* end przegląd tab panel */

/* ==== HOTELE tab ==== */
'<div class="group-tab-panel" data-panel="hotele">' +
panel({
  title: 'Hotele i noclegi — Egipt Żebrowska / Lipka · 24–31.01.2026',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Dodaj nocleg', icon: 'fa-solid fa-plus', variant: 'outline' }) +
    button({ label: 'Historia rezerwacji', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost' }) +
    '</div>',
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Daty</th><th>Noce</th><th>Miejscowość</th><th>Hotel / Sposób noclegu</th><th>Typ</th><th>Kwota (USD)</th><th>Status</th><th>Uwagi</th></tr></thead>' +
    '<tbody>' + hotelRows + '</tbody>' +
    '<tfoot><tr><td colspan="4" style="font-weight:700;text-align:right;padding-top:0.75rem">Suma (przelewem + cash)</td><td></td><td style="font-weight:700;color:var(--primary-color)">$36 120 USD</td><td colspan="2"></td></tr></tfoot>' +
    '</table></div>'
}) +
panel({
  title: 'Sekwencja podróży — wizualizacja',
  body: '<div class="trip-timeline" style="padding:0.25rem 0">' + seqHtml + '</div>'
}) +
'</div>' +

/* ==== BILETY tab ==== */
'<div class="group-tab-panel" data-panel="bilety">' +
panel({ title: 'Bilety lotnicze — MT-2026-EG-01', body:
  '<div class="info-table">' +
  '<div class="info-row"><span>Bilety grupowe (44 os.)</span><strong style="font-family:monospace;font-size:1rem">W6Y73A</strong></div>' +
  '<div class="info-row"><span>Bilet indywidualny (1 os.)</span><strong style="font-family:monospace;font-size:1rem">TD236Z</strong></div>' +
  '<div class="info-row"><span>Liczba biletów</span><strong>45 miejsc (44 grup. + 1 ind.)</strong></div>' +
  '<div class="info-row"><span>Przewoźnik</span><strong>LOT — Polskie Linie Lotnicze</strong></div>' +
  '<div class="info-row"><span>Faktura końcowa LOT</span><strong>84 406 zł — f. 0238/01/26/F/BSP</strong></div>' +
  '<div class="info-row"><span>Opłacono</span><strong style="color:var(--success-color)">13.01.2026 ✓</strong></div>' +
  '<div class="info-row"><span>Faktura za zmianę nazwisk</span><strong>f. 0566/01/26/F/BSP = 6 384,12 zł</strong></div>' +
  '<div class="info-row"><span>Korekta (f.k. 0080/01/26)</span><strong>–5 558,40 zł paid 23.01.2026</strong></div>' +
  '<div class="info-row"><span>Potwierdzenie grupy</span><strong>430 zł/gr — f. 250400486 (14.04.2025)</strong></div>' +
  '</div>' +
  '<div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">' +
  button({ label: 'Exportuj bilety PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
  button({ label: 'Dodaj korektę', icon: 'fa-solid fa-plus', variant: 'ghost' }) +
  button({ label: 'Historia zmian biletów', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost' }) +
  '</div>'
}) +
'</div>' +

/* ==== TRANSPORT tab ==== */
'<div class="group-tab-panel" data-panel="transport">' +
panel({ title: 'Transport — szczegóły Egipt 24–31.01.2026', body:
  '<div class="info-table">' +
  '<div class="info-row"><span>Transport główny</span><strong>Samolot LOT — lot czarterowy</strong></div>' +
  '<div class="info-row"><span>Lotnisko wylotu</span><strong>Warszawa WAW — Terminal 2</strong></div>' +
  '<div class="info-row"><span>Msza na lotnisku</span><strong style="color:var(--primary-color)"><i class="fa-solid fa-church"></i> 24.01.2026 g. 14:00 — WAW</strong></div>' +
  '<div class="info-row"><span>Transport na lotnisko</span><strong style="color:var(--text-muted)">NIE — uczestnicy we własnym zakresie</strong></div>' +
  '<div class="info-row"><span>Autokar na miejscu</span><strong>Regency — całodobowo przez cały wyjazd</strong></div>' +
  '<div class="info-row"><span>Kontrahent na miejscu</span><strong>Iza Strzelak (SENT — rooming list 8.01)</strong></div>' +
  '<div class="info-row"><span>Pociąg nocny</span><strong>Kair → Luksur — 27/28.01 (wagony sypialne, $5 000)</strong></div>' +
  '</div>'
}) +
'</div>' +

/* ==== PASAŻEROWIE tab ==== */
'<div class="group-tab-panel" data-panel="pasazerowie">' +
panel({ title: 'Pasażerowie — 44 / 45 (Egipt Żebrowska / Lipka)', action:
  '<div style="display:flex;gap:0.5rem">' +
  button({ label: 'Dodaj pasażera', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: 'event.stopPropagation(); window.showAddPassengerModal()' } }) +
  button({ label: 'Import z Excela', icon: 'fa-solid fa-file-excel', variant: 'outline' }) +
  button({ label: 'Eksport listy', icon: 'fa-solid fa-download', variant: 'ghost' }) +
  '</div>',
  body:
  '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.6rem">' +
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(function(i) {
    var names = ['Alicja Aziz (pilot)','Izabela Żebrowska','ks. Wojciech Lipka','Barbara Grzesiak','Violetta Zdanowska','Aldona Skrońska','Mariusz Kozioł','Sławomir Zaręba','Renata Kowalczyk','Piotr Nowak','Maria Jankowska','Anna Wiśniewska','Tomasz Zieliński','Krystyna Malinowska','Zbigniew Dąbrowski','Helena Pawlak'];
    return '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;background:var(--bg-main);border-radius:7px;border:1px solid var(--border-color)">' +
      '<div style="width:28px;height:28px;background:var(--primary-light);color:var(--primary-color);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.72rem;flex-shrink:0">' + i + '</div>' +
      '<span style="font-size:0.82rem">' + names[i-1] + '</span>' +
      '</div>';
  }).join('') +
  '<div style="display:flex;align-items:center;justify-content:center;padding:0.5rem;background:var(--bg-main);border-radius:7px;border:1px dashed var(--border-color);color:var(--text-muted);font-size:0.78rem;grid-column:span 2">+ 28 kolejnych uczestników</div>' +
  '</div>'
}) +
'</div>' +

/* ==== DODATKOWE REZERWACJE tab ==== */
'<div class="group-tab-panel" data-panel="dod-rezerwacje">' +
panel({
  title: 'Dodatkowe rezerwacje (poza hotelami)',
  action: button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-plus', variant: 'outline' }),
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Typ</th><th>Opis</th><th>Termin</th><th>Kwota</th><th>Status</th><th>Odpowiada</th></tr></thead>' +
    '<tbody>' + dodRezRows + '</tbody>' +
    '</table></div>'
}) +
'</div>' +

/* ==== DOKUMENTY tab ==== */
'<div class="group-tab-panel" data-panel="dokumenty">' +
panel({
  title: 'Dokumenty — lista kontrolna',
  action: '<span style="font-size:0.8rem;color:var(--success-color);font-weight:600"><i class="fa-solid fa-circle-check"></i> 18 / 18 — wszystkie gotowe</span>',
  body: '<div class="doc-checklist">' + docGrid + '</div>'
}) +
'</div>' +

/* ==== HISTORIA ZMIAN tab ==== */
'<div class="group-tab-panel" data-panel="historia">' +
panel({
  title: 'Historia zmian — MT-2026-EG-01 Żebrowska',
  action: button({ label: 'Eksport logu', icon: 'fa-solid fa-download', variant: 'ghost' }),
  body: historiaHtml
}) +
'</div>' +

'</div>' +   /* end group-card-body */
'</div>';    /* end group-card-detail */
    return '<div style="margin-bottom: 1.5rem;"><a href="#" onclick="event.preventDefault(); window.AppNavigation.setActivePage(\'grupy\')" style="color: var(--text-muted, #64748B); text-decoration: none; font-weight: 500; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-arrow-left"></i> Wróć do listy grup</a></div>' + kartaGrupy;
  }
  window.SzczegolyGrupyView = { renderSzczegolyGrupy };
  
    window.showPaymentsModal = function(htmlContent, hotelName) {
    if (!htmlContent) return;
    
    var overlay = document.createElement('div');
    overlay.className = 'demo-modal-overlay';
    // inline fallback in case classes are not strictly sufficient (but they should be defined in CSS for demo-modals)
    
    var closeScript = "this.closest('.demo-modal-overlay').classList.remove('show'); setTimeout(() => this.closest('.demo-modal-overlay').remove(), 250);";
    
    overlay.innerHTML = 
      '<div class="demo-modal" style="max-width: 800px; width: 95%; pointer-events: auto;">' +
        '<div class="demo-modal-header">' +
          '<h2>Rozbicie płatności dla: ' + (hotelName || 'hotelu') + '</h2>' +
          '<button class="demo-modal-close" type="button" onclick="' + closeScript + '">' +
            '<i class="fa-solid fa-xmark"></i>' +
          '</button>' +
        '</div>' +
        '<div class="demo-modal-body" style="background:var(--bg-body, #f8fafc); padding: 0;">' +
          htmlContent +
        '</div>' +
        '<div class="demo-modal-footer">' +
          '<button type="button" class="btn btn-outline" onclick="' + closeScript + '">Zamknij</button>' +
          '<button type="button" class="btn btn-primary" onclick="' + closeScript + '"><i class="fa-solid fa-plus"></i> Dodaj wpłatę</button>' +
        '</div>' +
      '</div>';
      
    document.body.appendChild(overlay);
    
    // Use timeout to allow rendering before adding 'show' for CSS transition
    setTimeout(function() {
      overlay.classList.add('show');
    }, 10);
    
    // Click outside to close (standard behaviour)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 250);
      }
    });
  };


window.showEditPaymentModal = function(type, amount, date, method, status, note) {
  var overlay = document.createElement('div');
  overlay.className = 'demo-modal-overlay';
  overlay.id = 'demo-edit-payment-modal';
  
  var modalHtml = 
    '<div class="demo-modal" style="max-width: 500px; width: 95%;; pointer-events: auto;">' +
      '<div class="demo-modal-header">' +
        '<h2>Edycja transzy wpłaty</h2>' +
        '<button class="demo-modal-close" onclick="document.getElementById(\'demo-edit-payment-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-edit-payment-modal\').remove(), 250);">&times;</button>' +
      '</div>' +
      '<div class="demo-modal-body" style="padding: 1.5rem; background: #fff;">' +
        '<div style="display: flex; flex-direction: column; gap: 1rem;">' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Typ wpłaty</label><input type="text" value="' + type + '" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Kwota</label><input type="text" value="' + amount + '" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Data / Termin</label><input type="text" value="' + (date === 'undefined' ? '' : date) + '" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Sposób zapłaty</label><select style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;">' +
            '<option value="Przelew" ' + (method === 'Przelew' ? 'selected' : '') + '>Przelew</option>' +
            '<option value="Gotówka" ' + (method === 'Gotówka' ? 'selected' : '') + '>Gotówka</option>' +
            '<option value="Karta" ' + (method === 'Karta' ? 'selected' : '') + '>Karta</option>' +
          '</select></div>' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Status</label><select style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;">' +
            '<option value="Rozliczone" ' + (status === 'Rozliczone' ? 'selected' : '') + '>Rozliczone</option>' +
            '<option value="Oczekujące" ' + (status === 'Oczekujące' ? 'selected' : '') + '>Oczekujące</option>' +
            '<option value="Cash na miejscu" ' + (status === 'Cash na miejscu' ? 'selected' : '') + '>Cash na miejscu</option>' +
          '</select></div>' +
          '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Uwagi</label><textarea style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;min-height:60px;">' + (note === 'undefined' ? '' : note) + '</textarea></div>' +
        '</div>' +
      '</div>' +
      '<div class="demo-modal-footer">' +
        '<button onclick="document.getElementById(\'demo-edit-payment-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-edit-payment-modal\').remove(), 250);" class="btn btn-outline" style="margin-right:0.5rem;">Anuluj</button>' +
        '<button onclick="if(confirm(\'Zapisać zmiany?\')) { document.getElementById(\'demo-edit-payment-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-edit-payment-modal\').remove(), 250); }" class="btn btn-primary">Zapisz</button>' +
      '</div>' +
    '</div>';
    
  overlay.innerHTML = modalHtml;
  document.body.appendChild(overlay);
  
  setTimeout(function() {
    overlay.classList.add('show');
  }, 10);
};

window.showAddPassengerModal = function() {
  var overlay = document.createElement('div');
  overlay.className = 'demo-modal-overlay';
  overlay.id = 'demo-add-passenger-modal';
  
  var modalHtml = 
    '<div class="demo-modal" style="max-width: 500px; width: 95%; pointer-events: auto; overflow: visible;">' +
      '<div class="demo-modal-header">' +
        '<h2>Dodaj pasażera</h2>' +
        '<button class="demo-modal-close" onclick="document.getElementById(\'demo-add-passenger-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-add-passenger-modal\').remove(), 250);">&times;</button>' +
      '</div>' +
      '<div class="demo-modal-body" id="passenger-modal-body" style="padding: 1.5rem; background: #fff; min-height: 250px;">' +
        '<div style="display: flex; flex-direction: column; gap: 0.5rem;">' +
          '<label style="font-weight:500;font-size:0.9rem;">Wyszukaj po nazwisku</label>' +
          '<div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: stretch;">' +
            '<div style="position: relative; flex: 1;">' +
              '<i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>' +
              '<input type="text" id="passenger-search-input" placeholder="Wpisz nazwisko..." value="Kowa" style="width:100%;padding:0.6rem 0.6rem 0.6rem 2.2rem;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;" oninput="document.getElementById(\'passenger-dropdown\').style.display = this.value ? \'block\' : \'none\'">' +
              '<div id="passenger-dropdown" style="position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid var(--border-color);border-radius:6px;margin-top:0.25rem;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);z-index:50;">' +
                '<div style="padding:0.5rem 1rem;border-bottom:1px solid var(--border-color);cursor:pointer;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'#fff\'">' +
                  '<div><strong>Jan Kowalski</strong><br><small style="color:var(--text-muted)">92031500000 · jan.kowalski@email.com</small></div>' +
                  '<i class="fa-solid fa-check" style="color:var(--text-muted); font-size:0.8rem; display:none;"></i>' +
                '</div>' +
                '<div style="padding:0.5rem 1rem;border-bottom:1px solid var(--border-color);cursor:pointer;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'#fff\'">' +
                  '<div><strong>Anna Kowalczyk</strong><br><small style="color:var(--text-muted)">88052100000 · a.kowalczyk@email.com</small></div>' +
                '</div>' +
                '<div style="padding:0.5rem 1rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'#fff\'">' +
                  '<div><strong>Michał Kowal</strong><br><small style="color:var(--text-muted)">75010100000 · brak email</small></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button class="btn btn-primary" title="Utwórz nowego klienta" style="padding: 0.6rem 1rem;" data-no-demo="true" onclick="event.stopPropagation(); window.showNewPassengerForm();"><i class="fa-solid fa-plus"></i></button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="demo-modal-footer" id="passenger-modal-footer" style="margin-top:auto;">' +
        '<button onclick="document.getElementById(\'demo-add-passenger-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-add-passenger-modal\').remove(), 250);" class="btn btn-outline" style="margin-right:0.5rem;">Cofnij</button>' +
        '<button onclick="document.getElementById(\'demo-add-passenger-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-add-passenger-modal\').remove(), 250); window.AppNavigation.setActivePage(\'szczegoly_grupy\');" class="btn btn-primary">Zapisz wybranego</button>' +
      '</div>' +
    '</div>';
    
  overlay.innerHTML = modalHtml;
  document.body.appendChild(overlay);
  
  setTimeout(function() {
    overlay.classList.add('show');
  }, 10);
};

window.showNewPassengerForm = function() {
  document.querySelector('#demo-add-passenger-modal h2').innerText = 'Nowy uczestnik / pasażer';
  var body = document.getElementById('passenger-modal-body');
  if (body) {
    var searchVal = document.getElementById('passenger-search-input') ? document.getElementById('passenger-search-input').value : '';
    var split = searchVal.split(' ');
    var name = split[0] || '';
    var last = split.slice(1).join(' ') || (split.length === 1 ? split[0] : '');
    if (split.length === 1) { name = ''; last = split[0]; }
    
    body.innerHTML = 
      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">' +
        '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Imię</label><input type="text" placeholder="Imię" value="' + name + '" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Nazwisko</label><input type="text" placeholder="Nazwisko" value="' + last + '" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Data urodzenia</label><input type="date" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">PESEL / Nr dokumentu</label><input type="text" placeholder="Wpisz numer" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div style="grid-column: span 2;"><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Email</label><input type="email" placeholder="adres@email.com" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div style="grid-column: span 2;"><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Telefon</label><input type="tel" placeholder="+48 XXX XXX XXX" style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"></div>' +
        '<div style="grid-column: span 2;"><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Typ pokoju</label><select style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;"><option>DBL (do uzup.)</option><option>SGL</option><option>TPL</option></select></div>' +
        '<div style="grid-column: span 2;"><label style="display:block;margin-bottom:0.25rem;font-weight:500;font-size:0.9rem;">Uwagi specjalne</label><textarea placeholder="np. Dieta wegetariańska..." style="width:100%;padding:0.5rem;border:1px solid #cbd5e1;border-radius:4px;min-height:60px;"></textarea></div>' +
      '</div>';
  }
  
  var footer = document.getElementById('passenger-modal-footer');
  if (footer) {
    footer.innerHTML = 
      '<button onclick="document.getElementById(\'demo-add-passenger-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-add-passenger-modal\').remove(), 250);" class="btn btn-outline" style="margin-right:0.5rem;">Cofnij</button>' +
      '<button onclick="document.getElementById(\'demo-add-passenger-modal\').classList.remove(\'show\'); setTimeout(() => document.getElementById(\'demo-add-passenger-modal\').remove(), 250); window.AppNavigation.setActivePage(\'szczegoly_grupy\');" class="btn btn-primary">Zapisz i dodaj</button>';
  }
};

})();
