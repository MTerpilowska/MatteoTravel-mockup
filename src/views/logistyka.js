(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== WYSYŁKI / LOGISTYKA ===== */
	function renderWysylki() {
		const shipments = [
			{ id: 'WYS-2026-018', group: 'MT-2026-IT-03', recipient: 'Monika Barańska (Pilot)', tripDate: '12.04.2026', sent: '05.04.2026', returns: '22.04.2026', courier: 'DPD', trackingOut: '1234567890', trackingRet: '0987654321', radios: 5, folders: 45, hymnals: 45, lanyards: 45, other: '3 chorągiewki', returnStatus: 'W trakcie', statusTone: 'info' },
			{ id: 'WYS-2026-019', group: 'MT-2026-WL-01', recipient: 'Krzysztof Tomaszewski (Pilot)', tripDate: '25.04.2026', sent: '—', returns: '05.05.2026', courier: '—', trackingOut: '—', trackingRet: '—', radios: 8, folders: 42, hymnals: 42, lanyards: 42, other: 'Mapy lokalne x42', returnStatus: 'Do przygotowania', statusTone: 'warning' },
		];

		const rows = shipments.map(s => `
			<tr>
				<td><strong>${escapeHtml(s.id)}</strong></td>
				<td><code>${escapeHtml(s.group)}</code></td>
				<td>${escapeHtml(s.recipient)}</td>
				<td>${escapeHtml(s.tripDate)}</td>
				<td>${escapeHtml(s.sent)}</td>
				<td>${s.courier !== '—' ? escapeHtml(s.courier) + `<br><small><a href="#">${escapeHtml(s.trackingOut)}</a></small>` : '<span style="color:var(--text-muted)">—</span>'}</td>
				<td style="text-align:center">
					<div class="pack-summary">
						<span title="Radioodbiornicy"><i class="fa-solid fa-radio"></i> ${s.radios}</span>
						<span title="Teczki"><i class="fa-solid fa-folder"></i> ${s.folders}</span>
						<span title="Śpiewniki"><i class="fa-solid fa-book"></i> ${s.hymnals}</span>
					</div>
				</td>
				<td>${statusBadge(s.returnStatus, s.statusTone)}</td>
				<td>${button({ label: 'Szczegóły', variant: 'outline' })}</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Wysyłki / Logistyka',
				subtitle: 'Kompletowanie i śledzenie paczek przedwyjazdowych, zwrot sprzętu, teczki pilota',
				actions: [
					button({ label: 'Nowa wysyłka', icon: 'fa-solid fa-plus', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('nowa-wysylka-modal').classList.add('show')" } })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Wysłane paczki', value: '6', icon: 'fa-solid fa-box', iconTone: 'green' })}
				${statCard({ title: 'Do przygotowania', value: '4', icon: 'fa-solid fa-boxes-stacking', iconTone: 'orange', trend: 'Najbliższa: 05.04.2026', trendTone: 'negative' })}
				${statCard({ title: 'Radiodbiorniki w obiegu', value: '28 / 40', icon: 'fa-solid fa-radio', iconTone: 'blue' })}
				${statCard({ title: 'Braki po zwrotach', value: '2 radio', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'purple', trend: 'WYS-2026-014 — IT-2025', trendTone: 'negative' })}
			</div>`,
			panel({
				title: 'Rejestr wysyłek',
				body: `<div class="table-container">
					<table>
						<thead><tr><th>Nr</th><th>Impreza</th><th>Odbiorca</th><th>Data wyjazdu</th><th>Nadano</th><th>Kurier / Tracking</th><th>Zawartość</th><th>Zwrot</th><th></th></tr></thead>
						<tbody>${rows}</tbody>
					</table>
				</div>`
			}),
			`<div id="nowa-wysylka-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
				<div class="demo-modal" style="max-width:640px">
					<div class="demo-modal-header">
						<h3 style="margin:0;font-size:1.1rem;font-weight:600">Nowa wysyłka — kompletowanie paczki</h3>
						<button class="demo-modal-close" data-no-demo="true" onclick="document.getElementById('nowa-wysylka-modal').classList.remove('show')">×</button>
					</div>
					<div class="demo-modal-body">
						<div class="form-mockup">
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Impreza / odbiorca</div>
							<div class="form-row-2">
								<label class="form-field"><span>Impreza</span>
									<select><option>MT-2026-WL-01 — Ziemia Święta</option><option>MT-2026-IT-03 — Włochy</option><option>MT-2026-GR-02 — Grecja</option></select>
								</label>
								<label class="form-field"><span>Odbiorca (pilot)</span><input type="text" value="Krzysztof Tomaszewski" /></label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem">Zawartość paczki</div>
							<div class="form-row-3">
								<label class="form-field"><span><i class="fa-solid fa-radio"></i> Radioodbiornicy (szt.)</span><input type="number" value="8" min="0" /></label>
								<label class="form-field"><span><i class="fa-solid fa-folder-open"></i> Teczki pilota (szt.)</span><input type="number" value="42" min="0" /></label>
								<label class="form-field"><span><i class="fa-solid fa-book-open"></i> Śpiewniki (szt.)</span><input type="number" value="42" min="0" /></label>
							</div>
							<div class="form-row-3">
								<label class="form-field"><span><i class="fa-solid fa-id-badge"></i> Smycze (szt.)</span><input type="number" value="42" min="0" /></label>
								<label class="form-field"><span><i class="fa-solid fa-flag"></i> Inne materiały</span><input type="text" value="Mapy lokalne x42" /></label>
								<label class="form-field"><span>Firma kurierska</span>
									<select><option>DPD</option><option>InPost</option><option>DHL</option><option>Poczta Polska</option></select>
								</label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem">Kurier / śledzenie</div>
							<div class="form-row-2">
								<label class="form-field"><span>Nr listu przewozowego (wyjazd)</span><input type="text" placeholder="np. 1234567890" /></label>
								<label class="form-field"><span>Nr etykiety zwrotnej</span><input type="text" placeholder="np. 0987654321" /></label>
							</div>
						</div>
					</div>
					<div class="demo-modal-footer">
						<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById('nowa-wysylka-modal').classList.remove('show')">Anuluj</button>
						${button({ label: 'Zapisz i generuj etykietę', icon: 'fa-solid fa-print' })}
					</div>
				</div>
			</div>`
		].join('');
	}

	/* ===== TECZKA PILOTA ===== */
	function renderTeczka() {
		return [
			dashboardHeader({
				title: 'Teczka Pilota',
				subtitle: 'Automatycznie generowana dokumentacja wyjazdowa dla ks. Jan Wiśniewski — MT-2026-WL-01',
				actions: [
					button({ label: 'Pobierz PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }),
					button({ label: 'Wyślij do pilota', icon: 'fa-solid fa-paper-plane' })
				]
			}),
			`<div class="dashboard-grid" style="grid-template-columns:1fr 2fr">
				<div style="display:flex;flex-direction:column;gap:1.25rem">
					${panel({ title: 'Zawartość teczki', body: `
						<div class="teczka-sections">
							<button class="teczka-section active"><i class="fa-solid fa-address-card"></i> Strona tytułowa</button>
							<button class="teczka-section"><i class="fa-solid fa-users"></i> Lista uczestników (42)</button>
							<button class="teczka-section"><i class="fa-solid fa-bed"></i> Rooming list</button>
							<button class="teczka-section"><i class="fa-solid fa-route"></i> Program wyjazdu</button>
							<button class="teczka-section"><i class="fa-solid fa-calculator"></i> Kosztorys pilota</button>
							<button class="teczka-section"><i class="fa-solid fa-money-bills"></i> Wpłaty na miejscu</button>
							<button class="teczka-section"><i class="fa-solid fa-shield-halved"></i> Polisy ubezpieczeniowe</button>
							<button class="teczka-section"><i class="fa-solid fa-file-pen"></i> Authority Letter</button>
						</div>
						<div style="margin-top:1rem">
							${button({ label: 'Generuj całość PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' })}
						</div>
					` })}
					${panel({ title: 'Wersje teczki', body: `
						<div class="version-list">
							<div class="version-row active"><span class="version-badge">v3 · Bieżąca</span><div><small>27.03.2026, 14:22</small><p>Dodano uczestnika Nowak</p></div></div>
							<div class="version-row"><span class="version-badge old">v2</span><div><small>20.03.2026, 09:40</small><p>Zmiana pokoju 203</p></div></div>
							<div class="version-row"><span class="version-badge old">v1</span><div><small>10.03.2026</small><p>Pierwsza wersja</p></div></div>
						</div>
					` })}
				</div>
				${panel({ title: '📄 Podgląd — Strona tytułowa', body: `
					<div class="teczka-preview">
						<div class="teczka-header-block">
							<div class="teczka-logo-placeholder">MATTEO TRAVEL</div>
							<h1>TECZKA PILOTA</h1>
							<h2>Jubileuszowa Pielgrzymka do Ziemi Świętej</h2>
							<div class="teczka-meta-grid">
								<div><span>Kod imprezy:</span><strong>MT-2026-WL-01</strong></div>
								<div><span>Termin:</span><strong>25.04 – 02.05.2026 (8 dni)</strong></div>
								<div><span>Organizator:</span><strong>ks. Jan Wiśniewski</strong></div>
								<div><span>Parafia:</span><strong>Wniebowzięcia NMP, Kraków</strong></div>
								<div><span>Pilot:</span><strong>Krzysztof Tomaszewski</strong></div>
								<div><span>Uczestnicy:</span><strong>42 osoby</strong></div>
								<div><span>Lot out:</span><strong>LOT LO4KL2 WAW→TLV, 25.04 godz. 07:20</strong></div>
								<div><span>Lot return:</span><strong>LOT LO4KL3 TLV→WAW, 02.05 godz. 14:10</strong></div>
								<div><span>Hotele:</span><strong>Dan Jerusalem (3n) + Bethlehem Star (2n) + Galilee Hotel (2n)</strong></div>
								<div><span>Ubezpieczenie:</span><strong>Allianz Travel Premium, polisa gr. MT/2026/WL01</strong></div>
								<div><span>Kontakt biuro:</span><strong>Anna Kowalczyk · 601 234 567</strong></div>
								<div><span>Wygenerowano:</span><strong>27.03.2026 · wersja 3</strong></div>
							</div>
						</div>
						<div class="teczka-alert">
							<i class="fa-solid fa-triangle-exclamation"></i>
							Dokument zawiera dane osobowe uczestników. Nie udostępniać osobom nieupoważnionym.
						</div>
					</div>
				` })}
			</div>`
		].join('');
	}

	window.WysylkiView = { renderWysylki };
	window.TeczkaView = { renderTeczka };
})();
