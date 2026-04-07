(function () {
        const ROLE_OPTIONS = [
                { key: 'admin', label: 'Administrator / Właściciel' },
                { key: 'ofertowanie', label: 'Ofertowanie' },
                { key: 'bok', label: 'Biuro Obsługi Uczestnika' },
                { key: 'booking', label: 'Booking / Hotele' },
                { key: 'bilety', label: 'Bilety Lotnicze' },
                { key: 'ksiegowosc', label: 'Księgowość' },
                { key: 'marketing', label: 'Sprzedaż / Marketing' },
                { key: 'pilot', label: 'Pilot' }
        ];

        const ROLE_PAGES = {
                admin: ['dashboard', 'crm', 'zapytania', 'grupy', 'rezerwacje', 'umowy', 'platnosci', 'ksiegowosc', 'bilety', 'hotele', 'msze', 'wysylki', 'teczka', 'poczta', 'sms', 'czat', 'kalendarz', 'leady', 'kampanie', 'social', 'raporty', 'ustawienia'],
                ofertowanie: ['dashboard', 'crm', 'zapytania', 'grupy', 'rezerwacje', 'umowy', 'poczta', 'czat', 'kalendarz'],
                bok: ['dashboard', 'crm', 'zapytania', 'rezerwacje', 'umowy', 'poczta', 'sms', 'czat', 'kalendarz'],
                booking: ['dashboard', 'rezerwacje', 'hotele', 'umowy', 'platnosci', 'poczta', 'czat', 'msze'],
                bilety: ['dashboard', 'rezerwacje', 'bilety', 'poczta', 'czat', 'wysylki'],
                ksiegowosc: ['dashboard', 'platnosci', 'ksiegowosc', 'umowy', 'raporty', 'ustawienia'],
                marketing: ['dashboard', 'crm', 'leady', 'kampanie', 'social', 'raporty'],
                pilot: ['dashboard', 'rezerwacje', 'teczka', 'poczta', 'czat', 'kalendarz']
        };

        const PAGE_OPTIONS = [
                { key: 'dashboard', label: 'Dashboard' },
                { key: 'crm', label: 'CRM / Uczestnicy' },
                { key: 'zapytania', label: 'Zapytania i Oferty' },
                { key: 'grupy', label: 'Grupy / Imprezy' },
                { key: 'rezerwacje', label: 'Rezerwacje' },
                { key: 'umowy', label: 'Umowy i Dokumenty' },
                { key: 'platnosci', label: 'Płatności' },
                { key: 'ksiegowosc', label: 'Księgowość' },
                { key: 'bilety', label: 'Bilety Lotnicze' },
                { key: 'hotele', label: 'Booking / Hotele' },
                { key: 'msze', label: 'Msze Święte' },
                { key: 'wysylki', label: 'Wysyłki / Logistyka' },
                { key: 'teczka', label: 'Teczka Pilota' },
                { key: 'poczta', label: 'Poczta' },
                { key: 'sms', label: 'SMS' },
                { key: 'czat', label: 'Czat wewnętrzny' },
                { key: 'kalendarz', label: 'Kalendarz' },
                { key: 'leady', label: 'Leady' },
                { key: 'kampanie', label: 'Kampanie' },
                { key: 'social', label: 'Social Media' },
                { key: 'raporty', label: 'Raporty' },
                { key: 'ustawienia', label: 'Ustawienia' }
        ];

        const STATUS_META = {
                open: { label: 'Otwarte', className: 'status-open' },
                in_review: { label: 'W analizie', className: 'status-review' },
                resolved: { label: 'Zakończone', className: 'status-resolved' }
        };

        const STATUS_ACTIONS = [
                { key: 'open', label: 'Otwórz', variant: 'outline' },
                { key: 'in_review', label: 'W analizie', variant: 'outline' },
                { key: 'resolved', label: 'Zakończ', variant: 'primary' }
        ];

        const PRIORITY_META = {
                low: 'Niski',
                medium: 'Średni',
                high: 'Wysoki'
        };

        const CATEGORY_META = {
                ux: 'UX / Czytelność',
                data: 'Dane / Logika',
                workflow: 'Proces',
                copy: 'Treść / Nazewnictwo'
        };

        const FEEDBACK_SUMMARY = [
                { key: 'open', label: 'Otwarte', caption: 'Do doprecyzowania z uczestnikiem', cardClassName: 'accent' },
                { key: 'in_review', label: 'W analizie', caption: 'W pracy zespołu wdrożeniowego', cardClassName: '' },
                { key: 'resolved', label: 'Zakończone', caption: 'Uzgodnione i zamknięte', cardClassName: 'success' }
        ];

        const PLACEHOLDER_STEPS = [
                { title: 'Widok jest gotowy do akceptacji', description: 'Ta sekcja pokazuje, jak wygląda makieta procesu dla wybranej roli i funkcjonalności.' },
                { title: 'Uczestnik dodaje uwagę lub komentarz', description: 'Każda uwaga zapisuje się w jednym wspólnym pliku JSON obsługiwanym przez lokalny backend.' },
                { title: 'Zespół odpowiada i zamyka temat', description: 'Wątek komunikacji i status uwagi są wspólne dla wszystkich osób, które wejdą pod ten sam link.' }
        ];

        const PLACEHOLDER_DISCUSSION_POINTS = [
                'Które pola muszą być obowiązkowe na starcie procesu.',
                'Jakie akcje mają być widoczne dla uczestnika, a jakie tylko dla zespołu Matteo.',
                'Jak ma wyglądać logika walidacji, blokad i statusów.'
        ];

        function getRoleLabel(roleKey) {
                return ROLE_OPTIONS.find((item) => item.key === roleKey)?.label || roleKey;
        }

        function getRolePages(roleKey) {
                return ROLE_PAGES[roleKey] || ROLE_PAGES['admin'];
        }

        function getPageLabel(pageKey) {
                return PAGE_OPTIONS.find((item) => item.key === pageKey)?.label || pageKey;
        }

        function createViewLabel(roleKey, pageKey) {
                return `${getPageLabel(pageKey)} / ${getRoleLabel(roleKey)}`;
        }

        function resolveApiBase() {
                if (window.location.protocol === 'file:') {
                        return 'http://localhost:3000/api';
                }
                return '/api';
        }

        window.AppConfig = {
                API_BASE: resolveApiBase(),
                STORAGE_KEYS: {
                        authorName: 'matteo-feedback-author'
                },
                ROLE_OPTIONS,
                PAGE_OPTIONS,
                STATUS_META,
                STATUS_ACTIONS,
                PRIORITY_META,
                CATEGORY_META,
                FEEDBACK_SUMMARY,
                PLACEHOLDER_STEPS,
                PLACEHOLDER_DISCUSSION_POINTS,
                getRoleLabel,
                getRolePages,
                getPageLabel,
                createViewLabel
        };
})();
