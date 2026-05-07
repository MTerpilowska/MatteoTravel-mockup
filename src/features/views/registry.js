(function () {
	const { dashboards } = window.AppDashboards;
	const { createPlaceholderPage } = window.PlaceholderViews;

	function renderView(roleKey, pageKey) {
		var map = {
			dashboard:   function () { return dashboards[roleKey] || createPlaceholderPage(pageKey, roleKey); },
			crm:         function () { return window.CRMView.renderCRM(); },
			zapytania:   function () { return window.ZapytaniaView.renderZapytania(); },
            szczegoly_zapytania: function () { return window.ZapytaniaView.renderSzczegolyZapytania(); },
			grupy:       function () { return window.GrupyView.renderGrupy(); },
            szczegoly_grupy: function () { return window.SzczegolyGrupyView.renderSzczegolyGrupy(); },
            kartoteka:   function () { return window.SzczegolyKontaktuView.renderSzczegolyKontaktu(); },
			rezerwacje:  function () { return window.RezerwacjeView.renderRezerwacje(); },
			umowy:       function () { return window.UmowyView.renderUmowy(); },
			platnosci:   function () { return window.PlatnosciView.renderPlatnosci(); },
			ksiegowosc:  function () { return window.KsiegowoscView.renderKsiegowosc(); },
			bilety:      function () { return window.BiletyView.renderBilety(); },
			szczegoly_biletow: function () { return window.SzczegolyBiletowView.renderSzczegolyBiletow(); },
			hotele:      function () { return window.HoteleView.renderHotele(); },
			msze:        function () { return window.MszeView.renderMsze(); },
			piloci:      function () { return window.PilociView.renderPiloci(); },
			lokalni:     function () { return window.LokalniView.renderLokalni(); },
			hotele_kontakty: function () { return window.HoteleKontaktyView.renderHoteleKontakty(); },
			autokary:    function () { return window.AutokaryView.renderAutokary(); },
			atrakcje:    function () { return window.AtrakcjeView.renderAtrakcje(); },
			msze_kontakty: function () { return window.MszeKontaktyView.renderMszeKontakty(); },
			kontrahenci: function () { return window.KontrahenciView.renderKontrahenci(); },
			restauracje: function () { return window.RestauracjeView.renderRestauracje(); },
			platnosci_kontakty: function () { return window.PlatnosciKontaktyView.renderPlatnosciKontakty(); },
			wysylki:     function () { return window.WysylkiView.renderWysylki(); },
			teczka:      function () { return window.TeczkaView.renderTeczka(); },
			poczta:      function () { return window.PocztaView.renderPoczta(); },
			sms:         function () { return window.SMSView.renderSMS(); },
			czat:        function () { return window.CzatView.renderCzat(); },
			kalendarz:   function () { return window.KalendarzView.renderKalendarz(); },
			leady:       function () { return window.LeadyView.renderLeady(); },
			kampanie:    function () { return window.KampanieView.renderKampanie(); },
			social:      function () { return window.SocialView.renderSocial(); },
			raporty:     function () { return window.RaportyView.renderRaporty(); },
			ustawienia:  function () { return window.UstawieniaView.renderUstawienia(); }
		};
		return (map[pageKey] || function () { return createPlaceholderPage(pageKey, roleKey); })();
	}

	window.ViewRegistry = { renderView };
})();