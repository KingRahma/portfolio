// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Language Toggle
const languageToggle = document.getElementById('languageToggle');
let currentLang = 'en';

if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Update button text
        languageToggle.innerHTML = `<i class="fas fa-language"></i> ${currentLang.toUpperCase()}`;
        languageToggle.setAttribute('data-lang', currentLang);
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                const placeholder = element.getAttribute(`data-${currentLang}`);
                if (placeholder) element.placeholder = placeholder;
            } else if (element.tagName === 'OPTION') {
                const text = element.getAttribute(`data-${currentLang}`);
                if (text) element.textContent = text;
            } else if (element.tagName === 'SELECT') {
                // Handle select options
                Array.from(element.options).forEach(option => {
                    const optionText = option.getAttribute(`data-${currentLang}`);
                    if (optionText) option.textContent = optionText;
                });
            } else {
                const text = element.getAttribute(`data-${currentLang}`);
                if (text) element.textContent = text;
            }
        });
        
        // Change text direction for RTL languages
        if (currentLang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.body.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }
        
        // Save language preference
        localStorage.setItem('language', currentLang);
    });
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage === 'ar') {
        // Trigger language change
        currentLang = 'ar';
        languageToggle.click();
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Update active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});