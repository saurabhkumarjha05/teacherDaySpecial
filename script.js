// DOM Elements
const landingPage = document.getElementById('landing-page');
const scrollDownPage = document.getElementById('scroll-down-page');
const mainPage = document.getElementById('main-page');
const loginForm = document.getElementById('login-form');
const teacherNameInput = document.getElementById('teacher-name');
const scrollTeacherName = document.getElementById('scroll-teacher-name');
const greetingName = document.getElementById('greeting-name');
const messageName = document.getElementById('message-name');
const customCursor = document.querySelector('.custom-cursor');
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
const downloadCert = document.getElementById('download-cert');

// Quote carousel elements
const quoteCards = document.querySelectorAll('.quote-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselDots = document.querySelector('.carousel-dots');

// State variables
let currentQuoteIndex = 0;
let isMusicPlaying = false;
let teacherName = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
    initializeQuoteCarousel();
    initializeMusic();
    createCarouselDots();
    initializeScrollDown();
    
    // Add entrance animation to floating elements
    setTimeout(() => {
        document.querySelectorAll('.floating-book, .floating-pen, .floating-star, .floating-heart').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }, 500);
});

// Custom Cursor Functionality
function initializeCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('button, input, .quote-card, .action-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'scale(1.5)';
            customCursor.style.background = 'radial-gradient(circle, #fd79a8, #fdcb6e)';
        });
        
        element.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'scale(1)';
            customCursor.style.background = 'radial-gradient(circle, #ff6b6b, #4ecdc4)';
        });
    });
}

// Login Form Functionality
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = teacherNameInput.value.trim();
    if (name) {
        teacherName = name;
        showMainPage();
    }
});



function showMainPage() {
    // Update names in the scroll down page
    if (scrollTeacherName) {
        scrollTeacherName.textContent = teacherName;
    }
    
    // Update names in the main page
    greetingName.textContent = `Happy Teachers' Day, ${teacherName} Sir!`;
    messageName.textContent = `${teacherName} Sir`;
    
    // Add entrance animation
    greetingName.style.animation = 'glow 2s ease-in-out infinite alternate';
    
    // Transition to scroll down page first
    landingPage.style.opacity = '0';
    landingPage.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        landingPage.classList.remove('active');
        if (scrollDownPage) {
            scrollDownPage.classList.add('active');
            scrollDownPage.style.opacity = '0';
            scrollDownPage.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                scrollDownPage.style.opacity = '1';
                scrollDownPage.style.transform = 'translateY(0)';
                scrollDownPage.style.transition = 'all 0.8s ease-out';
            }, 100);
        }
    }, 500);
}

// Scroll Down Functionality
function initializeScrollDown() {
    // Add click event to scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', showMainContent);
    }
    
    // Add click event to entire scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', showMainContent);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add keyboard event for Enter key - improved version
    document.addEventListener('keydown', function(e) {
        // Check if Enter key is pressed and scroll down page is active
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (scrollDownPage && scrollDownPage.classList.contains('active')) {
                e.preventDefault(); // Prevent any default behavior
                showMainContent();
            }
        }
    });
}

function showMainContent() {
    // Transition from scroll down page to main page
    scrollDownPage.style.opacity = '0';
    scrollDownPage.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        scrollDownPage.classList.remove('active');
        mainPage.classList.add('active');
        mainPage.style.opacity = '0';
        mainPage.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            mainPage.style.opacity = '1';
            mainPage.style.transform = 'translateY(0)';
            mainPage.style.transition = 'all 0.8s ease-out';
        }, 100);
    }, 500);
}

function handleScroll() {
    // If user scrolls on the scroll down page, automatically go to main page
    if (scrollDownPage && scrollDownPage.classList.contains('active') && window.scrollY > 50) {
        showMainContent();
    }
}


// Quote Carousel Functionality
function initializeQuoteCarousel() {
    // Auto-rotate quotes every 5 seconds
    setInterval(() => {
        nextQuote();
    }, 5000);
    
    // Button event listeners
    prevBtn.addEventListener('click', prevQuote);
    nextBtn.addEventListener('click', nextQuote);
}

function createCarouselDots() {
    quoteCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToQuote(index));
        carouselDots.appendChild(dot);
    });
}

function showQuote(index) {
    // Hide all quotes
    quoteCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show current quote
    quoteCards[index].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quoteCards.length;
    showQuote(currentQuoteIndex);
}

function prevQuote() {
    currentQuoteIndex = (currentQuoteIndex - 1 + quoteCards.length) % quoteCards.length;
    showQuote(currentQuoteIndex);
}

function goToQuote(index) {
    currentQuoteIndex = index;
    showQuote(currentQuoteIndex);
}

// Music Functionality
function initializeMusic() {
    // Try to load a gentle instrumental track
    // For demo purposes, we'll use a simple approach
    backgroundMusic.volume = 0.3;
    
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Music Off';
        isMusicPlaying = false;
    } else {
        // Try to play the music
        backgroundMusic.play().then(() => {
            musicIcon.textContent = '🎵';
            musicText.textContent = 'Music On';
            isMusicPlaying = true;
            showNotification('Happy Teachers Day music is now playing!');
        }).catch((error) => {
            // If music fails to play, show notification
            musicIcon.textContent = '🔇';
            musicText.textContent = 'Music Error';
            isMusicPlaying = false;
            showNotification('Could not play music. Please check if the audio file exists.');
            console.log('Music play error:', error);
        });
    }
}

// Download Certificate Functionality
downloadCert.addEventListener('click', function() {
    generateCertificate();
});

function generateCertificate() {
    // Create a simple certificate using Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#ffeaa7');
    gradient.addColorStop(0.5, '#fab1a0');
    gradient.addColorStop(1, '#fd79a8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Border
    ctx.strokeStyle = '#74b9ff';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);
    
    // Title
    ctx.fillStyle = '#2d3436';
    ctx.font = 'bold 48px Great Vibes, cursive';
    ctx.textAlign = 'center';
    ctx.fillText('Teachers\' Day Certificate', 400, 100);
    
    // Subtitle
    ctx.font = '24px Merriweather, serif';
    ctx.fillText('Certificate of Appreciation', 400, 140);
    
    // Main text
    ctx.font = '20px Merriweather, serif';
    ctx.fillText('This certificate is presented to', 400, 250);
    
    // Teacher name
    ctx.font = 'bold 36px Dancing Script, cursive';
    ctx.fillStyle = '#74b9ff';
    ctx.fillText((teacherName ? `${teacherName} Sir` : 'Dear Teacher'), 400, 320);
    
    // Appreciation text
    ctx.fillStyle = '#2d3436';
    ctx.font = '18px Merriweather, serif';
    ctx.fillText('In recognition of your dedication, patience, and', 400, 380);
    ctx.fillText('inspiring guidance that shapes the future.', 400, 410);
    
    // Date
    ctx.font = '16px Merriweather, serif';
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 400, 480);
    
    // Signature line
    ctx.fillText('With gratitude and respect', 400, 520);
    
    // Convert to image and download
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Teachers_Day_Certificate_${teacherName ? `${teacherName}_Sir` : 'Teacher'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Certificate downloaded successfully!');
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-family: 'Merriweather', serif;
        color: #2d3436;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced Floating Animations
function createFloatingParticles() {
    const particles = ['📚', '✒️', '📝', '🎓', '⭐', '💝', '🌸', '📖'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: fixed;
                top: 100vh;
                left: ${Math.random() * 100}vw;
                font-size: 20px;
                opacity: 0.4;
                pointer-events: none;
                z-index: 1;
                animation: floatUp 8s linear forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }
    }, 2000);
}

// Add floating particles animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Start floating particles
setTimeout(createFloatingParticles, 2000);

// Smooth scrolling for any internal links
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

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.quote-card, .message-card, .login-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to greeting
    setTimeout(() => {
        if (teacherName) {
            typeWriter(greetingName, `Happy Teachers' Day, ${teacherName} Sir!`, 100);
        }
    }, 1000);
});

// Typewriter effect
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevQuote();
    } else if (e.key === 'ArrowRight') {
        nextQuote();
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextQuote(); // Swipe left - next quote
        } else {
            prevQuote(); // Swipe right - previous quote
        }
    }
}
