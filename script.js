// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .fleet-item, .area-group, .about-text, .about-image, .testimonial');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track phone clicks (you can integrate with analytics here)
        console.log('Phone number clicked:', link.href);
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service area highlighting
function highlightServiceArea(area) {
    const areaElements = document.querySelectorAll('.area-group li');
    areaElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(area.toLowerCase())) {
            el.style.background = '#e3f2fd';
            el.style.padding = '0.5rem';
            el.style.borderRadius = '4px';
            el.style.transition = 'all 0.3s ease';
        }
    });
}

// Remove highlighting
function removeHighlighting() {
    const areaElements = document.querySelectorAll('.area-group li');
    areaElements.forEach(el => {
        el.style.background = '';
        el.style.padding = '0.5rem 0';
        el.style.borderRadius = '';
    });
}

// Add hover effects to service areas
document.querySelectorAll('.area-group li').forEach(li => {
    li.addEventListener('mouseenter', () => {
        li.style.background = '#e3f2fd';
        li.style.padding = '0.5rem';
        li.style.borderRadius = '4px';
        li.style.cursor = 'pointer';
    });
    
    li.addEventListener('mouseleave', () => {
        li.style.background = '';
        li.style.padding = '0.5rem 0';
        li.style.borderRadius = '';
    });
});

// Counter animation for statistics (if you want to add them later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#eee';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    return isValid;
}

// Add real-time form validation
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#eee';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(231, 76, 60)') {
            input.style.borderColor = '#eee';
        }
    });
});

// Google Maps is now embedded via iframe - no JavaScript needed

// Google Reviews Integration
function loadGoogleReviews() {
    // This function would integrate with Google Places API to fetch real reviews
    // For now, we're using static content that matches the existing testimonial
    
    console.log('Google Reviews section loaded');
    
    // You can add dynamic review loading here when you have Google Places API access
    // Example:
    // const service = new google.maps.places.PlacesService(map);
    // service.getDetails({
    //     placeId: 'YOUR_PLACE_ID',
    //     fields: ['reviews', 'rating', 'user_ratings_total']
    // }, (place, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         displayReviews(place.reviews);
    //     }
    // });
}

// Initialize Google Places Autocomplete for pickup and dropoff address fields
function initializePlacePickers() {
    if (!window.google || !google.maps || !google.maps.places) {
        console.warn('Google Maps JavaScript API not loaded. Place pickers not initialized.');
        return;
    }

    const pickupInput = document.getElementById('pickup-address');
    const dropoffInput = document.getElementById('dropoff-address');

    if (!pickupInput || !dropoffInput) return;

    const options = {
        // You can restrict by country if you want: componentRestrictions: { country: 'us' }
        fields: ['formatted_address', 'geometry', 'name'],
        types: ['address']
    };

    const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, options);
    const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, options);

    function attachPlaceChanged(autocomplete, inputPrefix) {
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            // Create or update hidden inputs for lat/lng
            let latInput = document.getElementById(inputPrefix + '-lat');
            let lngInput = document.getElementById(inputPrefix + '-lng');

            if (!latInput) {
                latInput = document.createElement('input');
                latInput.type = 'hidden';
                latInput.id = inputPrefix + '-lat';
                latInput.name = inputPrefix + '-lat';
                inputPrefix === 'pickup' ? pickupInput.form.appendChild(latInput) : dropoffInput.form.appendChild(latInput);
            }
            if (!lngInput) {
                lngInput = document.createElement('input');
                lngInput.type = 'hidden';
                lngInput.id = inputPrefix + '-lng';
                lngInput.name = inputPrefix + '-lng';
                inputPrefix === 'pickup' ? pickupInput.form.appendChild(lngInput) : dropoffInput.form.appendChild(lngInput);
            }

            latInput.value = place.geometry.location.lat();
            lngInput.value = place.geometry.location.lng();
        });
    }

    attachPlaceChanged(pickupAutocomplete, 'pickup');
    attachPlaceChanged(dropoffAutocomplete, 'dropoff');
}

// If Maps API is loaded after our script, wait for it and then initialize
window.initPlacePickers = initializePlacePickers;

// Try to initialize on DOMContentLoaded if API is already present
document.addEventListener('DOMContentLoaded', () => {
    if (window.google && google.maps && google.maps.places) {
        initializePlacePickers();
    }
});

// Photo Carousel Functionality
class PhotoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 7;
        this.carouselTrack = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (!this.carouselTrack) return;
        
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    bindEvents() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        
        if (!carouselWrapper) return;
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    updateCarousel() {
        if (!this.carouselTrack) return;
        
        const translateX = -this.currentSlide * (100 / this.totalSlides);
        this.carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rico Rolls website loaded successfully!');
    
    // Add any initialization code here
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
    
    // Initialize Google Reviews
    loadGoogleReviews();
    
    // Initialize Photo Carousel
    new PhotoCarousel();
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
