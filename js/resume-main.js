// Technical Architect Resume - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    const typedText = document.querySelector('.typed-text');
    const progressBar = document.querySelector('.progress-bar');
    
    const loadingMessages = [
        'npm install awesome-developer',
        'git clone https://github.com/riturajratan/portfolio.git',
        'docker build -t technical-architect .',
        'kubectl apply -f deployment.yaml',
        'Initializing portfolio...',
        'Loading awesome projects...',
        'Connecting to the matrix...',
        'Portfolio ready! 🚀'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeMessage() {
        if (messageIndex < loadingMessages.length) {
            const currentMessage = loadingMessages[messageIndex];
            
            if (charIndex < currentMessage.length) {
                typedText.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                setTimeout(() => {
                    charIndex = 0;
                    messageIndex++;
                    typeMessage();
                }, 1000);
            }
        } else {
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initializeAnimations();
                }, 500);
            }, 1000);
        }
    }
    
    // Start loading animation
    typeMessage();
    
    // Navigation Functionality
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // Skills Section Animations
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observeSkills.observe(skillsSection);
    }
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
    
    // Experience Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Move indicator
            if (tabIndicator) {
                tabIndicator.style.transform = `translateY(${index * 42}px)`;
            }
        });
    });
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Initialize animations after loading
    function initializeAnimations() {
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.hero-content > *, .about-content > *, .skill-category, .project-card, .other-project, .contact-item'
        );
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
        
        // Hero content animation
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Contact Form Enhancement
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-button');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let formspree handle it
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="method">sending</span><span class="parentheses">()</span>';
            submitButton.disabled = true;
            
            // Reset after 3 seconds (formspree redirect handles success)
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
        
        // Add typing sound effect simulation (visual feedback)
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                // Add a subtle scale animation on typing
                e.target.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 150);
            });
            
            input.addEventListener('focus', (e) => {
                e.target.style.borderColor = 'var(--accent-primary)';
            });
            
            input.addEventListener('blur', (e) => {
                e.target.style.borderColor = 'transparent';
            });
        });
    }
    
    // Code Syntax Highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
    
    // Parallax Effect for Hero Code Window
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            codeWindow.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Easter Eggs
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            activateEasterEgg();
        }
    });
    
    function activateEasterEgg() {
        // Matrix rain effect
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9998';
        canvas.style.opacity = '0.1';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#64ffda';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(drawMatrix, 35);
        
        // Remove after 10 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            document.body.removeChild(canvas);
        }, 10000);
        
        // Show message
        const message = document.createElement('div');
        message.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-secondary); padding: 20px; border-radius: 8px; border: 1px solid var(--accent-primary); color: var(--accent-primary); font-family: var(--font-mono); z-index: 9999; text-align: center;"><h3>🎉 Easter Egg Activated!</h3><p>Welcome to the Matrix, Neo!</p><p style="margin-top: 10px; font-size: 12px; color: var(--text-tertiary);">This will self-destruct in 5 seconds...</p></div>';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 5000);
    }
    
    // Console Art
    console.log(`
    %c
    ██████╗ ██╗████████╗██╗   ██╗██████╗  █████╗      ██╗
    ██╔══██╗██║╚══██╔══╝██║   ██║██╔══██╗██╔══██╗     ██║
    ██████╔╝██║   ██║   ██║   ██║██████╔╝███████║     ██║
    ██╔══██╗██║   ██║   ██║   ██║██╔══██╗██╔══██║██   ██║
    ██║  ██║██║   ██║   ╚██████╔╝██║  ██║██║  ██║╚█████╔╝
    ╚═╝  ╚═╝╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ 
    
    🚀 Technical Architect & Full Stack Developer
    📧 riturajratan@gmail.com
    🌐 https://www.riturajratan.com
    
    Thanks for checking out the console! 
    Try the Konami Code for a surprise... ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
    `, 
    'color: #64ffda; font-family: monospace; font-size: 12px;'
    );
    
    // Performance Monitor
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Log performance metrics
            if (performance.timing) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #4ade80; font-weight: bold;');
            }
        });
    }
    
    // Service Worker Registration (Progressive Web App)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
    
    // Theme Toggle (for future enhancement)
    let currentTheme = 'dark'; // Default theme
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search input if available
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Accessibility improvements
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Trap focus in mobile menu when open
    if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        document.addEventListener('keydown', (e) => {
            if (navMenu.classList.contains('active') && e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Intersection observer for analytics (if needed)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Track section views if analytics is implemented
                const sectionName = entry.target.id || 'unnamed-section';
                // gtag('event', 'section_view', { section_name: sectionName });
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (navigator.clipboard) {
                e.preventDefault();
                const email = link.href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary notification
                    showNotification('Email copied to clipboard! 📧');
                });
            }
        });
    });
    
    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--accent-primary);
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px solid var(--accent-primary);
            font-family: var(--font-mono);
            font-size: 14px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Preload critical images
    const criticalImages = [
        'img/rituraj.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
    }
    
    // Battery API (experimental)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            // Reduce animations if battery is low
            if (battery.level < 0.2) {
                document.documentElement.style.setProperty('--transition', 'none');
                console.log('🔋 Low battery detected, reducing animations');
            }
        });
    }
});