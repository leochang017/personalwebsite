// scroll animations
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

    // observe elements
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });
}

// particle effects
function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    const particleCount = 50;
    const isMinecraft = document.body.classList.contains('minecraft-theme');

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = isMinecraft ? 'particle block' : 'particle star';

        // random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        container.appendChild(particle);
    }
}

// custom cursor - disabled, was annoying with minecraft theme
function initCustomCursor() {
    // document.body.classList.add('custom-cursor');
}

// search functionality
function initSearch() {
    const searchData = [
        // projects data
        { title: 'NapkinNotes', description: 'AI-powered EdTech platform for student note-taking', category: 'Projects', url: 'projects/napkinnote.html' },
        { title: 'Stock Price Prediction ML', description: 'LSTM models for stock prediction using sentiment analysis', category: 'Projects', url: 'projects/stockml.html' },

        // experiences data
        { title: 'Achievable Internship', description: 'Content Marketing Intern - Created educational blog posts', category: 'Experience', url: 'experiences.html' },
        { title: 'Mundial Financial Group', description: 'Website redesign and content strategy intern', category: 'Experience', url: 'experiences.html' },

        // leadership data
        { title: 'ObCHESSed Chess Club', description: 'Founded chess club with 20+ active members', category: 'Leadership', url: 'leadership.html' },
        { title: 'Ti-Ratana Buddhist Society', description: 'Founded youth division with 30+ members', category: 'Leadership', url: 'leadership.html' },

        // achievements data
        { title: 'PClassic 1st Place', description: 'UPenn programming competition Fall 2024', category: 'Achievements', url: 'achievements.html' },
        { title: 'NEC 4th Place', description: 'National Economics Challenge 2024', category: 'Achievements', url: 'achievements.html' },
        { title: 'JEI Publication', description: 'Research published in Journal of Emerging Investigators', category: 'Achievements', url: 'achievements.html' }
    ];

    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item => `
                <div class="search-result-item" onclick="window.location.href='${item.url}'">
                    <div class="search-result-title">${highlightText(item.title, query)}</div>
                    <div class="search-result-description">${highlightText(item.description, query)}</div>
                    <span class="search-result-category">${item.category}</span>
                </div>
            `).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
            searchResults.classList.add('active');
        }
    });

    // close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary)">$1</strong>');
}

// lazy loading images
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// share functionality
function shareOn(platform, url, title) {
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    if (platform === 'link') {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
        });
    } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// export to pdf using browser print
async function exportToPDF() {
    window.print();
}

// contact form validation
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = form.querySelector('[name="name"]');
        const emailInput = form.querySelector('[name="email"]');
        const messageInput = form.querySelector('[name="message"]');

        let isValid = true;

        // validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            // submit the form
            const submitBtn = form.querySelector('.form-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // simulate sending (replace with actual form submission)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                form.reset();
                showSuccess('Message sent successfully!');
            }, 1500);
        }
    });
}

function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
    }
}

function clearError(input) {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
        errorEl.classList.remove('visible');
    }
}

function showSuccess(message) {
    const successEl = document.querySelector('.form-success');
    if (successEl) {
        successEl.textContent = message;
        successEl.classList.add('visible');
        setTimeout(() => {
            successEl.classList.remove('visible');
        }, 5000);
    }
}

// github stats
async function loadGitHubStats(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        return {
            repos: data.public_repos,
            followers: data.followers,
            following: data.following
        };
    } catch (error) {
        return null; // failed to load
    }
}

function displayGitHubStats(stats) {
    const container = document.querySelector('.github-stats');
    if (!container || !stats) return;

    container.innerHTML = `
        <div class="github-stat-card">
            <div class="github-stat-icon"><i class="fab fa-github"></i></div>
            <div class="github-stat-value">${stats.repos}</div>
            <div class="github-stat-label">Public Repos</div>
        </div>
        <div class="github-stat-card">
            <div class="github-stat-icon"><i class="fas fa-users"></i></div>
            <div class="github-stat-value">${stats.followers}</div>
            <div class="github-stat-label">Followers</div>
        </div>
        <div class="github-stat-card">
            <div class="github-stat-icon"><i class="fas fa-user-plus"></i></div>
            <div class="github-stat-value">${stats.following}</div>
            <div class="github-stat-label">Following</div>
        </div>
    `;
}

// code copy functionality
function initCodeCopy() {
    document.querySelectorAll('.code-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.closest('.code-snippet').querySelector('code');
            const text = codeBlock.textContent;

            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// keyboard shortcuts
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ctrl/cmd + k for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.focus();
        }

        // escape to close
        if (e.key === 'Escape') {
            document.querySelector('.search-results')?.classList.remove('active');
        }
    });
}

// parallax effect
function initParallaxCards() {
    document.querySelectorAll('.parallax-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// initialize all enhancements
function initEnhancements() {
    initScrollAnimations();
    initParticles();
    initCustomCursor();
    initSearch();
    initLazyLoading();
    initContactForm();
    initCodeCopy();
    initKeyboardNavigation();
    initParallaxCards();

    // load github stats
    const githubUsername = 'leochang250';
    if (document.querySelector('.github-stats')) {
        loadGitHubStats(githubUsername).then(stats => {
            if (stats) displayGitHubStats(stats);
        });
    }
}

// init when dom ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
    initEnhancements();
}

// reinit particles on theme change
document.addEventListener('themeChanged', () => {
    const existingContainer = document.querySelector('.particles-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    initParticles();
});

// page load animation
function initPageLoad() {
    // add loaded class
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// page transitions disabled

// clickable stat cards
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

// enhanced keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ctrl+number for navigation
        if (e.ctrlKey || e.metaKey) {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 6) {
                e.preventDefault();
                const links = document.querySelectorAll('.sidebar-link');
                if (links[num - 1]) {
                    window.location.href = links[num - 1].href;
                }
            }
        }

        // ctrl+p for print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }

        // ctrl+d for dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const darkModeBtn = document.querySelector('.dark-mode-toggle');
            if (darkModeBtn) darkModeBtn.click();
        }

        // ctrl+m for minecraft theme
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            const themeBtn = document.querySelector('.theme-toggle-btn');
            if (themeBtn) themeBtn.click();
        }
    });
}

// ripple effect on buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .sidebar-link, .tab-btn');
    buttons.forEach(btn => {
        if (!btn.classList.contains('ripple')) {
            btn.classList.add('ripple');
        }
    });
}

// real-time clock
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

// resume download tracking
function initResumeTracking() {
    document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            const count = parseInt(localStorage.getItem('resumeDownloadCount') || '0') + 1;
            localStorage.setItem('resumeDownloadCount', count.toString());
        });
    });
}

// skills chart animation
function initSkillsChart() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.dataset.width;
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 100);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// project filtering
function initProjectFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const statusFilter = document.getElementById('statusFilter');

    // tech filter functionality
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // filter projects by tech tag
        });
    });

    // project status filter
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            // filter projects by status
        });
    }
}

// achievement system
const achievements = {
    firstVisit: { icon: '🎉', title: 'Welcome!', description: 'First visit to the portfolio' },
    explorer: { icon: '🗺️', title: 'Explorer', description: 'Visited all pages' },
    resumeDownload: { icon: '📄', title: 'Resume Downloaded', description: 'Downloaded the resume' },
    konamiMaster: { icon: '🎮', title: 'Konami Master', description: 'Found the secret code!' },
    darkModeUser: { icon: '🌙', title: 'Night Owl', description: 'Enabled dark mode' },
    minecraftFan: { icon: '⛏️', title: 'Miner', description: 'Switched to Minecraft theme' }
};

function showAchievement(achievementKey) {
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (unlocked.includes(achievementKey)) return;

    unlocked.push(achievementKey);
    localStorage.setItem('achievements', JSON.stringify(unlocked));

    const achievement = achievements[achievementKey];
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
            <h4>Achievement Unlocked!</h4>
            <p><strong>${achievement.title}:</strong> ${achievement.description}</p>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// toast notifications
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

// scroll progress indicator
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

// back to top button
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

// minecraft click effects - disabled, too distracting
function initMinecraftEffects() {
    // click particle effects removed
    /*
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

        // create particles
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
    */
}

// page visit tracking
function trackPageVisits() {
    const visited = JSON.parse(localStorage.getItem('pagesVisited') || '[]');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    if (!visited.includes(currentPage)) {
        visited.push(currentPage);
        localStorage.setItem('pagesVisited', JSON.stringify(visited));

        // check if explorer achievement unlocked
        const mainPages = ['dashboard.html', 'cs-projects.html', 'experiences.html', 'leadership.html', 'achievements.html', 'about.html'];
        if (mainPages.every(page => visited.includes(page))) {
            showAchievement('explorer');
        }
    }

    // first visit achievement
    if (!localStorage.getItem('hasVisited')) {
        localStorage.setItem('hasVisited', 'true');
        setTimeout(() => showAchievement('firstVisit'), 1000);
    }
}

// konami code easter egg
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiEasterEgg() {
    showAchievement('konamiMaster');
    showToast('🎮 KONAMI CODE ACTIVATED! You found the secret!', 'success', 4000);
}

// track dark mode achievement
function enhanceDarkModeToggle() {
    const darkModeBtn = document.querySelector('.dark-mode-toggle-btn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (document.body.classList.contains('dark-mode')) {
                    showAchievement('darkModeUser');
                }
            }, 100);
        });
    }
}

// resume download achievement
function enhanceResumeDownload() {
    document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            showAchievement('resumeDownload');
        });
    });
}

// time-based greeting
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

// theme toggle achievement
function enhanceThemeToggle() {
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (document.body.classList.contains('minecraft-theme')) {
                    showAchievement('minecraftFan');
                }
            }, 100);
        });
    }
}

// init all new enhancements
function initNewEnhancements() {
    initPageLoad();
    initClickableStatCards();
    initKeyboardShortcuts();
    initRippleEffect();
    initRealTimeClock();
    initResumeTracking();
    initSkillsChart();
    initProjectFilters();
    initScrollProgress();
    initBackToTop();
    initMinecraftEffects();
    showTimeBasedGreeting();
    trackPageVisits();
    enhanceDarkModeToggle();
    enhanceResumeDownload();
    enhanceThemeToggle();
    initKonamiCode();
}

// init on dom ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewEnhancements);
} else {
    initNewEnhancements();
}
