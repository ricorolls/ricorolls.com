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


// Toggle drop-off address visibility when pickup location is an airport
document.addEventListener('DOMContentLoaded', () => {
    // radios are named `trip-type` in the current markup
    const pickupRadios = document.querySelectorAll('input[name="trip-type"]');
    const dropoffRow = document.querySelector('.dropoff-row');
    const dropoffInput = document.getElementById('dropoff-address');
    const airportFieldset = document.querySelector('.airport-fields');
    const terminalSelect = document.getElementById('terminal');

    function updateDropoff() {
        const selected = document.querySelector('input[name="trip-type"]:checked');
        if (!selected) return;
        if (selected.value === 'Hartsfield-Jackson') {
            // Airport selected: hide dropoff, show airport fieldset (terminal + flight)
            if (dropoffRow) dropoffRow.classList.add('hidden');
            if (dropoffInput) dropoffInput.removeAttribute('required');

            if (airportFieldset) airportFieldset.classList.remove('hidden');
            if (terminalSelect) terminalSelect.setAttribute('required', '');
        } else {
            // Other selected: show dropoff, hide airport fieldset
            if (dropoffRow) dropoffRow.classList.remove('hidden');
            if (dropoffInput) dropoffInput.setAttribute('required', '');

            if (airportFieldset) {
                airportFieldset.classList.add('hidden');
                // clear any inputs inside the airport fieldset (departing/return flight numbers, etc.)
                airportFieldset.querySelectorAll('input').forEach(i => i.value = '');
            }
            if (terminalSelect) terminalSelect.removeAttribute('required');
        }
    }

    pickupRadios.forEach(r => r.addEventListener('change', updateDropoff));
    // initialize state
    updateDropoff();
});

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
