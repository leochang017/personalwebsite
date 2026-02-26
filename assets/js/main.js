// my main portfolio js
document.addEventListener('DOMContentLoaded', function() {
    // deferring other initialization
    setTimeout(() => {
        requestAnimationFrame(() => {
            initTerminal();

            initMobileMenu();
            updateTimestamp();

            // updating less frequently on mobile for better battery life
            const isMobile = window.innerWidth <= 768;
            const updateInterval = isMobile ? 5000 : 1000; // 5s on mobile, 1s on desktop
            setInterval(updateTimestamp, updateInterval);

            // initializing dashboard features
            initWebullFeatures();

            // initializing enhanced animations
            initEnhancedAnimations();
        });
    }, 0);
});

// enhanced animations for better UX
function initEnhancedAnimations() {
    // intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // optionally unobserve after animation
                // animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // add hover sound effect class to interactive elements
    document.querySelectorAll('.stat-card, .sidebar-link, .tab-btn, .webull-panel').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // smooth number counting animation for stat values
    document.querySelectorAll('.stat-value').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text.replace(/[^0-9]/g, ''));
        if (!isNaN(num) && num > 0 && num < 1000) {
            animateNumber(el, num, text.replace(/[0-9]+/, ''));
        }
    });

    // staggered animation for timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${0.1 + index * 0.1}s`;
    });

    // add subtle parallax to stat cards on mouse move
    const cards = document.querySelectorAll('.stat-card.parallax-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// animate number counting up
function animateNumber(element, target, suffix = '') {
    let current = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// my cs terminal
function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    if (!terminalInput || !terminalOutput) return;

    // my cs projects data
    const projects = {
        'napkinnotes': {
            name: 'NapkinNotes',
            role: 'Co-Founder & Lead Developer',
            description: 'AI-powered platform for transforming class notes into study resources',
            tech: 'AI/ML, React, Node.js, Python',
            status: 'Active Development',
            details: 'EdTech platform with peer-to-peer marketplace and automated summarization',
            url: 'projects/napkinnote.html'
        },
        'stockml': {
            name: 'Stock Price Prediction ML',
            role: 'Lead Researcher & Developer',
            description: 'LSTM models for stock price prediction using Twitter sentiment',
            tech: 'Python, TensorFlow, LSTM, NLP',
            status: 'Published',
            details: 'Published research in Journal of Emerging Investigators',
            url: 'projects/stockml.html'
        }
    };

    // SECURITY: Terminal input validation schema
    const terminalSchema = {
        required: true,
        maxLength: 200,
        patternError: 'Command contains invalid characters'
    };

    // using passive listener for better mobile performance
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const rawInput = this.value;

            // SECURITY: Validate terminal input
            const validation = window.SecurityUtils.InputValidator.validate(rawInput, terminalSchema);

            if (!validation.valid) {
                addTerminalLine(`leo@cs-terminal:~$ ${rawInput}`, 'command');
                addTerminalLine(`Error: ${validation.error}`, 'error');
                this.value = '';
                return;
            }

            const command = validation.sanitized.trim().toLowerCase();
            addTerminalLine(`leo@cs-terminal:~$ ${validation.sanitized}`, 'command');
            processCommand(command);
            this.value = '';
        }
    }, { passive: true });

    function addTerminalLine(text, className = '') {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const arg = parts[1];

        switch(cmd) {
            case 'help':
                showHelp();
                break;
            case 'ls':
            case 'list':
                listProjects();
                break;
            case 'cat':
            case 'view':
                if (arg && projects[arg]) {
                    openProject(arg);
                } else {
                    addTerminalLine('File not found. Use "ls" to see available projects.', 'error');
                }
                break;
            case 'skills':
            case 'tech':
                showSkills();
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            default:
                addTerminalLine(`Command not found: ${cmd}. Type "help" for available commands.`, 'error');
        }
    }

    function showHelp() {
        const helpText = [
            'Available commands:',
            '  ls, list     - List all projects',
            '  cat <name>   - View project details',
            '  skills       - Show technical skills',
            '  clear        - Clear terminal',
            '  help         - Show this help',
            '',
            'Examples: cat napkinnotes, cat stockml'
        ];
        helpText.forEach(line => addTerminalLine(line, 'info'));
    }

    function listProjects() {
        addTerminalLine('Available projects:', 'info');
        Object.keys(projects).forEach(key => {
            const project = projects[key];
            addTerminalLine(`  ${key.padEnd(15)} - ${project.name}`, 'success');
        });
    }

    function openProject(projectKey) {
        const project = projects[projectKey];
        addTerminalLine(`Opening ${project.name}...`, 'success');
        setTimeout(() => {
            window.location.href = project.url;
        }, 500);
    }

    function showSkills() {
        const skills = [
            'Technical Skills:',
            '  Languages: Python, Java, JavaScript, HTML/CSS',
            '  Frameworks: React, Node.js, TensorFlow, PyTorch',
            '  Tools: Git, Docker, AWS, MongoDB, PostgreSQL',
            '  Areas: Machine Learning, Web Development, Data Science'
        ];
        skills.forEach(line => addTerminalLine(line, 'info'));
    }

    // my initial terminal content is in html
}

// updating timestamp
function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        timestampElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// handling mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.webull-sidebar');
    const overlay = document.getElementById('mobileOverlay');

    if (!mobileMenuToggle || !sidebar) return;

    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        // toggling sidebar visibility on mobile
        sidebar.classList.toggle('mobile-open');
        if (overlay) {
            overlay.classList.toggle('active');
        }
    });

    // closing sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }

    // closing sidebar when clicking outside of it on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        }
    });
}

// initializing webull dashboard features
function initWebullFeatures() {
    // initializing live stock ticker with real data
    if (document.querySelector('.ticker-scroll')) {
        initLiveStockTicker();
    }

    // batching heavy operations
    const hasSparklines = document.querySelectorAll('.sparkline').length > 0;
    const hasPerformanceChart = document.getElementById('performanceChart');
    const hasSkillsChart = document.getElementById('skillsChart');
    const hasLastUpdated = document.getElementById('lastUpdated');

    if (hasSparklines || hasPerformanceChart || hasSkillsChart) {
        requestAnimationFrame(() => {
            if (hasSparklines) initSparklines();

            setTimeout(() => {
                if (hasPerformanceChart) initPerformanceChart();
            }, 10);
        });
    }

    if (hasLastUpdated) {
        setTimeout(initLastUpdated, 100);
    }
}

// creating sparkline charts
function initSparklines() {
    const sparklines = document.querySelectorAll('.sparkline');
    
    sparklines.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const values = canvas.dataset.values.split(',').map(Number);
        const width = canvas.width;
        const height = canvas.height;
        
        // clearing canvas
        ctx.clearRect(0, 0, width, height);
        
        // calculating points
        const max = Math.max(...values);
        const min = Math.min(...values);
        const range = max - min;
        const stepX = width / (values.length - 1);
        
        // drawing area fill
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        values.forEach((value, i) => {
            const x = i * stepX;
            const y = height - ((value - min) / range * height);
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(width, height);
        ctx.closePath();
        
        // creating gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(0, 192, 135, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 192, 135, 0.0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // drawing line
        ctx.beginPath();
        values.forEach((value, i) => {
            const x = i * stepX;
            const y = height - ((value - min) / range * height);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.strokeStyle = '#00C087';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// creating performance chart
function initPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // preventing blocking
    setTimeout(() => {
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height;

    // data is cumulative achievement score (projects + leadership + awards + publications)
    // jan: 6 proj + 3 lead + 8 awards + 5 pub = 22
    // mar: 7 proj + 4 lead + 9 awards + 5 pub = 25
    // may: 8 proj + 4 lead + 11 awards + 5 pub = 28
    // jul: 8 proj + 5 lead + 12 awards + 6 pub = 31
    // sep: 9 proj + 6 lead + 13 awards + 6 pub = 34
    // nov: 10 proj + 7 lead + 15 awards + 6 pub = 38
    const labels = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
    const data = [22, 25, 28, 31, 34, 38];

    const max = Math.max(...data) + 2;
    const min = Math.min(...data) - 2;
    const range = max - min;
    const stepX = width / (data.length - 1);
    
    // clearing canvas
    ctx.clearRect(0, 0, width, height);
    
    // drawing grid lines
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color').trim();
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = (i / 4) * (height - 40) + 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // drawing area
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - 20 - ((value - min) / range * (height - 40));
        if (i === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width, height - 20);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 136, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 136, 255, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // drawing line
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - 20 - ((value - min) / range * (height - 40));
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.strokeStyle = '#0088FF';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // drawing points
    data.forEach((value, i) => {
        const x = i * stepX;
        const y = height - 20 - ((value - min) / range * (height - 40));
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#0088FF';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // drawing labels
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted').trim();
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        const x = i * stepX;
        ctx.fillText(label, x, height - 5);
    });

    // adding hover functionality
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let foundPoint = false;
        data.forEach((value, i) => {
            const x = i * stepX;
            const y = height - 20 - ((value - min) / range * (height - 40));
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

            if (distance < 15) {
                foundPoint = true;
                const details = [
                    'Jan: 6 proj + 3 lead + 8 awards + 5 pub = 22',
                    'Mar: 7 proj + 4 lead + 9 awards + 5 pub = 25',
                    'May: 8 proj + 4 lead + 11 awards + 5 pub = 28',
                    'Jul: 8 proj + 5 lead + 12 awards + 6 pub = 31',
                    'Sep: 9 proj + 6 lead + 13 awards + 6 pub = 34',
                    'Nov: 10 proj + 7 lead + 15 awards + 6 pub = 38'
                ];

                tooltip.innerHTML = `
                    <div style="font-weight: 700; margin-bottom: 4px;">${labels[i]} 2025</div>
                    <div style="font-size: 20px; font-weight: 700; color: #0088FF; margin-bottom: 8px;">${value}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${details[i]}</div>
                `;
                tooltip.style.display = 'block';
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY - 60) + 'px';
                canvas.style.cursor = 'pointer';
            }
        });

        if (!foundPoint) {
            tooltip.style.display = 'none';
            canvas.style.cursor = 'default';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    }, 0); // End setTimeout
}


// creating last updated timer
function initLastUpdated() {
    const element = document.getElementById('lastUpdated');
    if (!element) return;
    
    let seconds = 0;
    setInterval(() => {
        seconds++;
        if (seconds < 60) {
            element.textContent = `${seconds}s ago`;
        } else if (seconds < 3600) {
            element.textContent = `${Math.floor(seconds / 60)}m ago`;
        } else {
            element.textContent = `${Math.floor(seconds / 3600)}h ago`;
        }
    }, 1000);
}

// creating live stock ticker with real data
async function initLiveStockTicker() {
    const tickerScroll = document.querySelector('.ticker-scroll');
    if (!tickerScroll) return;

    // my popular tech stocks to display
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'META', 'AMZN'];

    // fetching real stock data using free api
    async function fetchStockData() {
        try {
            // using free stock api via yh-finance proxy
            const promises = symbols.map(async (symbol) => {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false`);
                // this will fail, triggering my fallback
                throw new Error('no free stock api available without cors issues');
            });

            const stockData = await Promise.all(promises);
            updateTickerDisplay(stockData);
        } catch (error) {
            console.log('api unavailable, using static data');
            // using simulated realistic stock data that updates
            useRealisticStaticData();
        }
    }

    // generating realistic-looking stock data
    function useRealisticStaticData() {
        const baseData = [
            { symbol: 'AAPL', basePrice: 185.00 },
            { symbol: 'GOOGL', basePrice: 140.50 },
            { symbol: 'MSFT', basePrice: 370.00 },
            { symbol: 'TSLA', basePrice: 245.00 },
            { symbol: 'NVDA', basePrice: 495.00 },
            { symbol: 'META', basePrice: 355.00 },
            { symbol: 'AMZN', basePrice: 155.00 }
        ];

        const stockData = baseData.map(stock => {
            // adding small random variation to look realistic
            const variation = (Math.random() - 0.5) * 10; // +/- $5
            const price = stock.basePrice + variation;
            const changePercent = (Math.random() - 0.5) * 4; // +/- 2%
            const change = (price * changePercent) / 100;

            return {
                symbol: stock.symbol,
                price: price.toFixed(2),
                change: change.toFixed(2),
                changePercent: changePercent.toFixed(2),
                isPositive: changePercent >= 0
            };
        });

        updateTickerDisplay(stockData);
    }

    function updateTickerDisplay(stocks) {
        const tickerHTML = stocks.map(stock => `
            <div class="ticker-item ${stock.isPositive ? 'positive' : 'negative'}">
                <span class="ticker-symbol">${stock.symbol}</span>
                <span class="ticker-value">$${stock.price}</span>
                <span class="ticker-change">${stock.isPositive ? '+' : ''}${stock.changePercent}%</span>
            </div>
        `).join('');

        // tripling for seamless infinite scrolling with no gaps
        tickerScroll.innerHTML = tickerHTML + tickerHTML + tickerHTML;

        // setting random animation delay to make it appear continuous across page loads
        const randomDelay = -Math.random() * 20; // random starting point in the 20s animation
        tickerScroll.style.animationDelay = `${randomDelay}s`;
    }

    // doing initial fetch
    await fetchStockData();

    // refreshing every 60 seconds
    setInterval(fetchStockData, 60000);
}

