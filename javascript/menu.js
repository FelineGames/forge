const menuToggle = document.getElementById('menuToggle');
const rightSidebar = document.getElementById('rightSidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

if (menuToggle && rightSidebar && sidebarBackdrop) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = rightSidebar.classList.toggle('open');
        sidebarBackdrop.classList.toggle('open', isOpen);
    });
}
