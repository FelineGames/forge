        // --- DROPDOWN LOGIC ---
        document.addEventListener('click', function(event) {
            const isDropdownBtn = event.target.closest('.dropdown-btn');
            
            // 1. If you click completely outside the dropdown area, close everything
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                return;
            }

            // 2. If you click the dropdown button specifically
            if (isDropdownBtn) {
                event.preventDefault(); 
                
                const currentDropdown = isDropdownBtn.closest('.dropdown');
                
                // Close any OTHER open dropdowns first
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    if (dropdown !== currentDropdown) {
                        dropdown.classList.remove('show');
                    }
                });
                
                // Toggle the 'show' class
                currentDropdown.classList.toggle('show');
            }
        });

        // Search & Tab Logic
        const searchInput = document.getElementById("searchInput");
        const cards = document.querySelectorAll(".project-item");
        const tabs = document.querySelectorAll(".tab");

        let activeCategory = "all";

        function filterCards() {
            const text = searchInput.value.toLowerCase();

            cards.forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                const desc = card.querySelector("p").textContent.toLowerCase();
                const category = card.dataset.category;

                const matchesText = title.includes(text) || desc.includes(text);
                const matchesTab = activeCategory === "all" || category === activeCategory;

                card.style.display = (matchesText && matchesTab) ? "flex" : "none";
            });
        }

        searchInput.addEventListener("input", filterCards);

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                activeCategory = tab.dataset.tab;
                filterCards();
            });
        });