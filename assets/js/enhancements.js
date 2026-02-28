// my enhancements and interactive features

// welcome screen - matrix rain that converges into name
function showWelcomeScreen() {
    if (sessionStorage.getItem('welcomeSeen')) return;

    document.body.style.overflow = 'hidden';

    // Welcome screen sounds
    const ambience = new Audio('/assets/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav');
    ambience.volume = 0.25;
    const lockIn = new Audio('/assets/audio/mixkit-cybernetic-technology-affirmation-3116.wav');
    lockIn.volume = 0.35;

    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.style.cursor = 'pointer';

    const canvas = document.createElement('canvas');
    canvas.className = 'welcome-canvas';
    overlay.appendChild(canvas);

    const nameEl = document.createElement('div');
    nameEl.className = 'welcome-name';
    nameEl.innerHTML = '<span class="welcome-name-main">LEO CHANG</span><span class="welcome-name-sub">Portfolio</span>';
    overlay.appendChild(nameEl);

    // Hint to click
    const hint = document.createElement('div');
    hint.textContent = 'click anywhere';
    hint.style.cssText = 'position:absolute;bottom:40px;left:50%;transform:translateX(-50%);color:rgba(0,255,65,0.4);font-family:monospace;font-size:13px;letter-spacing:2px;animation:blinkCursor 1.2s ease infinite;z-index:10;';
    overlay.appendChild(hint);

    document.body.appendChild(overlay);

    const ctx = canvas.getContext('2d');
    let w, h, columns, drops;
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]=/\\|~^';
    const fontSize = 16;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / fontSize);
        drops = Array.from({ length: columns }, () => Math.random() * -50);
    }
    resize();

    // Wait for user click — start audio immediately, delay rain to sync
    // (the audio file has ~1.3s of silence at the start)
    overlay.addEventListener('pointerdown', function startAll() {
        overlay.removeEventListener('pointerdown', startAll);
        hint.style.display = 'none';
        overlay.style.cursor = '';
        ambience.play().catch(() => {});
        setTimeout(beginRain, 800);
    });

    function beginRain() {
    let rainStart = performance.now();
    const rainDuration = 2200;

    function drawRain(now) {
        ctx.fillStyle = 'rgba(11, 14, 17, 0.05)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < columns; i++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = Math.random() > 0.8 ? '#AAFFAA' : '#00FF41';
            ctx.fillText(char, x, y);

            if (y > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        if (now - rainStart < rainDuration) {
            requestAnimationFrame(drawRain);
        } else {
            // Fade out ambience when rain animation ends
            let vol = ambience.volume;
            const fadeOut = setInterval(() => {
                vol -= 0.03;
                if (vol <= 0) {
                    clearInterval(fadeOut);
                    ambience.pause();
                } else {
                    ambience.volume = vol;
                }
            }, 50);
            startConverge();
        }
    }

    requestAnimationFrame(drawRain);
    } // end beginRain

    function startConverge() {
        const targetText = 'LEO CHANG';
        const centerX = w / 2;
        const centerY = h / 2;
        const charSpacing = 38;
        const startX = centerX - ((targetText.length - 1) * charSpacing) / 2;

        const particles = [];
        for (let i = 0; i < targetText.length; i++) {
            particles.push({
                char: targetText[i],
                x: Math.random() * w,
                y: Math.random() * h,
                targetX: startX + i * charSpacing,
                targetY: centerY,
                locked: false,
                lockTime: 300 + i * 80
            });
        }

        const convergeStart = performance.now();
        const convergeDuration = 1200;

        function drawConverge(now) {
            const elapsed = now - convergeStart;
            const progress = Math.min(elapsed / convergeDuration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            ctx.fillStyle = 'rgba(11, 14, 17, 0.15)';
            ctx.fillRect(0, 0, w, h);

            ctx.font = 'bold 32px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (const p of particles) {
                const currentX = p.x + (p.targetX - p.x) * ease;
                const currentY = p.y + (p.targetY - p.y) * ease;

                if (elapsed > p.lockTime) {
                    p.locked = true;
                }

                const displayChar = p.locked ? p.char : matrixChars[Math.floor(Math.random() * matrixChars.length)];

                if (p.locked) {
                    ctx.shadowColor = '#00FF41';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = '#FFFFFF';
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = '#00FF41';
                }

                ctx.fillText(displayChar, currentX, currentY);
            }

            ctx.shadowBlur = 0;

            if (progress < 1 || !particles.every(p => p.locked)) {
                requestAnimationFrame(drawConverge);
            } else {
                setTimeout(() => {
                    // Play name sound when name appears
                    lockIn.play().catch(() => {});
                    canvas.style.opacity = '0';
                    nameEl.classList.add('visible');

                    setTimeout(() => {
                        overlay.classList.add('welcome-fade-out');
                        overlay.addEventListener('transitionend', () => {
                            overlay.remove();
                            document.body.style.overflow = '';
                            sessionStorage.setItem('welcomeSeen', 'true');
                        }, { once: true });
                    }, 900);
                }, 400);
            }
        }

        requestAnimationFrame(drawConverge);
    }

    window.addEventListener('resize', resize);
}

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

// setting up search functionality
function initSearch() {
    const searchData = [
        // my projects
        { title: 'NapkinNotes', description: 'AI-powered EdTech platform with OCR, Claude AI, social features, and admin panel', category: 'Projects', url: 'projects/napkinnote.html' },
        { title: 'Stock Price Prediction ML', description: 'LSTM models for stock prediction using sentiment analysis', category: 'Projects', url: 'projects/stockml.html' },

        // my experiences
        { title: 'Achievable Internship', description: 'Content Marketing Intern - Created educational blog posts', category: 'Experience', url: 'experiences.html' },
        { title: 'Mundial Financial Group', description: 'Website redesign and content strategy intern', category: 'Experience', url: 'experiences.html' },

        // my leadership
        { title: 'ObCHESSed Chess Club', description: 'Founded chess club with 20+ active members', category: 'Leadership', url: 'leadership.html' },
        { title: 'Ti-Ratana Welfare Society', description: 'Director of Partnered Educational Program', category: 'Leadership', url: 'leadership.html' },

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
        // skip cards handled by the spotlight+tilt effect
        if (card.classList.contains('stat-card') || card.classList.contains('endorsement-item')) return;

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
    showWelcomeScreen();
    initScrollAnimations();
    initSearch();
    initParallaxCards();
}

// initializing when dom is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
    initEnhancements();
}

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

// showing time-based greeting
function showTimeBasedGreeting() {
    // Check if greeting already exists to prevent duplicates
    if (document.querySelector('.time-based-greeting')) {
        return;
    }

    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) greeting = 'Good Morning! ☀️';
    else if (hour < 18) greeting = 'Good Afternoon! 👋';
    else greeting = 'Good Evening! 🌙';

    const greetingEl = document.createElement('div');
    greetingEl.className = 'time-based-greeting';
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

// ============================================================
// VISUAL EFFECTS — Features 1-5
// Desktop-only, respects prefers-reduced-motion
// ============================================================

function shouldSkipEffects() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile() {
    return window.innerWidth <= 768;
}

// --- Feature 1: Typing Animation on .brand-name ---

function initTypingAnimation() {
    if (shouldSkipEffects() || isMobile()) return;

    const brandName = document.querySelector('.brand-name');
    if (!brandName) return;

    const fullText = brandName.textContent.trim();
    brandName.textContent = '';
    brandName.classList.add('typing-active');

    function typeOut() {
        let i = 0;
        const interval = setInterval(() => {
            brandName.textContent += fullText[i];
            i++;
            if (i >= fullText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    brandName.classList.remove('typing-active');
                    brandName.classList.add('typing-done');
                }, 600);
            }
        }, 80);
    }

    // If welcome screen is active (first visit), delay until after it fades (~5s)
    if (!sessionStorage.getItem('welcomeSeen')) {
        setTimeout(typeOut, 5000);
    } else {
        setTimeout(typeOut, 500);
    }
}

// --- Feature 2: Staggered Card Entrance ---

function initStaggeredCards() {
    if (shouldSkipEffects()) return;

    const cards = document.querySelectorAll('.activity-card, .honor-card');
    if (!cards.length) return;

    cards.forEach(card => card.classList.add('card-hidden'));

    if (isMobile()) {
        // On mobile: opacity-only (transform: none set in CSS)
    }

    const observer = new IntersectionObserver((entries) => {
        // Collect newly intersecting cards per batch
        const visible = entries.filter(e => e.isIntersecting);
        visible.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.remove('card-hidden');
                entry.target.classList.add('card-visible');
            }, index * 100);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

// --- Feature 3: Spotlight + Tilt on Card Hover ---

function initSpotlightCards() {
    if (shouldSkipEffects() || isMobile()) return;

    const cards = document.querySelectorAll('.stat-card, .endorsement-item');

    // Wait for entrance animations to finish, then enable tilt
    // Longest entrance: 0.4s delay + 0.8s duration ≈ 1.2s, use 1.5s to be safe
    setTimeout(() => {
        cards.forEach(card => card.classList.add('tilt-enabled'));
    }, 1500);

    cards.forEach(card => {
        const spotlight = document.createElement('div');
        spotlight.className = 'card-spotlight';
        card.appendChild(spotlight);

        card.addEventListener('mousemove', (e) => {
            if (!card.classList.contains('tilt-enabled')) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Spotlight glow
            spotlight.style.background =
                `radial-gradient(circle 150px at ${x}px ${y}px, rgba(0, 136, 255, 0.12), transparent)`;

            // 3D tilt toward mouse
            card.classList.remove('tilt-reset');
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            card.style.boxShadow = '0 14px 40px rgba(0, 0, 0, 0.35)';
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            spotlight.style.background = '';
            if (!card.classList.contains('tilt-enabled')) return;

            // Spring-back with smooth transition
            card.classList.add('tilt-reset');
            card.style.transform = '';
            card.style.boxShadow = '';
        }, { passive: true });
    });
}

// --- Feature 4: Magnetic Buttons ---

function initMagneticButtons() {
    if (shouldSkipEffects() || isMobile()) return;

    const buttons = document.querySelectorAll('.sidebar-link, .tab-btn, .filter-tab');
    const strength = 0.3;
    const radius = 50;

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
            }
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        }, { passive: true });
    });
}

// --- Feature 5: Spotlight/Glow Cursor ---

function initCustomCursor() {
    if (shouldSkipEffects() || isMobile()) return;
    if ('ontouchstart' in window) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    const dot = document.createElement('div');
    dot.className = 'cursor-glow-dot';

    document.body.appendChild(glow);
    document.body.appendChild(dot);
    document.body.classList.add('glow-cursor-active');

    // Glow trails with lerp for a smooth, ambient feel
    let mouseX = -200, mouseY = -200;
    let glowX = -200, glowY = -200;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function animate() {
        glowX = lerp(glowX, mouseX, 0.12);
        glowY = lerp(glowY, mouseY, 0.12);
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const hoverSelector = 'a, button, .stat-card, .activity-card, .honor-card, .endorsement-item, .sidebar-link, .tab-btn, .filter-tab, input, textarea, .search-input';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        dot.classList.remove('cursor-hidden');
        glow.classList.remove('cursor-hidden');
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelector)) {
            glow.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelector)) {
            glow.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        glow.classList.add('cursor-hidden');
        dot.classList.add('cursor-hidden');
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
        glow.classList.remove('cursor-hidden');
        dot.classList.remove('cursor-hidden');
    }, { passive: true });
}

// ============================================================
// INIT — wire all visual effects into existing init blocks
// ============================================================

// --- Feature 6: UI Click Sound ---

function initClickSound() {
    if (isMobile()) return;
    if ('ontouchstart' in window) return;

    const audio = new Audio('/assets/audio/mixkit-modern-technology-select-3124.wav');
    audio.volume = 0.2;

    // Wait until welcome screen is gone before enabling click sounds
    function enableClickSound() {
        document.addEventListener('mousedown', () => {
            const sound = audio.cloneNode();
            sound.volume = 0.2;
            sound.play().catch(() => {});
        }, true);
    }

    if (sessionStorage.getItem('welcomeSeen')) {
        // No welcome screen — enable immediately
        enableClickSound();
    } else {
        // Wait for welcome screen to finish (overlay removes itself)
        const observer = new MutationObserver(() => {
            if (!document.querySelector('.welcome-overlay')) {
                observer.disconnect();
                enableClickSound();
            }
        });
        observer.observe(document.body, { childList: true });
    }
}

// --- Feature 7: Terminal Sound Effects ---

function initTerminalSounds() {
    if (isMobile()) return;

    const terminalInput = document.getElementById('terminalInput');
    if (!terminalInput) return;

    const typeSound = new Audio('/assets/audio/mixkit-single-key-type-2533.wav');
    typeSound.volume = 0.15;
    const enterSound = new Audio('/assets/audio/mixkit-sci-fi-interface-robot-click-901.wav');
    enterSound.volume = 0.3;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.repeat && e.key !== 'Backspace') return; // Skip held-down key repeats (except backspace)
        if (e.key === 'Enter') {
            const sound = enterSound.cloneNode();
            sound.volume = 0.3;
            sound.play().catch(() => {});
        } else if ((e.key === 'Backspace' && terminalInput.value.length > 0) || e.key.length === 1) {
            // Play for printable characters and backspace (not Shift, Ctrl, etc.)
            const sound = typeSound.cloneNode();
            sound.volume = 0.15;
            sound.play().catch(() => {});
        }
    }, true);
}

// ============================================================

function initVisualEffects() {
    initTypingAnimation();
    initStaggeredCards();
    initSpotlightCards();
    initMagneticButtons();
    initCustomCursor();
    initClickSound();
    initTerminalSounds();
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
    showTimeBasedGreeting();
    initVisualEffects();
}

// initializing on dom ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewEnhancements);
} else {
    initNewEnhancements();
}
