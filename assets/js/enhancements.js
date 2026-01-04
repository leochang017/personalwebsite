// my enhancements and interactive features

// initializing scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // observing elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });
}

// creating particle effects - reduced for mobile performance
function initParticles() {
    // disabling particles on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    // using fewer particles for better performance
    const particleCount = 25;
    const isMinecraft = document.body.classList.contains('minecraft-theme');

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = isMinecraft ? 'particle block' : 'particle star';

        // setting random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // setting random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // setting random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        container.appendChild(particle);
    }
}


// setting up search functionality
function initSearch() {
    const searchData = [
        // my projects
        { title: 'NapkinNotes', description: 'AI-powered EdTech platform for student note-taking', category: 'Projects', url: 'projects/napkinnote.html' },
        { title: 'Stock Price Prediction ML', description: 'LSTM models for stock prediction using sentiment analysis', category: 'Projects', url: 'projects/stockml.html' },

        // my experiences
        { title: 'Achievable Internship', description: 'Content Marketing Intern - Created educational blog posts', category: 'Experience', url: 'experiences.html' },
        { title: 'Mundial Financial Group', description: 'Website redesign and content strategy intern', category: 'Experience', url: 'experiences.html' },

        // my leadership
        { title: 'ObCHESSed Chess Club', description: 'Founded chess club with 20+ active members', category: 'Leadership', url: 'leadership.html' },
        { title: 'Ti-Ratana Buddhist Society', description: 'Founded youth division with 30+ members', category: 'Leadership', url: 'leadership.html' },

        // my achievements
        { title: 'PClassic 1st Place', description: 'UPenn programming competition Fall 2024', category: 'Achievements', url: 'achievements.html' },
        { title: 'NEC 4th Place', description: 'National Economics Challenge 2024', category: 'Achievements', url: 'achievements.html' },
        { title: 'JEI Publication', description: 'Research published in Journal of Emerging Investigators', category: 'Achievements', url: 'achievements.html' }
    ];

    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput || !searchResults) return;

    // SECURITY: Define search input schema
    const searchSchema = {
        required: false,
        minLength: 2,
        maxLength: 100,
        patternError: 'Search contains invalid characters'
    };

    // debouncing search input for better performance on mobile
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            // SECURITY: Validate search input
            const validation = window.SecurityUtils.InputValidator.validate(
                query,
                searchSchema
            );

            if (!validation.valid) {
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <div class="search-result-title">Invalid search: ${validation.error}</div>
                    </div>
                `;
                searchResults.classList.add('active');
                return;
            }

            const sanitizedQuery = validation.sanitized;

            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(sanitizedQuery) ||
                item.description.toLowerCase().includes(sanitizedQuery) ||
                item.category.toLowerCase().includes(sanitizedQuery)
            );

            if (filtered.length > 0) {
                // SECURITY: Sanitize URLs to prevent javascript: protocol
                searchResults.innerHTML = filtered.map(item => {
                    const safeUrl = item.url.startsWith('http') || item.url.startsWith('/') || item.url.match(/^[a-zA-Z0-9-_\/\.]+\.html$/)
                        ? item.url
                        : '#';

                    return `
                        <div class="search-result-item" onclick="window.location.href='${safeUrl}'">
                            <div class="search-result-title">${highlightText(item.title, sanitizedQuery)}</div>
                            <div class="search-result-description">${highlightText(item.description, sanitizedQuery)}</div>
                            <span class="search-result-category">${item.category}</span>
                        </div>
                    `;
                }).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
                searchResults.classList.add('active');
            }
        }, 150); // debouncing by 150ms
    });

    // closing search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    }, { passive: true });
}

function highlightText(text, query) {
    // SECURITY: Escape regex special characters to prevent ReDoS
    const escapedQuery = window.SecurityUtils.InputValidator.escapeRegex(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    // SECURITY: Sanitize both text and query before highlighting
    const sanitizedText = window.SecurityUtils.HTMLSanitizer.textOnly(text);

    return sanitizedText.replace(regex, '<strong style="color: var(--primary)">$1</strong>');
}







// showing toast notifications
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gray-800);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-xl);
        z-index: 100000;
        animation: slideUp 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}


// adding parallax effect - disabled on mobile for performance
function initParallaxCards() {
    // skipping parallax on mobile since it's not useful and hurts performance
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    document.querySelectorAll('.parallax-card').forEach(card => {
        // using passive listeners for better scroll performance
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }, { passive: true });
    });
}

// initializing all my enhancements
function initEnhancements() {
    initScrollAnimations();
    initParticles();
    initSearch();
    initParallaxCards();
}

// initializing when dom is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
    initEnhancements();
}

// reinitializing particles on theme change
document.addEventListener('themeChanged', () => {
    const existingContainer = document.querySelector('.particles-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    initParticles();
});

/* my new enhancements */

// adding page load animation
function initPageLoad() {
    // adding loaded class for fade-in
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}


// making stat cards clickable
function initClickableStatCards() {
    document.querySelectorAll('.stat-card').forEach(card => {
        const label = card.querySelector('.stat-label');
        if (!label) return;

        const labelText = label.textContent;
        let targetUrl = '';

        if (labelText.includes('Projects') || labelText.includes('PROJ')) {
            targetUrl = 'cs-projects.html';
        } else if (labelText.includes('Leadership') || labelText.includes('LEAD') || labelText.includes('Roles')) {
            targetUrl = 'leadership.html';
        } else if (labelText.includes('Award') || labelText.includes('Achievement') || labelText.includes('AWRD')) {
            targetUrl = 'achievements.html';
        } else if (labelText.includes('Experience') || labelText.includes('Positions')) {
            targetUrl = 'experiences.html';
        } else if (labelText.includes('Volunteer') || labelText.includes('VOL')) {
            targetUrl = 'leadership.html';
        }

        if (targetUrl) {
            card.classList.add('clickable');
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.location.href = targetUrl;
            });
            card.setAttribute('title', `Click to view ${labelText}`);
        }
    });
}


// adding ripple effect on buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .sidebar-link, .tab-btn');
    buttons.forEach(btn => {
        if (!btn.classList.contains('ripple')) {
            btn.classList.add('ripple');
        }
    });
}

// adding real-time clock
function initRealTimeClock() {
    const marketStatus = document.querySelector('.market-status');
    if (marketStatus) {
        const timeElement = document.createElement('div');
        timeElement.className = 'live-time';
        timeElement.style.cssText = 'font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;';

        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = `Last Updated: ${timeString}`;
        }

        updateTime();
        setInterval(updateTime, 1000);
        marketStatus.appendChild(timeElement);
    }
}

// tracking resume downloads
function initResumeTracking() {
    document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            const count = parseInt(localStorage.getItem('resumeDownloadCount') || '0') + 1;
            localStorage.setItem('resumeDownloadCount', count.toString());
        });
    });
}



// i removed achievement system per user request

// showing toast notifications
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-message">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// adding scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// adding back to top button
function initBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// adding minecraft click effects
function initMinecraftEffects() {
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('minecraft-theme')) return;

        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.cssText = `
            position: fixed;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            width: 20px;
            height: 20px;
            background: #8B4513;
            border: 2px solid #654321;
            pointer-events: none;
        `;
        document.body.appendChild(effect);

        // creating particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'minecraft-particle';
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                background: ${['#8B4513', '#654321', '#A0522D'][Math.floor(Math.random() * 3)]};
            `;
            document.body.appendChild(particle);

            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }

        setTimeout(() => effect.remove(), 600);
    });
}

// showing time-based greeting
function showTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) greeting = 'Good Morning! ☀️';
    else if (hour < 18) greeting = 'Good Afternoon! 👋';
    else greeting = 'Good Evening! 🌙';

    const greetingEl = document.createElement('div');
    greetingEl.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        color: white;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 20px;
        margin-left: 10px;
    `;
    greetingEl.textContent = greeting;

    const container = document.querySelector('.webull-container');
    if (container && container.firstChild) {
        container.insertBefore(greetingEl, container.firstChild.nextSibling);
    }
}

// initializing all my new enhancements
function initNewEnhancements() {
    initPageLoad();
    initClickableStatCards();
    initRippleEffect();
    initRealTimeClock();
    initResumeTracking();
    initScrollProgress();
    initBackToTop();
    initMinecraftEffects();
    showTimeBasedGreeting();
}

// initializing on dom ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewEnhancements);
} else {
    initNewEnhancements();
}
