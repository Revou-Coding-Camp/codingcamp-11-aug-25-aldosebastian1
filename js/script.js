// ========== GLOBAL VARIABLES ==========
let currentUser = 'Guest';
let isScrolling = false;

// ========== NAVIGATION FUNCTIONS ==========

// Function to scroll to section with smooth animation
function scrollToSection(targetId) {
    if (isScrolling) return;
    
    isScrolling = true;
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        // Update active navigation
        updateActiveNav(targetId);
        
        // Smooth scroll to target
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Trigger animations for the target section
        setTimeout(() => {
            triggerSectionAnimations(targetId);
        }, 300);
        
        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
}

// Function to update active navigation
function updateActiveNav(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Function to trigger section animations
function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    switch(sectionId) {
        case 'profile':
            // Animate profile banner
            const banner = section.querySelector('.profile-banner');
            if (banner) banner.classList.add('animate');
            
            // Animate info cards with delay
            const infoCards = section.querySelectorAll('.info-card');
            infoCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                    
                    // Animate stats
                    const stats = card.querySelectorAll('.stat-item');
                    stats.forEach((stat, statIndex) => {
                        setTimeout(() => {
                            stat.classList.add('animate');
                        }, statIndex * 100);
                    });
                    
                    // Animate mission list
                    const missions = card.querySelectorAll('.mission-list li');
                    missions.forEach((mission, missionIndex) => {
                        setTimeout(() => {
                            mission.classList.add('animate');
                        }, missionIndex * 150);
                    });
                }, index * 300);
            });
            break;

        case 'services':
            // Animate section title
            const serviceTitle = section.querySelector('.section-title');
            if (serviceTitle) serviceTitle.classList.add('animate');
            
            // Animate service cards
            const serviceCards = section.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150);
            });
            break;

        case 'contact':
            // Animate section title
            const contactTitle = section.querySelector('.section-title');
            if (contactTitle) contactTitle.classList.add('animate');
            
            // Animate form container
            setTimeout(() => {
                const formContainer = section.querySelector('.form-container');
                if (formContainer) formContainer.classList.add('animate');
                
                // Animate form groups
                const formGroups = section.querySelectorAll('.form-group');
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('animate');
                    }, index * 100);
                });
            }, 200);
            break;
    }
}

// Function to handle scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    document.getElementById('scrollProgress').style.width = scrollProgress + '%';
}

// Function to detect current section in viewport
function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.pageYOffset + window.innerHeight / 2;
    
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.id;
        }
    });
    
    return current;
}

// ========== USER NAME FUNCTIONS ==========

// Function to ask user name
function askUserName() {
    if (currentUser !== 'Guest') return;
    
    const userName = prompt('🎉 Selamat datang di PT. Digital Solutions Indonesia!\n\nSiapa nama Anda?');
    
    if (userName && userName.trim() !== '') {
        currentUser = userName.trim();
        document.getElementById('userName').textContent = currentUser;
    }
}

// ========== FORM VALIDATION FUNCTIONS ==========

// Function to validate name
function validateName(name) {
    return name.trim().length >= 2;
}

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

// Function to validate phone
function validatePhone(phone) {
    const phonePattern = /^[\d\s\-\+\(\)]{8,15}$/;
    return phonePattern.test(phone.trim()) && phone.replace(/[^\d]/g, '').length >= 8;
}

// Function to validate message
function validateMessage(message) {
    return message.trim().length >= 10;
}

// Function to show error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Function to hide error
function hideError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.remove('error');
    errorElement.classList.remove('show');
}

// Function to validate entire form
function validateForm() {
    let isValid = true;
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Hide all errors first
    ['name', 'email', 'phone', 'message'].forEach(hideError);
    
    // Validate each field
    if (!validateName(name)) {
        showError('name', name.trim() === '' ? 'Nama harus diisi' : 'Nama minimal 2 karakter');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('email', email.trim() === '' ? 'Email harus diisi' : 'Format email tidak valid');
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        showError('phone', phone.trim() === '' ? 'Nomor telepon harus diisi' : 'Format nomor telepon tidak valid');
        isValid = false;
    }
    
    if (!validateMessage(message)) {
        showError('message', message.trim() === '' ? 'Pesan harus diisi' : 'Pesan minimal 10 karakter');
        isValid = false;
    }
    
    return isValid;
}

// ========== EVENT LISTENERS ==========

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ask for user name after 1 second
    setTimeout(askUserName, 1000);
    
    // Navigation links event listeners
    const navLinks = document.querySelectorAll('[data-target]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-target');
            scrollToSection(targetSection);
        });
    });
    
    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', function() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    });
    
    // Scroll event listeners
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Update progress bar
        updateScrollProgress();
        
        // Throttle scroll detection
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (!isScrolling) {
                const currentSection = getCurrentSection();
                updateActiveNav(currentSection);
            }
        }, 100);
    });
    
    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const sections = ['home', 'profile', 'services', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sections[currentIndex - 1]);
        }
    });
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Get form data
            const formData = {
                nama: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                telepon: document.getElementById('phone').value.trim(),
                pesan: document.getElementById('message').value.trim(),
                waktu: new Date().toLocaleString('id-ID')
            };
            
            // Display result
            const resultHTML = `
                <div class="result-item">
                    <i class="fas fa-user"></i>
                    <strong>Nama:</strong> ${formData.nama}
                </div>
                <div class="result-item">
                    <i class="fas fa-envelope"></i>
                    <strong>Email:</strong> ${formData.email}
                </div>
                <div class="result-item">
                    <i class="fas fa-phone"></i>
                    <strong>Telepon:</strong> ${formData.telepon}
                </div>
                <div class="result-item">
                    <i class="fas fa-comment"></i>
                    <strong>Pesan:</strong> ${formData.pesan}
                </div>
                <div class="result-item">
                    <i class="fas fa-clock"></i>
                    <strong>Waktu:</strong> ${formData.waktu}
                </div>
            `;
            
            document.getElementById('formResult').innerHTML = resultHTML;
            document.getElementById('resultDisplay').classList.add('show');
            
            // Update user name
            currentUser = formData.nama;
            document.getElementById('userName').textContent = currentUser;
            
            // Reset form
            this.reset();
            
            // Hide result after 10 seconds
            setTimeout(() => {
                document.getElementById('resultDisplay').classList.remove('show');
            }, 10000);
        }
    });
    
    // Real-time validation
    document.getElementById('name').addEventListener('input', function() {
        if (validateName(this.value)) {
            hideError('name');
        }
    });
    
    document.getElementById('email').addEventListener('input', function() {
        if (validateEmail(this.value)) {
            hideError('email');
        }
    });
    
    document.getElementById('phone').addEventListener('input', function() {
        if (validatePhone(this.value)) {
            hideError('phone');
        }
    });
    
    document.getElementById('message').addEventListener('input', function() {
        if (validateMessage(this.value)) {
            hideError('message');
        }
    });

    // Initial animations for home section
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

// Handle page visibility change (ask name when user returns)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && currentUser === 'Guest') {
        setTimeout(askUserName, 500);
    }
});

// Intersection Observer for section animations
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isScrolling) {
            const sectionId = entry.target.id;
            updateActiveNav(sectionId);
            triggerSectionAnimations(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});