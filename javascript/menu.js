const menuToggle = document.getElementById('menuToggle');
        const menuPopup = document.getElementById('menuPopup');
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuPopup.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            menuPopup.classList.remove('show');
        });