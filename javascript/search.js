        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.browse-card');

            cards.forEach(card => {
                const title = card.querySelector('.browse-card-title').textContent.toLowerCase();
                const desc = card.querySelector('.browse-card-desc').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });