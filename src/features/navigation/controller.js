(function () {
        function createNavigationController({ dom, state, getRoleLabel, getRolePages, onChange }) {
                function updateNavItemsVisibility(roleKey) {
                        const visiblePages = getRolePages ? getRolePages(roleKey) : null;
                        
                        dom.navItems.forEach((item) => {
                                const pageKey = item.dataset.page;
                                if (visiblePages) {
                                        const isVisible = visiblePages.includes(pageKey);
                                        item.style.display = isVisible ? '' : 'none';
                                } else {
                                        item.style.display = '';
                                }
                        });
                        
                        // Hide section labels if all beneath are hidden
                        document.querySelectorAll('.sidebar-nav > *').forEach((el) => {
                                if (el.classList.contains('nav-section-label')) {
                                        let next = el.nextElementSibling;
                                        let hasVisibleItems = false;
                                        while (next && !next.classList.contains('nav-section-label')) {
                                                if (next.style.display !== 'none') {
                                                        hasVisibleItems = true;
                                                        break;
                                                }
                                                next = next.nextElementSibling;
                                        }
                                        el.style.display = hasVisibleItems ? '' : 'none';
                                }
                        });
                }

                function setActiveRole(roleKey) {
                        state.currentRole = roleKey;
                        dom.currentRoleName.textContent = getRoleLabel(roleKey);
                        dom.roleOptions.forEach((option) => option.classList.toggle('active', option.dataset.role === roleKey));
                        dom.roleMenu.classList.remove('show');
                        
                        updateNavItemsVisibility(roleKey);

                        const visiblePages = getRolePages ? getRolePages(roleKey) : null;
                        if (visiblePages && !visiblePages.includes(state.currentPage)) {
                                setActivePage(visiblePages[0] || 'dashboard');
                        } else {
                                onChange();
                        }
                }

                function setActivePage(pageKey) {
                        state.currentPage = pageKey;
                        dom.navItems.forEach((item) => item.classList.toggle('active', item.dataset.page === pageKey));
                        onChange();
                }

                function bindEvents() {
                        dom.roleBtn?.addEventListener('click', (event) => {
                                event.stopPropagation();
                                dom.roleMenu.classList.toggle('show');
                        });

                        dom.roleOptions.forEach((option) => option.addEventListener('click', (event) => {
                                event.stopPropagation();
                                setActiveRole(option.dataset.role);
                        }));

                        dom.navItems.forEach((item) => item.addEventListener('click', (event) => {
                                event.preventDefault();
                                setActivePage(item.dataset.page);
                        }));

                        document.addEventListener('click', (event) => {
                                if (dom.roleMenu?.classList.contains('show') && !event.target.closest('.sidebar-role-selector')) {
                                        dom.roleMenu.classList.remove('show');
                                }
                        });
                }

                function init() {
                        bindEvents();
                        // Delay first render slightly to ensure dom is ready
                        setActiveRole(state.currentRole);
                        setActivePage(state.currentPage);
                }

                return {
                        init,
                        setActiveRole,
                        setActivePage
                };
        }

        window.NavigationController = { createNavigationController };
})();
