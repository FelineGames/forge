// --- Menu Logic ---
        const menuToggle = document.getElementById('menuToggle');
        const menuPopup = document.getElementById('menuPopup');

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuPopup.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            menuPopup.classList.remove('show');
        });

        // --- About Us Tabs Logic ---
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.modal-tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab') + '-tab';
                document.getElementById(targetId).classList.add('active');
            });
        });

        // --- Modals Operations Setup Handling System ---
        const aboutUsBtn = document.getElementById('aboutUsBtn');
        const aboutModal = document.getElementById('aboutModal');
        const closeModal = document.getElementById('closeModal');

        const tosBtn = document.getElementById('tosBtn');
        const tosModal = document.getElementById('tosModal');
        const closeTosModal = document.getElementById('closeTosModal');

        aboutUsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            menuPopup.classList.remove('show');
            aboutModal.classList.add('open');
            document.body.classList.add('no-scroll');
        });

        if(tosBtn){
            tosBtn.addEventListener('click', (e) => {
                e.preventDefault();
                tosModal.classList.add('open');
                document.body.classList.add('no-scroll');
            });
        }

        closeModal.addEventListener('click', () => {
            aboutModal.classList.remove('open');
            document.body.classList.remove('no-scroll'); 
        });

        closeTosModal.addEventListener('click', () => {
            tosModal.classList.remove('open');
            document.body.classList.remove('no-scroll'); 
        });

        window.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
            if (e.target === tosModal) {
                tosModal.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });