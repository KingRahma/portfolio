// Graphic Design Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const designSlides = document.querySelectorAll('.design-slide');
    const designDots = document.querySelectorAll('.design-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all slides
        designSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        designDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate current slide index
        currentSlide = (index + designSlides.length) % designSlides.length;
        
        // Show current slide
        designSlides[currentSlide].classList.add('active');
        designDots[currentSlide].classList.add('active');
        
        // Reset auto slide timer
        resetAutoSlide();
    }
    
    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Function to start auto sliding
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 10000); // Change slide every 5 seconds
    }
    
    // Function to reset auto slide timer
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Event listeners for dots
    designDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.graphic-design-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Add CSS animations to design mockups
    function addDesignAnimations() {
        const designMockups = document.querySelectorAll('.design-mockup');
        
        designMockups.forEach((mockup, index) => {
            // Add staggered animation delay
            mockup.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effect
            mockup.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            });
            
            mockup.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Initialize animations
    addDesignAnimations();
    
    
});