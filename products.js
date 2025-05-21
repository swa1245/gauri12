document.addEventListener('DOMContentLoaded', function() {
    // Hide loading animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Get all filter buttons and products
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    const searchInput = document.querySelector('.search-input');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const description = product.querySelector('p').textContent.toLowerCase();
                const features = Array.from(product.querySelectorAll('.features-list li'))
                    .map(li => li.textContent.toLowerCase())
                    .join(' ');

                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    features.includes(searchTerm)) {
                    product.style.display = 'block';
                    product.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    product.style.display = 'none';
                }
            });

            // Reset filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0].classList.add('active');
        });
    }

    // Filter products function
    function filterProducts(category) {
        products.forEach(product => {
            if (category === 'all' || product.getAttribute('data-category') === category) {
                product.style.display = 'block';
                product.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Add hover animations for product cards
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            const image = product.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        product.addEventListener('mouseleave', () => {
            const image = product.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Initialize Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});



// Image Modal Functionality
 // Open popup on image click
document.querySelectorAll('.video-thumbnails .card img').forEach(img => {
    img.addEventListener('click', function () {
        const modal = document.getElementById('imageModal');
        const popupImage = document.getElementById('popupImage');
        popupImage.src = this.src;
        modal.style.display = 'block';
    });
});

// Close the modal
function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}


