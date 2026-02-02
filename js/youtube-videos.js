// YouTube Videos Functionality - Updated for 4 short & 2 long videos
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SHORT FORM FILTERING ==========
    const shortFilterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    const shortFormCards = document.querySelectorAll('.short-form-card');
    
    if (shortFilterButtons.length > 0 && shortFormCards.length > 0) {
        shortFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all short form filter buttons
                document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                shortFormCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (card.getAttribute('data-platform') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========== YOUTUBE CATEGORY FILTERING ==========
    const youtubeFilterButtons = document.querySelectorAll('.filter-btn[data-category]');
    const youtubeCards = document.querySelectorAll('.youtube-card');
    
    if (youtubeFilterButtons.length > 0 && youtubeCards.length > 0) {
        youtubeFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all youtube filter buttons
                document.querySelectorAll('.filter-btn[data-category]').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const categoryValue = button.getAttribute('data-category');
                
                youtubeCards.forEach(card => {
                    if (categoryValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (card.getAttribute('data-category') === categoryValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========== VIDEO MODAL FUNCTIONALITY ==========
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Function to open video modal with platform-specific dimensions
    function openVideoModal(videoId, title, description, platform = 'youtube') {
        // Clear previous iframe
        videoPlayer.innerHTML = '';
        
        // Get platform-specific dimensions
        let aspectRatio = '16:9'; // Default for YouTube
        let playerWidth = '100%';
        
        if (platform === 'tiktok' || platform === 'instagram') {
            aspectRatio = '9:16'; // Vertical for TikTok/Instagram
            playerWidth = '350px'; // Optimal width for vertical videos
        }
        
        // Calculate height based on aspect ratio
        let playerHeight;
        if (aspectRatio === '9:16') {
            playerHeight = '620px'; // Standard vertical video height
        } else {
            playerHeight = '100%'; // Full height for horizontal videos
        }
        
        // Create new iframe with platform-specific settings
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.title = title;
        iframe.style.width = playerWidth;
        iframe.style.height = playerHeight;
        iframe.style.maxWidth = '100%';
        iframe.style.border = 'none';
        
        // Center vertical videos
        if (platform === 'tiktok' || platform === 'instagram') {
            iframe.style.margin = '0 auto';
            iframe.style.display = 'block';
        }
        
        videoPlayer.appendChild(iframe);
        
        // Set modal content
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        if (platform === 'youtube') {
            modalLink.href = `https://youtube.com/watch?v=${videoId}`;
            modalLink.style.display = 'inline-flex';
        } else if (platform === 'tiktok') {
            modalLink.href = `https://tiktok.com/video/${videoId}`;
            modalLink.innerHTML = `<i class="fab fa-tiktok"></i> <span data-en="Watch on TikTok" data-ar="شاهد على تيك توك">Watch on TikTok</span>`;
            modalLink.style.display = 'inline-flex';
        } else if (platform === 'instagram') {
            modalLink.href = `https://instagram.com/reel/${videoId}`;
            modalLink.innerHTML = `<i class="fab fa-instagram"></i> <span data-en="Watch on Instagram" data-ar="شاهد على إنستجرام">Watch on Instagram</span>`;
            modalLink.style.display = 'inline-flex';
        } else {
            modalLink.style.display = 'none';
        }
        
        // Show modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeVideoModal() {
        // Pause video if playing
        const iframe = videoPlayer.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
        }
        
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear iframe after animation
        setTimeout(() => {
            videoPlayer.innerHTML = '';
        }, 300);
    }
    
    // ========== SHORT FORM CARD CLICK HANDLERS ==========
    document.querySelectorAll('.short-form-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on engagement stats
            if (!e.target.closest('.engagement-stats') && !e.target.closest('.youtube-link')) {
                const videoId = this.getAttribute('data-video-id');
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('.short-form-info > p').textContent;
                const platform = this.getAttribute('data-platform');
                
                openVideoModal(videoId, title, description, platform);
            }
        });
    });
    
    // ========== YOUTUBE CARD CLICK HANDLERS ==========
    document.querySelectorAll('.youtube-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on YouTube link
            if (!e.target.closest('.youtube-link')) {
                const videoId = this.getAttribute('data-video-id');
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('.youtube-info > p').textContent;
                
                openVideoModal(videoId, title, description, 'youtube');
            }
        });
    });
    
    // Also make play overlays clickable
    document.querySelectorAll('.play-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.short-form-card') || this.closest('.youtube-card');
            if (card) {
                const videoId = card.getAttribute('data-video-id');
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('.short-form-info > p, .youtube-info > p').textContent;
                const platform = card.classList.contains('youtube-card') ? 'youtube' : 
                                card.getAttribute('data-platform');
                
                openVideoModal(videoId, title, description, platform);
            }
        });
    });
    
    // ========== MODAL CLOSE HANDLERS ==========
    // Close modal events
    const closeModalElement = document.querySelector('.close-modal');
    const modalOverlayElement = document.querySelector('.modal-overlay');
    
    if (closeModalElement) {
        closeModalElement.addEventListener('click', closeVideoModal);
    }
    
    if (modalOverlayElement) {
        modalOverlayElement.addEventListener('click', closeVideoModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVideoModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // ========== UPDATE STATISTICS ==========
    // Update short form engagement stats (4 videos now)
    function updateShortFormStats() {
        const shortCards = document.querySelectorAll('.short-form-card');
        
        shortCards.forEach((card, index) => {
            // Updated engagement data for 4 videos
            const likes = [45000, 28000, 65000, 52000];
            const comments = [1200, 850, 2100, 1800];
            const shares = [850, 420, 1500, 920];
            
            const engagementStats = card.querySelector('.engagement-stats');
            if (engagementStats && index < likes.length) {
                const spans = engagementStats.querySelectorAll('span');
                if (spans[0]) spans[0].innerHTML = `<i class="fas fa-heart"></i> ${formatNumber(likes[index])}`;
                if (spans[1]) spans[1].innerHTML = `<i class="fas fa-comment"></i> ${formatNumber(comments[index])}`;
                if (spans[2]) spans[2].innerHTML = `<i class="fas fa-share"></i> ${formatNumber(shares[index])}`;
            }
        });
    }
    
     // Update YouTube video stats (Now 4 videos)
    // ... existing code ...

// Update YouTube video stats (Now 4 videos)
function updateYouTubeStats() {
    const videoCards = document.querySelectorAll('.youtube-card');
    
    videoCards.forEach((card, index) => {
        // Updated view counts for 4 videos
        const baseViews = [15000, 28000, 42000, 36000];
        const baseDates = ['2 months ago', '3 months ago', '1 month ago', '2 weeks ago'];
        
        const viewsElement = card.querySelector('.video-stats span:first-child');
        const dateElement = card.querySelector('.video-stats span:last-child');
        
        if (viewsElement && index < baseViews.length) {
            viewsElement.innerHTML = `<i class="fas fa-eye"></i> ${formatNumber(baseViews[index])} views`;
        }
        
        if (dateElement && index < baseDates.length) {
            dateElement.innerHTML = `<i class="far fa-calendar"></i> ${baseDates[index]}`;
        }
    });
}

// ... rest of existing code ...
    
    // Helper function to format numbers
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    }
    
    // Call the functions to update stats
    if (shortFormCards.length > 0) updateShortFormStats();
    if (youtubeCards.length > 0) updateYouTubeStats();
    
    // ========== RESPONSIVE VIDEO THUMBNAIL HANDLING ==========
    function optimizeThumbnailsForPlatforms() {
        // Add platform-specific classes to thumbnails
        document.querySelectorAll('.short-form-card').forEach(card => {
            const platform = card.getAttribute('data-platform');
            const thumbnail = card.querySelector('.video-thumbnail img');
            
            if (thumbnail) {
                // Remove existing platform classes
                thumbnail.classList.remove('tiktok-thumbnail', 'instagram-thumbnail', 'youtube-thumbnail');
                
                // Add platform-specific class
                if (platform === 'tiktok') {
                    thumbnail.classList.add('tiktok-thumbnail');
                } else if (platform === 'instagram') {
                    thumbnail.classList.add('instagram-thumbnail');
                } else if (platform === 'youtube') {
                    thumbnail.classList.add('youtube-thumbnail');
                }
            }
        });
        
        // Add HD class to YouTube video thumbnails
        document.querySelectorAll('.youtube-card').forEach(card => {
            const thumbnail = card.querySelector('.youtube-thumbnail img');
            if (thumbnail) {
                thumbnail.classList.add('youtube-hd-thumbnail');
            }
        });
    }
    
    // Optimize thumbnails on load
    optimizeThumbnailsForPlatforms();
});
