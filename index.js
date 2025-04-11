// Enhanced JavaScript for Pritish Mehta's Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and effects
    initLoader();
    initCustomCursor();
    initParticles();
    initTypewriter();
    initParallax();
    initScrollAnimations();
    initProjectCards3D();
    initSkillBadges();
    initTimelineAnimation();
    initHeroBackground();
    initSmoothScroll();
    initMobileMenu();
    initFormValidation();
    
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
  });
  
  // Loader Animation
  function initLoader() {
    const loader = document.getElementById('page-loader');
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        // Reveal content with cascading animation
        document.querySelectorAll('section').forEach((section, index) => {
          setTimeout(() => {
            section.classList.add('appear');
          }, 200 * index);
        });
      }, 800);
    });
  }
  
  // Custom Cursor
  function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Add smooth animation with requestAnimationFrame
      requestAnimationFrame(() => {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
      });
      
      // Delayed follow effect for outline
      setTimeout(() => {
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      }, 80);
    });
    
    // Custom cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-badge');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-active');
        cursorOutline.classList.add('cursor-active');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-active');
        cursorOutline.classList.remove('cursor-active');
      });
    });
    
    // Add cursor class to body to enable cursor styles
    document.body.classList.add('has-custom-cursor');
  }
  
  // Particle Animation for Hero Section
  function initParticles() {
    const header = document.querySelector('header');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    header.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // Random size
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Random animation duration
      const duration = Math.random() * 15 + 5;
      particle.style.animationDuration = `${duration}s`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
      }
      
      .particle {
        position: absolute;
        display: block;
        background: rgba(51, 173, 255, 0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: float-particle linear infinite;
      }
      
      @keyframes float-particle {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        100% {
          transform: translateY(-100vh) translateX(100px) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Typewriter Effect
  function initTypewriter() {
    const title = document.querySelector('header h1');
    const subtitle = document.querySelector('header p');
    
    if (!title || !subtitle) return;
    
    // Save original text
    const titleText = title.textContent;
    const subtitleText = subtitle.textContent;
    
    // Clear text
    title.textContent = '';
    subtitle.textContent = '';
    
    // Add typing class
    title.classList.add('typing');
    
    // Type title with delay
    let charIndex = 0;
    function typeTitle() {
      if (charIndex < titleText.length) {
        title.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 80);
      } else {
        // Start typing subtitle after title is done
        title.classList.remove('typing');
        subtitle.classList.add('typing');
        typeSubtitle();
      }
    }
    
    // Type subtitle
    let subCharIndex = 0;
    function typeSubtitle() {
      if (subCharIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(subCharIndex);
        subCharIndex++;
        setTimeout(typeSubtitle, 30);
      } else {
        subtitle.classList.remove('typing');
      }
    }
    
    // Start typing after a delay
    setTimeout(typeTitle, 1000);
  }
  
  // Parallax Effect
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(element => {
        const depth = element.getAttribute('data-depth') || 0.1;
        const moveX = mouseX * depth * 100;
        const moveY = mouseY * depth * 100;
        
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });
    
    // Also add parallax on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      
      document.querySelectorAll('.scroll-parallax').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
    
    // Add parallax data attributes to elements
    document.querySelector('header img').setAttribute('data-depth', '0.2');
    document.querySelector('header img').classList.add('parallax');
  }
  
  // Scroll Animations
  function initScrollAnimations() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update scroll progress
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
      
      // Fade in elements on scroll
      fadeInOnScroll();
      
      // Parallax header on scroll
      const header = document.querySelector('header');
      if (header) {
        header.style.backgroundPositionY = `${scrollTop * 0.5}px`;
      }
    });
    
    // Add fade classes to elements
    document.querySelectorAll('section').forEach((section, index) => {
      // Alternate animation direction for sections
      const direction = index % 2 === 0 ? 'fade-right' : 'fade-left';
      section.classList.add(direction);
      section.classList.add('hidden-section');
    });
    
    // Initial check for elements in viewport
    fadeInOnScroll();
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #0066cc, #33adff);
        z-index: 9999;
        width: 0%;
        transition: width 0.2s ease-out;
      }
      
      .hidden-section {
        opacity: 0;
        transition: all 1s ease;
      }
      
      .fade-left {
        transform: translateX(-50px);
      }
      
      .fade-right {
        transform: translateX(50px);
      }
      
      .fade-up {
        transform: translateY(50px);
      }
      
      .fade-visible {
        opacity: 1;
        transform: translate(0);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Fade in elements when they enter viewport
  function fadeInOnScroll() {
    const hiddenElements = document.querySelectorAll('.hidden-section');
    
    hiddenElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = window.innerHeight - 100;
      
      if (elementTop < elementVisible) {
        element.classList.add('fade-visible');
      }
    });
  }
  
  // 3D Hover Effect for Project Cards
  function initProjectCards3D() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const cardRect = card.getBoundingClientRect();
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        // Calculate rotation based on mouse position
        const angleY = -(cardX / cardRect.width - 0.5) * 20;
        const angleX = (cardY / cardRect.height - 0.5) * 20;
        
        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Dynamic shadow effect
        card.style.boxShadow = `
          ${-angleY/3}px ${angleX/3}px 20px rgba(0,0,0,0.2),
          0 10px 20px rgba(0,0,0,0.1)
        `;
        
        // Shine effect
        const shine = document.createElement('div');
        shine.classList.add('card-shine');
        shine.style.background = `radial-gradient(circle at ${cardX}px ${cardY}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
        
        // Remove any existing shine
        const existingShine = card.querySelector('.card-shine');
        if (existingShine) existingShine.remove();
        
        card.appendChild(shine);
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        
        // Remove shine effect
        const shine = card.querySelector('.card-shine');
        if (shine) shine.remove();
      });
      
      // Add transition for smooth animation
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .card-shine {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Skill Badges Animation
  function initSkillBadges() {
    const badges = document.querySelectorAll('.skill-badge');
    
    badges.forEach(badge => {
      // Add hover shimmer effect
      badge.addEventListener('mouseenter', () => {
        badge.classList.add('shimmer');
      });
      
      badge.addEventListener('mouseleave', () => {
        setTimeout(() => {
          badge.classList.remove('shimmer');
        }, 500);
      });
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .skill-badge {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .skill-badge:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 102, 204, 0.2);
      }
      
      .shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.5) 50%,
          rgba(255,255,255,0) 100%
        );
        transform: skewX(-20deg);
        animation: shimmer 1s forwards;
      }
      
      @keyframes shimmer {
        100% { left: 200%; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Timeline Animation
  function initTimelineAnimation() {
    const timelineDots = document.querySelectorAll('#experience .absolute.rounded-full');
    
    timelineDots.forEach(dot => {
      // Add pulsing effect
      dot.classList.add('timeline-pulse');
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .timeline-pulse {
        position: relative;
      }
      
      .timeline-pulse::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 102, 204, 0.3);
        animation: pulse 2s infinite;
        z-index: -1;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        70% { transform: scale(1.5); opacity: 0; }
        100% { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Animated Background for Hero Section
  function initHeroBackground() {
    const header = document.querySelector('header');
    
    // Create animated background
    const bgCanvas = document.createElement('div');
    bgCanvas.className = 'hero-canvas';
    header.insertBefore(bgCanvas, header.firstChild);
    
    // Add morphing blobs
    for (let i = 0; i < 3; i++) {
      const blob = document.createElement('div');
      blob.className = `hero-blob blob-${i+1}`;
      bgCanvas.appendChild(blob);
    }
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .hero-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
      }
      
      .hero-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.15;
        transform-origin: center;
        animation: blob-morph 25s ease-in-out infinite alternate;
      }
      
      .blob-1 {
        top: -15%;
        right: -15%;
        width: 50%;
        height: 50%;
        background: rgba(0, 102, 204, 0.7);
        animation-delay: 0s;
      }
      
      .blob-2 {
        bottom: -25%;
        left: -10%;
        width: 60%;
        height: 60%;
        background: rgba(51, 173, 255, 0.5);
        animation-delay: -5s;
      }
      
      .blob-3 {
        top: 30%;
        right: 20%;
        width: 45%;
        height: 45%;
        background: rgba(230, 126, 34, 0.4);
        animation-delay: -10s;
      }
      
      @keyframes blob-morph {
        0% {
          border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
        }
        25% {
          border-radius: 75% 25% 75% 25% / 25% 75% 25% 75%;
        }
        50% {
          border-radius: 25% 75% 25% 75% / 75% 25% 75% 25%;
        }
        75% {
          border-radius: 75% 25% 50% 50% / 25% 50% 75% 50%;
        }
        100% {
          border-radius: 50% 50% 25% 75% / 75% 25% 50% 50%;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Smooth Scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Add highlight effect to target section
        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => section.classList.remove('highlight-section'));
        
        if (targetElement.tagName === 'SECTION') {
          targetElement.classList.add('highlight-section');
        }
        
        // Smooth scroll with cubic-bezier curve for more natural movement
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      });
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .highlight-section {
        animation: section-highlight 2s ease;
      }
      
      @keyframes section-highlight {
        0% { box-shadow: 0 0 0 rgba(0, 102, 204, 0); }
        50% { box-shadow: 0 0 30px rgba(0, 102, 204, 0.2); }
        100% { box-shadow: 0 0 0 rgba(0, 102, 204, 0); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Mobile Menu
  function initMobileMenu() {
    const menuButton = document.querySelector('nav button');
    const menuItems = document.querySelector('nav .md\\:flex');
    
    if (!menuButton || !menuItems) return;
    
    // Create mobile nav container
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    document.body.appendChild(mobileNav);
    
    // Clone menu items
    const mobileMenu = menuItems.cloneNode(true);
    mobileMenu.classList.remove('md:flex', 'hidden');
    mobileMenu.classList.add('mobile-menu');
    mobileNav.appendChild(mobileMenu);
    
    // Toggle menu
    menuButton.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      
      // Toggle hamburger icon animation
      menuButton.classList.toggle('active');
      
      // Disable body scroll when menu is open
      if (mobileNav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking links
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuButton.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: 100vh;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        z-index: 1000;
        transition: right 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
      }
      
      .mobile-nav.open {
        right: 0;
      }
      
      .mobile-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 2rem;
      }
      
      .mobile-menu a {
        color: var(--secondary);
        font-size: 1.25rem;
        font-weight: 500;
        position: relative;
      }
      
      .mobile-menu a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--gradient-primary, linear-gradient(90deg, #0066cc, #33adff));
        transition: width 0.3s ease;
      }
      
      .mobile-menu a:hover::after {
        width: 100%;
      }
      
      /* Hamburger animation */
      nav button .fas.fa-bars {
        transition: transform 0.3s ease;
      }
      
      nav button.active .fas.fa-bars {
        transform: rotate(90deg);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Form Validation with Animations
  function initFormValidation() {
    const form = document.querySelector('#contact form');
    
    if (!form) return;
    
    // Add floating labels
    form.querySelectorAll('input, textarea').forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (label) {
        input.parentElement.classList.add('input-group');
        
        // Check for existing value
        input.addEventListener('input', () => {
          if (input.value.trim() !== '') {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        });
      }
    });
    
    // Animate submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add('submit-button');
      
      // Add loading effect on submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitButton.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
          submitButton.classList.remove('loading');
          submitButton.classList.add('success');
          
          submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          
          // Reset form
          setTimeout(() => {
            form.reset();
            submitButton.classList.remove('success');
            submitButton.innerHTML = 'Send Message';
            form.querySelectorAll('input, textarea').forEach(input => {
              input.classList.remove('has-value');
            });
          }, 3000);
        }, 2000);
      });
    }
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .input-group {
        position: relative;
        margin-bottom: 1.5rem;
      }
      
      .input-group input, .input-group textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
        background: transparent;
      }
      
      .input-group label {
        position: absolute;
        left: 1rem;
        top: 0.75rem;
        color: #718096;
        transition: all 0.3s ease;
        pointer-events: none;
        background: white;
        padding: 0 0.25rem;
      }
      
      .input-group input:focus,
      .input-group textarea:focus,
      .input-group input.has-value,
      .input-group textarea.has-value {
        border-color: #0066cc;
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
      }
      
      .input-group input:focus ~ label,
      .input-group textarea:focus ~ label,
      .input-group input.has-value ~ label,
      .input-group textarea.has-value ~ label {
        top: -0.5rem;
        left: 0.5rem;
        font-size: 0.75rem;
        color: #0066cc;
        font-weight: 600;
      }
      
      .submit-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .submit-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.2), rgba(255,255,255,0));
        transition: all 0.5s ease;
      }
      
      .submit-button:hover::before {
        left: 100%;
      }
      
      .submit-button.loading {
        background: #0066cc;
        pointer-events: none;
      }
      
      .submit-button.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top-color: white;
        border-radius: 50%;
        animation: button-loading 0.8s linear infinite;
      }
      
      .submit-button.success {
        background: #10b981;
      }
      
      @keyframes button-loading {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }