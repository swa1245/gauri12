document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.feature-products-section .products-track');
    const slides = document.querySelectorAll('.feature-products-section .product-slide');
    const prevButton = document.querySelector('.feature-products-section .nav-btn.prev');
    const nextButton = document.querySelector('.feature-products-section .nav-btn.next');
    const pagination = document.querySelector('.feature-products-section .products-pagination');

    let currentIndex = 0;
    const slideWidth = track.clientWidth;
    const totalSlides = slides.length;

    // Create pagination dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        pagination.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    }

    const dots = document.querySelectorAll('.feature-products-section .dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
    }

    function moveSlide(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalSlides;
        } else {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateSlidePosition();
    }

    prevButton.addEventListener('click', () => moveSlide('prev'));
    nextButton.addEventListener('click', () => moveSlide('next'));

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                moveSlide('next');
            } else {
                moveSlide('prev');
            }
        }
    });

    // Prevent default touch behavior
    track.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Auto-advance slides
    let slideInterval = setInterval(() => moveSlide('next'), 5000);

    // Pause auto-advance on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => moveSlide('next'), 5000);
    });

    // Initial position
    updateSlidePosition();
});


//slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
