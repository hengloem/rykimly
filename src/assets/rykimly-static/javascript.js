// Advanced Interaction System
function setActive(clickedItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedItem.classList.add('active');
}

// Scroll Progress Bar
function updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset;
    const progress = (scrollTop / scrollHeight) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}

// Section Animation Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update active navigation
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Interactive Skill Items
function addSkillInteractivity() {
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('click', function () {
            this.style.transform = 'translateY(-15px) rotateY(180deg) scale(1.1)';
            this.style.background = 'linear-gradient(135deg, #eba50a, #ffc107)';

            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
            }, 600);
        });
    });
}

// Mouse Trail Effect
let mouseTrail = [];
function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = '#eba50a';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '999';
    trail.style.animation = 'trailFade 0.8s ease-out forwards';

    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 800);
}

// Add trail fade animation
const style = document.createElement('style');
style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
document.head.appendChild(style);

// Initialize Everything
document.addEventListener('DOMContentLoaded', function () {
    // Observe sections for animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add skill interactivity
    addSkillInteractivity();

    // Start particle system
    setInterval(createParticle, 2000);

    // Add scroll progress
    window.addEventListener('scroll', updateProgressBar);

    // Add mouse trail (throttled)
    let lastTrail = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrail > 50) {
            createMouseTrail(e);
            lastTrail = now;
        }
    });

    // Enhanced navigation interactions
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(2, 138, 15, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            ripple.style.marginLeft = '-25px';
            ripple.style.marginTop = '-25px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Smooth scroll to section
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            setActive(this);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(rippleStyle);

    // Service item hover effects
    document.querySelectorAll('.service-item').forEach(service => {
        service.addEventListener('mouseenter', function () {
            this.style.background = 'linear-gradient(135deg, #028a0f, #03a512)';
        });

        service.addEventListener('mouseleave', function () {
            this.style.background = 'linear-gradient(135deg, #eba50a, #ffc107)';
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Profile image interaction
    const profileImg = document.querySelector('.profile-img');
    profileImg.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'profilePulse 3s ease-in-out infinite';
            this.style.transform = 'scale(1.2) rotate(720deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 800);
        }, 10);
    });

    // Contact items interactive feedback
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.contact-icon');
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        });
    });

    // Section cards entrance animation delay
    document.querySelectorAll('.section-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Dynamic background color change on scroll
    let colorIndex = 0;
    const colors = [
        'linear-gradient(45deg, #028a0f, #eba50a, #028a0f, #eba50a)',
        'linear-gradient(45deg, #eba50a, #028a0f, #eba50a, #028a0f)',
        'linear-gradient(45deg, #028a0f, #03a512, #eba50a, #ffc107)'
    ];

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent > 25 && scrollPercent < 50 && colorIndex !== 1) {
            colorIndex = 1;
            document.querySelector('.animated-bg').style.background = colors[1];
        } else if (scrollPercent > 50 && scrollPercent < 75 && colorIndex !== 2) {
            colorIndex = 2;
            document.querySelector('.animated-bg').style.background = colors[2];
        } else if (scrollPercent < 25 && colorIndex !== 0) {
            colorIndex = 0;
            document.querySelector('.animated-bg').style.background = colors[0];
        }
    });
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateProgressBar();
}, 16)); // ~60fps