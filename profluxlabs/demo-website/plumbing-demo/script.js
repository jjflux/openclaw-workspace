// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handling
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real implementation, this would send to your server/GHL)
    setTimeout(() => {
        // Show success message
        showFormMessage('Thank you! We\'ve received your request and will contact you within 30 minutes during business hours.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track conversion for analytics (replace with your tracking code)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'lead_generation',
                'event_label': 'quote_request'
            });
        }
        
    }, 1500);
});

// Show form message
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    const form = document.getElementById('quoteForm');
    form.appendChild(messageDiv);
    
    // Remove message after 10 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 10000);
}

// Add CSS for form messages
const style = document.createElement('style');
style.textContent = `
    .form-message {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 500;
    }
    
    .form-message.success {
        background: #dcfce7;
        color: #166534;
        border: 1px solid #bbf7d0;
    }
    
    .form-message.error {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
    }
    
    .form-message i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// Phone number formatting
document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
        e.target.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
    }
});

// Scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Click-to-call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // Track phone clicks for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_click', {
                'event_category': 'engagement',
                'event_label': 'header_phone'
            });
        }
    });
});

// Emergency banner pulse effect
const emergencyBanner = document.querySelector('.emergency-banner');
if (emergencyBanner) {
    setInterval(() => {
        emergencyBanner.style.transform = 'scale(1.002)';
        setTimeout(() => {
            emergencyBanner.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.service-card, .stat, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "PlumbingService",
    "name": "Desert Valley Plumbing",
    "description": "Phoenix's most trusted plumbing company. 24/7 emergency service, licensed & insured.",
    "telephone": "602-555-FLOW",
    "email": "service@desertvalleyplumbing.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Phoenix",
        "addressRegion": "AZ",
        "addressCountry": "US"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "33.4484",
            "longitude": "-112.0740"
        },
        "geoRadius": "50000"
    },
    "openingHours": [
        "Mo-Fr 07:00-19:00",
        "Sa-Su 08:00-18:00"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Plumbing Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Leak Detection and Repair"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Water Heater Service"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Drain Cleaning"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Emergency Plumbing"
                }
            }
        ]
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500"
    }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);