// DoFor Event - Interactive JavaScript

// ========== Mobile Navigation Toggle ==========
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = navbarToggle.querySelectorAll('span');
        if (navbarMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarMenu.classList.remove('active');
            const spans = navbarToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay for stagger effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);

            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach((element) => {
    observer.observe(element);
});

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navbarMenu) {
                    navbarMenu.classList.remove('active');
                }
            }
        }
    });
});

// ========== Navbar Scroll Effect ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========== Animated Counter for Stats ==========
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stat numbers for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
    statObserver.observe(stat);
});

// ========== Form Validation ==========
const validateForm = (form) => {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');

    inputs.forEach(input => {
        // Remove previous error
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        input.style.borderColor = '';

        // Validation rules
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                showError(input, 'Please enter a valid email');
                isValid = false;
            }
        } else if (input.type === 'tel' && input.value) {
            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(input.value.replace(/\s/g, ''))) {
                showError(input, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        }
    });

    return isValid;
};

const showError = (input, message) => {
    input.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
};

// Handle form submissions
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            // Show success message
            const formData = new FormData(form);
            console.log('Form submitted with data:', Object.fromEntries(formData));

            // Show success alert
            showSuccessMessage(form);

            // Reset form
            form.reset();

            // In production, you would send data to server here
            // Example: fetch('/api/contact', { method: 'POST', body: formData })
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm(form);
        });
    });
});

const showSuccessMessage = (form) => {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
        font-weight: 600;
        animation: fadeInUp 0.5s ease-out;
    `;
    successDiv.textContent = '✓ Thank you! We will contact you shortly.';

    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
};

// ========== Lazy Loading Images ==========
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Active Navigation Link ==========
const setActiveNavLink = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

setActiveNavLink();

// ========== Gallery Lightbox (if gallery page exists) ==========
const initGallery = () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (galleryImages.length > 0) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.1);
        `;

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        // Click to open
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // Click to close
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
};

initGallery();

console.log('✨ DoFor Event - Website Loaded Successfully!');
