(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== POCZTA ===== */
	function renderPoczta() {
		const emails = [
			{ from: 'ks. jan.kowalczyk@diecezja.pl', subject: 'Re: Oferta — Ziemia Święta 2026 — pytanie o program', preview: 'Dzień dobry, dziękuję za przesłaną ofertę. Mam kilka pytań odnośnie programu dnia 3…', time: '10:42', unread: true, tag: 'WL-01', attached: true },
			{ from: 'recepcja@danhotel.co.il', subject: 'Booking Confirmation — MT-2026-WL-01 — April 2026', preview: 'Dear Matteo Travel, please find attached your booking confirmation for the group…', time: '09:15', unread: true, tag: 'WL-01', attached: true },
			{ from: 'barbara.nowak@gmail.com', subject: 'Brakujące dokumenty — kiedy muszę dostarczyć paszport?', preview: 'Dzień dobry, chciałam zapytać, do kiedy mogę przesłać skan paszportu…', time: 'Wczoraj', unread: false, tag: 'WL-01', attached: false },
			{ from: 'lot.groups@lot.com', subject: 'PNR LO4KL2 — Deposit reminder — due 01 April 2026', preview: 'Dear Agent, this is a reminder that the deposit for booking LO4KL2 is due…', time: 'Wczoraj', unread: true, tag: 'Bilety', attached: false },
			{ from: 'dyrektor@liceum-pijary.pl', subject: 'Pytanie o pakiet grupy 50 osób — Rzym czerwiec', preview: 'Szanowni Państwo, reprezentuję Liceum Pijarów i interesuje nas wyjazd do Rzymu…', time: '25.03', unread: false, tag: 'Nowe zapytanie', attached: false },
			{ from: 'anna.kowalczyk@matteotravelkrakow.pl', subject: '[Wewnętrzna] WL-01 — brak paszportu u Nowak i Malczewski', preview: 'Cześć, musimy pilnie skontaktować się z Nowak Barbarą i Malczewskim Tomaszem…', time: '23.03', unread: false, tag: 'Wewn.', attached: false },
		];

		const emailRows = emails.map(e => `
			<div class="email-row ${e.unread ? 'unread' : ''}">
				<div class="email-avatar">${escapeHtml(e.from.split('@')[0].split('.').map(w=>w[0]?.toUpperCase()).slice(0,2).join(''))}</div>
				<div class="email-meta">
					<div class="email-from">${escapeHtml(e.from)}</div>
					<div class="email-subject">${e.unread ? '<strong>' : ''}${escapeHtml(e.subject)}${e.unread ? '</strong>' : ''}</div>
					<div class="email-preview">${escapeHtml(e.preview)}</div>
				</div>
				<div class="email-right">
					${e.tag ? `<span class="email-tag">${escapeHtml(e.tag)}</span>` : ''}
					${e.attached ? '<i class="fa-solid fa-paperclip" style="color:var(--text-muted)"></i>' : ''}
					<span class="email-time">${escapeHtml(e.time)}</span>
					${e.unread ? '<span class="unread-dot"></span>' : ''}
				</div>
			</div>
		`).join('');

		return [
			dashboardHeader({
				title: 'Poczta elektroniczna',
				subtitle: 'Centralna skrzynka — wiadomości automatycznie przypisywane do uczestników i imprez',
				actions: [
					button({ label: 'Odświeź', icon: 'fa-solid fa-rotate', variant: 'outline' }),
					button({ label: 'Nowa wiadomość', icon: 'fa-solid fa-pen-to-square' })
				]
			}),
			`<div class="stats-grid" style="grid-template-columns:repeat(4,1fr)">
				${statCard({ title: 'Nieprzeczytane', value: '3', icon: 'fa-solid fa-envelope', iconTone: 'orange' })}
				${statCard({ title: 'Skrzynka odbiorcza', value: '48', icon: 'fa-solid fa-inbox', iconTone: 'blue' })}
				${statCard({ title: 'Wysłane dziś', value: '7', icon: 'fa-solid fa-paper-plane', iconTone: 'green' })}
				${statCard({ title: 'Do follow-up', value: '4', icon: 'fa-solid fa-reply', iconTone: 'purple' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:220px 1fr">
				${panel({ title: 'Foldery', body: `
					<div class="mail-folder-list">
						<div class="mail-folder active"><i class="fa-solid fa-inbox"></i> Odebrane <span class="folder-badge">3</span></div>
						<div class="mail-folder"><i class="fa-solid fa-paper-plane"></i> Wysłane</div>
						<div class="mail-folder"><i class="fa-solid fa-star"></i> Ważne</div>
						<div class="mail-folder"><i class="fa-solid fa-clock-rotate-left"></i> Do follow-up <span class="folder-badge warn">4</span></div>
						<div class="mail-folder"><i class="fa-solid fa-tag"></i> WL-01 <span class="folder-badge">12</span></div>
						<div class="mail-folder"><i class="fa-solid fa-tag"></i> IT-03 <span class="folder-badge">8</span></div>
						<div class="mail-folder"><i class="fa-solid fa-tag"></i> Zapytania nowe</div>
						<div class="mail-folder"><i class="fa-solid fa-trash"></i> Kosz</div>
					</div>
				` })}
				${panel({ title: 'Skrzynka odbiorcza', body: `<div class="email-list">${emailRows}</div>` })}
			</div>`
		].join('');
	}

	/* ===== SMS ===== */
	function renderSMS() {
		const templates = [
			{ name: 'Potwierdzenie wpłaty', text: 'Matteo Travel: Potwierdzamy wpłatę [KWOTA] PLN za wyjazd [IMPREZA]. Saldo: [SALDO]. Dziękujemy!' },
			{ name: 'Przypomnienie o racie', text: 'Matteo Travel: Informujemy, że zbliża się termin wpłaty II raty za wyjazd [IMPREZA] — do [DATA]. Kwota: [KWOTA] PLN.' },
			{ name: 'Brak dokumentów', text: 'Matteo Travel: Prosimy o dosłanie skanu paszportu dla uczestnika [IMIE] do dnia [DATA]. Wyjazd: [IMPREZA].' },
			{ name: 'Imieniny organizatora', text: 'Szanowny Ksiądz [IMIE], zespół Matteo Travel serdecznie życzy wszystkiego najlepszego w dniu imienin! 🙏' },
		];

		const history = [
			{ date: '27.03 09:00', recipient: 'Nowak Barbara · 601 999 888', text: 'Matteo Travel: Prosimy o dosłanie skanu paszportu do dnia 05.04.2026. Wyjazd: MT-2026-WL-01.', status: 'Dostarczony', statusTone: 'success' },
			{ date: '26.03 14:30', recipient: '7 uczestników · MT-2026-WL-01', text: 'Matteo Travel: Informujemy, że II rata za wyjazd do Ziemi Świętej jest wymagalna…', status: 'Dostarczony', statusTone: 'success' },
			{ date: '25.03 11:00', recipient: 'ks. Jan Wiśniewski · 501 234 567', text: 'Matteo Travel: Z radością informujemy, że polisa ubezpieczeniowa Allianz została aktywowana…', status: 'Dostarczony', statusTone: 'success' },
		];

		return [
			dashboardHeader({
				title: 'Komunikacja SMS',
				subtitle: 'Wysyłka SMS do uczestników i organizatorów — szablony, historia, planowanie',
				actions: [
					button({ label: 'Zaplanuj SMS', icon: 'fa-solid fa-clock', variant: 'outline' }),
					button({ label: 'Wyślij SMS', icon: 'fa-solid fa-comment-sms' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'SMS wysłanych (marzec)', value: '142', icon: 'fa-solid fa-comment-sms', iconTone: 'blue' })}
				${statCard({ title: 'Dostarczonych', value: '139', icon: 'fa-solid fa-check-double', iconTone: 'green', trend: '97,9% skuteczność', trendTone: 'positive' })}
				${statCard({ title: 'Zaplanowanych', value: '5', icon: 'fa-solid fa-clock', iconTone: 'orange' })}
				${statCard({ title: 'Koszt (marzec)', value: '28,40 PLN', icon: 'fa-solid fa-coins', iconTone: 'purple' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
				${panel({ title: 'Szybka wysyłka SMS', body: `
					<div class="form-mockup">
						<label class="form-field"><span>Szablon (opcjonalnie)</span>
							<select>
								<option value="">— własna treść —</option>
								${templates.map(t => `<option>${escapeHtml(t.name)}</option>`).join('')}
							</select>
						</label>
						<label class="form-field"><span>Odbiorcy</span>
							<select>
								<option>Wszyscy uczestnicy — MT-2026-WL-01 (42 os.)</option>
								<option>Uczestnicy bez paszportu (10 os.)</option>
								<option>Uczestnicy z zaległymi ratami (7 os.)</option>
								<option>Pojedynczy numer</option>
							</select>
						</label>
						<label class="form-field"><span>Treść</span><textarea rows="4" placeholder="Treść wiadomości SMS... (maks 160 znaków)">Matteo Travel: Prosimy o dosłanie skanu paszportu do dnia 05.04.2026. Imprez: MT-2026-WL-01.</textarea></label>
						<div class="form-row-2">
							<label class="form-field"><span>Wyślij</span>
								<select><option>Natychmiast</option><option>Zaplanuj datę i czas</option></select>
							</label>
							<label class="form-field"><span>Nadawca</span>
								<select><option>Matteo Travel</option><option>Info</option></select>
							</label>
						</div>
						<div style="margin-top:1rem;display:flex;gap:0.5rem;align-items:center">
							<span style="font-size:0.82rem;color:var(--text-muted)">Odbiorców: 10 · Koszt: ~2,00 PLN</span>
							${button({ label: 'Wyślij SMS', icon: 'fa-solid fa-paper-plane' })}
						</div>
					</div>
				` })}
				${panel({ title: 'Historia wysyłek', body: `
					<div class="sms-history">
						${history.map(s => `
							<div class="sms-history-item">
								<div class="sms-meta"><span class="sms-time">${escapeHtml(s.date)}</span>${statusBadge(s.status, s.statusTone)}</div>
								<div class="sms-recipient"><i class="fa-solid fa-user"></i> ${escapeHtml(s.recipient)}</div>
								<div class="sms-preview">${escapeHtml(s.text)}</div>
							</div>
						`).join('')}
					</div>
				` })}
			</div>`
		].join('');
	}

	/* ===== CZAT WEWNĘTRZNY ===== */
	function renderCzat() {
		return [
			dashboardHeader({
				title: 'Czat wewnętrzny',
				subtitle: 'Komunikacja między pracownikami biura — szybkie pytania, przekazywanie spraw',
				actions: [button({ label: 'Nowa rozmowa', icon: 'fa-solid fa-plus' })]
			}),
			`<div class="chat-layout">
				<div class="chat-sidebar">
					<div class="chat-search"><input type="text" placeholder="Szukaj rozmów..." /></div>
					<div class="chat-list">
						<div class="chat-thread active">
							<div class="avatar-sm">AK</div>
							<div class="chat-thread-info">
								<strong>Anna K. <small>· BOK</small></strong>
								<p>Sprawdziłaś wpłatę Nowak?</p>
							</div>
							<div class="chat-thread-meta"><span>10:38</span><span class="chat-badge">2</span></div>
						</div>
						<div class="chat-thread">
							<div class="avatar-sm" style="background:#d1fae5;color:#059669">MW</div>
							<div class="chat-thread-info">
								<strong>Marek W. <small>· Ofertowanie</small></strong>
								<p>Zaaprovujesz kalkulację dla Santia…</p>
							</div>
							<div class="chat-thread-meta"><span>09:55</span></div>
						</div>
						<div class="chat-thread">
							<div class="avatar-sm" style="background:#ede9fe;color:#7c3aed">PS</div>
							<div class="chat-thread-info">
								<strong>Piotr S. <small>· Booking</small></strong>
								<p>Hotel w Composteli potwierdził opcję</p>
							</div>
							<div class="chat-thread-meta"><span>Wczoraj</span></div>
						</div>
						<div class="chat-thread group">
							<div class="avatar-sm" style="background:#fef3c7;color:#b45309"><i class="fa-solid fa-users" style="font-size:0.8rem"></i></div>
							<div class="chat-thread-info">
								<strong>#WL-01 Ziemia Święta</strong>
								<p>KT: Mogę odebrać teczki w środę</p>
							</div>
							<div class="chat-thread-meta"><span>Wczoraj</span><span class="chat-badge">1</span></div>
						</div>
					</div>
				</div>
				<div class="chat-main">
					<div class="chat-header">
						<div class="avatar-sm">AK</div>
						<div><strong>Anna K.</strong><span style="font-size:0.8rem;color:var(--success-color);margin-left:0.5rem">● online</span></div>
						<div style="margin-left:auto;display:flex;gap:0.5rem">
							${button({ label: 'MT-2026-WL-01', icon: 'fa-solid fa-link', variant: 'outline' })}
						</div>
					</div>
					<div class="chat-messages">
						<div class="chat-msg other"><div class="chat-msg-bubble"><p>Sprawdziłaś wpłatę od Nowak Barbary? Bo mam w systemie tylko 2000 zł, a rata była 2500.</p><span class="msg-time">10:32</span></div></div>
						<div class="chat-msg me"><div class="chat-msg-bubble"><p>Tak, właśnie patrzę — przyszło 2000 zł tytułem "ZIEMIA". Muszę ręcznie zweryfikować.</p><span class="msg-time">10:35</span></div></div>
						<div class="chat-msg other"><div class="chat-msg-bubble"><p>Dobra, zadzwonię do niej. Może się pomyliła kwotą. Sprawdziłaś czy ma paszport?</p><span class="msg-time">10:36</span></div></div>
						<div class="chat-msg me"><div class="chat-msg-bubble"><p>Nie ma skanu. Wysłałam jej SMS z przypomnieniem — deadline 05.04.</p><span class="msg-time">10:38</span></div></div>
					</div>
					<div class="chat-input-area">
						<input type="text" placeholder="Napisz wiadomość..." class="chat-input" />
						${button({ label: '', icon: 'fa-solid fa-paper-plane', variant: 'primary', attrs: { style: 'padding:0.6rem 0.9rem;min-width:0' } })}
					</div>
				</div>
			</div>`
		].join('');
	}

	window.PocztaView = { renderPoczta };
	window.SMSView = { renderSMS };
	window.CzatView = { renderCzat };
})();
