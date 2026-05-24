// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.textContent = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 20);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Mobile Menu Functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const hamburgerIcon = document.getElementById('hamburgerIcon');

function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    }
}

function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Close menu when clicking on links
document.querySelectorAll('.mobile-nav-links a, .mobile-resume-btn').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Newsletter Handler
function handleNewsletter(form) {
    const input = form.querySelector('input');
    if (input && input.value.trim()) {
        showToast('✓ Subscribed successfully!', 'success');
        form.reset();
    } else {
        showToast('⚠ Please enter your email', 'error');
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm animate-toast ${
        type === 'success' ? 'bg-gradient-to-r from-[#237227] to-[#519A66]' : 'bg-gray-700'
    }`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Call animation functions
window.addEventListener('load', () => {
    animateSkillBars();
    animateStats();
});

// Re-animate skills when page loads with delay
setTimeout(() => {
    animateSkillBars();
}, 500);

// Newsletter Toast Function (Add to existing skills.js)
function handleNewsletter(form) {
    const input = form.querySelector('input');
    if (input && input.value.trim()) {
        const originalIcon = form.querySelector('button').innerHTML;
        form.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i>';
        setTimeout(() => {
            form.querySelector('button').innerHTML = originalIcon;
            input.value = '';
            showToast('✓ Subscribed successfully!', 'success');
        }, 800);
    } else {
        showToast('⚠ Please enter your email', 'error');
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-20 right-4 z-50 px-3 py-1.5 rounded-lg shadow-md text-white text-xs animate-toast ${
        type === 'success' ? 'bg-gradient-to-r from-[#237227] to-[#519A66]' : 'bg-gray-700'
    }`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 200);
    }, 2000);
}

// Add animation keyframes if not present
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-toast {
        animation: slideInRight 0.2s ease-out;
    }
`;
document.head.appendChild(style);