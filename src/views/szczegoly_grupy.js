(function () {
  const { button, panel, statusBadge, escapeHtml, statCard } = window.SharedUI;
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

// Formatowanie informacji o płatnościach
var platnosciInfo = '';
if (h.payments && h.payments.length > 0) {
  platnosciInfo = '<div style="font-size:0.75rem;display:flex;flex-direction:column;gap:0.4rem">';
  h.payments.forEach(function(p) {
    platnosciInfo += '<div style="display:flex;flex-direction:column;gap:0.15rem;padding:0.35rem 0.5rem;background:var(--surface-secondary);border-radius:4px;border-left:3px solid ' + 
      (p.statusTone === 'success' ? 'var(--success-color)' : p.statusTone === 'warning' ? '#f59e0b' : 'var(--text-muted)') + '">' +
      '<div style="display:flex;align-items:center;gap:0.4rem">' +
        '<span style="font-weight:700;color:var(--primary-color)">' + escapeHtml(p.amount) + '</span>' +
        '<span style="color:var(--text-muted);font-size:0.7rem">' + escapeHtml(p.type) + '</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap">' +
        statusBadge(p.status, p.statusTone) +
        '<span style="color:var(--text-muted);font-size:0.7rem">' + escapeHtml(p.method) + '</span>' +
      '</div>' +
    '</div>';
  });
  platnosciInfo += '</div>';
} else {
  platnosciInfo = '<span style="color:var(--text-muted);font-size:0.75rem">—</span>';
}

return '<tr>' +
'<td style="text-align:center;font-weight:700;font-size:0.8rem">' + escapeHtml(h.dates) + '</td>' +
'<td><span style="font-size:0.75rem;background:#e0e7ff;color:#3730a3;padding:0.1rem 0.4rem;border-radius:4px;font-weight:600">' + escapeHtml(h.nights) + '</span></td>' +
'<td><strong>' + escapeHtml(h.miejsce) + '</strong></td>' +
'<td>' +
'<strong style="font-size:0.82rem">' + escapeHtml(h.hotel) + '</strong>' +
(h.adres !== '—' ? '<br><small style="color:var(--text-muted)">' + escapeHtml(h.adres) + '</small>' : '') +
'</td>' +
'<td style="text-align:center"><span class="type-pill">' + escapeHtml(h.typ) + '</span></td>' +
'<td style="font-weight:700;color:var(--text-main);">' + escapeHtml(h.usd) + '</td>' +
'<td>' + platnosciInfo + '</td>' +
'<td>' + statusBadge(h.status, h.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(h.note) + '</small></td>' +
'</tr>';
}).join('');


/* ===== MSZE ŚWIĘTE ===== */
var msze = [
{ ico: 'fa-church', typ: 'Msza na lotnisku WAW', opis: 'Lotnisko Chopina — sala odpraw — g. 14:00', termin: '24.01.2026', kwota: 'bezpłatna', waluta: '—', status: 'potwierdzona', statusTone: 'success', kto: 'BOK' },
];
var mszeRows = msze.map(function(r) {
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

/* ===== DODATKOWE REZERWACJE ===== */
var dodRez = [
{ ico: 'fa-ship', typ: 'Rejs Nilu (Didanos)', opis: 'Hurghada — rejs wieczorny', termin: '29.01.2026', kwota: '$3 000', waluta: 'USD', status: 'cash na miejscu', statusTone: 'warning', kto: 'Alicja Aziz', payments: [
    { type: 'Płatność końcowa', amount: '$3 000', date: '29.01.2026', method: 'Gotówka', status: 'Cash na miejscu', statusTone: 'warning', note: 'Rozliczenie z pilotem Alicją Aziz na miejscu' }
]},
{ ico: 'fa-monument', typ: 'Wstępy do piramid', opis: 'Kair — 2 firmy lokalne (piramidy Gizy + Sfinks)', termin: '31.01.2026', kwota: '$6 000', waluta: 'USD', status: 'Rozłożone płatności', statusTone: 'warning', kto: 'Alicja Aziz', payments: [
    { type: 'Depozyt', amount: '$2 000', date: '15.01.2026', method: 'Przelew', status: 'Rozliczone', statusTone: 'success', note: 'Wpłata zaliczki dla firm lokalnych' },
    { type: 'Dopłata', amount: '$4 000', date: '31.01.2026', method: 'Gotówka', status: 'Cash na miejscu', statusTone: 'warning', note: 'Reszta płatności — pilot na miejscu' }
]},
{ ico: 'fa-bus', typ: 'Autokar lokalny', opis: 'Transport na miejscu — Regency (cały wyjazd)', termin: 'przez cały wyjazd', kwota: 'w cenie hotelu', waluta: '—', status: 'uwzględnione', statusTone: 'success', kto: 'Iza Strzelak', payments: [] },
{ ico: 'fa-radio', typ: 'Radyjka — wysyłka', opis: 'OrlenPaczka: Cichej Łąki 5, Piaseczno', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane 13.02', statusTone: 'success', kto: 'BOK', payments: [] },
{ ico: 'fa-briefcase', typ: 'Teczki pilota — wysyłka', opis: 'InPost: 603901479635210133492690', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane InPost', statusTone: 'success', kto: 'BOK', payments: [] },
];
var dodRezRows = dodRez.map(function(r) {
// Formatowanie informacji o płatnościach
var platnosciInfo = '';
if (r.payments && r.payments.length > 0) {
  platnosciInfo = '<div style="font-size:0.75rem;display:flex;flex-direction:column;gap:0.4rem">';
  r.payments.forEach(function(p) {
    platnosciInfo += '<div style="display:flex;flex-direction:column;gap:0.15rem;padding:0.35rem 0.5rem;background:var(--surface-secondary);border-radius:4px;border-left:3px solid ' + 
      (p.statusTone === 'success' ? 'var(--success-color)' : p.statusTone === 'warning' ? '#f59e0b' : 'var(--text-muted)') + '">' +
      '<div style="display:flex;align-items:center;gap:0.4rem">' +
        '<span style="font-weight:700;color:var(--primary-color)">' + escapeHtml(p.amount) + '</span>' +
        '<span style="color:var(--text-muted);font-size:0.7rem">' + escapeHtml(p.type) + '</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap">' +
        statusBadge(p.status, p.statusTone) +
        '<span style="color:var(--text-muted);font-size:0.7rem">' + escapeHtml(p.method) + '</span>' +
      '</div>' +
    '</div>';
  });
  platnosciInfo += '</div>';
} else {
  platnosciInfo = '<span style="color:var(--text-muted);font-size:0.75rem">—</span>';
}

return '<tr>' +
'<td><div style="display:flex;align-items:center;gap:0.5rem">' +
'<div style="width:30px;height:30px;background:var(--primary-light);color:var(--primary-color);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid ' + r.ico + '" style="font-size:0.75rem"></i></div>' +
'<strong style="font-size:0.82rem">' + escapeHtml(r.typ) + '</strong>' +
'</div></td>' +
'<td><small>' + escapeHtml(r.opis) + '</small></td>' +
'<td><small>' + escapeHtml(r.termin) + '</small></td>' +
'<td><strong>' + escapeHtml(r.kwota) + '</strong> <small style="color:var(--text-muted)">' + escapeHtml(r.waluta) + '</small></td>' +
'<td>' + platnosciInfo + '</td>' +
'<td>' + statusBadge(r.status, r.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(r.kto) + '</small></td>' +
'</tr>';
}).join('');

/* ===== HISTORIA ZMIAN ===== */
var historia = [
{ date: '24.01.2026', type: 'info',    icon: 'fa-plane-departure',      user: 'Alicja Kowalczyk', text: 'Wyjazd grupy — Egipt Żebrowska/Lipka. Skład: 44 os. + pilot Alicja Aziz.' },
{ date: '23.01.2026', type: 'payment', icon: 'fa-receipt',               user: 'Alicja Kowalczyk', text: 'Faktura za zmianę nazwisk LOT opłacona: f.0566/01/26 minus f.k.0080/01/26 = <strong>5 558,40 zł</strong> paid.' },
{ date: '22.01.2026', type: 'change',  icon: 'fa-user-group',            user: 'Marta Nowak',      text: 'Rezygnacja: <strong>Michał Kosiorek</strong> → wchodzi <strong>Sławomir Zaręba</strong>. Zmiana nazwiska na bilecie (dopłata za zmianę).' },
{ date: '21.01.2026', type: 'payment', icon: 'fa-money-bill-transfer',   user: 'Alicja Kowalczyk', text: 'Dopłata Hotel Bella Vista Hurghada: <strong>$15 120</strong> — przelew (faktura 0238/01/26/F/BSP 84 406 zł — LOT f.końcowa paid).' },
{ date: '21.01.2026', type: 'change',  icon: 'fa-user-group',            user: 'Marta Nowak',      text: 'Rezygnacja: <strong>Stefan i Teresa Jaworscy</strong> (2 os.) → wchodzą <strong>Aldona Skrońska</strong> i <strong>Mariusz Kozioł</strong>. Zmiana nazwisk na bilety.' },
{ date: '13.01.2026', type: 'payment', icon: 'fa-circle-check',          user: 'Alicja Kowalczyk', text: 'Faktura końcowa LOT opłacona: <strong>84 406 zł</strong> (f. 0238/01/26/F/BSP) — LOT paid.' },
{ date: '05.01.2026', type: 'change',  icon: 'fa-user-group',            user: 'Marta Nowak',      text: 'Rezygnacja: <strong>Alicja Myśliwiec</strong> → wchodzi <strong>Barbara Grzesiak</strong>. Rezygnacja: <strong>Zuzanna Krazy</strong> → wchodzi <strong>Violetta Zdanowska</strong>.' },
{ date: '12.11.2025', type: 'payment', icon: 'fa-receipt',               user: 'Alicja Kowalczyk', text: 'II depozyt hotelowy (Azal Pyramids): <strong>$5 000</strong> paid (koszty przelewu 40 USD). II depozyt — pociąg nocny: $5 000.' },
{ date: '25.09.2025', type: 'payment', icon: 'fa-receipt',               user: 'Alicja Kowalczyk', text: 'I depozyt: <strong>$2 000</strong> → Azal Pyramids Kair.' },
{ date: '29.10.2025', type: 'cancel',  icon: 'fa-ban',                   user: 'Marta Nowak',      text: '<strong>Anulacja MT-2026-EG-00</strong> — EGIPT NA SPRZEDAŻ. Powód: nie ma nikogo. Rezerwacja lotu ZVEQA4 anulowana. Podjęta decyzja o nowym terminie.' },
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
'<div style="flex:1">' +
'<div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.15rem">' +
'<span style="font-size:0.72rem;color:var(--text-muted);font-weight:600">' + escapeHtml(e.date) + '</span>' +
'<span style="font-size:0.72rem;color:var(--text-muted);display:flex;align-items:center;gap:0.3rem"><i class="fa-solid fa-user" style="font-size:0.65rem"></i>' + escapeHtml(e.user) + '</span>' +
'</div>' +
'<div style="font-size:0.82rem;line-height:1.45">' + e.text + '</div>' +
'</div>' +
'</div>';
}).join('');

/* ===== DOKUMENTY TAB CONTENT: CHECKLIST MOCKUP ===== */
var docs = [
{ name: 'Strona tytułowa', done: true }, { name: 'Program wyjazdu', done: true },
{ name: 'Kosztorys', done: true }, { name: 'Rozpiska dla pilota', done: false },
{ name: 'Lista uczestników', done: true }, { name: 'Rooming list', done: false },
{ name: 'Lista wpłat', done: false }, { name: 'Authority Letter', done: false },
{ name: 'Certyfikat Uniqa', done: true }, { name: 'Ubezpieczenie grupy', done: true },
{ name: 'Bilety lotnicze', done: true }, { name: 'Wjazdówki', done: false },
{ name: 'Msze Święte', done: true }, { name: 'Przewodnicy lokalni', done: true },
{ name: 'Vouchery hotelowe', done: true }, { name: 'Koperta', done: false },
{ name: 'Lista wsiadania', done: true }, { name: 'Prowizje', done: false },
];
var doneCount = docs.filter(function(d) { return d.done; }).length;

var docItems = docs.map(function(d) {
  return '<div class="doc-item ' + (d.done ? 'done' : 'pending') + '">' +
    '<i class="fa-solid ' + (d.done ? 'fa-circle-check' : 'fa-circle-xmark') + '"></i>' +
    '<span>' + escapeHtml(d.name) + '</span>' +
    '<button class="doc-item-remove" title="Usuń">×</button>' +
    '</div>';
}).join('');

var docAddRow =
  '<div id="doc-add-row" style="grid-column:1/-1;display:flex;gap:0.5rem;align-items:center;padding-top:0.25rem;">' +
    '<input id="doc-add-input" type="text" placeholder="Nowa pozycja\u2026" style="width:200px;padding:0.5rem 0.75rem;border:1px solid var(--border-color);border-radius:var(--radius-md);font-size:0.875rem;outline:none;" onkeydown="if(event.key===\'Enter\')this.nextElementSibling.click();">' +
    '<button class="btn btn-primary" data-no-demo="true" onclick="var inp=document.getElementById(\'doc-add-input\');var v=inp.value.trim();if(!v)return;var g=document.getElementById(\'doc-edit-grid\');var el=document.createElement(\'div\');el.className=\'doc-item pending\';var ico=document.createElement(\'i\');ico.className=\'fa-solid fa-circle-xmark\';var sp=document.createElement(\'span\');sp.textContent=v;var rem=document.createElement(\'button\');rem.className=\'doc-item-remove\';rem.title=\'Usu\u0144\';rem.textContent=\'\u00D7\';el.appendChild(ico);el.appendChild(sp);el.appendChild(rem);g.insertBefore(el,document.getElementById(\'doc-add-row\'));inp.value=\'\';"><i class="fa-solid fa-plus"></i> Dodaj</button>' +
  '</div>';

var docGrid =
  '<div id="doc-checklist-wrap" data-editing="0">' +
    '<div id="doc-edit-grid" class="doc-checklist" onclick="(function(e){var item=e.target.closest(\'.doc-item\');if(!item)return;if(e.target.closest(\'.doc-item-remove\')){item.remove();return;}item.classList.toggle(\'done\');item.classList.toggle(\'pending\');var ico=item.querySelector(\'i\');ico.classList.toggle(\'fa-circle-check\');ico.classList.toggle(\'fa-circle-xmark\');})(event)">' +
      docItems + docAddRow +
    '</div>' +
  '</div>';

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

/* ===== PLAN IMPREZY (timeline) ===== */
var planDaysData = [
  {
    day: 1, date: '24.01.2026', title: 'Przelot do Kairu',
    events: [
      { time: '14:00', icon: 'fa-plane-departure', color: '#3b82f6', title: 'Zbiórka na lotnisku (WAW)', desc: 'Spotkanie z pilotem przy stanowisku odpraw. Wydanie dokumentów i sprzętu. Msza św. na lotnisku.' },
      { time: '16:30', icon: 'fa-plane', color: '#8b5cf6', title: 'Wlot do Kairu', desc: 'Lot bezpośredni PLL LOT (LO4KL2).' },
      { time: '21:45', icon: 'fa-plane-arrival', color: '#3b82f6', title: 'Lądowanie', desc: 'Odbiór przez lokalnego kontrahenta, transfer do hotelu Azal Pyramids.' },
      { time: '23:30', icon: 'fa-utensils', color: '#f59e0b', title: 'Późna kolacja', desc: 'Zakwaterowanie w pokojach i kolacja (w formie bufetu / zimna płyta).', hotel: { name: 'Azal Pyramids Hotel', nights: '3 noce', dates: '24–27.01' } }
    ]
  },
  {
    day: 2, date: '25.01.2026', title: 'Piramidy w Gizie',
    events: [
      { time: '07:30', icon: 'fa-mug-hot', color: '#10b981', title: 'Śniadanie', desc: 'Śniadanie w hotelu.', hotel: { name: 'Azal Pyramids Hotel', nights: '3 noce', dates: '24–27.01' } },
      { time: '09:00', icon: 'fa-bus', color: '#64748b', title: 'Wyjazd z hotelu', desc: 'Przejazd pod Piramidy w Gizie z polskojęzycznym przewodnikiem.' },
      { time: '09:30', icon: 'fa-monument', color: '#f59e0b', title: 'Zwiedzanie', desc: 'Zwiedzanie wielkiej trójki piramid oraz posągu Sfinksa.' },
      { time: '14:00', icon: 'fa-utensils', color: '#10b981', title: 'Obiad lokalny', desc: 'Obiad w cenie: tradycyjny falafel i duszona baranina.' },
      { time: '17:00', icon: 'fa-train', color: '#8b5cf6', title: 'Pociąg nocny', desc: 'Zajęcie miejsc w pociągu sypialnym Kair-Luksur. Nocleg (w cenie).', hotel: { name: 'Wagon sypialny — trasa Kair–Luksur', nights: '1 noc', dates: '27–28.01' } }
    ]
  },
  {
    day: 3, date: '26.01.2026', title: 'Luksor i Karnak',
    events: [
      { time: '08:30', icon: 'fa-train-subway', color: '#8b5cf6', title: 'Przyjazd i śniadanie', desc: 'Przyjazd do Luksoru. Śniadanie serwowane w pociągu lub po wyjściu lokalnie.' },
      { time: '10:00', icon: 'fa-monument', color: '#f59e0b', title: 'Świątynie Karnak', desc: 'Kompleks Karnak: Aleja Sfinksów, Wielka Sala Kolumnowa, obeliks.' },
      { time: '14:30', icon: 'fa-bed', color: '#10b981', title: 'Zakwaterowanie i wolne', desc: 'Przejazd autokarem do Hurghady. Bella Vista Hotel.', hotel: { name: 'Bella Vista Resort', nights: '2 noce', dates: '28–30.01' } }
    ]
  }
];

var planHtml = planDaysData.map(function(d) {
  var evs = d.events.map(function(e) {
    return '<div style="position:relative;">' +
      '<div style="position:absolute; left:-1.95rem; top:0.25rem; width:14px; height:14px; border-radius:50%; background:' + e.color + '; border:3px solid #fff; box-shadow:0 0 0 1px var(--border-color)"></div>' +
      '<div style="display:flex; gap:1rem; align-items:flex-start;">' +
        '<div style="font-weight:700; font-size:0.85rem; color:var(--text-muted); width:45px; flex-shrink:0; padding-top:0.15rem;">' + e.time + '</div>' +
        '<div style="flex:1; background:var(--bg-main, #fff); border:1px solid var(--border-color, #e2e8f0); border-radius:8px; padding:0.75rem 1rem; box-shadow:0 1px 2px rgba(0,0,0,0.02); display:flex; justify-content:space-between; align-items:flex-start; transition: border-color 0.2s;" onmouseenter="this.style.borderColor=\'var(--primary-color)\'" onmouseleave="this.style.borderColor=\'var(--border-color)\'">' +
          '<div style="flex:1">' +
            '<h4 style="margin:0 0 0.35rem; font-size:0.9rem; color:var(--text-main); display:flex; align-items:center; gap:0.5rem;">' +
              '<i class="fa-solid ' + e.icon + '" style="color:' + e.color + '"></i> ' + escapeHtml(e.title) +
            '</h4>' +
            '<p style="margin:0; font-size:0.82rem; color:var(--text-muted); line-height:1.45;">' + escapeHtml(e.desc) + '</p>' +
            (e.hotel ? 
              '<div style="margin-top:0.6rem; padding:0.5rem 0.7rem; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; display:flex; align-items:center; gap:0.5rem;">' +
                '<i class="fa-solid fa-bed" style="color:#3b82f6; font-size:0.75rem"></i>' +
                '<div style="flex:1">' +
                  '<div style="font-size:0.8rem; font-weight:600; color:var(--text-main)">' + escapeHtml(e.hotel.name) + '</div>' +
                  '<div style="font-size:0.72rem; color:var(--text-muted)">' + escapeHtml(e.hotel.nights) + ' • ' + escapeHtml(e.hotel.dates) + '</div>' +
                '</div>' +
                '<button class="btn btn-ghost" style="padding:0.2rem 0.4rem; font-size:0.7rem" title="Usuń hotel" data-no-demo="true"><i class="fa-solid fa-xmark"></i></button>' +
              '</div>'
            : '') +
          '</div>' +
          '<div style="display:flex; gap:0.25rem; opacity:0.5; transition:opacity 0.2s; flex-shrink:0" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0.5\'">' +
            (e.hotel ? 
              '<button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.75rem" title="Zmień hotel" data-no-demo="true" onclick="document.getElementById(\'dodaj-hotel-do-punktu-modal\').classList.add(\'show\')"><i class="fa-solid fa-bed"></i></button>' :
              '<button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.75rem" title="Dodaj hotel/nocleg" data-no-demo="true" onclick="document.getElementById(\'dodaj-hotel-do-punktu-modal\').classList.add(\'show\')"><i class="fa-solid fa-bed"></i></button>'
            ) +
            '<button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.75rem" title="Edytuj punkt" data-no-demo="true"><i class="fa-solid fa-pen"></i></button>' +
            '<button class="btn btn-ghost" style="padding:0.25rem 0.4rem; font-size:0.75rem; color:var(--danger-color)" title="Usu\u0144" data-no-demo="true"><i class="fa-solid fa-trash"></i></button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  return '<div style="margin-bottom: 2rem;">' +
    '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-color);">' +
      '<h3 style="margin:0; font-size:1rem; color:var(--text-main); display:flex; align-items:center; gap:0.75rem;">' +
        '<span style="background:var(--primary-light); color:var(--primary-color); padding:0.2rem 0.6rem; border-radius:6px; font-size:0.8rem;">Dzie\u0144 ' + d.day + '</span>' +
        escapeHtml(d.title) +
        '<small style="color:var(--text-muted); font-weight:normal; font-size:0.85rem; margin-left:0.25rem;">' + escapeHtml(d.date) + '</small>' +
      '</h3>' +
      '<div style="display:flex; gap:0.5rem;">' +
        '<button class="btn btn-ghost" style="font-size:0.75rem; padding:0.3rem 0.6rem;" data-no-demo="true"><i class="fa-solid fa-plus"></i> Dodaj punkt</button>' +
        '<button class="btn btn-outline" style="font-size:0.75rem; padding:0.3rem 0.6rem;" data-no-demo="true"><i class="fa-solid fa-pen"></i> Edytuj dzie\u0144</button>' +
      '</div>' +
    '</div>' +
    '<div style="position:relative; padding-left:1.5rem; border-left:2px solid var(--border-color); margin-left:2.5rem; display:flex; flex-direction:column; gap:1rem;">' +
      evs +
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
'<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center">' +
statusBadge('Zakończona', 'success') +
button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('edytuj-impreze-modal').classList.add('show')" } }) +
button({ label: 'Historia zmian', icon: 'fa-solid fa-clock-rotate-left', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('historia-zmian-modal').classList.add('show')" } }) +
'</div>' +
'</div>' +
'<div class="group-card-tabs">' +
'<button class="group-tab active" data-tab="przeglad">Ogólne</button>' +
'<button class="group-tab" data-tab="karta-imprezy">Karta Imprezy <span class="tab-badge" style="background:#f59e0b;color:#fff;font-weight:700">!</span></button>' +
'<button class="group-tab" data-tab="rezerwacje">Uczestnicy <span class="tab-badge">8</span></button>' +
'<button class="group-tab" data-tab="platnosci">Płatności i faktury</button>' +
'<button class="group-tab" data-tab="plan">Plan</button>' +
'<button class="group-tab" data-tab="hotele">Hotele</button>' +
'<button class="group-tab" data-tab="dod-rezerwacje">Dod. rezerwacje <span class="tab-badge">5</span></button>' +
'<button class="group-tab" data-tab="msze">Msze <span class="tab-badge">1</span></button>' +
'<button class="group-tab" data-tab="bilety">Bilety lotnicze</button>' +
'<button class="group-tab" data-tab="transport">Transport</button>' +
'<button class="group-tab" data-tab="teczka-pilota">Teczka pilota</button>' +
'<button class="group-tab" data-tab="rooming">Rooming list</button>' +
'<button class="group-tab" data-tab="dokumenty">Checklista</button>' +
'</div>' +
'</div>' +
'<div class="group-card-body">' +
'<div class="group-tab-panel active" data-panel="przeglad">' +
'<div class="group-overview-grid">' +
'<div class="group-info-col">' +
panel({ title: 'Informacje ogólne', body:
'<div class="info-table">' +
'<div class="info-row"><span>Organizatorzy</span><strong style="display:flex;align-items:center;gap:0.3rem">Izabela Żebrowska + ks. Wojciech Lipka<i class="fa-solid fa-circle-info" style="font-size:0.75rem;color:var(--primary-color);cursor:help" title="Tel: +48 601 123 456&#10;Email: izabela.zebrowska@example.com"></i></strong></div>' +
'<div class="info-row"><span>Pilot</span><strong style="display:flex;align-items:center;gap:0.3rem">Alicja Aziz<i class="fa-solid fa-circle-info" style="font-size:0.75rem;color:var(--primary-color);cursor:help" title="Tel: +48 501 234 567&#10;Email: alicja.aziz@example.com"></i></strong></div>' +
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
panel({ title: 'Bilety lotnicze', body:
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

/* ==== PLAN tab ==== */
'<div class="group-tab-panel" data-panel="plan">' +
panel({
  title: 'Plan imprezy (Podgląd i edycja)',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Rozpiska dla pilota', icon: 'fa-solid fa-file-lines', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('generuj-rozpisku-modal').classList.add('show')" } }) +
    button({ label: 'Zapisz wszystkie zmiany', icon: 'fa-solid fa-save', variant: 'primary', attrs: { 'data-no-demo': 'true' } }) +
    button({ label: 'Dodaj kolejny dzie\u0144', icon: 'fa-solid fa-plus', variant: 'outline', attrs: { 'data-no-demo': 'true' } }) +
  '</div>',
  body: '<div class="plan-days-timeline" style="margin-top:1rem">' +
    planHtml +
  '</div>'
}) +
'</div>' +

/* ==== HOTELE tab ==== */
'<div class="group-tab-panel" data-panel="hotele">' +
panel({
  title: 'Hotele i noclegi — Egipt Żebrowska / Lipka · 24–31.01.2026',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Lista hoteli PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
    '<button class="btn btn-ghost" data-no-demo="true" onclick="document.getElementById(\'hotel-historia-modal\').classList.add(\'show\')"><i class="fa-solid fa-clock-rotate-left"></i> Historia rezerwacji</button>' +
    button({ label: 'Dodaj nocleg', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-nocleg-modal').classList.add('show')" } }) +
    '</div>',
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Daty</th><th>Noce</th><th>Miejscowość</th><th>Hotel / Sposób noclegu</th><th>Typ</th><th>Kwota (USD)</th><th>Płatności</th><th>Status</th><th>Uwagi</th></tr></thead>' +
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
panel({
  title: 'Bilety lotnicze — MT-2026-EG-01',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Eksport PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
    '<button class="btn btn-ghost" data-no-demo="true" onclick="document.getElementById(\'bilety-historia-modal\').classList.add(\'show\')"><i class="fa-solid fa-clock-rotate-left"></i> Historia</button>' +
    button({ label: 'Dodaj bilet', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('nowy-bilet-modal').classList.add('show')" } }) +
  '</div>',
  body:
  '<div class="table-container"><table class="data-table">' +
  '<thead><tr><th>PNR</th><th>Typ</th><th>Przewoźnik</th><th>Trasa</th><th>Data lotu</th><th>Miejsc</th><th>Faktura</th><th>Status</th><th style="width:90px"></th></tr></thead>' +
  '<tbody>' +
  '<tr>' +
    '<td><strong style="font-family:monospace;font-size:0.95rem">W6Y73A</strong></td>' +
    '<td><span class="status-badge info">Grupowy</span></td>' +
    '<td>LOT</td>' +
    '<td>WAW → CAI → WAW</td>' +
    '<td>24.01 / 31.01.2026</td>' +
    '<td>44</td>' +
    '<td><span style="font-size:0.8rem">84\u202f406\u202fzł<br><span style="color:var(--success-color);font-size:0.75rem">op\u0142acona ✓</span></span></td>' +
    '<td>' + statusBadge('Aktywny', 'success') + '</td>' +
    '<td style="white-space:nowrap">' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Szczegóły" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.add(\'show\')"><i class="fa-solid fa-eye"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Edytuj" onclick="document.getElementById(\'edytuj-bilet-modal\').classList.add(\'show\')"><i class="fa-solid fa-pen"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem;color:var(--danger-color)" title="Anuluj PNR"><i class="fa-solid fa-ban"></i></button>' +
    '</td>' +
  '</tr>' +
  '<tr>' +
    '<td><strong style="font-family:monospace;font-size:0.95rem">TD236Z</strong></td>' +
    '<td><span class="status-badge neutral">Indywidualny</span></td>' +
    '<td>LOT</td>' +
    '<td>WAW → CAI → WAW</td>' +
    '<td>24.01 / 31.01.2026</td>' +
    '<td>1</td>' +
    '<td><span style="font-size:0.8rem;color:var(--text-muted)">w f. g\u0142\u00f3wnej</span></td>' +
    '<td>' + statusBadge('Aktywny', 'success') + '</td>' +
    '<td style="white-space:nowrap">' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Szczeg\u00f3\u0142y" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.add(\'show\')"><i class="fa-solid fa-eye"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Edytuj" onclick="document.getElementById(\'edytuj-bilet-modal\').classList.add(\'show\')"><i class="fa-solid fa-pen"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem;color:var(--danger-color)" title="Anuluj PNR"><i class="fa-solid fa-ban"></i></button>' +
    '</td>' +
  '</tr>' +
  '<tr style="opacity:0.5">' +
    '<td><strong style="font-family:monospace;font-size:0.95rem">ZVEQA4</strong></td>' +
    '<td><span class="status-badge neutral">Grupowy</span></td>' +
    '<td>LOT</td>' +
    '<td>WAW → CAI → WAW</td>' +
    '<td>24.01 / 31.01.2026</td>' +
    '<td>40</td>' +
    '<td><span style="font-size:0.8rem;color:var(--text-muted)">anulowana</span></td>' +
    '<td>' + statusBadge('Anulowany', 'danger') + '</td>' +
    '<td style="white-space:nowrap">' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Szczeg\u00f3\u0142y" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.add(\'show\')"><i class="fa-solid fa-eye"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem;opacity:0.4" title="Edytuj" disabled><i class="fa-solid fa-pen"></i></button>' +
      '<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem;color:var(--text-muted)" title="Ju\u017c anulowany" disabled><i class="fa-solid fa-ban"></i></button>' +
    '</td>' +
  '</tr>' +
  '</tbody>' +
  '</table></div>' +
  '<div style="margin-top:0.75rem;padding:0.75rem;background:var(--bg-hover);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-muted);display:flex;gap:2rem;flex-wrap:wrap">' +
    '<span><i class="fa-solid fa-circle-info" style="color:var(--primary-color)"></i> Potwierdzenie grupy: <strong style="color:var(--text-default)">430\u202fz\u0142/gr \u2014 f.\u202f250400486 (14.04.2025)</strong></span>' +
    '<span>Zmiana nazwisk: <strong style="color:var(--text-default)">f.\u202f0566/01/26 \u2212 korekta f.k.\u202f0080/01/26 = 825,72\u202fz\u0142 dop\u0142ata</strong></span>' +
  '</div>'
}) +
panel({ title: 'Uwagi specjalne (Bilety lotnicze)', body:
'<div class="notes-list">' +
'<div class="note-item"><span class="note-group" style="font-size:0.72rem;font-weight:700;color:var(--primary-color);background:var(--primary-light);padding:0.1rem 0.45rem;border-radius:4px">Miejsca</span><p style="margin:0;font-size:0.82rem">Zg\u0142oszono pro\u015bb\u0119 o miejsce przy oknie dla wybranych uczestnik\u00f3w.</p></div>' +
'</div>' +
'<button class="btn btn-ghost" style="margin-top:0.75rem;font-size:0.8rem" data-no-demo="true"><i class="fa-solid fa-plus"></i> Dodaj uwag\u0119</button>'
}) +
'</div>' +

/* ==== NOWY BILET modal ==== */
'<div id="nowy-bilet-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:680px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-plane-departure" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowy PNR \u2014 rezerwacja lot\u00f3w</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'nowy-bilet-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">' +
      '<div class="form-mockup">' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr PNR</span><input type="text" placeholder="np. LO4KL2" style="font-family:monospace;text-transform:uppercase" /></label>' +
          '<label class="form-field"><span>Typ biletu</span>' +
            '<select><option>Grupowy</option><option>Indywidualny</option><option>Czarterowy</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span>' +
          '<select><option>LOT Polish Airlines</option><option>Ryanair</option><option>Wizz Air</option><option>EasyJet</option><option>Turkish Airlines</option><option>Inny</option></select>' +
        '</label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Trasa (tam)</span><input type="text" placeholder="np. KRK \u2192 TLV" /></label>' +
          '<label class="form-field"><span>Trasa (powr\u00f3t)</span><input type="text" placeholder="np. TLV \u2192 KRK" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data lotu (tam)</span><input type="date" /></label>' +
          '<label class="form-field"><span>Data powrotu</span><input type="date" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczeg\u00f3\u0142y rezerwacji</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Liczba miejsc</span><input type="number" min="1" placeholder="np. 44" /></label>' +
          '<label class="form-field"><span>Deadline ticketingu</span><input type="date" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Impreza</span><input type="text" placeholder="np. MT-2026-WL-01" /></label>' +
          '<label class="form-field"><span>Status PNR</span>' +
            '<select><option>Opcja</option><option>Aktywny</option><option>Potwierdzony</option><option>Anulowany</option></select>' +
          '</label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Faktura</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr faktury</span><input type="text" placeholder="np. f.\u202f0238/01/26/F" /></label>' +
          '<label class="form-field"><span>Kwota faktury (z\u0142)</span><input type="number" min="0" step="0.01" placeholder="np. 84406.00" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data op\u0142acenia</span><input type="date" /></label>' +
          '<label class="form-field"><span>Status faktury</span>' +
            '<select><option>Oczekuje</option><option>Op\u0142acona</option><option>Anulowana</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field"><span>Uwagi</span><textarea rows="2" placeholder="Opcjonalne uwagi\u2026"></textarea></label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'nowy-bilet-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== EDYTUJ BILET modal ==== */
'<div id="edytuj-bilet-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:680px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-pen" style="margin-right:0.5rem;color:var(--primary-color)"></i>Edycja PNR \u2014 W6Y73A</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'edytuj-bilet-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">' +
      '<div class="form-mockup">' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr PNR</span><input type="text" value="W6Y73A" style="font-family:monospace;text-transform:uppercase" /></label>' +
          '<label class="form-field"><span>Typ biletu</span>' +
            '<select><option selected>Grupowy</option><option>Indywidualny</option><option>Czarterowy</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span>' +
          '<select><option selected>LOT Polish Airlines</option><option>Ryanair</option><option>Wizz Air</option><option>EasyJet</option><option>Turkish Airlines</option><option>Inny</option></select>' +
        '</label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Trasa (tam)</span><input type="text" value="WAW \u2192 CAI" /></label>' +
          '<label class="form-field"><span>Trasa (powr\u00f3t)</span><input type="text" value="CAI \u2192 WAW" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data lotu (tam)</span><input type="date" value="2026-01-24" /></label>' +
          '<label class="form-field"><span>Data powrotu</span><input type="date" value="2026-01-31" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczeg\u00f3\u0142y rezerwacji</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Liczba miejsc</span><input type="number" value="44" /></label>' +
          '<label class="form-field"><span>Deadline ticketingu</span><input type="date" value="2026-01-10" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Impreza</span><input type="text" value="MT-2026-EG-01" readonly style="background:var(--bg-hover,#f8fafc)" /></label>' +
          '<label class="form-field"><span>Status PNR</span>' +
            '<select><option>Opcja</option><option selected>Aktywny</option><option>Potwierdzony</option><option>Anulowany</option></select>' +
          '</label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Faktura</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr faktury</span><input type="text" value="f.\u202f0238/01/26/F/BSP" /></label>' +
          '<label class="form-field"><span>Kwota faktury (z\u0142)</span><input type="number" value="84406" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data op\u0142acenia</span><input type="date" value="2026-01-13" /></label>' +
          '<label class="form-field"><span>Status faktury</span>' +
            '<select><option>Oczekuje</option><option selected>Op\u0142acona</option><option>Anulowana</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field"><span>Uwagi</span><textarea rows="2"></textarea></label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'edytuj-bilet-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Zapisz zmiany', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== SZCZEG\u00d3\u0141Y BILETU modal (read-only) ==== */
'<div id="szczegoly-bilet-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:680px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-ticket" style="margin-right:0.5rem;color:var(--primary-color)"></i>Szczeg\u00f3\u0142y biletu \u2014 W6Y73A</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">' +
      '<div class="form-mockup">' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Nr PNR</span><p style="margin:0.3rem 0 0;font-size:0.92rem;font-weight:700;font-family:monospace;color:var(--text-default)">W6Y73A</p></div>' +
          '<div class="form-field"><span>Typ biletu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">Grupowy</p></div>' +
        '</div>' +
        '<div class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">LOT Polish Airlines</p></div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Trasa (tam)</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">WAW \u2192 CAI</p></div>' +
          '<div class="form-field"><span>Trasa (powr\u00f3t)</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">CAI \u2192 WAW</p></div>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Data lotu (tam)</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">24.01.2026</p></div>' +
          '<div class="form-field"><span>Data powrotu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">31.01.2026</p></div>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczeg\u00f3\u0142y rezerwacji</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Liczba miejsc</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">44</p></div>' +
          '<div class="form-field"><span>Deadline ticketingu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">10.01.2026</p></div>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Impreza</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">MT-2026-EG-01 \u2014 Egipt</p></div>' +
          '<div class="form-field"><span>Status PNR</span><p style="margin:0.3rem 0 0">' + statusBadge('Aktywny', 'success') + '</p></div>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Faktura</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Nr faktury</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">f.\u202f0238/01/26/F/BSP</p></div>' +
          '<div class="form-field"><span>Kwota faktury</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">84\u202f406\u202fz\u0142</p></div>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<div class="form-field"><span>Data op\u0142acenia</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">13.01.2026</p></div>' +
          '<div class="form-field"><span>Status faktury</span><p style="margin:0.3rem 0 0">' + statusBadge('Op\u0142acona', 'success') + '</p></div>' +
        '</div>' +
        '<div class="form-field"><span>Uwagi</span><p style="margin:0.3rem 0 0;font-size:0.875rem;color:var(--text-muted);font-style:italic">Brak uwag.</p></div>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.remove(\'show\')">Zamknij</button>' +
      '<button class="btn btn-primary" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-bilet-modal\').classList.remove(\'show\');setTimeout(function(){document.getElementById(\'edytuj-bilet-modal\').classList.add(\'show\')},200)"><i class="fa-solid fa-pen"></i> Edytuj</button>' +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== BILETY HISTORIA modal ==== */
'<div id="bilety-historia-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:660px;width:95%;">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-clock-rotate-left" style="margin-right:0.5rem;color:var(--primary-color)"></i>Historia zmian bilet\u00f3w \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" onclick="document.getElementById(\'bilety-historia-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="padding:1.5rem;max-height:70vh;overflow-y:auto;display:flex;flex-direction:column;gap:0.4rem">' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fed7aa;color:#c2410c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">23.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Faktura za zmian\u0119 nazwisk op\u0142acona: f.\u202f0566/01/26 minus korekta f.k.\u202f0080/01/26 = <strong>5\u202f558,40\u202fz\u0142</strong> paid.</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fed7aa;color:#c2410c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">22.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">Zmiana nazwiska na bilecie PNR <strong>W6Y73A</strong>: Micha\u0142 Kosiorek \u2192 S\u0142awomir Zar\u0119ba. Wys\u0142ano wniosek do LOT.</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fed7aa;color:#c2410c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">21.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">Zmiana nazwisk na PNR <strong>W6Y73A</strong>: Jaworscy (2\u202fos.) \u2192 Skro\u0144ska + Kozio\u0142. \u0141\u0105czna dop\u0142ata za zmiany.</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#f0fdf4;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#d1fae5;color:#166534;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-receipt" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">13.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Faktura ko\u0144cowa LOT op\u0142acona: <strong>84\u202f406\u202fz\u0142</strong> (f.\u202f0238/01/26/F/BSP). Status PNR W6Y73A i TD236Z \u2192 Op\u0142acony.</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fef2f2;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fecaca;color:#991b1b;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-ban" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">29.10.2025</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">PNR <strong>ZVEQA4</strong> anulowany \u2014 likwidacja imprezy MT-2026-EG-00. LOT potwierdzi\u0142 anulacj\u0119 bez kosztów.</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#eff6ff;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-plane" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">14.04.2025</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Potwierdzenie grupy LOT: PNR <strong>W6Y73A</strong> (44 miejsc) + <strong>TD236Z</strong> (1 miejsce). Op\u0142ata potwierdzenia 430\u202fz\u0142/gr \u2014 f.\u202f250400486.</div></div>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      button({ label: 'Eksport logu', icon: 'fa-solid fa-download', variant: 'ghost' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== TRANSPORT tab ==== */
'<div class="group-tab-panel" data-panel="transport">' +
panel({ title: 'Transport — szczegóły Egipt 24–31.01.2026',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Dodaj element', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-transport-modal').classList.add('show')" } }) +
  '</div>',
  body:
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

/* ==== REZERWACJE tab ==== */
'<div class="group-tab-panel" data-panel="rezerwacje">' +
(function(button, panel, statCard, statusBadge, escapeHtml) {
	var rez_participants = [
		{ lp: 1, name: 'Wiśniewski Adam',         pesel: '75010***** (Ppkt 37)', room: 'DBL 101',  flight: 'LO4KL2', paid: 4990, total: 4990, foreignPaid: 100, foreignTotal: 100, foreignCurrency: "USD", balance: 0,     contract: 'Podpisana', docs: 'OK',             status: 'Kompletny',   statusTone: 'success' },
		{ lp: 2, name: 'Wiśniewska Maria',         pesel: '78032***** (Ppkt 38)', room: 'DBL 101',  flight: 'LO4KL2', paid: 4990, total: 4990, foreignPaid: 100, foreignTotal: 100, foreignCurrency: "USD", balance: 0,     contract: 'Podpisana', docs: 'OK',             status: 'Kompletny',   statusTone: 'success' },
		{ lp: 3, name: 'ks. Jan Kowalczyk',        pesel: '69045***** (Ppkt 30)', room: 'SGL 105',  flight: 'LO4KL2', paid: 0,    total: 0,    foreignPaid: 0, foreignTotal: 0, foreignCurrency: "USD", balance: 0,     contract: 'Podpisana', docs: 'OK',             status: 'Gratis',      statusTone: 'purple'  },
		{ lp: 4, name: 'Nowak Barbara',            pesel: '82071***** (Ppkt 55)', room: 'SGL+ 203', flight: 'LO4KL2', paid: 3500, total: 5880, foreignPaid: 0, foreignTotal: 150, foreignCurrency: "USD", balance: -2380, contract: 'Podpisana', docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
		{ lp: 5, name: 'Zielińska Anna',           pesel: '91120***** (Ppkt 34)', room: 'DBL 204',  flight: 'LO4KL2', paid: 2000, total: 4990, foreignPaid: 0, foreignTotal: 100, foreignCurrency: "USD", balance: -2990, contract: 'Wysłana',  docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
		{ lp: 6, name: 'Zieliński Marek',          pesel: '88093***** (Ppkt 38)', room: 'DBL 204',  flight: 'LO4KL2', paid: 4990, total: 4990, foreignPaid: 100, foreignTotal: 100, foreignCurrency: "USD", balance: 0,     contract: 'Podpisana', docs: 'Weryfikacja',    status: 'Dokumenty',   statusTone: 'info'    },
		{ lp: 7, name: 'Malczewski Tomasz',        pesel: '95060***** (Ppkt 30)', room: 'DBL 301',  flight: 'LO4KL3', paid: 0,    total: 4990, foreignPaid: 0, foreignTotal: 100, foreignCurrency: "USD", balance: -4990, contract: 'Brak',     docs: 'Brak',           status: 'Brak wpłaty', statusTone: 'danger'  },
		{ lp: 8, name: 'Malczewska Ewa',           pesel: '97110***** (Ppkt 28)', room: 'DBL 301',  flight: 'LO4KL3', paid: 0,    total: 4990, foreignPaid: 0, foreignTotal: 100, foreignCurrency: "USD", balance: -4990, contract: 'Brak',     docs: 'Brak',           status: 'Brak wpłaty', statusTone: 'danger'  },
	];
	        var rez_rows = rez_participants.map(function(p) {
                var docsOk = p.docs === 'OK';
                
                return '<tr>' +
                        '<td style="text-align:center;font-weight:600;color:var(--text-muted);font-size:0.8rem">' + p.lp + '</td>' +
                        '<td>' +
          '<div style="font-weight:600;font-size:0.83rem">' + escapeHtml(p.name) + '</div>' +
          '<div style="color:var(--text-muted);font-size:0.72rem">' + (p.age||45) + ' lat &bull; ' + escapeHtml(p.city||'Warszawa') + '</div>' +
'</td>' +
                        '<td><span class="room-pill">' + escapeHtml(p.room) + '</span></td>' +
                        '<td><code style="font-size:0.78rem">' + escapeHtml(p.flight) + '</code></td>' +
                        '<td style="text-align:right;font-weight:600;font-size:0.83rem">' + (p.total > 0 ? p.total.toLocaleString('pl-PL') + ' zł' : '<span style="color:var(--text-muted)">Gratis</span>') + '</td>' +
                        '<td style="text-align:right;font-weight:600;font-size:0.83rem;color:var(--text-muted)">' + (p.foreignTotal > 0 ? p.foreignTotal.toLocaleString('pl-PL') + ' USD' : '—') + '</td>' +
                        '<td style="text-align:right;color:var(--success-color);font-weight:600;font-size:0.83rem">' + (p.paid > 0 ? p.paid.toLocaleString('pl-PL') + ' zł' : '—') + '</td>' +
                        '<td style="text-align:right;color:var(--success-color);font-weight:600;font-size:0.83rem">' + (p.foreignPaid > 0 ? p.foreignPaid.toLocaleString('pl-PL') + ' USD' : (p.foreignTotal > 0 ? '0 USD' : '—')) + '</td>' +
			'<td style="text-align:right;font-weight:700;font-size:0.83rem;color:' + (p.balance < 0 ? 'var(--danger-color)' : 'var(--success-color)') + '">' +
				(p.balance < 0 ? p.balance.toLocaleString('pl-PL') + ' zł' : (p.total > 0 ? '<i class="fa-solid fa-check"></i>' : '—')) +
			'</td>' +
			'<td>' + statusBadge(p.contract === 'Podpisana' ? 'Podpisana ✓' : p.contract, p.contract === 'Podpisana' ? 'success' : p.contract === 'Wysłana' ? 'info' : 'neutral') + '</td>' +
			'<td>' + (docsOk
				? '<span style="color:var(--success-color);font-size:0.8rem"><i class="fa-solid fa-check-circle"></i> OK</span>'
				: '<span style="color:var(--warning-color);font-size:0.8rem"><i class="fa-solid fa-triangle-exclamation"></i> ' + escapeHtml(p.docs) + '</span>') + '</td>' +
			'<td>' + statusBadge(p.status, p.statusTone) + '</td>' +
			'<td style="white-space:nowrap">' +
				'<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Szczeg\u00f3\u0142y" onclick="document.getElementById(\'szczegoly-uczestnika-modal\').classList.add(\'show\')"><i class="fa-solid fa-eye"></i></button>' +
				'<button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" data-no-demo="true" title="Edytuj" onclick="document.getElementById(\'edytuj-uczestnika-modal\').classList.add(\'show\')"><i class="fa-solid fa-pen"></i></button>' +
			'</td>' +
		'</tr>';
	}).join('');
	return (
		panel({
			title: 'Rezerwacje uczestników',
			action: '<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
				'<select class="inline-select"><option>Wszyscy</option><option>Nieopłaceni</option><option>Brak dokumentów</option><option>Brak umowy</option></select>' +
				button({ label: 'Lista do biletowania', icon: 'fa-solid fa-list', variant: 'outline' }) +
				button({ label: 'Export', icon: 'fa-solid fa-download', variant: 'ghost', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('export-modal').classList.add('show')" } }) +
				button({ label: 'Dodaj uczestnika', icon: 'fa-solid fa-user-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-uczestnika-modal').classList.add('show')" } }) +
			'</div>',
			body: '<div class="table-container"><table class="data-table">' +
				'<thead><tr>' +
					'<th style="text-align:center">Lp</th>' +
					'<th>Uczestnik</th>' +
					'<th>Pokój</th>' +
					'<th>Nr lotu</th>' +
					'<th style="text-align:right">Wartość (PLN)</th>' +
                                        '<th style="text-align:right">Wartość (USD)</th>' +
                                        '<th style="text-align:right">Wpłacono (PLN)</th>' +
                                        '<th style="text-align:right">Wpłacono (USD)</th>' +
					'<th style="text-align:right">Saldo</th>' +
					'<th>Umowa</th>' +
					'<th>Dokumenty</th>' +
					'<th>Status</th>' +
					'<th></th>' +
				'</tr></thead>' +
				'<tbody>' + rez_rows + '</tbody>' +
			'</table></div>'
		})
	);
})(button, panel, statCard, statusBadge, escapeHtml) +
'</div>' +

/* ==== TECZKA PILOTA tab ==== */
'<div class="group-tab-panel" data-panel="teczka-pilota">' +
'<div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem">' +
'<div style="display:flex;flex-direction:column;gap:1.25rem">' +
panel({ 
  title: 'Zawartość teczki', 
  body: 
    '<div class="teczka-sections">' +
      '<button class="teczka-section active"><i class="fa-solid fa-address-card"></i> Strona tytułowa</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-users"></i> Lista uczestników (44)</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-bed"></i> Rooming list</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-route"></i> Program wyjazdu</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-calculator"></i> Kosztorys pilota</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-money-bills"></i> Wpłaty na miejscu</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-shield-halved"></i> Polisy ubezpieczeniowe</button>' +
      '<button class="teczka-section"><i class="fa-solid fa-file-pen"></i> Authority Letter</button>' +
    '</div>' +
    '<div style="margin-top:1rem">' +
      button({ label: 'Generuj teczkę PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('generuj-teczke-pilota-modal').classList.add('show')" } }) +
    '</div>'
}) +
panel({ 
  title: 'Wersje teczki', 
  body: 
    '<div class="version-list">' +
      '<div class="version-row active"><span class="version-badge">v2 · Bieżąca</span><div><small>15.01.2026, 11:20</small><p>Aktualizacja uczestników</p></div></div>' +
      '<div class="version-row"><span class="version-badge old">v1</span><div><small>20.09.2025</small><p>Pierwsza wersja</p></div></div>' +
    '</div>'
}) +
'</div>' +
panel({ 
  title: '📄 Podgląd — Strona tytułowa',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Generuj teczkę PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('generuj-teczke-pilota-modal').classList.add('show')" } }) +
    button({ label: 'Wyślij do pilota', icon: 'fa-solid fa-paper-plane', attrs: { 'data-no-demo': 'true' } }) +
  '</div>',
  body: 
    '<div class="teczka-preview">' +
      '<div class="teczka-header-block">' +
        '<div class="teczka-logo-placeholder">MATTEO TRAVEL</div>' +
        '<h1>TECZKA PILOTA</h1>' +
        '<h2>Egipt — Piramidy, Pociąg Nocny, Hurghada</h2>' +
        '<div class="teczka-meta-grid">' +
          '<div><span>Kod imprezy:</span><strong>MT-2026-EG-01</strong></div>' +
          '<div><span>Termin:</span><strong>24–31.01.2026 (7 nocy, 8 dni)</strong></div>' +
          '<div><span>Organizator:</span><strong>Izabela Żebrowska + ks. Wojciech Lipka</strong></div>' +
          '<div><span>Parafia:</span><strong>—</strong></div>' +
          '<div><span>Pilot:</span><strong>Alicja Aziz</strong></div>' +
          '<div><span>Uczestnicy:</span><strong>44 osoby (+ pilot)</strong></div>' +
          '<div><span>Lot out:</span><strong>LOT LO4KL2 WAW→CAI, 24.01 godz. 16:30</strong></div>' +
          '<div><span>Lot return:</span><strong>LOT — 31.01.2026</strong></div>' +
          '<div><span>Hotele:</span><strong>Azal Pyramids (3n) + Pociąg nocny (1n) + Bella Vista (2n) + Azal Pyramids (1n)</strong></div>' +
          '<div><span>Ubezpieczenie:</span><strong>Allianz Travel, polisa gr. MT/2026/EG01</strong></div>' +
          '<div><span>Kontakt biuro:</span><strong>Kamila W. (BOK) · 601 234 567</strong></div>' +
          '<div><span>Wygenerowano:</span><strong>15.01.2026 · wersja 2</strong></div>' +
        '</div>' +
      '</div>' +
      '<div class="teczka-alert">' +
        '<i class="fa-solid fa-triangle-exclamation"></i>' +
        'Dokument zawiera dane osobowe uczestników. Nie udostępniać osobom nieupoważnionym.' +
      '</div>' +
    '</div>'
}) +
'</div>' +
'</div>' +

/* ==== PŁATNOŚCI I FAKTURY tab ==== */
'<div class="group-tab-panel" data-panel="platnosci">' +
panel({
	title: 'Płatności i faktury',
	action: '<div style="display:flex;gap:0.5rem">' +
		button({ label: 'Dodaj płatność', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true' } }) +
	'</div>',
	body: '<div style="padding:2rem;text-align:center;color:var(--text-muted)">' +
		'<i class="fa-solid fa-file-invoice-dollar" style="font-size:3rem;color:var(--border-color);margin-bottom:1rem"></i>' +
		'<p style="margin:0;font-size:0.9rem">Treść zakładki zostanie dodana wkrótce</p>' +
	'</div>'
}) +
'</div>' +

/* ==== ROOMING LIST tab ==== */
'<div class="group-tab-panel" data-panel="rooming">' +
panel({
	title: 'Rooming list',
	action: '<div style="display:flex;gap:0.5rem">' +
		button({ label: 'Export PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
		button({ label: 'Export', icon: 'fa-solid fa-download', variant: 'outline' }) +
	'</div>',
	body: '<div class="table-container"><table class="data-table">' +
		'<thead><tr>' +
			'<th>Pokój</th>' +
			'<th>Typ</th>' +
			'<th>Uczestnik 1</th>' +
			'<th>Uczestnik 2</th>' +
			'<th>Uwagi</th>' +
			'<th>Status</th>' +
		'</tr></thead>' +
		'<tbody>' +
		'<tr>' +
			'<td><strong>101</strong></td><td>DBL</td>' +
			'<td>Wiśniewski Adam<br><small style="color:var(--text-muted)">75010*****</small></td>' +
			'<td>Wiśniewska Maria<br><small style="color:var(--text-muted)">78032*****</small></td>' +
			'<td>—</td>' +
			'<td>' + statusBadge('Kompletny', 'success') + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td><strong>105</strong></td><td>SGL</td>' +
			'<td>ks. Jan Kowalczyk<br><small style="color:var(--text-muted)">69045*****</small></td>' +
			'<td style="color:var(--text-muted);font-style:italic">—</td>' +
			'<td><span style="color:var(--purple-color,#7c3aed);font-size:0.78rem"><i class="fa-solid fa-circle-info"></i> Gratis</span></td>' +
			'<td>' + statusBadge('Kompletny', 'success') + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td><strong>203</strong></td><td>SGL+</td>' +
			'<td>Nowak Barbara<br><small style="color:var(--text-muted)">82071*****</small></td>' +
			'<td style="color:var(--text-muted);font-style:italic">—</td>' +
			'<td><span style="color:var(--warning-color);font-size:0.78rem"><i class="fa-solid fa-triangle-exclamation"></i> Dopłata za SGL — czeka</span></td>' +
			'<td>' + statusBadge('Nieopłacony', 'warning') + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td><strong>204</strong></td><td>DBL</td>' +
			'<td>Zielińska Anna<br><small style="color:var(--text-muted)">91120*****</small></td>' +
			'<td>Zieliński Marek<br><small style="color:var(--text-muted)">88093*****</small></td>' +
			'<td>—</td>' +
			'<td>' + statusBadge('Dokumenty', 'info') + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td><strong>301</strong></td><td>DBL</td>' +
			'<td>Malczewski Tomasz<br><small style="color:var(--text-muted)">95060*****</small></td>' +
			'<td>Malczewska Ewa<br><small style="color:var(--text-muted)">97110*****</small></td>' +
			'<td><span style="color:var(--danger-color);font-size:0.78rem"><i class="fa-solid fa-triangle-exclamation"></i> Brak wpłaty</span></td>' +
			'<td>' + statusBadge('Brak wpłaty', 'danger') + '</td>' +
		'</tr>' +
		'<tr style="opacity:0.5">' +
			'<td><strong>302</strong></td><td>DBL</td>' +
			'<td style="color:var(--text-muted);font-style:italic">Wolne</td>' +
			'<td style="color:var(--text-muted);font-style:italic">—</td>' +
			'<td>—</td>' +
			'<td>' + statusBadge('Wolne', 'neutral') + '</td>' +
		'</tr>' +
		'<tr style="opacity:0.5">' +
			'<td><strong>303</strong></td><td>DBL</td>' +
			'<td style="color:var(--text-muted);font-style:italic">Wolne</td>' +
			'<td style="color:var(--text-muted);font-style:italic">—</td>' +
			'<td>—</td>' +
			'<td>' + statusBadge('Wolne', 'neutral') + '</td>' +
		'</tr>' +
	'</tbody>' +
	'</table></div>'
}) +
panel({ title: 'Uwagi specjalne (Rooming & Dieta)', body:
'<div class="notes-list">' +
'<div class="note-item"><span class="note-group" style="font-size:0.72rem;font-weight:700;color:var(--primary-color);background:var(--primary-light);padding:0.1rem 0.45rem;border-radius:4px">Dieta</span><p style="margin:0;font-size:0.82rem">1 uczestnik \u2014 alergia na gluten (wszystkie hotele).</p></div>' +
'<div class="note-item" style="margin-top:0.5rem"><span class="note-group" style="font-size:0.72rem;font-weight:700;color:var(--warning-color);background:#fff7ed;padding:0.1rem 0.45rem;border-radius:4px">Logistyka</span><p style="margin:0;font-size:0.82rem">Rooming list wys\u0142any do hoteli 8.01.2026 (Iza Strzelak SENT).</p></div>' +
'</div>' +
'<button class="btn btn-ghost" style="margin-top:0.75rem;font-size:0.8rem" data-no-demo="true"><i class="fa-solid fa-plus"></i> Dodaj uwag\u0119</button>'
}) +
'</div>' +

/* ==== DODATKOWE REZERWACJE tab ==== */
'<div class="group-tab-panel" data-panel="dod-rezerwacje">' +
panel({
  title: 'Dodatkowe rezerwacje (poza hotelami)',
  action: button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-rez-modal').classList.add('show')" } }),
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Typ</th><th>Opis</th><th>Termin</th><th>Kwota</th><th>Płatności</th><th>Status</th><th>Odpowiada</th></tr></thead>' +
    '<tbody>' + dodRezRows + '</tbody>' +
    '</table></div>'
}) +
panel({
  title: 'Atrakcje i wst\u0119py grupowe',
  action: '<button class="btn btn-primary" data-no-demo="true"><i class="fa-solid fa-plus"></i> Dodaj atrakcj\u0119</button>',
  body:
    '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Atrakcja / Wst\u0119p</th><th>Data</th><th>Liczba os.</th><th>Kwota</th><th>Status</th><th>Uwagi</th><th style="width:60px"></th></tr></thead>' +
    '<tbody>' +
    '<tr>' +
      '<td><strong>Wst\u0119py do piramid Gizy + Sfinks</strong></td>' +
      '<td>31.01.2026</td>' +
      '<td>44</td>' +
      '<td><strong style="color:var(--primary-color)">$6 000</strong> <small style="color:var(--text-muted)">USD</small></td>' +
      '<td>' + statusBadge('Cash na miejscu', 'warning') + '</td>' +
      '<td><small style="color:var(--text-muted)">2 firmy lokalne — Alicja Aziz</small></td>' +
      '<td><button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" title="Edytuj"><i class="fa-solid fa-pen"></i></button></td>' +
    '</tr>' +
    '<tr>' +
      '<td><strong>Rejs Nilu — Didanos (wieczorny)</strong></td>' +
      '<td>29.01.2026</td>' +
      '<td>44</td>' +
      '<td><strong style="color:var(--primary-color)">$3 000</strong> <small style="color:var(--text-muted)">USD</small></td>' +
      '<td>' + statusBadge('Cash na miejscu', 'warning') + '</td>' +
      '<td><small style="color:var(--text-muted)">Alicja Aziz</small></td>' +
      '<td><button class="btn btn-ghost" style="padding:0.25rem 0.5rem;font-size:0.78rem" title="Edytuj"><i class="fa-solid fa-pen"></i></button></td>' +
    '</tr>' +
    '</tbody>' +
    '<tfoot><tr><td colspan="3" style="font-weight:700;text-align:right;padding-top:0.75rem">Suma atrakcji</td><td style="font-weight:700;color:var(--primary-color)">$9 000 USD</td><td colspan="3"></td></tr></tfoot>' +
    '</table></div>'
}) +
'</div>' +

/* ==== MSZE tab ==== */
'<div class="group-tab-panel" data-panel="msze">' +
panel({
  title: 'Msze Święte',
  action: button({ label: 'Dodaj mszę', icon: 'fa-solid fa-plus', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-msza-modal').classList.add('show')" } }),
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Typ</th><th>Opis</th><th>Termin</th><th>Kwota</th><th>Status</th><th>Odpowiada</th></tr></thead>' +
    '<tbody>' + mszeRows + '</tbody>' +
    '</table></div>'
}) +
'</div>' +

/* ==== DOKUMENTY tab ==== */
'<div class="group-tab-panel" data-panel="dokumenty">' +
panel({
  title: 'Checklista — lista kontrolna',
  action: '<span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;margin-right:0.75rem"><i class="fa-solid fa-circle-check" style="color:var(--success-color)"></i> ' + doneCount + ' / ' + docs.length + '</span>' +
    '<button class="btn btn-outline" data-no-demo="true" onclick="var w=document.getElementById(\'doc-checklist-wrap\');var e=w.dataset.editing===\'1\';w.dataset.editing=e?\'0\':\'1\';this.textContent=e?\'Edytuj list\u0119\':\'Gotowe\';">Edytuj list\u0119</button>',
  body: docGrid
}) +
'</div>' +

/* ==== KARTA IMPREZY tab ==== */
'<div class="group-tab-panel" data-panel="karta-imprezy">' +

panel({
  title: 'Status potwierdze\u0144 dzia\u0142\u00f3w',
  body:
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1rem">' +

    /* BOK — potwierdzone */
    '<div style="border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:1rem;background:#f0fdf4">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">' +
        '<div style="width:30px;height:30px;background:#dcfce7;color:#166534;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-headset" style="font-size:0.78rem"></i></div>' +
        '<strong style="font-size:0.85rem">Biuro Obs\u0142ugi Klienta</strong>' +
      '</div>' +
      '<div style="color:var(--success-color);font-weight:700;font-size:0.82rem"><i class="fa-solid fa-circle-check"></i> Potwierdzono</div>' +
      '<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem">Kamila W. \u00b7 17.04.2026 g. 09:43</div>' +
    '</div>' +

    /* Booking — potwierdzone */
    '<div style="border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:1rem;background:#f0fdf4">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">' +
        '<div style="width:30px;height:30px;background:#dcfce7;color:#166534;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-bed" style="font-size:0.78rem"></i></div>' +
        '<strong style="font-size:0.85rem">Booking</strong>' +
      '</div>' +
      '<div style="color:var(--success-color);font-weight:700;font-size:0.82rem"><i class="fa-solid fa-circle-check"></i> Potwierdzono</div>' +
      '<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem">Anna K. \u00b7 17.04.2026 g. 10:45</div>' +
    '</div>' +

    /* Bilety lotnicze — potwierdzone */
    '<div style="border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:1rem;background:#f0fdf4">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">' +
        '<div style="width:30px;height:30px;background:#dcfce7;color:#166534;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-plane-departure" style="font-size:0.78rem"></i></div>' +
        '<strong style="font-size:0.85rem">Bilety lotnicze</strong>' +
      '</div>' +
      '<div style="color:var(--success-color);font-weight:700;font-size:0.82rem"><i class="fa-solid fa-circle-check"></i> Potwierdzono</div>' +
      '<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem">Edyta M. \u00b7 17.04.2026 g. 10:15</div>' +
    '</div>' +

    /* Księgowość — potwierdzone */
    '<div style="border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:1rem;background:#f0fdf4">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">' +
        '<div style="width:30px;height:30px;background:#dcfce7;color:#166534;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-calculator" style="font-size:0.78rem"></i></div>' +
        '<strong style="font-size:0.85rem">Ksi\u0119gowo\u015b\u0107</strong>' +
      '</div>' +
      '<div style="color:var(--success-color);font-weight:700;font-size:0.82rem"><i class="fa-solid fa-circle-check"></i> Potwierdzono</div>' +
      '<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem">Barbara N. \u00b7 17.04.2026 g. 11:30</div>' +
    '</div>' +

    /* Marketing — oczekuje */
    '<div id="ki-mkt-card" style="border:2px solid #fde68a;border-radius:var(--radius-md);padding:1rem;background:#fffbeb">' +
      '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">' +
        '<div style="width:30px;height:30px;background:#fef3c7;color:#b45309;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-bullhorn" style="font-size:0.78rem"></i></div>' +
        '<strong style="font-size:0.85rem">Marketing</strong>' +
      '</div>' +
      '<div id="ki-mkt-status" style="color:#b45309;font-weight:700;font-size:0.82rem"><i class="fa-solid fa-clock"></i> Oczekuje na potwierdzenie</div>' +
      '<div id="ki-mkt-date" style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem">Wys\u0142ano: 17.04.2026 g. 09:00</div>' +
      '<button id="ki-mkt-btn" class="btn btn-primary" data-no-demo="true" style="margin-top:0.65rem;font-size:0.78rem;width:100%;padding:0.4rem 0.75rem" onclick="window._kiConfirmDept(\'mkt\')"><i class="fa-solid fa-check"></i> Potwierdzam zapoznanie si\u0119</button>' +
    '</div>' +

    '</div>' +
    '<div id="ki-main-warn" style="padding:0.6rem 0.85rem;background:#fff7ed;border-radius:8px;font-size:0.82rem;display:flex;align-items:center;gap:0.5rem">' +
      '<i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;flex-shrink:0"></i>' +
      '<span>Dzia\u0142 <strong>Marketing</strong> nie potwierdzi\u0142 jeszcze zapoznania si\u0119 z kart\u0105 imprezy. Powiadomienie wys\u0142ano 17.04.2026 g.\u00a009:00.</span>' +
    '</div>'
}) +

panel({
  title: 'Karta Imprezy \u2014 MT-2026-EG-01',
  action:
    '<div style="display:flex;gap:0.5rem;align-items:center">' +
    '<span style="font-size:0.75rem;color:var(--text-muted)"><i class="fa-regular fa-clock"></i> Utworzono: 20.09.2025 \u00b7 Anna K.</span>' +
    button({ label: 'Edytuj Kart\u0119', icon: 'fa-solid fa-pen', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('edytuj-karte-modal').classList.add('show')" } }) +
    '</div>',
  body:
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 2.5rem">' +
    '<div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Identyfikacja</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>KOD oferty</span><strong style="font-family:monospace;letter-spacing:0.05em">EG17-24/01/2026</strong></div>' +
      '<div class="info-row"><span>Typ imprezy</span><strong>Pielgrzymka</strong></div>' +
      '<div class="info-row"><span>Data zapytania</span><strong>15.09.2025</strong></div>' +
      '<div class="info-row"><span>Przyj\u0119te do realizacji</span><strong>20.09.2025</strong></div>' +
      '<div class="info-row"><span>Data anulacji</span><strong style="color:var(--text-muted)">\u2014</strong></div>' +
    '</div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1rem 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Organizator</div>' +
    '<div class="info-table">'  +
      '<div class="info-row"><span>Imi\u0119 i nazwisko</span><strong>Izabela \u017bebrowska</strong></div>' +
      '<div class="info-row"><span>Ks. opiekun</span><strong>ks. Wojciech Lipka</strong></div>' +
      '<div class="info-row"><span>Parafia / Instytucja</span><strong>Parafia pw. Bo\u017cego Cia\u0142a, Rzesz\u00f3w</strong></div>' +
      '<div class="info-row"><span>E-mail</span><strong>zebrowska.iz@gmail.com</strong></div>' +
      '<div class="info-row"><span>Telefon</span><strong>+48 600 123 456</strong></div>' +
    '</div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1rem 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Uwagi dla marketingu</div>' +
    '<div style="background:var(--bg-hover);border-radius:var(--radius-sm);padding:0.6rem 0.75rem;font-size:0.82rem;color:var(--text-default);line-height:1.5">' +
      'Plakat na stronie / FB. Papierowe z wszystkimi cenami i kontaktem do ks. Lipki.' +
    '</div>' +

    '</div>' + /* end left col */
    '<div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Impreza</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>Kierunek / Nazwa</span><strong>EGIPT \u2014 Kair, Luksur, Hurghada</strong></div>' +
      '<div class="info-row"><span>Termin</span><strong>24\u201331.01.2026 (7 nocy)</strong></div>' +
    '</div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1rem 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Ceny</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>PLN \u2014 od 42 os.</span><strong>4\u202f990 z\u0142</strong></div>' +
      '<div class="info-row"><span>PLN \u2014 min. 37\u201341 os.</span><strong>5\u202f390 z\u0142</strong></div>' +
      '<div class="info-row"><span>EUR (dop\u0142ata)</span><strong style="color:var(--text-muted)">\u2014</strong></div>' +
      '<div class="info-row"><span>Na miejscu</span><strong>80 USD/os. (karta)</strong></div>' +
      '<div class="info-row"><span>KR podstawowy</span><strong>100 z\u0142</strong></div>' +
      '<div class="info-row"><span>KR rzeczywisty</span><strong>200 z\u0142</strong></div>' +
      '<div class="info-row"><span>Dop\u0142ata SGL</span><strong>800 z\u0142</strong></div>' +
    '</div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1rem 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Transport</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>\u015arodek transportu</span><strong>Samolot LOT</strong></div>' +
      '<div class="info-row"><span>Linia lotnicza</span><strong>LOT Polish Airlines</strong></div>' +
      '<div class="info-row"><span>Liczba bilet\u00f3w</span><strong>45</strong></div>' +
      '<div class="info-row"><span>Ilo\u015b\u0107 gratis\u00f3w</span><strong>1 (co 45 os.)</strong></div>' +
      '<div class="info-row"><span>Cena biletu</span><strong>w cenie imprezy</strong></div>' +
      '<div class="info-row"><span>Deadline biletowania</span><strong>10.01.2026</strong></div>' +
      '<div class="info-row"><span>Transfer na lotnisko</span><strong style="color:var(--text-muted)">NIE</strong></div>' +
    '</div>' +

    '</div>' + /* end right col */
    '</div>' + /* end top 2-col grid */

    '<div style="margin-top:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:0 2.5rem">' +
    '<div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Kontrahent</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>Kontrahent</span><strong>Iza Strzelak (SENT)</strong></div>' +
      '<div class="info-row"><span>Data oferty od kontr.</span><strong>20.09.2025</strong></div>' +
      '<div class="info-row"><span>Warunki / cena</span><strong>wg. kalkulacji wewn\u0119trznej</strong></div>' +
      '<div class="info-row"><span>Po\u015brednik</span><strong style="color:var(--text-muted)">\u2014</strong></div>' +
    '</div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1rem 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Prowizja</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>Dla kogo</span><strong>Biuro Matteo</strong></div>' +
      '<div class="info-row"><span>Ile</span><strong>2%</strong></div>' +
    '</div>' +

    '</div>' + /* end left col */
    '<div>' +

    '<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.5rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Terminy kluczowe</div>' +
    '<div class="info-table">' +
      '<div class="info-row"><span>I Depozyt</span><strong>01.10.2025</strong></div>' +
      '<div class="info-row"><span>II Depozyt</span><strong>15.11.2025</strong></div>' +
      '<div class="info-row"><span>III Depozyt</span><strong>10.12.2025</strong></div>' +
      '<div class="info-row"><span>IV Depozyt (finalne)</span><strong>15.01.2026</strong></div>' +
      '<div class="info-row"><span>Lista nazwisk</span><strong>10.01.2026</strong></div>' +
      '<div class="info-row"><span>Wystawienie bilet\u00f3w</span><strong>13.01.2026</strong></div>' +
      '<div class="info-row"><span>Redukcja miejsc</span><strong style="color:var(--text-muted)">\u2014</strong></div>' +
      '<div class="info-row"><span>Anulacja grupy</span><strong style="color:var(--text-muted)">\u2014</strong></div>' +
    '</div>' +

    '</div>' + /* end right col */
    '</div>' /* end bottom 2-col grid */
}) +

'</div>' + /* end karta-imprezy tab panel */

'</div>' +   /* end group-card-body */
'</div>' +   /* end group-card-detail */

/* ==== DODAJ UCZESTNIKA modal ==== */
'<div id="dodaj-uczestnika-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:720px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-user-plus" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowa rezerwacja \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-uczestnika-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">' +
      '<div class="form-mockup">' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Uczestnik</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Szukaj uczestnika</span>' +
          '<div style="position:relative">' +
            '<input type="text" id="duu-search" autocomplete="off" placeholder="Szukaj po nazwisku lub imieniu\u2026" oninput="window._duuFilter(this.value)" onfocus="window._duuFilter(this.value)" onblur="setTimeout(function(){var d=document.getElementById(\'duu-dropdown\');if(d)d.style.display=\'none\'},200)" style="width:100%;box-sizing:border-box" />' +
            '<div id="duu-dropdown" style="display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;max-height:220px;overflow-y:auto;background:var(--bg-card,#fff);border:1px solid var(--border-color);border-radius:var(--radius-sm);box-shadow:var(--shadow-md);z-index:200"></div>' +
          '</div>' +
        '</label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Dane osobowe</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>PESEL</span><input type="text" placeholder="np. 75010112345" /></label>' +
          '<label class="form-field"><span>Data urodzenia</span><input type="date" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr paszportu</span><input type="text" placeholder="np. AP1234567" style="font-family:monospace;text-transform:uppercase" /></label>' +
          '<label class="form-field"><span>Wa\u017cno\u015b\u0107 paszportu</span><input type="date" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Kontakt</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Telefon</span><input type="tel" placeholder="np. +48 600 123 456" /></label>' +
          '<label class="form-field"><span>E-mail</span><input type="email" placeholder="np. jan.kowalski@example.com" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Rezerwacja</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Typ pokoju</span><select><option>— wybierz —</option><option>SGL</option><option>SGL+</option><option>DBL</option><option>DBL Economy</option><option>TRPL</option></select></label>' +
          '<label class="form-field"><span>Numer pokoju</span><input type="text" placeholder="np. 204" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Lot wylotowy</span><select><option>— wybierz —</option><option>LO4KL2 \u2014 24.01 KRK\u2192HRG</option><option>LO4KL3 \u2014 24.01 WAW\u2192HRG</option></select></label>' +
          '<label class="form-field"><span>Lot powrotny</span><select><option>— wybierz —</option><option>LO4KL2R \u2014 31.01 HRG\u2192KRK</option><option>LO4KL3R \u2014 31.01 HRG\u2192WAW</option></select></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Finansowe i administracyjne</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kwota umowy (z\u0142)</span><input type="number" min="0" placeholder="np. 4990" /></label>' +
          '<label class="form-field"><span>Wp\u0142acono (z\u0142)</span><input type="number" min="0" placeholder="np. 2000" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Numer umowy</span><input type="text" placeholder="np. MT/2026/EG/009" /></label>' +
          '<label class="form-field"><span>Status umowy</span><select><option>Brak</option><option>W przygotowaniu</option><option>Wys\u0142ana</option><option>Podpisana</option><option>Anulowana</option></select></label>' +
        '</div>' +
        '<label class="form-field"><span>Status dokument\u00f3w</span><select><option>Brak</option><option>Brak paszportu</option><option>Weryfikacja</option><option>OK</option></select></label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Ubezpieczenie</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Wariant ubezpieczenia</span><select><option>— wybierz —</option><option>Podstawowy</option><option>Rozszerzony</option><option>Premium (Uniqa)</option></select></label>' +
          '<label class="form-field"><span>Nr polisy</span><input type="text" placeholder="np. UNIQA/2026/00123" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Uwagi</div>' +
        '<label class="form-field"><span>Uwagi do rezerwacji</span><textarea rows="3" placeholder="Opcjonalne uwagi\u2026"></textarea></label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-uczestnika-modal\').classList.remove(\'show\')">Anuluj</button>' +
      '<button class="btn btn-primary" type="button"><i class="fa-solid fa-check"></i> Dodaj uczestnika</button>' +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== EDYTUJ UCZESTNIKA modal ==== */
'<div id="edytuj-uczestnika-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:720px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-pen" style="margin-right:0.5rem;color:var(--primary-color)"></i>Edycja rezerwacji \u2014 Wi\u015bniewski Adam</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'edytuj-uczestnika-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">' +
      '<div class="form-mockup">' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Uczestnik</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Uczestnik</span>' +
          '<input type="text" value="Wi\u015bniewski Adam" readonly style="background:var(--bg-hover,#f8fafc)" />' +
        '</label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Dane osobowe</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>PESEL</span><input type="text" value="75010*****" /></label>' +
          '<label class="form-field"><span>Data urodzenia</span><input type="date" value="1975-01-01" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr paszportu</span><input type="text" value="AP0012345" style="font-family:monospace;text-transform:uppercase" /></label>' +
          '<label class="form-field"><span>Wa\u017cno\u015b\u0107 paszportu</span><input type="date" value="2031-04-20" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Kontakt</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Telefon</span><input type="tel" value="+48 600 111 222" /></label>' +
          '<label class="form-field"><span>E-mail</span><input type="email" value="a.wisniewski@example.com" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Rezerwacja</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Typ pokoju</span><select><option>— wybierz —</option><option>SGL</option><option>SGL+</option><option selected>DBL</option><option>DBL Economy</option><option>TRPL</option></select></label>' +
          '<label class="form-field"><span>Numer pokoju</span><input type="text" value="101" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Lot wylotowy</span><select><option selected>LO4KL2 \u2014 24.01 KRK\u2192HRG</option><option>LO4KL3 \u2014 24.01 WAW\u2192HRG</option></select></label>' +
          '<label class="form-field"><span>Lot powrotny</span><select><option selected>LO4KL2R \u2014 31.01 HRG\u2192KRK</option><option>LO4KL3R \u2014 31.01 HRG\u2192WAW</option></select></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Finansowe i administracyjne</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kwota umowy (z\u0142)</span><input type="number" value="4990" /></label>' +
          '<label class="form-field"><span>Wp\u0142acono (z\u0142)</span><input type="number" value="4990" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Numer umowy</span><input type="text" value="MT/2026/EG/001" /></label>' +
          '<label class="form-field"><span>Status umowy</span><select><option>Brak</option><option>W przygotowaniu</option><option>Wys\u0142ana</option><option selected>Podpisana</option><option>Anulowana</option></select></label>' +
        '</div>' +
        '<label class="form-field"><span>Status dokument\u00f3w</span><select><option>Brak</option><option>Brak paszportu</option><option>Weryfikacja</option><option selected>OK</option></select></label>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Ubezpieczenie</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Wariant ubezpieczenia</span><select><option>Podstawowy</option><option>Rozszerzony</option><option selected>Premium (Uniqa)</option></select></label>' +
          '<label class="form-field"><span>Nr polisy</span><input type="text" value="UNIQA/2026/00045" /></label>' +
        '</div>' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0.25rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Uwagi</div>' +
        '<label class="form-field"><span>Uwagi do rezerwacji</span><textarea rows="3"></textarea></label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById(\'edytuj-uczestnika-modal\').classList.remove(\'show\')">Anuluj</button>' +
      '<button class="btn btn-primary" type="button"><i class="fa-solid fa-check"></i> Zapisz zmiany</button>' +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== SZCZEGÓŁY UCZESTNIKA modal (read-only) ==== */
'<div id="szczegoly-uczestnika-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:720px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-user" style="margin-right:0.5rem;color:var(--primary-color)"></i>Szczeg\u00f3\u0142y rezerwacji \u2014 Wi\u015bniewski Adam</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-uczestnika-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto;padding:1.5rem">' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Uczestnik</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>Imi\u0119 i nazwisko</span><strong>Wi\u015bniewski Adam</strong></div>' +
        '<div class="info-row"><span>Status</span><strong>' + statusBadge('Kompletny', 'success') + '</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Dane osobowe</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>PESEL</span><strong style="font-family:monospace">75010*****</strong></div>' +
        '<div class="info-row"><span>Data urodzenia</span><strong>01.01.1975</strong></div>' +
        '<div class="info-row"><span>Nr paszportu</span><strong style="font-family:monospace">AP0012345</strong></div>' +
        '<div class="info-row"><span>Wa\u017cno\u015b\u0107 paszportu</span><strong>20.04.2031</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Kontakt</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>Telefon</span><strong>+48\u202f600\u202f111\u202f222</strong></div>' +
        '<div class="info-row"><span>E-mail</span><strong>a.wisniewski@example.com</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Rezerwacja</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>Typ pokoju</span><strong>DBL</strong></div>' +
        '<div class="info-row"><span>Numer pokoju</span><strong>101</strong></div>' +
        '<div class="info-row"><span>Lot wylotowy</span><strong style="font-family:monospace">LO4KL2 \u2014 24.01 KRK\u2192HRG</strong></div>' +
        '<div class="info-row"><span>Lot powrotny</span><strong style="font-family:monospace">LO4KL2R \u2014 31.01 HRG\u2192KRK</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Finansowe i administracyjne</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>Konto PLN</span><strong style="font-family:monospace;font-size:0.85rem">75 1240 1053 1111 0010 1234 5678</strong></div>' +
        '<div class="info-row"><span>Konto walutowe</span><strong style="font-family:monospace;font-size:0.85rem">PL 42 1240 1053 1111 0010 8765 4321</strong></div>' +
        '<div class="info-row"><span></span><span><button class="btn btn-outline" style="font-size:0.72rem;padding:0.25rem 0.5rem" data-no-demo="true" onclick="alert(\'Wysłano przypomnienie z numerami kont i instrukcją płatności do uczestnika (SMS/Email).\')"><i class="fa-solid fa-paper-plane" style="margin-right:0.3rem"></i> Wyślij numery do wpłaty (SMS/Email)</button></span></div>' +
        '<div class="info-row"><span>Kwota umowy</span><strong style="color:var(--primary-color)">4\u202f990 z\u0142</strong></div>' +
        '<div class="info-row"><span>Wp\u0142acono</span><strong style="color:var(--success-color)">4\u202f990 z\u0142</strong></div>' +
        '<div class="info-row"><span>Saldo</span><strong style="color:var(--success-color)"><i class="fa-solid fa-check"></i> Wyr\u00f3wnane</strong></div>' +
        '<div class="info-row"><span>Numer umowy</span><strong>MT/2026/EG/001</strong></div>' +
        '<div class="info-row"><span>Status umowy</span><strong>' + statusBadge('Podpisana \u2713', 'success') + '</strong></div>' +
        '<div class="info-row"><span>Dokumenty</span><strong style="color:var(--success-color)"><i class="fa-solid fa-check-circle"></i> OK</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Ubezpieczenie</div>' +
      '<div class="info-table">' +
        '<div class="info-row"><span>Wariant</span><strong>Premium (Uniqa)</strong></div>' +
        '<div class="info-row"><span>Nr polisy</span><strong style="font-family:monospace">UNIQA/2026/00045</strong></div>' +
      '</div>' +
      '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Uwagi</div>' +
      '<div style="font-size:0.83rem;color:var(--text-muted);font-style:italic">Brak uwag.</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-uczestnika-modal\').classList.remove(\'show\')">Zamknij</button>' +
      '<button class="btn btn-primary" type="button" data-no-demo="true" onclick="document.getElementById(\'szczegoly-uczestnika-modal\').classList.remove(\'show\');setTimeout(function(){document.getElementById(\'edytuj-uczestnika-modal\').classList.add(\'show\')},200)"><i class="fa-solid fa-pen"></i> Edytuj</button>' +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== EDYTUJ IMPREZĘ modal ==== */
'<div id="edytuj-impreze-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:760px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-pen" style="margin-right:0.5rem;color:var(--primary-color)"></i>Edycja imprezy — MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'edytuj-impreze-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:78vh;overflow-y:auto">' +
      '<div class="form-mockup">' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Podstawowe informacje</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kod imprezy</span><input type="text" value="MT-2026-EG-01" style="font-family:monospace" /></label>' +
          '<label class="form-field"><span>Status imprezy</span>' +
            '<select>' +
              '<option>W przygotowaniu</option>' +
              '<option>Aktywna</option>' +
              '<option selected>Zakończona</option>' +
              '<option>Anulowana</option>' +
            '</select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Nazwa imprezy</span><input type="text" value="Egipt — Piramidy, Pociąg Nocny, Hurghada" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Organizator / Ks. opiekun</span><input type="text" value="Izabela Żebrowska + ks. Wojciech Lipka" /></label>' +
          '<label class="form-field"><span>Pilot</span><input type="text" value="Alicja Aziz" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kierunek / Kraj</span><input type="text" value="Egipt — Kair, Luksur, Hurghada" /></label>' +
          '<label class="form-field"><span>Typ imprezy</span>' +
            '<select><option selected>Pielgrzymka</option><option>Wycieczka</option><option>Obóz</option><option>Inne</option></select>' +
          '</label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data od</span><input type="date" value="2026-01-24" /></label>' +
          '<label class="form-field"><span>Data do</span><input type="date" value="2026-01-31" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Personel i obsługa</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Opiekun BOK</span><input type="text" value="Kamila (K)" /></label>' +
          '<label class="form-field"><span>Obsługa biletów</span><input type="text" value="Edyta (E)" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kontrahent in-destination</span><input type="text" value="Iza Strzelak (SENT)" /></label>' +
          '<label class="form-field"><span>Autor oferty</span><input type="text" value="Ania" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Transport i logistyka</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Transport główny</span>' +
            '<select><option selected>Samolot</option><option>Autokar</option><option>Bus</option><option>Pociąg</option><option>Własny</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Autokar na miejscu</span><input type="text" placeholder="np. Regency — całodobowo" value="Regency — całodobowo" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Transport na lotnisko</span>' +
            '<select><option selected>Nie</option><option>Tak</option><option>Opcjonalnie</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Msza na lotnisku</span><input type="text" placeholder="np. WAW — 24.01.2026 g. 14:00" value="WAW — 24.01.2026 g. 14:00" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Finanse</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Gratisy (USD/os.)</span><input type="text" value="80 USD/os. (karta)" /></label>' +
          '<label class="form-field"><span>Prowizja biura (%)</span><input type="number" min="0" step="0.1" value="2" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Uwagi specjalne</div>' +
        '<label class="form-field"><span>Dieta / wymagania żywieniowe</span><textarea rows="2" placeholder="np. dieta halal, alergia na gluten…">1 uczestnik — alergia na gluten (wszystkie hotele).</textarea></label>' +
        '<label class="form-field"><span>Uwagi logistyczne</span><textarea rows="2" placeholder="np. rooming list wysłany, specjalne prośby hotelu…">Rooming list wysłany do hoteli 8.01.2026 (Iza Strzelak SENT).</textarea></label>' +
        '<label class="form-field"><span>Inne uwagi</span><textarea rows="2" placeholder="Opcjonalne uwagi…"></textarea></label>' +

      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'edytuj-impreze-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Zapisz zmiany', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== HISTORIA ZMIAN modal ==== */
'<div id="historia-zmian-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:900px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-clock-rotate-left" style="margin-right:0.5rem;color:var(--primary-color)"></i>Historia zmian — MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'historia-zmian-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:75vh;overflow-y:auto;padding:0">' +
      '<div style="border-bottom:1px solid var(--border-color);padding:1rem 1.5rem;background:var(--surface-secondary)">' +
        '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center">' +
          '<label class="form-field" style="margin:0;flex:1;min-width:220px"><span style="font-size:0.75rem">Filtruj po użytkowniku</span>' +
            '<select><option selected>Wszyscy użytkownicy</option><option>Kamila (K)</option><option>Edyta (E)</option><option>Ania</option><option>Barbara (Księgowość)</option></select>' +
          '</label>' +
          '<label class="form-field" style="margin:0;flex:1;min-width:220px"><span style="font-size:0.75rem">Filtruj po typie zmiany</span>' +
            '<select><option selected>Wszystkie zmiany</option><option>Dane podstawowe</option><option>Rezerwacje</option><option>Płatności</option><option>Plan</option><option>Uczestnik</option></select>' +
          '</label>' +
        '</div>' +
      '</div>' +
      '<div style="padding:0">' +
        /* Wpis 1 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">KK</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Kamila Kowalska</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>28.04.2026 15:42</span>' +
                '<span style="background:#dbeafe;color:#1e40af;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">PŁATNOŚCI</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Dodano płatność: <strong>Przedpłata 2 ($5 000 USD)</strong> — Przelew SWIFT, termin: 15.03.2026' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 2 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#ec4899,#f43f5e);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">EW</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Edyta Wiśniewska</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>24.04.2026 10:15</span>' +
                '<span style="background:#fef3c7;color:#92400e;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">REZERWACJE</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Zaktualizowano rezerwację noclegu: <strong>Bella Vista Hurghada Hotel</strong> — zmiana statusu na "Oczekuje"' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 3 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#10b981,#14b8a6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">AN</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Anna Nowak</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>18.04.2026 14:20</span>' +
                '<span style="background:#e0e7ff;color:#3730a3;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">UCZESTNIK</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Dodano uczestnika: <strong>Jan Kowalski</strong> (ur. 15.03.1985) — pokój 204' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 4 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#f59e0b,#f97316);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">BN</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Barbara Nowacka</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>17.04.2026 11:30</span>' +
                '<span style="background:#dcfce7;color:#166534;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">KSIĘGOWOŚĆ</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Zatwierdzono rozliczenie księgowe: <strong>Faktury hoteli rozliczone</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 5 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">KK</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Kamila Kowalska</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>10.04.2026 09:15</span>' +
                '<span style="background:#fce7f3;color:#9f1239;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">PLAN</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Zaktualizowano plan dnia: <strong>Dzień 3 (26.01) — dodano punkt: Muzeum Egipskie w Kairze</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 6 */
        '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color)">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#ec4899,#f43f5e);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">EW</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Edyta Wiśniewska</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>05.04.2026 16:45</span>' +
                '<span style="background:#d1fae5;color:#065f46;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">DANE PODSTAWOWE</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Zmieniono status imprezy z "Aktywna" na <strong>"Zakończona"</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        /* Wpis 7 */
        '<div style="padding:1.25rem 1.5rem">' +
          '<div style="display:flex;gap:1rem;align-items:flex-start">' +
            '<div style="flex-shrink:0;width:3rem;height:3rem;background:linear-gradient(135deg,#10b981,#14b8a6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem">AN</div>' +
            '<div style="flex:1">' +
              '<div style="display:flex;gap:0.75rem;align-items:baseline;flex-wrap:wrap;margin-bottom:0.25rem">' +
                '<strong style="color:var(--text-main);font-size:0.95rem">Anna Nowak</strong>' +
                '<span style="color:var(--text-muted);font-size:0.8rem"><i class="fa-solid fa-calendar" style="margin-right:0.25rem"></i>15.01.2026 10:00</span>' +
                '<span style="background:#d1fae5;color:#065f46;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.7rem;font-weight:600">DANE PODSTAWOWE</span>' +
              '</div>' +
              '<div style="color:var(--text-main);font-size:0.88rem;line-height:1.5;margin-top:0.5rem">' +
                'Utworzono imprezę: <strong>MT-2026-EG-01 — Egipt — Piramidy, Pociąg Nocny, Hurghada</strong>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'historia-zmian-modal\').classList.remove(\'show\')">Zamknij</button>' +
      button({ label: 'Eksportuj historię PDF', icon: 'fa-solid fa-file-pdf', variant: 'ghost' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== EDYTUJ KART\u0118 IMPREZY modal ==== */
'<div id="edytuj-karte-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:820px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-file-lines" style="margin-right:0.5rem;color:var(--primary-color)"></i>Karta Imprezy \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'edytuj-karte-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:80vh;overflow-y:auto">' +
      '<div class="form-mockup">' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Identyfikacja</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>KOD imprezy</span><input type="text" value="EG17-24/01/2026" style="font-family:monospace;text-transform:uppercase" /></label>' +
          '<label class="form-field"><span>Typ imprezy</span>' +
            '<select><option selected>Pielgrzymka</option><option>Wycieczka</option><option>Ob\u00f3z</option><option>Wycieczka szkolna</option><option>Inne</option></select>' +
          '</label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data zapytania</span><input type="date" value="2025-09-15" /></label>' +
          '<label class="form-field"><span>Przyj\u0119te do realizacji</span><input type="date" value="2025-09-20" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data anulacji</span><input type="date" placeholder="pozostaw puste je\u015bli aktywne" /></label>' +
          '<label class="form-field"><span></span></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Organizator</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Imi\u0119 i nazwisko / organizator</span><input type="text" value="Izabela \u017bebrowska" /></label>' +
          '<label class="form-field"><span>Ks. opiekun / wsp\u00f3\u0142organizator</span><input type="text" value="ks. Wojciech Lipka" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Parafia / Instytucja / Miejscowo\u015b\u0107</span><input type="text" value="Parafia pw. Bo\u017cego Cia\u0142a, Rzesz\u00f3w" /></label>' +
          '<label class="form-field"><span>E-mail</span><input type="email" value="zebrowska.iz@gmail.com" /></label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Telefon</span><input type="tel" value="+48 600 123 456" /></label>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Impreza</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kierunek / Nazwa</span><input type="text" value="EGIPT \u2014 Kair, Luksur, Hurghada" /></label>' +
          '<label class="form-field"><span>Termin (np. 24\u201331.01.2026)</span><input type="text" value="24\u201331.01.2026" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Ceny</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>PLN — od X os. (cena min.)</span><input type="number" value="4990" min="0" /></label>' +
          '<label class="form-field"><span>Minimalna liczba os.</span><input type="number" value="42" min="1" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>PLN — cena przy 37\u201341 os.</span><input type="number" value="5390" min="0" /></label>' +
          '<label class="form-field"><span>EUR (dop\u0142ata, opcjonalnie)</span><input type="number" step="0.01" placeholder="np. 50" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Na miejscu (USD / EUR / PLN)</span><input type="text" value="80 USD/os. (karta)" /></label>' +
          '<label class="form-field"><span>Dop\u0142ata SGL</span><input type="number" value="800" min="0" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>KR podstawowy (z\u0142)</span><input type="number" value="100" min="0" /></label>' +
          '<label class="form-field"><span>KR rzeczywisty (z\u0142)</span><input type="number" value="200" min="0" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Transport</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>\u015arodek transportu</span>' +
            '<select>' +
              '<option selected>Samolot</option><option>Autokar</option><option>Bus</option><option>Samolot + autokar</option><option>W\u0142asny</option>' +
            '</select>' +
          '</label>' +
          '<label class="form-field"><span>Transfer na lotnisko</span>' +
            '<select><option selected>NIE</option><option>TAK</option><option>Opcjonalnie</option></select>' +
          '</label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Linia lotnicza</span><input type="text" value="LOT Polish Airlines" /></label>' +
          '<label class="form-field"><span>Liczba bilet\u00f3w / miejsc</span><input type="number" value="45" min="1" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Ilo\u015b\u0107 gratis\u00f3w (zasada)</span><input type="text" value="1 (co 45 os.)" /></label>' +
          '<label class="form-field"><span>Cena biletu</span><input type="text" value="w cenie imprezy" /></label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Deadline biletowania</span><input type="date" value="2026-01-10" /></label>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Kontrahent</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kontrahent (in-destination)</span><input type="text" value="Iza Strzelak (SENT)" /></label>' +
          '<label class="form-field"><span>Data oferty od kontrahenta</span><input type="date" value="2025-09-20" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Warunki / cena kontrahenta</span><input type="text" value="wg. kalkulacji wewn\u0119trznej" /></label>' +
          '<label class="form-field"><span>Po\u015brednik</span><input type="text" placeholder="opcjonalnie" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Prowizja</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Prowizja \u2014 dla kogo</span><input type="text" value="Biuro Matteo" /></label>' +
          '<label class="form-field"><span>Prowizja \u2014 ile (%)</span><input type="number" step="0.1" value="2" min="0" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Terminy kluczowe</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>I Depozyt</span><input type="date" value="2025-10-01" /></label>' +
          '<label class="form-field"><span>II Depozyt</span><input type="date" value="2025-11-15" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>III Depozyt</span><input type="date" value="2025-12-10" /></label>' +
          '<label class="form-field"><span>IV Depozyt (finalne)</span><input type="date" value="2026-01-15" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Lista nazwisk</span><input type="date" value="2026-01-10" /></label>' +
          '<label class="form-field"><span>Wystawienie bilet\u00f3w</span><input type="date" value="2026-01-13" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Redukcja miejsc</span><input type="date" placeholder="opcjonalnie" /></label>' +
          '<label class="form-field"><span>Anulacja grupy</span><input type="date" placeholder="opcjonalnie" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Uwagi dla marketingu</div>' +
        '<label class="form-field"><span>Tre\u015b\u0107 dla marketingu (plakat, FB, materia\u0142y)</span>' +
          '<textarea rows="3">Plakat na stronie / FB. Papierowe z wszystkimi cenami i kontaktem do ks. Lipki.</textarea>' +
        '</label>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Powiadomienia dzia\u0142\u00f3w</div>' +
        '<div style="background:var(--bg-hover);border-radius:var(--radius-md);padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem">' +
          '<p style="margin:0 0 0.25rem;font-size:0.8rem;color:var(--text-muted)">Po zapisaniu zostanie wys\u0142ane powiadomienie pod dzwonkiem do wybranych dzia\u0142\u00f3w. Dzia\u0142 musi potwierdzi\u0107 zapoznanie si\u0119 z kart\u0105.</p>' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>BOK</strong> \u2014 Biuro Obs\u0142ugi Klienta</label>' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Booking</strong> \u2014 rezerwacje nocleg\u00f3w</label>' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Bilety lotnicze</strong> \u2014 dzia\u0142 bilet\u00f3w lotniczych</label>' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Marketing</strong> \u2014 sprzeda\u017c i promocja</label>' +
        '</div>' +

      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'edytuj-karte-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Zapisz i wy\u015blij powiadomienia', icon: 'fa-solid fa-paper-plane' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== DODAJ NOCLEG modal ==== */
'<div id="dodaj-nocleg-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:700px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-hotel" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowy nocleg \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-nocleg-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="max-height:75vh;overflow-y:auto">' +
      '<div class="form-mockup">' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem">Termin i miejsce</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data od</span><input type="date" /></label>' +
          '<label class="form-field"><span>Data do</span><input type="date" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Miejscowość</span><input type="text" placeholder="np. Hurghada" /></label>' +
          '<label class="form-field"><span>Liczba nocy</span><input type="number" min="1" placeholder="np. 4" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Hotel</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Nazwa hotelu / spos\u00f3b noclegu</span><input type="text" placeholder="np. Bella Vista Resort 4\u2605" /></label>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Adres hotelu</span><input type="text" placeholder="np. Sheraton Rd, Hurghada, Red Sea" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Typ zakwaterowania</span>' +
            '<select><option>Hotel</option><option>Hostel</option><option>Klasztor / Dom pielgrzyma</option><option>Nocleg prywatny</option><option>Poci\u0105g nocny</option><option>Prom nocny</option><option>Inny</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Wy\u017cywienie</span>' +
            '<select><option value="">— brak —</option><option>BB (bed &amp; breakfast)</option><option>HB (half board)</option><option>FB (full board)</option><option>AI (all inclusive)</option><option>SC (samodzielne)</option></select>' +
          '</label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Nr rezerwacji / ref. hotelu</span><input type="text" placeholder="np. BV-2026-01" style="font-family:monospace" /></label>' +
          '<label class="form-field"><span>Kontrahent / Dostawca</span><input type="text" placeholder="np. Iza Strzelak (SENT)" /></label>' +
        '</div>' +

        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">P\u0142atno\u015b\u0107</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kwota</span><input type="number" min="0" step="0.01" placeholder="np. 15120" /></label>' +
          '<label class="form-field"><span>Waluta</span>' +
            '<select><option>USD</option><option>EUR</option><option>PLN</option><option>GBP</option></select>' +
          '</label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Status p\u0142atno\u015bci</span>' +
            '<select><option>Oczekuje</option><option>Wp\u0142acono cz\u0119\u015bciowo</option><option>Wp\u0142acono</option><option>Cash na miejscu</option><option>W cenie hotelu</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Spos\u00f3b zap\u0142aty</span>' +
            '<select><option>Przelew</option><option>Karta</option><option>Got\u00f3wka</option><option>Inny</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field"><span>Uwagi</span><textarea rows="2" placeholder="np. rooming list wys\u0142any, depozyt w toku\u2026"></textarea></label>' +

      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'dodaj-nocleg-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj nocleg', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== DODAJ REZERWACJĘ modal ==== */
'<div id="dodaj-rez-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:580px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-calendar-plus" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowa rezerwacja dodatkowa — MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-rez-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div class="form-mockup">' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Nazwa</span><input type="text" placeholder="np. Rejs po Nilu, Msza w bazylice" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Typ</span>' +
            '<select><option>Rejs / atrakcja</option><option>Wstępy / bilety</option><option>Autokar lokalny</option><option>Msza / kaplica</option><option>Wysyłka sprzętu</option><option>Inny</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Ikona</span>' +
            '<select><option>fa-ship (rejs)</option><option>fa-monument (zabytki)</option><option>fa-bus (autokar)</option><option>fa-church (msza)</option><option>fa-radio (sprzęt)</option><option>fa-briefcase (teczki)</option><option>fa-calendar (inne)</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Opis</span><input type="text" placeholder="np. Hurghada — rejs wieczorny" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Termin</span><input type="text" placeholder="np. 29.01.2026 lub przez cały wyjazd" /></label>' +
          '<label class="form-field"><span>Odpowiada</span><input type="text" placeholder="np. Alicja Aziz" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Kwota</span><input type="text" placeholder="np. $3 000 lub bezpłatna" /></label>' +
          '<label class="form-field"><span>Status</span>' +
            '<select><option>Cash na miejscu</option><option>Opłacone</option><option>Potwierdzona</option><option>Oczekuje</option><option>Uwzględnione</option><option>Odesłane</option></select>' +
          '</label>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'dodaj-rez-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== DODAJ TRANSPORT modal ==== */
'<div id="dodaj-transport-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:580px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-route" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowy element transportu — MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-transport-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div class="form-mockup">' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Nazwa</span><input type="text" placeholder="np. Pociąg nocny Kair–Luksur, Transfer lotniskowy" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Typ transportu</span>' +
            '<select><option>Samolot</option><option>Autokar</option><option>Pociąg</option><option>Prom / statek</option><option>Transfer minibusem</option><option>Inny</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Przewoźnik / firma</span><input type="text" placeholder="np. LOT, Regency, PKP" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Trasa (skąd)</span><input type="text" placeholder="np. Kair, WAW" /></label>' +
          '<label class="form-field"><span>Trasa (dokąd)</span><input type="text" placeholder="np. Luksur, CAI" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Data / termin</span><input type="text" placeholder="np. 27/28.01.2026" /></label>' +
          '<label class="form-field"><span>Kwota</span><input type="text" placeholder="np. $5 000 lub w cenie hotelu" /></label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:1rem"><span>Opis / uwagi</span><input type="text" placeholder="np. wagony sypialne, 45 os." /></label>' +
        '<label class="form-field" style="margin-bottom:1rem"><span>Status</span>' +
          '<select><option>Potwierdzone</option><option>Oczekuje</option><option>Uwzględnione w cenie</option><option>Cash na miejscu</option><option>Anulowane</option></select>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'dodaj-transport-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj element', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== DODAJ MSZĘ modal ==== */
'<div id="dodaj-msza-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:520px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-church" style="margin-right:0.5rem;color:var(--primary-color)"></i>Msza po drodze \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-msza-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div class="form-mockup">' +
        '<label class="form-field" style="margin-bottom:0.75rem"><span>Nazwa / opis</span><input type="text" placeholder="np. Msza na lotnisku WAW — sala odpraw" /></label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Miejsce</span><input type="text" placeholder="np. lotnisko WAW, bazylika, kaplica hotelu" /></label>' +
          '<label class="form-field"><span>Data</span><input type="date" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Godzina</span><input type="time" placeholder="np. 14:00" /></label>' +
          '<label class="form-field"><span>Celebrans</span><input type="text" placeholder="np. ks. Wojciech Lipka" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Koszt organizacji</span><input type="text" placeholder="np. bezpłatna" /></label>' +
          '<label class="form-field"><span>Status</span>' +
            '<select><option>Potwierdzona</option><option>Oczekuje potwierdzenia</option><option>Anulowana</option></select>' +
          '</label>' +
        '</div>' +
        '<label class="form-field"><span>Uwagi</span><input type="text" placeholder="np. oferta do kaplicy lotniskowej, zgłoszono 2 tygodnie wcześniej" /></label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'dodaj-msza-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj mszę', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== DODAJ HOTEL DO PUNKTU PLANU modal ==== */
'<div id="dodaj-hotel-do-punktu-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:650px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-bed" style="margin-right:0.5rem;color:var(--primary-color)"></i>Dodaj nocleg do planu</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'dodaj-hotel-do-punktu-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div style="padding:0.75rem 1rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;margin-bottom:1.5rem">' +
        '<div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.35rem"><i class="fa-solid fa-info-circle"></i> Dodajesz nocleg do punktu:</div>' +
        '<div style="font-weight:600;font-size:0.9rem;color:var(--text-main)"><i class="fa-solid fa-utensils" style="color:#f59e0b;margin-right:0.5rem"></i>23:30 — Późna kolacja</div>' +
        '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem">Dzień 1 • 24.01.2026 • Przelot do Kairu</div>' +
      '</div>' +
      '<div class="form-mockup">' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Podstawowe informacje</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Nazwa hotelu / miejsca noclegu</span>' +
          '<input type="text" placeholder="np. Azal Pyramids Hotel, Nocleg w autobusie" />' +
        '</label>' +
        '<div class="form-row-2">' +
          '<label class="form-field"><span>Liczba nocy</span><input type="text" placeholder="np. 3 noce" value="1 noc" /></label>' +
          '<label class="form-field"><span>Daty pobytu</span><input type="text" placeholder="np. 24–27.01" /></label>' +
        '</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Miejsce / lokalizacja</span>' +
          '<input type="text" placeholder="np. Kair, Luksur, Hurghada" />' +
        '</label>' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1.25rem 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Szczegóły rezerwacji (opcjonalne)</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Adres hotelu</span>' +
          '<input type="text" placeholder="np. Al Haram Giza, 12511 Cairo" />' +
        '</label>' +
        '<div class="form-row-2">' +
          '<label class="form-field">' +
            '<span>Typ wyżywienia</span>' +
            '<select><option value="">— wybierz —</option><option>BB (śniadania)</option><option>HB (śniadania + obiadokolacje)</option><option>FB (pełne wyżywienie)</option><option>AI (all inclusive)</option><option>Brak</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Kwota (USD/PLN)</span><input type="text" placeholder="np. $7 000, 28 000 PLN" /></label>' +
        '</div>' +
        '<div class="form-row-2">' +
          '<label class="form-field">' +
            '<span>Status płatności</span>' +
            '<select><option>Wpłacono całość</option><option>Wpłacono częściowo</option><option>Oczekuje wpłaty</option><option>Cash na miejscu</option><option>Uwzględnione w cenie</option></select>' +
          '</label>' +
          '<label class="form-field"><span>Uwagi</span><input type="text" placeholder="np. Zaliczki w toku" /></label>' +
        '</div>' +
        '<label class="form-field" style="margin-top:1rem">' +
          '<span style="font-size:0.82rem;color:var(--text-main);font-weight:600;display:flex;align-items:center;gap:0.4rem">' +
            '<input type="checkbox" checked style="accent-color:var(--primary-color)" />' +
            'Dodaj ten nocleg do listy rezerwacji w zakładce „Hotele"' +
          '</span>' +
          '<small style="display:block;margin-top:0.25rem;color:var(--text-muted);font-size:0.75rem;margin-left:1.3rem">Nocleg będzie widoczny w planie oraz w zakładce Hotele jako osobna pozycja rezerwacji.</small>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'dodaj-hotel-do-punktu-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Dodaj nocleg', icon: 'fa-solid fa-check' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== GENERUJ ROZPISKĘ DLA PILOTA modal ==== */
'<div id="generuj-rozpisku-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:580px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-file-lines" style="margin-right:0.5rem;color:var(--primary-color)"></i>Generuj rozpiskę dla pilota</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'generuj-rozpisku-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div style="padding:0.75rem 1rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:1.5rem">' +
        '<div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.35rem"><i class="fa-solid fa-info-circle"></i> Impreza</div>' +
        '<div style="font-weight:600;font-size:0.9rem;color:var(--text-main)">Egipt — Piramidy, Pociąg Nocny, Hurghada</div>' +
        '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem">MT-2026-EG-01 • 24–31.01.2026 • Pilot: Alicja Aziz</div>' +
      '</div>' +
      '<div class="form-mockup">' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Zawartość rozpiski</div>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Plan imprezy dzień po dniu</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Szczegółowy harmonogram z godzinami i opisami</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Informacje o uczestnikach</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Lista PAX, dane kontaktowe, uwagi specjalne</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Hotele i noclegi</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Adresy, telefony, dane rezerwacji</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Transport i bilety</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Loty, autokary, numery PNR</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Kontakty awaryjne</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">BOK, biuro, kontrahenci lokalni</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Informacje finansowe</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Gratisy, cash na miejscu, rozliczenia</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:1rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Rooming list</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Podział pokoi we wszystkich hotelach</div></div>' +
        '</label>' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1.25rem 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Format dokumentu</div>' +
        '<label class="form-field" style="margin-bottom:0.75rem">' +
          '<span>Typ pliku</span>' +
          '<select style="font-size:0.85rem">' +
            '<option value="pdf">PDF — gotowy do druku</option>' +
            '<option value="docx">DOCX — edytowalny Word</option>' +
            '<option value="html">HTML — podgląd w przeglądarce</option>' +
          '</select>' +
        '</label>' +
        '<label class="form-field">' +
          '<span>Dodatkowe uwagi dla pilota</span>' +
          '<textarea rows="2" placeholder="np. Zwrócić uwagę na..., Pamiętać o..." style="font-size:0.85rem"></textarea>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'generuj-rozpisku-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Generuj rozpiskę', icon: 'fa-solid fa-download' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== GENERUJ TECZKĘ PILOTA modal ==== */
'<div id="generuj-teczke-pilota-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:620px;width:95%">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-file-pdf" style="margin-right:0.5rem;color:var(--primary-color)"></i>Generuj teczkę pilota — PDF</h2>' +
      '<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById(\'generuj-teczke-pilota-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body">' +
      '<div style="padding:0.75rem 1rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;margin-bottom:1.5rem">' +
        '<div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.35rem"><i class="fa-solid fa-info-circle"></i> Impreza</div>' +
        '<div style="font-weight:600;font-size:0.9rem;color:var(--text-main)">Egipt — Piramidy, Pociąg Nocny, Hurghada</div>' +
        '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem">MT-2026-EG-01 • 24–31.01.2026 • Pilot: Alicja Aziz</div>' +
      '</div>' +
      '<div class="form-mockup">' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:0 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Sekcje do wygenerowania</div>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-address-card" style="width:1.2rem;color:var(--text-muted)"></i> Strona tytułowa</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Podstawowe informacje o imprezę, loty, hotele, kontakty</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-users" style="width:1.2rem;color:var(--text-muted)"></i> Lista uczestników</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">PAX list z danymi osobowymi i kontaktowymi (44 os.)</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-bed" style="width:1.2rem;color:var(--text-muted)"></i> Rooming list</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Podział pokoi we wszystkich hotelach</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-route" style="width:1.2rem;color:var(--text-muted)"></i> Program wyjazdu</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Szczegółowy plan dzień po dniu</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-calculator" style="width:1.2rem;color:var(--text-muted)"></i> Kosztorys pilota</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Rozliczenia finansowe, gratisy, prowizje</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-money-bills" style="width:1.2rem;color:var(--text-muted)"></i> Wpłaty na miejscu</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Cash do rozliczenia, płatności lokalne</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-shield-halved" style="width:1.2rem;color:var(--text-muted)"></i> Polisy ubezpieczeniowe</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Dokumenty i numery polis grupy</div></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:1rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong><i class="fa-solid fa-file-pen" style="width:1.2rem;color:var(--text-muted)"></i> Authority Letter</strong><div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.1rem">Pełnomocnictwo dla pilota</div></div>' +
        '</label>' +
        '<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin:1.25rem 0 0.75rem;padding-bottom:0.3rem;border-bottom:1px solid var(--border-color)">Opcje dodatkowe</div>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Dołącz spis treści</strong></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:0.5rem">' +
          '<input type="checkbox" style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Numeracja stron</strong></div>' +
        '</label>' +
        '<label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;cursor:pointer;margin-bottom:1rem">' +
          '<input type="checkbox" checked style="accent-color:var(--primary-color);margin-top:0.2rem">' +
          '<div><strong>Znak wodny "POUFNE"</strong></div>' +
        '</label>' +
        '<label class="form-field">' +
          '<span>Dodatkowe uwagi do teczki</span>' +
          '<textarea rows="2" placeholder="np. Zwrócić uwagę na..., Pamiętać o..." style="font-size:0.85rem"></textarea>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById(\'generuj-teczke-pilota-modal\').classList.remove(\'show\')">Anuluj</button>' +
      button({ label: 'Generuj i pobierz PDF', icon: 'fa-solid fa-download' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== HOTEL HISTORIA REZERWACJI modal ==== */
'<div id="hotel-historia-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:680px;width:95%;">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-clock-rotate-left" style="margin-right:0.5rem;color:var(--primary-color)"></i>Historia rezerwacji hoteli \u2014 MT-2026-EG-01</h2>' +
      '<button class="demo-modal-close" type="button" onclick="document.getElementById(\'hotel-historia-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="padding:1.5rem;max-height:70vh;overflow-y:auto;">' +
      '<div style="display:flex;flex-direction:column;gap:0.4rem">' +

      /* Azal Pyramids – zmiana liczby pokoi */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fed7aa;color:#c2410c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-hotel" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">22.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">Azal Pyramids Kair \u2014 zmiana sk\u0142adu: pokoje dostosowane do nowej listy uczestnik\u00f3w po wymianie Kosiorek \u2192 Zar\u0119ba. Rooming list wys\u0142any ponownie do hotelu.</div></div>' +
      '</div>' +

      /* Bella Vista – dopłata */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#f0fdf4;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#d1fae5;color:#166534;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-receipt" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">21.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Bella Vista Hurghada \u2014 op\u0142acono dop\u0142at\u0119: <strong>$15\u202f120</strong> (faktura 0238/01/26/F/BSP). Status zmieniony na <strong style="color:var(--success-color)">Op\u0142acony</strong>.</div></div>' +
      '</div>' +

      /* Azal Pyramids – zmiana po Jaworskich */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#fed7aa;color:#c2410c;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-hotel" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">21.01.2026</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">Azal Pyramids Kair \u2014 aktualizacja rooming list po wymianie Jaworskich (2 os.) \u2192 Skro\u0144ska + Kozio\u0142. Nowa lista wys\u0142ana do hotelu 21.01 godz. 11:30.</div></div>' +
      '</div>' +

      /* II depozyt Azal */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#f0fdf4;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#d1fae5;color:#166534;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-receipt" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">12.11.2025</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Azal Pyramids Kair \u2014 II depozyt <strong>$5\u202f000</strong> op\u0142acony (koszty przelewu 40\u202fUSD). Bella Vista Hurghada \u2014 II depozyt <strong>$5\u202f000</strong> op\u0142acony.</div></div>' +
      '</div>' +

      /* I depozyt Azal */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#f0fdf4;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#d1fae5;color:#166534;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-receipt" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">25.09.2025</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Alicja Kowalczyk</span></div>' +
        '<div style="font-size:0.82rem">Azal Pyramids Kair \u2014 I depozyt <strong>$2\u202f000</strong> op\u0142acony i potwierdzony przez hotel.</div></div>' +
      '</div>' +

      /* Pierwotna rezerwacja */
      '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#eff6ff;border-radius:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:#dbeafe;color:#1d4ed8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-hotel" style="font-size:0.75rem"></i></div>' +
        '<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:0.1rem"><span style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">15.08.2025</span><span style="font-size:0.72rem;color:var(--text-muted)"><i class="fa-solid fa-user" style="font-size:0.65rem"></i> Marta Nowak</span></div>' +
        '<div style="font-size:0.82rem">Pierwotna rezerwacja: Azal Pyramids Kair (3 noce HB, 22 DBL + 1 SGL), Bella Vista Hurghada (2 noce HB, 22 DBL + 1 SGL), Azal Pyramids Kair powt\u00f3rnie (1 noc HB). Opcja do 15.10.2025.</div></div>' +
      '</div>' +

      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      button({ label: 'Eksport logu', icon: 'fa-solid fa-download', variant: 'ghost' }) +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== EXPORT MODAL ==== */
'<div id="export-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:500px;width:95%;">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-file-export" style="margin-right:0.5rem;color:var(--success-color)"></i>Eksport danych uczestnik\u00f3w</h2>' +
      '<button class="demo-modal-close" type="button" onclick="document.getElementById(\'export-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="padding:1.5rem;max-height:70vh;overflow-y:auto;">' +
      '<p style="margin-bottom:1rem;color:var(--text-muted);font-size:0.85rem;">Wybierz kolumny, kt\u00f3re maj\u0105 zosta\u0107 zawarte w pliku:</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Imi\u0119</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Nazwisko</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--primary-color)"> <strong>Telefon</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Email</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>PESEL / Dokument</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Data urodzenia</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Pok\u00f3j</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Kwoty (Wp\u0142acono/Saldo)</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Uwagi/Diety</strong></label>' +
        '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" style="accent-color:var(--primary-color)"> <strong>Status umowy/dok.</strong></label>' +
      '</div>' +
      '<div style="margin-bottom:1.5rem;">' +
        '<p style="margin-bottom:0.75rem;color:var(--text-muted);font-size:0.85rem;">Format eksportu:</p>' +
        '<div style="display:flex;gap:1.5rem;">' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer">' +
            '<input type="radio" name="export-format" value="excel" checked style="accent-color:var(--primary-color)">' +
            '<strong>Excel (.xlsx)</strong>' +
          '</label>' +
          '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer">' +
            '<input type="radio" name="export-format" value="pdf" style="accent-color:var(--primary-color)">' +
            '<strong>PDF</strong>' +
          '</label>' +
        '</div>' +
      '</div>' +
      '<div style="border-top:1px solid var(--border-color);padding-top:1rem;">' +
        '<label style="display:flex;align-items:center;gap:0.65rem;font-size:0.9rem;cursor:pointer">' +
          '<input type="checkbox" id="export-no-polish" style="accent-color:var(--primary-color);width:18px;height:18px;">' +
          '<span style="color:var(--text-main)">Bez polskich znak\u00f3w</span>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="demo-modal-footer">' +
      '<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById(\'export-modal\').classList.remove(\'show\')">Anuluj</button>' +
      '<button class="btn btn-primary" type="button" onclick="window.exportParticipants()"><i class="fa-solid fa-download" style="margin-right:0.5rem;"></i>Pobierz</button>' +
    '</div>' +
  '</div>' +
'</div>' +

/* ==== HISTORIA ZMIAN modal ==== */
'<div id="historia-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove(\'show\')">' +
  '<div class="demo-modal" style="max-width:700px;width:95%;">' +
    '<div class="demo-modal-header">' +
      '<h2><i class="fa-solid fa-clock-rotate-left" style="margin-right:0.5rem;color:var(--primary-color)"></i>Historia zmian \u2014 MT-2026-EG-01 \u017bebrowska</h2>' +
      '<button class="demo-modal-close" type="button" onclick="document.getElementById(\'historia-modal\').classList.remove(\'show\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="demo-modal-body" style="padding:1.5rem;max-height:70vh;overflow-y:auto;">' +
      historiaHtml +
    '</div>' +
    '<div class="demo-modal-footer">' +
      button({ label: 'Eksport logu', icon: 'fa-solid fa-download', variant: 'ghost' }) +
    '</div>' +
  '</div>' +
'</div>';
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
            '<button class="btn btn-primary" title="Utwórz nowego uczestnika" style="padding: 0.6rem 1rem;" data-no-demo="true" onclick="event.stopPropagation(); window.showNewPassengerForm();"><i class="fa-solid fa-plus"></i></button>' +
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

/* ===== DODAJ UCZESTNIKA — searchable picker ===== */
window._duuContacts = [
	{ name: 'Dąbrowski Krzysztof',  pesel: '79052*****' },
	{ name: 'Dąbrowska Helena',     pesel: '83117*****' },
	{ name: 'Jankowska Helena',     pesel: '72083*****' },
	{ name: 'Jankowski Krzysztof',  pesel: '70021*****' },
	{ name: 'Kaczmarek Joanna',     pesel: '93084*****' },
	{ name: 'Kaczmarek Michał',     pesel: '92101*****' },
	{ name: 'ks. Jan Kowalczyk',    pesel: '69045*****' },
	{ name: 'Kowalska Jadwiga',     pesel: '71093*****' },
	{ name: 'Kowalski Andrzej',     pesel: '65041*****' },
	{ name: 'Malczewska Ewa',       pesel: '97110*****' },
	{ name: 'Malczewski Tomasz',    pesel: '95060*****' },
	{ name: 'Malinowska Teresa',    pesel: '68041*****' },
	{ name: 'Nowak Barbara',        pesel: '82071*****' },
	{ name: 'Nowak Piotr',          pesel: '80030*****' },
	{ name: 'Wiśniewska Maria',     pesel: '78032*****' },
	{ name: 'Wiśniewski Adam',      pesel: '75010*****' },
	{ name: 'Wróbel Stanisław',     pesel: '61032*****' },
	{ name: 'Wróbel Zofia',         pesel: '63074*****' },
	{ name: 'Zielińska Anna',       pesel: '91120*****' },
	{ name: 'Zieliński Marek',      pesel: '88093*****' },
];

window._duuFilter = function(q) {
	var dd = document.getElementById('duu-dropdown');
	if (!dd) return;
	var list = window._duuContacts;
	var lq = (q || '').toLowerCase().trim();
	var filtered = lq ? list.filter(function(c) {
		return c.name.toLowerCase().indexOf(lq) !== -1;
	}) : list;
	if (!filtered.length) { dd.style.display = 'none'; return; }
	dd.style.display = 'block';
	dd.innerHTML = filtered.map(function(c) {
		return '<div data-name="' + c.name.replace(/"/g, '&quot;') + '"' +
			' onclick="window._duuSelect(this.dataset.name)"' +
			' onmouseenter="this.style.background=\'var(--bg-hover,#f1f5f9)\'"' +
			' onmouseleave="this.style.background=\'transparent\'"' +
			' style="padding:0.5rem 0.75rem;cursor:pointer;display:flex;align-items:baseline;gap:0.6rem;border-bottom:1px solid var(--border-color)">' +
			'<strong style="font-size:0.85rem">' + c.name + '</strong>' +
			'<span style="font-size:0.73rem;color:var(--text-muted);font-family:monospace">' + c.pesel + '</span>' +
			'</div>';
	}).join('');
};

window._duuSelect = function(name) {
	var inp = document.getElementById('duu-search');
	if (inp) inp.value = name;
	var dd = document.getElementById('duu-dropdown');
	if (dd) dd.style.display = 'none';
};

/* ===== KARTA IMPREZY — potwierdzenie dzia\u0142u ===== */
window._kiConfirmDept = function(dept) {
	var card = document.getElementById('ki-' + dept + '-card');
	if (!card) return;
	card.style.border = '1px solid #bbf7d0';
	card.style.background = '#f0fdf4';
	var statusEl = document.getElementById('ki-' + dept + '-status');
	if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--success-color)"></i> <span style="color:var(--success-color);font-weight:700">Potwierdzono</span>';
	var dateEl = document.getElementById('ki-' + dept + '-date');
	if (dateEl) dateEl.textContent = 'Anna K. \u00b7 Teraz';
	var btn = document.getElementById('ki-' + dept + '-btn');
	if (btn) btn.style.display = 'none';
	var warn = document.getElementById('ki-main-warn');
	if (warn) warn.style.display = 'none';
};

/* ===== EKSPORT UCZESTNIK\u00d3W ===== */
window.exportParticipants = function() {
	var selectedFormat = document.querySelector('input[name="export-format"]:checked');
	var noPolish = document.getElementById('export-no-polish').checked;
	var format = selectedFormat ? selectedFormat.value : 'excel';
	
	// Symulacja eksportu - w rzeczywistej aplikacji tutaj by\u0142by wywo\u0142anie API
	var msg = 'Eksportuj\u0119 do formatu: ' + (format === 'excel' ? 'Excel (.xlsx)' : 'PDF');
	if (noPolish) {
		msg += '\nBez polskich znak\u00f3w';
	}
	
	window.showToast && window.showToast('Eksport uczestnik\u00f3w', msg, 'success');
	document.getElementById('export-modal').classList.remove('show');
};

})();
