// --- Menu Logic ---
const aboutUsBtn = document.getElementById('aboutUsBtn');
const aboutModal = document.getElementById('aboutModal');
const closeModal = document.getElementById('closeModal');

const sidebarEl = document.getElementById('rightSidebar');
const backdropEl = document.getElementById('sidebarBackdrop');

if (sidebarEl && backdropEl) {
    sidebarEl.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    backdropEl.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        backdropEl.classList.remove('open');
    });
}

// --- Tabs Logic ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.modal-tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab') + '-tab';
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
    });
});

// --- Modals Operations Setup Handling System ---
const tosBtn = document.getElementById('tosBtn');
const tosModal = document.getElementById('tosModal');
const closeTosModal = document.getElementById('closeTosModal');

if (aboutUsBtn && aboutModal) {
    aboutUsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (sidebarEl) sidebarEl.classList.remove('open');
        if (backdropEl) backdropEl.classList.remove('open');
        aboutModal.classList.add('open');
        document.body.classList.add('no-scroll');
    });
}

if (tosBtn && tosModal) {
    tosBtn.addEventListener('click', (e) => {
        e.preventDefault();
        tosModal.classList.add('open');
        document.body.classList.add('no-scroll');
    });
}

if (closeModal && aboutModal) {
    closeModal.addEventListener('click', () => {
        aboutModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}

if (closeTosModal && tosModal) {
    closeTosModal.addEventListener('click', () => {
        tosModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}

window.addEventListener('click', (e) => {
    if (aboutModal && e.target === aboutModal) {
        aboutModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
    if (tosModal && e.target === tosModal) {
        tosModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
});
