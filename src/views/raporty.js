(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== RAPORTY ===== */
	function renderRaporty() {
		const topGroups = [
			{ code: 'MT-2026-WL-01', name: 'Ziemia Święta — Wielkanoc', pax: 42, value: '378 000 PLN', margin: '18%', pilot: 'Katarzyna T.' },
			{ code: 'MT-2026-IT-03', name: 'Rzym — Jubileusz 2026', pax: 44, value: '396 000 PLN', margin: '21%', pilot: 'Tomasz W.' },
			{ code: 'MT-2026-ES-02', name: 'Santiago de Compostela', pax: 36, value: '288 000 PLN', margin: '19%', pilot: 'Anna K.' },
		];

		const channels = [
			{ name: 'Poczta pantoflowa / polecenia', share: '44%', leads: 28 },
			{ name: 'Strona internetowa', share: '28%', leads: 18 },
			{ name: 'Facebook Ads', share: '17%', leads: 11 },
			{ name: 'Targi turystyczne', share: '8%', leads: 5 },
			{ name: 'Inne', share: '3%', leads: 2 },
		];

		return [
			dashboardHeader({
				title: 'Raporty i statystyki',
				subtitle: 'Podsumowania sprzedaży, rentowności i źródeł leadów',
				actions: [
					button({ label: 'Eksport PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }),
					button({ label: 'Eksport XLS', icon: 'fa-solid fa-file-excel', variant: 'outline' }),
					button({ label: 'Odśwież dane', icon: 'fa-solid fa-rotate' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Przychód YTD 2026', value: '1 241 000 PLN', icon: 'fa-solid fa-sack-dollar', iconTone: 'green', trend: '+18% vs. 2025', trendTone: 'positive' })}
				${statCard({ title: 'Marża śr. brutto', value: '19,3%', icon: 'fa-solid fa-percent', iconTone: 'blue', trend: '+2,1 pp vs. 2025', trendTone: 'positive' })}
				${statCard({ title: 'Uczestników YTD', value: '284', icon: 'fa-solid fa-users', iconTone: 'purple' })}
				${statCard({ title: 'Imprez zrealizowanych', value: '7', icon: 'fa-solid fa-plane', iconTone: 'orange' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
				${panel({ title: 'Top imprezy 2026 — przychód', body: `
					<table class="data-table">
						<thead><tr><th>Kod</th><th>Impreza</th><th>Pax</th><th>Przychód</th><th>Marża</th><th>Pilot</th></tr></thead>
						<tbody>
							${topGroups.map(g => `<tr>
								<td><code>${escapeHtml(g.code)}</code></td>
								<td>${escapeHtml(g.name)}</td>
								<td>${g.pax}</td>
								<td><strong>${escapeHtml(g.value)}</strong></td>
								<td><strong>${escapeHtml(g.margin)}</strong></td>
								<td>${escapeHtml(g.pilot)}</td>
							</tr>`).join('')}
						</tbody>
					</table>
				` })}
				${panel({ title: 'Źródła leadów (YTD)', body: `
					<div class="report-channel-list">
						${channels.map(c => `
							<div class="report-channel-row">
								<div class="report-channel-label">${escapeHtml(c.name)}</div>
								<div class="report-channel-bar-wrap">
									<div class="report-channel-bar" style="width:${c.share}"></div>
								</div>
								<div class="report-channel-val">${escapeHtml(c.share)} <small>(${c.leads} leadów)</small></div>
							</div>
						`).join('')}
					</div>
				` })}
			</div>`,
			panel({ title: 'Przychód miesięczny — 2026 (mockup wizualizacji)', body: `
				<div class="chart-placeholder">
					<div class="chart-bars">
						${[['Sty', 80], ['Lut', 95], ['Mar', 142], ['Kwi', 195], ['Maj', 178], ['Cze', 220], ['Lip', 80], ['Sie', 45], ['Wrz', 90], ['Paź', 130], ['Lis', 85], ['Gru', 110]].map(([m, h]) => `
							<div class="chart-bar-col">
								<div class="chart-bar" style="height:${h}px"></div>
								<div class="chart-bar-label">${m}</div>
							</div>
						`).join('')}
					</div>
					<div class="chart-note">Symulacja danych — wykres docelowy wykona dział IT</div>
				</div>
			` })
		].join('');
	}

	/* ===== USTAWIENIA ===== */
	function renderUstawienia() {
		const sections = [
			{
				icon: 'fa-solid fa-building', title: 'Dane firmy',
				fields: [
					['Nazwa firmy', 'Matteo Travel sp. z o.o.'],
					['NIP', '694-000-00-00'],
					['Adres', 'ul. Józefa 9/2, 31-056 Kraków'],
					['Telefon', '+48 12 429 20 20'],
					['E-mail', 'biuro@matteotravelkrakow.pl'],
					['Strona WWW', 'matteotravelkrakow.pl'],
				]
			},
			{
				icon: 'fa-solid fa-users-gear', title: 'Role i uprawnienia',
				desc: 'Zarządzanie rolami: Administrator, BOK, Ofertowanie, Booking, Bilety, Księgowość, Marketing, Pilot',
			},
			{
				icon: 'fa-solid fa-lock', title: 'Bezpieczeństwo',
				desc: 'Dwuetapowe logowanie (2FA), polityka haseł, historia logowań, IP whitelisting',
			},
			{
				icon: 'fa-solid fa-bell', title: 'Powiadomienia',
				desc: 'Konfiguracja alertów — terminy płatności, braki dokumentów, deadline biletowe, raporty tygodniowe',
			},
			{
				icon: 'fa-solid fa-file-contract', title: 'Szablony dokumentów',
				desc: 'Umowy, polisy, programy wycieczek — szablony Word/PDF z automatycznym uzupełnianiem danych',
			},
			{
				icon: 'fa-solid fa-plug', title: 'Integracje',
				desc: 'LOT GDS, Allianz XML, Galileo/Amadeus, serwis SMS, SMTP poczty wychodzącej',
			},
		];

		return [
			dashboardHeader({
				title: 'Ustawienia systemu',
				subtitle: 'Konfiguracja firmy, użytkowników, szablonów i integracji',
				actions: [button({ label: 'Zapisz zmiany', icon: 'fa-solid fa-floppy-disk' })]
			}),
			`<div class="settings-grid">
				${sections.map(s => `
					<div class="setting-card">
						<div class="setting-card-header">
							<i class="${s.icon}" style="color:var(--primary-color);font-size:1.4rem"></i>
							<strong>${escapeHtml(s.title)}</strong>
						</div>
						<div class="setting-card-body">
							${s.fields ? `<table class="info-table">${s.fields.map(([k,v]) => `<tr><td>${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}</table>` : ''}
							${s.desc ? `<p style="color:var(--text-muted);font-size:0.9rem">${escapeHtml(s.desc)}</p>` : ''}
							<div style="margin-top:1rem">${button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' })}</div>
						</div>
					</div>
				`).join('')}
			</div>`
		].join('');
	}

	window.RaportyView = { renderRaporty };
	window.UstawieniaView = { renderUstawienia };
})();
