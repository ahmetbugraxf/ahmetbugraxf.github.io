// ===================================
// Theme Toggle
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a small animation
    themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// ===================================
// Mobile Menu
// ===================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
mobileNav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn?.classList.remove('active');
        mobileNav?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Smooth Scroll for anchor links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Header scroll effect
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        return;
    }
    
    header.style.boxShadow = 'var(--shadow-sm)';
    
    // Optional: Hide header on scroll down, show on scroll up
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //     header.style.transform = 'translateY(-100%)';
    // } else {
    //     header.style.transform = 'translateY(0)';
    // }
    
    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for animations
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.post-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ===================================
// Copy code blocks (for blog posts)
// ===================================
document.querySelectorAll('pre code').forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    `;
    copyBtn.title = 'Kodu kopyala';
    
    // Style the copy button
    copyBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 8px;
        background: var(--accent-dim);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        color: var(--text-secondary);
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(copyBtn);
    
    // Show button on hover
    pre.addEventListener('mouseenter', () => {
        copyBtn.style.opacity = '1';
    });
    
    pre.addEventListener('mouseleave', () => {
        copyBtn.style.opacity = '0';
    });
    
    // Copy functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            copyBtn.style.color = '#22c55e';
            
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
                copyBtn.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
        }
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Merhaba!', 'font-size: 24px; font-weight: bold;');
console.log('%cBu blogun kaynak koduna göz atıyorsan, harika! GitHub\'da bul: https://github.com/ahmetbugra', 'font-size: 14px; color: #888;');

