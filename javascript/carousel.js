document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('imgCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.img-slide'));
    const prevBtn = carousel.querySelector('.img-carousel-prev');
    const nextBtn = carousel.querySelector('.img-carousel-next');
    const total = slides.length;
    if (total < 3) return;

    let current = 0;

    function updateSlides() {
        const prevIndex = (current - 1 + total) % total;
        const nextIndex = (current + 1) % total;

        slides.forEach((slide, i) => {
            slide.classList.remove('is-active', 'is-prev', 'is-next');
            if (i === current) slide.classList.add('is-active');
            else if (i === prevIndex) slide.classList.add('is-prev');
            else if (i === nextIndex) slide.classList.add('is-next');
        });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + total) % total;
        updateSlides();
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % total;
        updateSlides();
    });

    slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('is-prev') || slide.classList.contains('is-next')) {
                current = i;
                updateSlides();
            }
        });
    });

    updateSlides();
});
