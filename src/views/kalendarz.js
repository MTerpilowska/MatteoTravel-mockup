(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	function renderKalendarz() {
		const events = [
			{ date: '01.04', day: 'Wt', type: 'wyjazd', label: 'MT-2026-WL-01 — Wylot Kraków → Tel Aviv', time: 'KRK 06:50', tone: 'blue' },
			{ date: '05.04', day: 'Sb', type: 'platnosc', label: 'Termin: I rata — MT-2026-IT-03 (44 os.)', time: '23:59', tone: 'orange' },
			{ date: '06.04', day: 'Nd', type: 'wyjazd', label: 'MT-2026-WL-01 — Powrót Tel Aviv → Kraków', time: 'TLV 22:10', tone: 'blue' },
			{ date: '07.04', day: 'Pn', type: 'platnosc', label: 'Deadline bilety LO — PNR LO4KL2 — depozyt', time: '12:00', tone: 'red' },
			{ date: '10.04', day: 'Cz', type: 'spotaknie', label: 'Spotkanie zoomowe — ks. Kowalczyk — Santiagio 2027', time: '16:00', tone: 'purple' },
			{ date: '12.04', day: 'Sb', type: 'platnosc', label: 'Termin: II rata — MT-2026-WL-01 (42 os.)', time: '23:59', tone: 'orange' },
			{ date: '15.04', day: 'Wt', type: 'bilety', label: 'Deadline wysyłka teczek pilota — MT-2026-WL-01', time: '12:00', tone: 'green' },
			{ date: '20.04', day: 'Nd', type: 'wyjazd', label: 'MT-2026-IT-03 — Wylot Kraków → Rzym', time: 'KRK 07:30', tone: 'blue' },
			{ date: '27.04', day: 'Nd', type: 'wyjazd', label: 'MT-2026-IT-03 — Powrót Rzym → Kraków', time: 'FCO 19:50', tone: 'blue' },
			{ date: '30.04', day: 'Śr', type: 'platnosc', label: 'Termin: całość — MT-2026-IT-03 (44 os.)', time: '23:59', tone: 'orange' },
		];

		const legend = [
			{ tone: 'blue', label: 'Wyjazd / przylot' },
			{ tone: 'orange', label: 'Termin płatności' },
			{ tone: 'red', label: 'Pilny deadline' },
			{ tone: 'purple', label: 'Spotkanie' },
			{ tone: 'green', label: 'Logistyka / teczki' },
		];

		return [
			dashboardHeader({
				title: 'Kalendarz',
				subtitle: 'Przegląd terminów — wyloty, raty, deadliny biletowe, spotkania z organizatorami',
				actions: [
					button({ label: 'Widok tygodniowy', icon: 'fa-solid fa-table-cells', variant: 'outline' }),
					button({ label: 'Dodaj zdarzenie', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Zdarzeń w tym miesiącu', value: '18', icon: 'fa-solid fa-calendar-days', iconTone: 'blue' })}
				${statCard({ title: 'Pilnych terminów', value: '3', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange' })}
				${statCard({ title: 'Wylotów w maju', value: '2', icon: 'fa-solid fa-plane-departure', iconTone: 'green' })}
				${statCard({ title: 'Spotkań zaplanowanych', value: '4', icon: 'fa-solid fa-video', iconTone: 'purple' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:3fr 1fr">
				${panel({ title: 'Kwiecień 2026 — terminy i zdarzenia', body: `
					<div class="calendar-timeline">
						${events.map(e => `
							<div class="cal-event-row">
								<div class="cal-date-col">
									<span class="cal-day">${escapeHtml(e.day)}</span>
									<span class="cal-num">${escapeHtml(e.date)}</span>
								</div>
								<div class="cal-event-dot tone-${e.tone}"></div>
								<div class="cal-event-info">
									<span class="cal-event-label">${escapeHtml(e.label)}</span>
									<span class="cal-event-time">${escapeHtml(e.time)}</span>
								</div>
							</div>
						`).join('')}
					</div>
				` })}
				<div style="display:flex;flex-direction:column;gap:1rem">
					${panel({ title: 'Legenda', body: `<div class="cal-legend">${legend.map(l => `
						<div class="cal-legend-item"><span class="cal-event-dot tone-${l.tone}" style="display:inline-block"></span> ${escapeHtml(l.label)}
						</div>`).join('')}</div>` })}
					${panel({ title: 'Najbliższe 7 dni', body: `
						<div class="cal-upcoming">
							<div class="cal-upcoming-item urgent"><i class="fa-solid fa-plane-departure"></i>  <div><strong>01.04</strong><p>WL-01 — wylot o 06:50</p></div></div>
							<div class="cal-upcoming-item"><i class="fa-solid fa-money-bill-wave"></i> <div><strong>05.04</strong><p>Rata IT-03</p></div></div>
							<div class="cal-upcoming-item urgent"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>07.04</strong><p>Deadline bilety LO</p></div></div>
						</div>
					` })}
				</div>
			</div>`
		].join('');
	}

	window.KalendarzView = { renderKalendarz };
})();
