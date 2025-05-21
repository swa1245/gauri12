// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.mobile-menu i');

// Toggle mobile menu
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
    });
});

// Update active link based on scroll position
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    // Check if we're on the index page (not on industry.html or other pages)
    const isIndexPage = !window.location.pathname.includes('industry.html') && 
                        !window.location.pathname.includes('contact.html') &&
                        (window.location.pathname === '/' || 
                         window.location.pathname.endsWith('index.html') || 
                         window.location.pathname.endsWith('/'));
    
    // If we're on the index page, ensure home link is always active
    if (isIndexPage) {
        // Remove active class from all navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to home link
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
        
        return; // Exit early, don't process other sections
    }
    
    // Original scroll behavior for other pages
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Set active navigation link on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the index page
    const isIndexPage = !window.location.pathname.includes('industry.html') && 
                        !window.location.pathname.includes('contact.html') &&
                        (window.location.pathname === '/' || 
                         window.location.pathname.endsWith('index.html') || 
                         window.location.pathname.endsWith('/'));
    
    if (isIndexPage) {
        // Remove active class from all navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to home link
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'var(--text-light)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Hero Slider Functionality
const heroSlides = document.querySelectorAll('.hero-slider .slide');
const heroDots = document.querySelectorAll('.hero-slider .dot');
const heroPrevBtn = document.querySelector('.hero-slider .prev-slide');
const heroNextBtn = document.querySelector('.hero-slider .next-slide');
let currentHeroSlide = 0;
let heroSlideInterval;

// Initialize hero slider
function initHeroSlider() {
    if (!heroSlides.length) return;
    
    // Set first slide as active
    heroSlides[currentHeroSlide].classList.add('active');
    heroDots[currentHeroSlide].classList.add('active');
    
    // Start auto slide
    startHeroSlideTimer();
}

// Next hero slide function
function nextHeroSlide() {
    goToHeroSlide((currentHeroSlide + 1) % heroSlides.length);
}

// Previous hero slide function
function prevHeroSlide() {
    goToHeroSlide(currentHeroSlide === 0 ? heroSlides.length - 1 : currentHeroSlide - 1);
}

// Go to specific hero slide
function goToHeroSlide(n) {
    // Remove active class from current slide and dot
    heroSlides[currentHeroSlide].classList.remove('active');
    heroDots[currentHeroSlide].classList.remove('active');
    
    // Update current slide
    currentHeroSlide = n;
    
    // Add active class to new slide and dot
    heroSlides[currentHeroSlide].classList.add('active');
    heroDots[currentHeroSlide].classList.add('active');
    
    // Reset timer
    resetHeroSlideTimer();
}

// Start auto hero slide timer
function startHeroSlideTimer() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000); // Change slide every 5 seconds
}

// Reset hero slide timer
function resetHeroSlideTimer() {
    clearInterval(heroSlideInterval);
    startHeroSlideTimer();
}

// Hero Slider Event Listeners
if (heroPrevBtn && heroNextBtn) {
    heroPrevBtn.addEventListener('click', prevHeroSlide);
    heroNextBtn.addEventListener('click', nextHeroSlide);
}

// Hero Slider Dot navigation
if (heroDots) {
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToHeroSlide(index);
        });
    });
}

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);

// Counter Animation
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function startCounting() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        function updateCount() {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        }
        
        updateCount();
    });
    hasAnimated = true;
}

// Start counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            startCounting();
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Products Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.product-slide');
    const prevBtn = document.querySelector('.products-showcase .prev');
    const nextBtn = document.querySelector('.products-showcase .next');
    const pagination = document.querySelector('.products-pagination');
    
    if (!slider || !prevBtn || !nextBtn || !pagination) return;

    const items = slider.children;
    const itemWidth = 320; // item width + gap
    const itemsPerView = Math.floor(slider.parentElement.offsetWidth / itemWidth);
    const totalSlides = Math.ceil(items.length / itemsPerView);
    let currentSlide = 0;

    // Create pagination dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        pagination.appendChild(dot);
    }

    // Update navigation state
    function updateNavigation() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(slide) {
        currentSlide = slide;
        const offset = -slide * (itemWidth * itemsPerView);
        slider.style.transform = `translateX(${offset}px)`;
        updateNavigation();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            location.reload(); // Refresh page to update layout
        }, 250);
    });

    // Initialize first slide
    updateNavigation();
});

// Products Slider
document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.products-navigation .prev');
    const nextBtn = document.querySelector('.products-navigation .next');
    const pagination = document.querySelector('.products-pagination');
    
    if (!productGrid || !prevBtn || !nextBtn || !pagination) return;

    const totalItems = productGrid.children.length;
    const itemsPerPage = window.innerWidth > 1200 ? 12 : window.innerWidth > 768 ? 8 : window.innerWidth > 480 ? 4 : 2;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 0;

    // Create pagination dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        pagination.appendChild(dot);
    }

    // Update navigation state
    function updateNavigation() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    // Go to specific page
    function goToPage(page) {
        currentPage = page;
        const offset = -page * (100 / totalPages);
        productGrid.style.transform = `translateX(${offset}%)`;
        updateNavigation();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) goToPage(currentPage - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) goToPage(currentPage + 1);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    productGrid.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    productGrid.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                goToPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            location.reload(); // Refresh page to update grid layout
        }, 250);
    });

    // Initialize first page
    updateNavigation();
});

// Products Slider
document.addEventListener('DOMContentLoaded', () => {
    const productsSlider = {
        track: document.querySelector('.products-slider .slider-track'),
        slides: document.querySelectorAll('.products-slider .slider-track img'),
        prevBtn: document.querySelector('.products-slider .prev'),
        nextBtn: document.querySelector('.products-slider .next'),
        dotsContainer: document.querySelector('.products-slider .slider-dots'),
        currentSlide: 0,
        isDragging: false,
        startPos: 0,
        currentTranslate: 0,
        prevTranslate: 0,
        animationID: 0,
        autoPlayInterval: null,
        isTransitioning: false,

        init() {
            if (!this.track || !this.slides.length) return;

            // Preload first few images
            this.preloadImages();

            // Set initial position
            this.updateSliderPosition();

            // Create dots
            this.createDots();

            // Add event listeners
            this.addEventListeners();

            // Start autoplay
            this.startAutoPlay();
        },

        preloadImages() {
            // Preload first 3 images
            const preloadCount = Math.min(3, this.slides.length);
            for (let i = 0; i < preloadCount; i++) {
                const img = this.slides[i];
                if (img) {
                    img.removeAttribute('loading');
                    const newImg = new Image();
                    newImg.src = img.src;
                }
            }
        },

        createDots() {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    if (!this.isTransitioning) {
                        this.stopAutoPlay();
                        this.goToSlide(index);
                        this.startAutoPlay();
                    }
                });
                this.dotsContainer.appendChild(dot);
            });
        },

        addEventListeners() {
            // Navigation buttons
            this.prevBtn.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.stopAutoPlay();
                    this.prevSlide();
                    this.startAutoPlay();
                }
            });
            
            this.nextBtn.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.stopAutoPlay();
                    this.nextSlide();
                    this.startAutoPlay();
                }
            });

            // Touch events
            this.track.addEventListener('touchstart', this.touchStart.bind(this), { passive: true });
            this.track.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
            this.track.addEventListener('touchend', this.touchEnd.bind(this));
            this.track.addEventListener('touchcancel', this.touchEnd.bind(this));

            // Mouse events
            this.track.addEventListener('mousedown', this.touchStart.bind(this));
            this.track.addEventListener('mousemove', this.touchMove.bind(this));
            this.track.addEventListener('mouseup', this.touchEnd.bind(this));
            this.track.addEventListener('mouseleave', this.touchEnd.bind(this));

            // Prevent image dragging
            this.slides.forEach(slide => {
                const img = slide;
                if (img) {
                    img.addEventListener('dragstart', (e) => e.preventDefault());
                }
            });

            // Pause autoplay on hover
            this.track.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());

            // Handle visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stopAutoPlay();
                } else {
                    this.startAutoPlay();
                }
            });

            // Handle transition end
            this.track.addEventListener('transitionend', () => {
                this.isTransitioning = false;
            });
        },

        touchStart(event) {
            if (event.type === 'mousedown') {
                event.preventDefault();
            }
            if (!this.isTransitioning) {
                this.isDragging = true;
                this.startPos = this.getPositionX(event);
                this.animationID = requestAnimationFrame(this.animation.bind(this));
                this.stopAutoPlay();
            }
        },

        touchMove(event) {
            if (!this.isDragging) return;
            
            const currentPosition = this.getPositionX(event);
            const moveX = currentPosition - this.startPos;
            
            // Prevent scrolling when swiping
            if (Math.abs(moveX) > 5 && event.cancelable) {
                event.preventDefault();
            }
            
            const movePercent = (moveX / this.track.clientWidth) * 100;
            const newTranslate = this.prevTranslate + movePercent;
            
            // Add resistance at the edges
            if (newTranslate > 0 || newTranslate < -((this.slides.length - 1) * 100)) {
                this.currentTranslate = this.prevTranslate + (movePercent * 0.3);
            } else {
                this.currentTranslate = newTranslate;
            }
        },

        touchEnd() {
            if (!this.isDragging) return;
            
            this.isDragging = false;
            cancelAnimationFrame(this.animationID);

            const movedBy = this.currentTranslate - this.prevTranslate;
            const threshold = 20; // 20% threshold for slide change

            if (Math.abs(movedBy) > threshold) {
                if (movedBy < 0) {
                    this.currentSlide = Math.min(this.currentSlide + 1, this.slides.length - 1);
                } else {
                    this.currentSlide = Math.max(this.currentSlide - 1, 0);
                }
            }

            this.isTransitioning = true;
            this.updateSliderPosition();
            this.startAutoPlay();
        },

        getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        },

        animation() {
            if (this.isDragging) {
                this.setSliderPosition();
                requestAnimationFrame(this.animation.bind(this));
            }
        },

        setSliderPosition() {
            this.track.style.transform = `translateX(${this.currentTranslate}%)`;
        },

        updateSliderPosition() {
            this.currentSlide = Math.max(0, Math.min(this.currentSlide, this.slides.length - 1));
            this.currentTranslate = this.currentSlide * -100;
            this.prevTranslate = this.currentTranslate;
            this.track.style.transform = `translateX(${this.currentTranslate}%)`;
            
            // Update dots
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        },

        nextSlide() {
            if (this.currentSlide < this.slides.length - 1) {
                this.isTransitioning = true;
                this.currentSlide++;
                this.updateSliderPosition();
            } else {
                // Snap back with animation when reaching the end
                this.isTransitioning = true;
                this.currentSlide = 0;
                this.updateSliderPosition();
            }
        },

        prevSlide() {
            if (this.currentSlide > 0) {
                this.isTransitioning = true;
                this.currentSlide--;
                this.updateSliderPosition();
            } else {
                // Snap back with animation when reaching the start
                this.isTransitioning = true;
                this.currentSlide = this.slides.length - 1;
                this.updateSliderPosition();
            }
        },

        goToSlide(index) {
            if (index !== this.currentSlide) {
                this.isTransitioning = true;
                this.currentSlide = index;
                this.updateSliderPosition();
            }
        },

        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                if (!this.isDragging && !this.isTransitioning) {
                    this.nextSlide();
                }
            }, 5000);
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    };

    // Initialize products slider
    productsSlider.init();
});

// Animate product cards on scroll
const productCards = document.querySelectorAll('.product-card');

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    productObserver.observe(card);
});

// Add hover effect for product cards
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Enhanced Industry Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Tab functionality with smooth transitions
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.style.opacity = '0';
                content.classList.remove('active');
            });

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabId}-packaging`);
            activeContent.classList.add('active');

            // Fade in the active content
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 50);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('packaging-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.packaging-card, .video-container, .section-intro, .featured-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Video play button hover effect
    const playButtons = document.querySelectorAll('.play-button, .play-overlay');
    playButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        button.addEventListener('click', () => {
            // Here you would typically implement video play functionality
            console.log('Play video');
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.industry-hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
});

// Industry Page Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-packaging`).classList.add('active');
        });
    });

    // Video Play Button Animation
    const playButtons = document.querySelectorAll('.play-button, .play-overlay');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Here you would typically implement video play functionality
            console.log('Play video');
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.packaging-card, .video-container, .featured-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Industry Page Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Industry navigation active state
    const industryNavItems = document.querySelectorAll('.industry-nav-item');
    
    industryNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            industryNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Check if element is in viewport for scroll highlighting
    const isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= 100 &&
            rect.bottom >= 100
        );
    };
    
    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.industry-section');
        
        sections.forEach(section => {
            if (isInViewport(section)) {
                const id = section.getAttribute('id');
                industryNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-packaging`).classList.add('active');
        });
    });

    // Video Play Button Animation
    const playButtons = document.querySelectorAll('.play-button, .play-overlay');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Here you would typically implement video play functionality
            console.log('Play video');
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.packaging-card, .video-container, .featured-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');
    
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
        
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}