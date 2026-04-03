        function getRolePages(roleKey) {
                return ROLE_PAGES[roleKey] || ROLE_PAGES['admin'];
        }

        function getRoleLabel(roleKey) {
                return ROLE_OPTIONS.find((item) => item.key === roleKey)?.label || roleKey;
        }
