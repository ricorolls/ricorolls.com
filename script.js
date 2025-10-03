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


// Toggle between airport fields and drop-off by inserting/removing DOM nodes
document.addEventListener('DOMContentLoaded', () => {
    const pickupRadios = document.querySelectorAll('input[name="trip-type"]');
    const tripTypeGroup = document.querySelector('.trip-type-group');

    // Capture originals as templates and remove them from the DOM so we can insert as needed
    const originalAirport = document.querySelector('.airport-fields');
    const originalDropoff = document.querySelector('.dropoff-row');
    const airportTemplate = originalAirport ? originalAirport.cloneNode(true) : null;
    const dropoffTemplate = originalDropoff ? originalDropoff.cloneNode(true) : null;

    if (originalAirport && originalAirport.parentNode) {
        originalAirport.parentNode.removeChild(originalAirport);
    }
    if (originalDropoff && originalDropoff.parentNode) {
        // remove the dropoff from DOM initially; we'll insert depending on selection
        originalDropoff.parentNode.removeChild(originalDropoff);
    }

    function insertAfter(refNode, newNode) {
        if (!refNode || !newNode) return;
        if (refNode.nextSibling) refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
        else refNode.parentNode.appendChild(newNode);
    }

    function ensureAirportInserted() {
        if (!document.querySelector('.airport-fields') && airportTemplate && tripTypeGroup) {
            const node = airportTemplate.cloneNode(true);
            insertAfter(tripTypeGroup, node);
        }
    }

    function ensureDropoffInserted() {
        if (!document.querySelector('.dropoff-row') && dropoffTemplate && tripTypeGroup) {
            const node = dropoffTemplate.cloneNode(true);
            // ensure any hidden marker is removed on insertion so it becomes visible
            node.classList.remove('hidden');
            insertAfter(tripTypeGroup, node);
        }
    }

    function updateFields() {
        const selected = document.querySelector('input[name="trip-type"]:checked');
        if (!selected) return;

        if (selected.value === 'Hartsfield-Jackson') {
            // remove dropoff if present
            const existingDrop = document.querySelector('.dropoff-row');
            if (existingDrop && existingDrop.parentNode) existingDrop.parentNode.removeChild(existingDrop);

            // insert airport fields
            ensureAirportInserted();

            // set required attributes for airport flow
            const terminal = document.getElementById('terminal');
            if (terminal) terminal.setAttribute('required', '');
            const returnDate = document.getElementById('return-date');
            if (returnDate) returnDate.setAttribute('required', '');
        } else {
            // remove airport fields if present
            const existingAirport = document.querySelector('.airport-fields');
            if (existingAirport && existingAirport.parentNode) existingAirport.parentNode.removeChild(existingAirport);

            // insert dropoff
            ensureDropoffInserted();
            const dropInput = document.getElementById('dropoff-address');
            if (dropInput) dropInput.setAttribute('required', '');
        }
    }

    pickupRadios.forEach(r => r.addEventListener('change', updateFields));

    // initialize on load
    updateFields();
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

// Phone number auto-formatting (US-friendly, preserves extra leading digits as country code)
function formatPhoneValue(raw) {
    if (!raw) return '';
    const trimmed = String(raw).trim();
    const leadingPlus = trimmed.startsWith('+');
    const digits = trimmed.replace(/\D/g, '');

    if (digits.length === 0) return '';

    // If more than 10 digits, treat leading digits as country code/prefix
    if (digits.length > 10) {
        const cc = digits.slice(0, digits.length - 10);
        const local = digits.slice(-10);
        return (leadingPlus ? '+' : '+') + cc + ' (' + local.slice(0,3) + ') ' + local.slice(3,6) + '-' + local.slice(6);
    }

    // Format up to 10 digits as (XXX) XXX-XXXX progressively
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0,3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0,3) + ') ' + digits.slice(3,6) + '-' + digits.slice(6);
}

function attachPhoneFormatting() {
    const phone = document.getElementById('phone');
    if (!phone) return;

    function applyAndMoveToEnd(el, value) {
        el.value = value;
        // move caret to end for simplicity
        try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) { /* ignore */ }
    }

    phone.addEventListener('input', (e) => {
        const formatted = formatPhoneValue(e.target.value);
        applyAndMoveToEnd(e.target, formatted);
    });

    // Final formatting on blur
    phone.addEventListener('blur', (e) => {
        const formatted = formatPhoneValue(e.target.value);
        e.target.value = formatted;
    });
}

// Attach formatting after DOM is ready
document.addEventListener('DOMContentLoaded', attachPhoneFormatting);

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
