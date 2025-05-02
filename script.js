document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library with improved settings
    AOS.init({
        duration: 900,
        easing: 'ease-out',
        once: false,
        mirror: true,
        disable: 'mobile',
        startEvent: 'DOMContentLoaded',
        offset: 80,
        delay: 100,
        anchorPlacement: 'top-bottom'
    });

    // Mobile Menu Toggle with enhanced interactions
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent background scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                
                // Animate nav links appearance
                navLinkItems.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        link.style.transition = 'all 0.4s ease';
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, 100 + (index * 80));
                });
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Improved mobile menu interactions
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Enhanced header scroll effect with smoother transitions
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        if (currentScrollTop > 50) {
            header.classList.add('scrolled');
            header.style.backgroundColor = 'rgba(10, 9, 28, 0.92)';
            header.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.2)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = 'rgba(10, 9, 28, 0.8)';
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

    // Countdown Timer Implementation
    function updateCountdown() {
        const now = new Date();
        
        // Set the target date to 7pm WAT today
        const targetDate = new Date();
        
        // Set time to 7:00 PM WAT
        // WAT is UTC+1
        targetDate.setUTCHours(18, 0, 0, 0); // 18:00 UTC = 19:00 WAT
        
        // If it's already past 7pm WAT today, the countdown should show zeros
        const timeDifference = Math.max(0, targetDate - now);
        
        // Calculate days, hours, minutes and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Update the HTML elements
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Update countdown info text
        const countdownInfo = document.querySelector('.countdown-info p');
        if (countdownInfo) {
            if (timeDifference <= 0) {
                countdownInfo.textContent = `$RAY has launched! 🚀`;
            } else {
                countdownInfo.textContent = `$RAY to the moon...`;
            }
        }
    }
    
    // Initialize countdown timer
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // Improved smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 30;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight section when scrolled to
                setTimeout(() => {
                    targetElement.classList.add('highlight-section');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight-section');
                    }, 1000);
                }, 1000);
            }
        });
    });

    // Initialize Token Chart with improved visualization
    const chartCanvas = document.getElementById('tokenChart');
    
    if (chartCanvas) {
        // Create gradient colors
        const ctx = chartCanvas.getContext('2d');
        const gradients = [
            createGradient(ctx, ['#8a63ff', '#7046e0']),
            createGradient(ctx, ['#40ddff', '#10a0d2']),
            createGradient(ctx, ['#ff5588', '#e03366']),
            createGradient(ctx, ['#00e0a0', '#00b07e']),
            createGradient(ctx, ['#ffb74d', '#ff9800']),
            createGradient(ctx, ['#ff5252', '#d32f2f'])
        ];
        
        const tokenChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: [
                    'Rewards (40%)',
                    'Liquidity & CEX (20%)',
                    'Team & Advisors (15%)',
                    'Marketing (10%)',
                    'Community Treasury (10%)',
                    'Reserve (5%)'
                ],
                datasets: [{
                    data: [40, 20, 15, 10, 10, 5],
                    backgroundColor: gradients,
                    borderWidth: 0,
                    hoverOffset: 15,
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(13, 12, 34, 0.95)',
                        titleFont: {
                            family: 'Outfit',
                            size: 15,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: 'Outfit',
                            size: 14
                        },
                        padding: 15,
                        cornerRadius: 10,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let value = context.raw;
                                return `${value}% of total supply`;
                            }
                        },
                        boxPadding: 8
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        });
        
        // Animate chart elements on hover
        chartCanvas.addEventListener('mousemove', function(e) {
            const activePoints = tokenChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
            if (activePoints.length) {
                chartCanvas.style.cursor = 'pointer';
            } else {
                chartCanvas.style.cursor = 'default';
            }
        });
        
        // Responsive redraw on window resize
        window.addEventListener('resize', function() {
            tokenChart.resize();
        });
        
        // Animate legend items
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                tokenChart.setActiveElements([{datasetIndex: 0, index: index}]);
                tokenChart.update();
            });
            
            item.addEventListener('mouseleave', function() {
                tokenChart.setActiveElements([]);
                tokenChart.update();
            });
        });
    }

    // Enhanced particle effect for the hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Dynamic particle count based on screen size
        const width = window.innerWidth;
        let particleCount;
        
        if (width < 480) {
            particleCount = 8;
        } else if (width < 768) {
            particleCount = 15;
        } else {
            particleCount = 30;
        }
        
        createParticles(particleCount);
        
        // Add parallax effect to hero elements
        const heroImage = document.querySelector('.hero-image img');
        const heroTitle = document.querySelector('.animated-title');
        
        if (heroImage && heroTitle) {
            window.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                heroImage.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
                heroTitle.style.transform = `translate(${mouseX * 10 - 5}px, ${mouseY * 10 - 5}px)`;
            });
        }
    }

    // Improved email form submission with better visual feedback
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            const input = this.querySelector('input');
            
            // Disable form during animation
            button.disabled = true;
            input.disabled = true;
            
            // Animate button state change
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Thanks for signing up!';
                button.style.background = 'linear-gradient(90deg, #00e0a0, #40ddff)';
                input.style.opacity = '0.7';
                
                // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                    input.disabled = false;
                button.style.background = '';
                    input.style.opacity = '1';
                this.reset();
            }, 3000);
            }, 1000);
        });
    }

    // Connect Wallet button with improved interaction
    const connectBtn = document.querySelector('.connect-btn button');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            if (this.disabled) return;
            
            this.disabled = true;
            const originalText = this.textContent;
            
            // Animate state change
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-rocket"></i> Coming Soon';
                
                setTimeout(() => {
                    this.textContent = originalText;
                this.disabled = false;
            }, 2000);
            }, 1000);
        });
    }
    
    // Enhanced reveal animation for sections on scroll
    const sections = document.querySelectorAll('section');
    
    function revealSection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate children with cascade effect
                const elements = entry.target.querySelectorAll('.animate-on-reveal');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, 100 * index);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.2,
        rootMargin: '-50px'
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
    
    // Add morph effect to roadmap items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '5';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add tilt effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 992) { // Only on desktop
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show button when user scrolls down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Custom cursor for desktop
    if (window.innerWidth > 992) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (cursorDot && cursorOutline) {
            // Initialize cursor
            setTimeout(() => {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '1';
            }, 1000);
            
            // Move cursor with mouse
            document.addEventListener('mousemove', function(e) {
                cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
            
            // Hover effect for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .feature-card, .social-link, .timeline-item');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', function() {
                    cursorOutline.style.width = '60px';
                    cursorOutline.style.height = '60px';
                    cursorOutline.style.border = '2px solid rgba(64, 221, 255, 0.5)';
                });
                
                el.addEventListener('mouseleave', function() {
                    cursorOutline.style.width = '40px';
                    cursorOutline.style.height = '40px';
                    cursorOutline.style.border = '2px solid rgba(138, 99, 255, 0.5)';
                });
            });
        }
    }

    // Add contract copy button functionality
    const copyContractBtn = document.getElementById('copy-contract');
    
    if (copyContractBtn) {
        copyContractBtn.addEventListener('click', function() {
            const contractAddress = this.getAttribute('data-contract');
            
            // Check if contract address is available
            if (contractAddress === 'coming-soon' || !contractAddress || contractAddress.length < 30) {
                // Contract not ready yet, show coming soon message
                const originalText = this.innerHTML;
                
                this.innerHTML = '<i class="fas fa-exclamation-circle"></i> Not available yet';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
                
                return;
            }
            
            const originalText = this.innerHTML;
            const originalWidth = window.getComputedStyle(this).width;
            
            // Save original width to prevent button from changing size
            this.style.width = originalWidth;
            
            // Copy to clipboard
            navigator.clipboard.writeText(contractAddress)
                .then(() => {
                    // Change button appearance to show success
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.background = 'linear-gradient(90deg, #00e0a0, #40ddff)';
                    
                    // Show tooltip with the copied address
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = contractAddress;
                    document.body.appendChild(tooltip);
                    
                    // Position tooltip near the button
                    const rect = this.getBoundingClientRect();
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
                    
                    // Add visible class to fade in
                    setTimeout(() => tooltip.classList.add('visible'), 10);
                    
                    // Reset button after delay
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.width = '';
                        
                        // Remove tooltip with fade out
                        tooltip.classList.remove('visible');
                        setTimeout(() => {
                            if (tooltip.parentNode) {
                                tooltip.parentNode.removeChild(tooltip);
                            }
                        }, 300);
                    }, 2000);
                })
                .catch(err => {
                    // Fallback for browsers that don't support clipboard API
                    this.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to copy';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                    
                    console.error('Could not copy text: ', err);
                });
        });
        
        // Function to enable contract button when a valid address is set
        window.enableContractButton = function(address) {
            if (address && address.length >= 30) {
                copyContractBtn.classList.remove('disabled');
                copyContractBtn.setAttribute('data-contract', address);
                copyContractBtn.innerHTML = 'Contract <i class="fas fa-copy"></i>';
                console.log('Contract button enabled with address:', address);
            }
        };
    }
});

// Creates enhanced floating particles in the hero section
function createParticles(count) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    const hero = document.getElementById('hero');
    if (hero) {
        hero.appendChild(particlesContainer);
    
    for (let i = 0; i < count; i++) {
        createParticle(particlesContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    // Choose random particle types
    const particleTypes = ['circle', 'square', 'triangle', 'star'];
    const particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    
    // Generate random properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 60 + 30;
    const delay = Math.random() * 10;
    
    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.zIndex = '1';
    
    // Set particle appearance based on type
    switch(particleType) {
        case 'circle':
            particle.style.borderRadius = '50%';
            particle.style.background = getGradientColor();
            break;
        case 'square':
            particle.style.borderRadius = '20%';
            particle.style.background = getGradientColor();
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            break;
        case 'triangle':
            particle.style.width = '0';
            particle.style.height = '0';
            particle.style.borderLeft = `${size/2}px solid transparent`;
            particle.style.borderRight = `${size/2}px solid transparent`;
            particle.style.borderBottom = `${size}px solid ${getColor()}`;
            particle.style.background = 'transparent';
            break;
        case 'star':
            particle.style.clip = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            particle.style.background = getGradientColor();
            break;
    }
    
    // Add floating animation
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    
    // Add subtle pulsing and rotation animations
    particle.style.animationName = 'float, pulse, rotate';
    particle.style.animationDuration = `${duration}s, ${duration/4}s, ${duration*1.5}s`;
    particle.style.animationIterationCount = 'infinite, infinite, infinite';
    particle.style.animationTimingFunction = 'ease-in-out, ease-in-out, linear';
    
    // Add particle to container
    container.appendChild(particle);
    
    // Add keyframes dynamically if not added yet
    if (!document.querySelector('#particle-keyframes')) {
        const keyframes = document.createElement('style');
        keyframes.id = 'particle-keyframes';
        keyframes.innerHTML = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(${Math.random() * -100 - 50}px) translateX(${Math.random() * 50 - 25}px);
                }
                50% {
                    transform: translateY(${Math.random() * -150 - 50}px) translateX(${Math.random() * 100 - 50}px);
                }
                75% {
                    transform: translateY(${Math.random() * -100 - 25}px) translateX(${Math.random() * 50 - 25}px);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: ${Math.random() * 0.5 + 0.2};
                }
                50% {
                    transform: scale(${Math.random() * 0.5 + 0.8});
                    opacity: ${Math.random() * 0.3 + 0.1};
                }
            }
            
            @keyframes rotate {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(keyframes);
    }
}

// Helper function to get random colors
function getColor() {
    const colors = ['#8a63ff', '#40ddff', '#ff5588', '#00e0a0', 'rgba(255, 255, 255, 0.8)'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to get gradient colors
function getGradientColor() {
    const gradients = [
        'linear-gradient(45deg, #8a63ff, #7046e0)',
        'linear-gradient(45deg, #40ddff, #10a0d2)',
        'linear-gradient(45deg, #ff5588, #e03366)',
        'linear-gradient(45deg, #00e0a0, #00b07e)',
        'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Helper function to create chart gradients
function createGradient(ctx, colors) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
}

// Add parallax effect for stars when scrolling
window.addEventListener('scroll', function() {
    if (window.innerWidth > 768) { // Only on larger screens
        const scrollPosition = window.pageYOffset;
        
        document.getElementById('stars').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        document.getElementById('stars2').style.transform = `translateY(${scrollPosition * 0.2}px)`;
        document.getElementById('stars3').style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});

// Section reveal styles
document.head.insertAdjacentHTML('beforeend', `
<style>
.section-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
.revealed {
    opacity: 1;
    transform: translateY(0);
}
</style>
`);

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate parallax on resize
    if (window.innerWidth <= 768) {
        document.getElementById('stars').style.transform = '';
        document.getElementById('stars2').style.transform = '';
        document.getElementById('stars3').style.transform = '';
    }
});

// Slideshow functionality
let slideIndex = 1;

// Initialize slideshow when the page loads
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    
    if (!slides.length) return;
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides first
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.transform = "translateX(0) translateZ(-200px)";
        slides[i].style.zIndex = "0";
    }
    
    // Show only the active slide and adjacent slides
    for (i = 0; i < slides.length; i++) {
        // Calculate the relative position to the current slide
        let position = i - (slideIndex - 1);
        
        // Handle looping for carousel effect
        if (position < -1) position = -1;
        if (position > 1) position = 1;
        
        if (position >= -1 && position <= 1) {
            slides[i].style.display = "block";
            
            switch (position) {
                case -1: // Left card
                    slides[i].style.transform = "translateX(-330px) translateZ(-50px) rotateY(10deg)";
                    slides[i].style.zIndex = "1";
                    slides[i].style.filter = "brightness(0.7)";
                    break;
                case 0: // Center card (active)
                    slides[i].style.transform = "translateX(0) translateZ(0) rotateY(0)";
                    slides[i].style.zIndex = "3";
                    slides[i].style.filter = "brightness(1)";
                    break;
                case 1: // Right card
                    slides[i].style.transform = "translateX(330px) translateZ(-50px) rotateY(-10deg)";
                    slides[i].style.zIndex = "1";
                    slides[i].style.filter = "brightness(0.7)";
                    break;
            }
        }
    }
    
    // Update dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    dots[slideIndex-1].className += " active-dot";
}

// Auto advance slides
let slideInterval;

function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000); // Change image every 5 seconds
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Start automatic slideshow
startSlideshow();

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);
}

// Update slide positions on window resize
window.addEventListener('resize', function() {
    let width = window.innerWidth;
    const slides = document.getElementsByClassName("slides");
    
    if (!slides.length) return;
    
    let leftOffset, rightOffset, zOffset;
    
    if (width <= 480) {
        leftOffset = -210;
        rightOffset = 210;
        zOffset = -20;
    } else if (width <= 768) {
        leftOffset = -250;
        rightOffset = 250;
        zOffset = -30;
    } else if (width <= 992) {
        leftOffset = -300;
        rightOffset = 300;
        zOffset = -50;
    } else {
        leftOffset = -330;
        rightOffset = 330;
        zOffset = -50;
    }
    
    // Refresh the current slide view to apply responsive sizes
    showSlides(slideIndex);
}); 