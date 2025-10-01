// Clean JavaScript for multi-page portfolio
document.addEventListener('DOMContentLoaded', function() {
    initTerminal();
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
    initThemeToggle();

    // Load theme preference for all pages
    loadThemePreference();
});

// CS-focused terminal
function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    if (!terminalInput || !terminalOutput) return;

    // CS Projects data
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

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            addTerminalLine(`leo@cs-terminal:~$ ${this.value}`, 'command');
            processCommand(command);
            this.value = '';
        }
    });

    function addTerminalLine(text, className = '') {
        if (!terminalOutput) return; // Safety check
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
            window.open(project.url, '_blank');
        }, 500);
    }

    function showSkills() {
        const skills = [
            'Technical Skills:',
            '  Languages: Python, Java, JavaScript, C++, SQL',
            '  Frameworks: React, Node.js, TensorFlow, PyTorch',
            '  Tools: Git, Docker, AWS, MongoDB, PostgreSQL',
            '  Areas: Machine Learning, Web Development, Data Science'
        ];
        skills.forEach(line => addTerminalLine(line, 'info'));
    }

    // Initial content already in HTML
}

// Update timestamp
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

// Theme Toggle System
function initThemeToggle() {
    // Create theme toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = 'MINECRAFT';
    toggleButton.setAttribute('aria-label', 'Toggle between Stock Market and Minecraft themes');

    // Add click event
    toggleButton.addEventListener('click', toggleTheme);

    // Add to navigation
    const navLinks = document.querySelector('.nav-links');

    if (navLinks) {
        navLinks.appendChild(toggleButton);
    } else {
        // Fallback to body if navbar not found
        document.body.appendChild(toggleButton);
    }

    // Add keyboard shortcut (Ctrl/Cmd + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const toggleButton = document.querySelector('.theme-toggle');

    // Create transition overlay
    const transition = document.createElement('div');
    transition.className = 'game-transition';
    transition.innerHTML = 'LOADING...';
    document.body.appendChild(transition);

    // Show transition
    setTimeout(() => {
        transition.classList.add('active');
    }, 10);

    // Switch theme after transition
    setTimeout(() => {
        if (body.classList.contains('minecraft-theme')) {
            // Switch to Stock Market theme
            deactivateMinecraftTheme();
            playThemeSound('stock');
            localStorage.setItem('theme', 'stock');
            transition.innerHTML = 'MARKET LOADED';
        } else {
            // Switch to Minecraft theme
            activateMinecraftTheme();
            playThemeSound('minecraft');
            localStorage.setItem('theme', 'minecraft');
            transition.innerHTML = 'WORLD LOADED!';
        }

        // Hide transition
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(transition);
            }, 500);
        }, 800);
    }, 500);
}

function loadMinecraftCSS() {
    if (document.getElementById('minecraft-theme-css')) return;

    const link = document.createElement('link');
    link.id = 'minecraft-theme-css';
    link.rel = 'stylesheet';
    link.href = 'assets/css/minecraft-theme.css';
    document.head.appendChild(link);
}

function removeMinecraftCSS() {
    const minecraftCSS = document.getElementById('minecraft-theme-css');
    if (minecraftCSS) {
        minecraftCSS.remove();
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'minecraft') {
        activateMinecraftTheme();
    }
}

function activateMinecraftTheme() {
    document.body.classList.add('minecraft-theme');
    document.documentElement.classList.add('minecraft-theme');
    loadMinecraftCSS();

    // Start music immediately
    setTimeout(() => {
        playMinecraftMusic();
    }, 500);

    // Check if we navigated from a server connection
    const navigationTarget = localStorage.getItem('minecraft-navigation');
    if (navigationTarget) {
        localStorage.removeItem('minecraft-navigation');

        // Wait for CSS to load, then show Minecraft-styled content
        setTimeout(() => {
            showMinecraftContent(navigationTarget);
        }, 200);
    } else {
        // Show Minecraft main menu
        showMinecraftMainMenu();
    }

    // Update toggle button
    setTimeout(() => {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = 'QUIT GAME';
        }
    }, 100);
}

function showMinecraftMainMenu() {
    // Hide all original stock market content
    hideStockMarketContent();

    // Create animated panorama background
    const panorama = document.createElement('div');
    panorama.className = 'minecraft-panorama';
    document.body.appendChild(panorama);

    // Create Minecraft main menu
    const mainMenu = document.createElement('div');
    mainMenu.className = 'minecraft-main-menu';
    mainMenu.innerHTML = `
        <div class="minecraft-logo">LEO CHANG</div>
        <div class="minecraft-menu-buttons">
            <button class="minecraft-button" id="singleplayer-btn">Singleplayer</button>
            <button class="minecraft-button" id="multiplayer-btn">Multiplayer</button>
            <button class="minecraft-button" id="options-btn">Options...</button>
            <button class="minecraft-button" id="quit-btn">Quit Game</button>
        </div>
        <div class="minecraft-subtitle">
            Minecraft 1.21.50<br/>
            Not affiliated with Mojang or Microsoft
        </div>
    `;

    document.body.appendChild(mainMenu);

    // Add event listeners to buttons with click sounds
    document.getElementById('singleplayer-btn').addEventListener('click', () => { playClickSound(); openSingleplayer(); });
    document.getElementById('multiplayer-btn').addEventListener('click', () => { playClickSound(); openMultiplayer(); });
    document.getElementById('options-btn').addEventListener('click', () => { playClickSound(); openOptions(); });
    document.getElementById('quit-btn').addEventListener('click', () => { playClickSound(); quitGame(); });

    // Create music controls only if they don't exist
    if (!document.querySelector('.minecraft-music')) {
        createMusicControls();
    }

    // Create server list (hidden initially)
    createServerList();

    // Create options menu (hidden initially)
    createOptionsMenu();

    // Create singleplayer world (hidden initially)
    createSingleplayerWorld();

    // Start background music
    playMinecraftMusic();

    // Add click sound to all minecraft buttons
    addClickSoundsToButtons();
}

function addClickSoundsToButtons() {
    // Add click sounds to all minecraft buttons
    setTimeout(() => {
        document.querySelectorAll('.minecraft-button, .server-item, .option-button').forEach(button => {
            button.addEventListener('click', playClickSound);
        });
    }, 100);
}

function playClickSound() {
    if (!soundEffectsEnabled) return;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not available
    }
}

function hideStockMarketContent() {
    // Hide all original content when showing Minecraft UI
    const elementsToHide = [
        'nav.navbar',
        'main',
        '.container',
        '.section'
    ];

    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
            }
        });
    });
}

function showStockMarketContent() {
    // Show all original content when returning to stock market theme
    const elementsToShow = [
        'nav.navbar',
        'main',
        '.container',
        '.section'
    ];

    elementsToShow.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.style.display = '';
                element.style.visibility = '';
            }
        });
    });
}

function createServerList() {
    const serverList = document.createElement('div');
    serverList.className = 'minecraft-server-list';
    serverList.innerHTML = `
        <div class="server-list-title">Select Server</div>
        <div class="server-container">
            <div class="server-item" data-server="dashboard">
                <div class="server-item-left">
                    <div class="server-name">Leo's Portfolio Hub</div>
                    <div class="server-ip">portfolio.leocraft.net</div>
                    <div class="server-description">Main dashboard and portfolio overview</div>
                </div>
                <div class="server-status">📊 Online</div>
            </div>
            <div class="server-item" data-server="cs-projects">
                <div class="server-item-left">
                    <div class="server-name">CodeCraft Workshop</div>
                    <div class="server-ip">projects.leocraft.net</div>
                    <div class="server-description">Computer science projects and builds</div>
                </div>
                <div class="server-status">💻 Online</div>
            </div>
            <div class="server-item" data-server="experiences">
                <div class="server-item-left">
                    <div class="server-name">Adventure World</div>
                    <div class="server-ip">experience.leocraft.net</div>
                    <div class="server-description">Internships and work experience</div>
                </div>
                <div class="server-status">🚀 Online</div>
            </div>
            <div class="server-item" data-server="leadership">
                <div class="server-item-left">
                    <div class="server-name">Command Center</div>
                    <div class="server-ip">leadership.leocraft.net</div>
                    <div class="server-description">Leadership roles and achievements</div>
                </div>
                <div class="server-status">⭐ Online</div>
            </div>
            <div class="server-item" data-server="achievements">
                <div class="server-item-left">
                    <div class="server-name">Trophy Hall</div>
                    <div class="server-ip">achievements.leocraft.net</div>
                    <div class="server-description">Awards and recognition showcase</div>
                </div>
                <div class="server-status">🏆 Online</div>
            </div>
        </div>
        <div class="server-list-buttons">
            <button class="minecraft-button" id="refresh-btn">Refresh</button>
            <button class="minecraft-button" id="cancel-btn">Cancel</button>
        </div>
    `;
    document.body.appendChild(serverList);

    // Add event listeners for server items
    const serverItems = serverList.querySelectorAll('.server-item');
    serverItems.forEach(item => {
        item.addEventListener('click', () => {
            const server = item.dataset.server;
            connectToServer(server);
        });
    });

    // Add event listeners for buttons
    document.getElementById('refresh-btn').addEventListener('click', refreshServers);
    document.getElementById('cancel-btn').addEventListener('click', closeServerList);
}

function createOptionsMenu() {
    const optionsMenu = document.createElement('div');
    optionsMenu.className = 'minecraft-options';
    optionsMenu.innerHTML = `
        <div class="options-title">Options</div>
        <div class="options-container">
            <div class="option-item">
                <div class="option-label">Music</div>
                <button class="option-button" id="musicToggle">ON</button>
            </div>
            <div class="option-item">
                <div class="option-label">Sound Effects</div>
                <button class="option-button" id="soundToggle">ON</button>
            </div>
        </div>
        <div class="server-list-buttons">
            <button class="minecraft-button" id="done-btn">Done</button>
        </div>
    `;
    document.body.appendChild(optionsMenu);

    // Add event listeners
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
    document.getElementById('soundToggle').addEventListener('click', toggleSound);
    document.getElementById('done-btn').addEventListener('click', closeOptions);
}

function createMusicControls() {
    // Remove existing music controls if any
    const existingControls = document.querySelector('.minecraft-music');
    if (existingControls) {
        existingControls.remove();
    }

    const musicControls = document.createElement('div');
    musicControls.className = 'minecraft-music';

    const musicButton = document.createElement('button');
    musicButton.className = 'music-toggle';
    musicButton.id = 'music-ctrl';
    musicButton.textContent = musicEnabled ? '♪ ON' : '♪ OFF';
    musicButton.addEventListener('click', toggleBackgroundMusic);

    musicControls.appendChild(musicButton);
    document.body.appendChild(musicControls);
}

function createSingleplayerWorld() {
    const singleplayer = document.createElement('div');
    singleplayer.className = 'minecraft-singleplayer';
    singleplayer.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">Leo's Creative World</div>
            <div class="world-seed">Seed: PRINCETON2025</div>
            <div class="world-mode">Creative Mode | Peaceful Difficulty</div>
        </div>

        <div class="minecraft-world-content">
            <div class="minecraft-biome grass-biome">
                <div class="biome-header">
                    <h2>🌱 Plains Biome: About Leo</h2>
                    <div class="coordinates">X: 0, Y: 64, Z: 0</div>
                </div>
                <div class="minecraft-text-block">
                    <p>Welcome to my personal Minecraft world! I'm Leo Chang, a Junior at Princeton Day School with a passion for computer science, economics, and finance. This world represents my journey through technology and innovation.</p>
                    <p>Here in the Plains biome, you'll find the foundation of who I am - a student eager to build, create, and explore the endless possibilities of technology.</p>
                </div>
                <div class="resource-summary">
                    <div class="resource">📍 Location: Princeton, NJ</div>
                    <div class="resource">🎓 Education: Princeton Day School</div>
                    <div class="resource">📧 Contact: leochang017@gmail.com</div>
                    <div class="resource">📱 Phone: (724) 624-2360</div>
                </div>
            </div>

            <div class="minecraft-biome desert-biome">
                <div class="biome-header">
                    <h3>🏜️ Desert Temple: Skills Vault</h3>
                    <div class="coordinates">X: 128, Y: 65, Z: -45</div>
                </div>
                <div class="minecraft-chest-room">
                    <div class="chest-container">
                        <div class="minecraft-chest-ui">
                            <div class="chest-title">Skills Inventory</div>
                            <div class="minecraft-inventory-grid">
                                <div class="inventory-slot filled" title="Python - Advanced">
                                    <div class="item-icon">🐍</div>
                                    <div class="item-count">64</div>
                                </div>
                                <div class="inventory-slot filled" title="Java - Intermediate">
                                    <div class="item-icon">☕</div>
                                    <div class="item-count">48</div>
                                </div>
                                <div class="inventory-slot filled" title="JavaScript - Advanced">
                                    <div class="item-icon">🌐</div>
                                    <div class="item-count">56</div>
                                </div>
                                <div class="inventory-slot filled" title="React - Intermediate">
                                    <div class="item-icon">⚛️</div>
                                    <div class="item-count">42</div>
                                </div>
                                <div class="inventory-slot filled" title="Machine Learning - Advanced">
                                    <div class="item-icon">🤖</div>
                                    <div class="item-count">52</div>
                                </div>
                                <div class="inventory-slot filled" title="Finance Knowledge - Advanced">
                                    <div class="item-icon">📈</div>
                                    <div class="item-count">58</div>
                                </div>
                                <div class="inventory-slot filled" title="Git & Version Control">
                                    <div class="item-icon">🔧</div>
                                    <div class="item-count">45</div>
                                </div>
                                <div class="inventory-slot filled" title="Data Science">
                                    <div class="item-icon">📊</div>
                                    <div class="item-count">40</div>
                                </div>
                                <div class="inventory-slot filled" title="Web Development">
                                    <div class="item-icon">🌍</div>
                                    <div class="item-count">50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="minecraft-biome mountain-biome">
                <div class="biome-header">
                    <h3>⛰️ Mountain Peak: Current Quests</h3>
                    <div class="coordinates">X: -200, Y: 128, Z: 300</div>
                </div>
                <div class="minecraft-quest-board">
                    <div class="quest-item active">
                        <div class="quest-icon">🎯</div>
                        <div class="quest-info">
                            <div class="quest-title">Building Innovative Tech Solutions</div>
                            <div class="quest-progress">Progress: ████████░░ 80%</div>
                            <div class="quest-reward">Reward: +50 XP, New Skills Unlocked</div>
                        </div>
                    </div>
                    <div class="quest-item active">
                        <div class="quest-icon">📚</div>
                        <div class="quest-info">
                            <div class="quest-title">Advanced CS Knowledge Acquisition</div>
                            <div class="quest-progress">Progress: ██████░░░░ 60%</div>
                            <div class="quest-reward">Reward: +40 XP, Algorithm Mastery</div>
                        </div>
                    </div>
                    <div class="quest-item pending">
                        <div class="quest-icon">🤝</div>
                        <div class="quest-info">
                            <div class="quest-title">Collaborate on Meaningful Projects</div>
                            <div class="quest-progress">Progress: ███████░░░ 70%</div>
                            <div class="quest-reward">Reward: +60 XP, Team Leadership Badge</div>
                        </div>
                    </div>
                    <div class="quest-item pending">
                        <div class="quest-icon">🌟</div>
                        <div class="quest-info">
                            <div class="quest-title">Make Positive Impact in Tech</div>
                            <div class="quest-progress">Progress: █████░░░░░ 50%</div>
                            <div class="quest-reward">Reward: +100 XP, Innovation Achievement</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="minecraft-hud">
            <div class="hud-top">
                <div class="health-bar">
                    <span class="hud-label">Health</span>
                    <div class="hearts">❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️</div>
                </div>
                <div class="hunger-bar">
                    <span class="hud-label">Energy</span>
                    <div class="food">🍖🍖🍖🍖🍖🍖🍖🍖🍖🍖</div>
                </div>
                <div class="experience-bar">
                    <span class="hud-label">Level 17</span>
                    <div class="xp-bar">
                        <div class="xp-progress" style="width: 65%"></div>
                    </div>
                </div>
            </div>
            <div class="minecraft-hotbar">
                <div class="hotbar-slot selected" title="Current Focus">🎯</div>
                <div class="hotbar-slot" title="Programming">💻</div>
                <div class="hotbar-slot" title="Learning">📚</div>
                <div class="hotbar-slot" title="Projects">🚀</div>
                <div class="hotbar-slot" title="Achievements">⭐</div>
                <div class="hotbar-slot" title="Awards">🏆</div>
                <div class="hotbar-slot" title="Tools">🔧</div>
                <div class="hotbar-slot" title="Innovation">💡</div>
                <div class="hotbar-slot" title="Communication">📧</div>
            </div>
        </div>

        <div class="world-controls">
            <button class="minecraft-button small" onclick="backToMainMenu()">
                <i class="fas fa-home"></i> Back to Main Menu
            </button>
        </div>
    `;
    document.body.appendChild(singleplayer);
}

// Minecraft Menu Handler Functions
function openSingleplayer() {
    // Hide main menu and show About page directly
    document.querySelector('.minecraft-main-menu').style.display = 'none';

    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'minecraft-loading';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-title">Loading World: About Leo...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
                <div class="loading-percentage">0%</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Animate loading bar
    setTimeout(() => {
        const progress = loadingScreen.querySelector('.loading-progress');
        const percentage = loadingScreen.querySelector('.loading-percentage');
        let percent = 0;
        const interval = setInterval(() => {
            percent += 5;
            progress.style.width = percent + '%';
            percentage.textContent = percent + '%';
            if (percent >= 100) clearInterval(interval);
        }, 40);
    }, 100);

    // Show About content after loading
    setTimeout(() => {
        loadingScreen.remove();
        showMinecraftContent('about');
    }, 2000);
}

function openMultiplayer() {
    document.querySelector('.minecraft-main-menu').style.display = 'none';
    document.querySelector('.minecraft-server-list').classList.add('active');
}

function openOptions() {
    document.querySelector('.minecraft-main-menu').style.display = 'none';
    document.querySelector('.minecraft-options').classList.add('active');
}

function quitGame() {
    // Update localStorage first
    localStorage.setItem('theme', 'stock');
    localStorage.removeItem('minecraft-navigation');

    // Reload the page to restore original state
    window.location.reload();
}

function backToMainMenu() {
    // Hide singleplayer world and show main menu
    const singleplayer = document.querySelector('.minecraft-singleplayer');
    const mainMenu = document.querySelector('.minecraft-main-menu');

    if (singleplayer) singleplayer.classList.remove('active');
    if (mainMenu) mainMenu.style.display = 'flex';
}

function backToMinecraftMenu() {
    // Remove any page content and show main menu
    const pageContent = document.querySelector('.minecraft-page-content');
    if (pageContent) pageContent.remove();

    // Show main menu if it exists, otherwise create it
    let mainMenu = document.querySelector('.minecraft-main-menu');
    if (mainMenu) {
        mainMenu.style.display = 'flex';
    } else {
        showMinecraftMainMenu();
    }

    // Recreate music controls to ensure they work properly
    createMusicControls();
}

function connectToServer(page) {
    // Hide server list
    const serverList = document.querySelector('.minecraft-server-list');
    if (serverList) serverList.style.display = 'none';

    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'minecraft-loading';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-title">Connecting to ${page}.leocraft.net...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
                <div class="loading-percentage">0%</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Animate loading bar
    setTimeout(() => {
        const progress = loadingScreen.querySelector('.loading-progress');
        const percentage = loadingScreen.querySelector('.loading-percentage');
        let percent = 0;
        const interval = setInterval(() => {
            percent += 5;
            progress.style.width = percent + '%';
            percentage.textContent = percent + '%';
            if (percent >= 100) clearInterval(interval);
        }, 40);
    }, 100);

    // Show content after loading animation
    setTimeout(() => {
        loadingScreen.remove();
        showMinecraftContent(page);
    }, 2000);
}

function showMinecraftContent(page) {
    // Remove ALL Minecraft menu overlays and UI elements that could block content
    const menusToRemove = [
        '.minecraft-main-menu',
        '.minecraft-server-list',
        '.minecraft-options',
        '.minecraft-singleplayer',
        '.minecraft-loading'
    ];

    menusToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.style.display = 'none';
                element.remove();
            }
        });
    });

    // Hide original content completely
    hideStockMarketContent();

    // Create completely different Minecraft-themed content based on the page
    createMinecraftPageContent(page);

    // Keep music controls visible but in the corner
    const musicControls = document.querySelector('.minecraft-music');
    if (musicControls) {
        musicControls.style.display = 'block';
        musicControls.style.position = 'fixed';
        musicControls.style.top = '20px';
        musicControls.style.right = '20px';
        musicControls.style.zIndex = '200';
    }
}

function createMinecraftPageContent(page) {
    // Remove any existing Minecraft page content
    const existingContent = document.querySelector('.minecraft-page-content');
    if (existingContent) existingContent.remove();

    // Create page-specific Minecraft UI
    const pageContent = document.createElement('div');
    pageContent.className = 'minecraft-page-content';

    // Set background based on page
    switch(page) {
        case 'dashboard':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft3.gif')";
            break;
        case 'cs-projects':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft.gif')";
            break;
        case 'experiences':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft4.gif')";
            break;
        case 'leadership':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft2.gif')";
            break;
        case 'achievements':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft6.gif')";
            break;
        case 'about':
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft7.gif')";
            break;
        default:
            pageContent.style.backgroundImage = "url('assets/gifs/minecraft3.gif')";
    }

    // Add back button at the top
    const backButton = document.createElement('button');
    backButton.className = 'minecraft-back-button';
    backButton.innerHTML = '🏠 Main Menu';
    backButton.onclick = backToMinecraftMenu;
    pageContent.appendChild(backButton);

    // Create content container
    const contentContainer = document.createElement('div');

    switch(page) {
        case 'dashboard':
            createDashboardMinecraftUI(contentContainer);
            break;
        case 'cs-projects':
            createProjectsMinecraftUI(contentContainer);
            break;
        case 'experiences':
            createExperiencesMinecraftUI(contentContainer);
            break;
        case 'leadership':
            createLeadershipMinecraftUI(contentContainer);
            break;
        case 'achievements':
            createAchievementsMinecraftUI(contentContainer);
            break;
        case 'about':
            createAboutMinecraftUI(contentContainer);
            break;
        default:
            createDashboardMinecraftUI(contentContainer);
    }

    pageContent.appendChild(contentContainer);
    document.body.appendChild(pageContent);
}

function createDashboardMinecraftUI(container) {
    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">🏰 Leo's Portfolio Hub</div>
            <div class="world-seed">Server: portfolio.leocraft.net | Biome: Plains</div>
            <div class="world-mode">Creative Mode | Peaceful | Day 365</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">📊 Player Statistics</div>
            <div class="minecraft-item-grid">
                <div class="minecraft-item">
                    <span class="item-icon-large">💼</span>
                    <div class="item-name">Internships Completed</div>
                    <div class="item-description">x2 Companies</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🎓</span>
                    <div class="item-name">AP Courses Taken</div>
                    <div class="item-description">x5 Advanced</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">💻</span>
                    <div class="item-name">Programming Languages</div>
                    <div class="item-description">x5+ Mastered</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🏆</span>
                    <div class="item-name">Awards Earned</div>
                    <div class="item-description">x15+ Trophies</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">❤️</span>
                    <div class="item-name">Volunteer Hours</div>
                    <div class="item-description">x200+ Community</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📚</span>
                    <div class="item-name">Research Papers</div>
                    <div class="item-description">x1 Published</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">👥</span>
                    <div class="item-name">Leadership Roles</div>
                    <div class="item-description">x6 Active</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📖</span>
                    <div class="item-name">Publications</div>
                    <div class="item-description">Poetry & Research</div>
                </div>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">📋 Quest Log - Recent Achievements</div>
            <div class="block-content">
                <p>✅ <strong>[Sep 2025]</strong> Founded Princeton Day School's ObCHESSed - Official chess club with 20+ members</p>
                <p>✅ <strong>[Aug 2025]</strong> Co-Founded NapkinNotes - AI-powered EdTech platform for students</p>
                <p>✅ <strong>[Jul-Aug 2025]</strong> Mundial Financial Group Internship - Redesigned entire company website</p>
                <p>✅ <strong>[2024]</strong> Published ML Research in JEI - Stock price prediction using LSTM and Twitter sentiment</p>
                <p>✅ <strong>[2024]</strong> 1st Place PClassic Fall 2024 - University of Pennsylvania programming competition</p>
                <p>✅ <strong>[Jul-Oct 2024]</strong> Achievable Inc Internship - Content marketing and blog writing</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💎 Professional Endorsements</div>
            <div class="block-content">
                <p>🌟 <strong>Tyler York - CEO, Achievable Inc.</strong></p>
                <p style="margin-left: 20px; color: #FFD700;">"Leo was a valuable member of our team as a content marketing intern from July through October 2024. Leo excelled at his projects to create high-quality, information-rich blog posts. I recommend him highly."</p>
                <br>
                <p>🌟 <strong>Charles Smulevitz - CEO, Mundial Financial Group</strong></p>
                <p style="margin-left: 20px; color: #FFD700;">"His dedication, hard work, and eagerness to learn were evident throughout his time with us. His work in creating a new website for the firm showcased both his technical skills and his ability to translate what he learned about our business into a professional, practical result."</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🎯 Current Focus</div>
            <div class="block-content">
                <p>⚔️ Expanding NapkinNotes platform</p>
                <p>📚 Advanced CS coursework</p>
                <p>🏆 Programming competitions</p>
                <p>💼 Seeking summer 2026 internships</p>
            </div>
        </div>

    `;
}

function createProjectsMinecraftUI(container) {

    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">⚒️ CodeCraft Workshop</div>
            <div class="world-seed">Server: projects.leocraft.net | Biome: Birch Forest</div>
            <div class="world-mode">Creative Mode | Project Building | Day 1000</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🏗️ Major Project Builds</div>
            <div class="block-content">
                <p>🎨 <strong>NapkinNotes - AI-Powered EdTech Platform</strong></p>
                <p style="margin-left: 20px;">Co-founded AI study tool that transforms class notes into interactive study materials. Built with React, Node.js, and Python ML models.</p>
                <p style="margin-left: 20px; color: #00FF00;">Status: Active Development | Tech: React, Node.js, Python, AI/ML</p>
                <br>
                <p>📈 <strong>Stock Price Prediction with LSTM & Twitter Sentiment</strong></p>
                <p style="margin-left: 20px;">Published research using deep learning LSTM models combined with NLP sentiment analysis of Twitter data to predict stock movements. Published in Journal of Emerging Investigators (JEI).</p>
                <p style="margin-left: 20px; color: #FFD700;">Status: Published | Tech: Python, TensorFlow, LSTM, NLP</p>
                <br>
                <p>🌐 <strong>Mundial Financial Group Website Redesign</strong></p>
                <p style="margin-left: 20px;">Complete company website overhaul for investment banking firm. Modern responsive design with improved UX/UI.</p>
                <p style="margin-left: 20px; color: #00BFFF;">Status: Live | Tech: HTML, CSS, JavaScript, WordPress</p>
                <br>
                <p>📚 <strong>Achievable Blog Content</strong></p>
                <p style="margin-left: 20px;">Created high-quality educational blog posts for test prep company. Topics ranged from study strategies to subject-specific guides.</p>
                <p style="margin-left: 20px; color: #FF69B4;">Status: Published | Articles: 10+ | Tech: Content Marketing, SEO, Research</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🛠️ Tech Stack</div>
            <div class="block-content">
                <p>⚔️ <strong>Programming Languages:</strong></p>
                <p style="margin-left: 20px;">Python | Java | JavaScript | C++ | SQL | HTML/CSS</p>
                <br>
                <p>🏹 <strong>Frameworks & Libraries:</strong></p>
                <p style="margin-left: 20px;">React.js | Node.js | TensorFlow | PyTorch | Pandas | NumPy</p>
                <br>
                <p>🔧 <strong>Tools:</strong></p>
                <p style="margin-left: 20px;">Git/GitHub | VS Code</p>
            </div>
        </div>

    `;
}

function createExperiencesMinecraftUI(container) {

    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">🗺️ Adventure World</div>
            <div class="world-seed">Server: experience.leocraft.net | Biome: Jungle</div>
            <div class="world-mode">Survival Mode | Quests Completed | Level 17</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💼 Main Quest: Achievable, Inc.</div>
            <div class="block-content">
                <p>🏢 <strong>Content Marketing Intern | July 2024 - October 2024</strong></p>
                <p style="color: #FFD700;">⭐ Remote Position | Part-Time | Self-Directed</p>
                <br>
                <p><strong>Quest Objectives Completed:</strong></p>
                <p>✅ Excelled at creating high-quality, information-rich blog posts</p>
                <p>✅ Conducted independent research to produce informed and accurate expert-level content across diverse topics</p>
                <p>✅ Authored guest posts for external sites</p>
                <p>✅ Worked remotely with complete autonomy, self-directing projects</p>
                <p>✅ Delivered consistent, well-researched content that met high editorial standards and deadlines</p>
                <br>
                <p><strong>Boss Testimonial:</strong></p>
                <p style="color: #00FF00;">"Leo excelled at his projects to create high-quality, information-rich blog posts for Achievable's blog. His blog posts were well-researched and informative, reinforcing Achievable's brand as high-quality, authoritative, and knowledgeable. Best of all, Leo was a pleasure to work with. Leo was a valuable member of our team, and I recommend him highly." - Tyler York, CEO</p>
                <br>
                <p><strong>Loot Earned:</strong> Content Marketing +50 | Research +45 | SEO +40 | Brand Authority Building +50</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💼 Main Quest: Mundial Financial Group</div>
            <div class="block-content">
                <p>🏢 <strong>Intern | July 2025 - August 2025</strong></p>
                <p style="color: #FFD700;">⭐ Remote Position | Part-Time | CEO Direct Report</p>
                <br>
                <p><strong>Quest Objectives Completed:</strong></p>
                <p>✅ Took the initiative to understand what the company does and how they serve clients</p>
                <p>✅ Created a new website for the firm showcasing both technical skills and business understanding</p>
                <p>✅ Translated learning about the business into a professional, practical result</p>
                <p>✅ Demonstrated dedication, hard work, and eagerness to learn throughout entire engagement</p>
                <p>✅ Showed diligence, reliability, and positive attitude</p>
                <br>
                <p><strong>Boss Testimonial:</strong></p>
                <p style="color: #00FF00;">"I want to commend Leo for the outstanding work he did during his internship at Mundial Financial Group this summer. His dedication, hard work, and eagerness to learn were evident throughout his time with us, and his contributions made a meaningful impact on our firm. Most notably, his work in creating a new website for the firm showcased both his technical skills and his ability to translate what he learned about our business into a professional, practical result." - Charles Smulevitz, CEO</p>
                <br>
                <p><strong>Loot Earned:</strong> Web Design +55 | Financial Analysis +40 | Content Writing +45 | Social Media Management +35</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">❤️ Side Quest: Capital Health Regional Medical Center</div>
            <div class="block-content">
                <p>🏥 <strong>Junior Volunteer | July 2024 - August 2024</strong></p>
                <p style="color: #FFD700;">⭐ In-Person | 66+ Hours Contributed</p>
                <br>
                <p><strong>Quest Objectives Completed:</strong></p>
                <p>✅ Served as Nursing Unit Volunteer responding to patient call bells and assisting with daily needs</p>
                <p>✅ Participated in Comfort Cart, Book Cart, Tea Cart, and Art Cart patient engagement programs</p>
                <p>✅ Assisted volunteer manager with organizational tasks and administrative duties</p>
                <p>✅ Handled file organization, data entry, and preparation of patient discharge packets</p>
                <p>✅ Gained exposure to hospital operations and healthcare environment</p>
                <br>
                <p><strong>Loot Earned:</strong> Patient Care +30 | Data Entry +25 | Organization +30 | Healthcare Communication +35</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🎯 Skills & Experience Points Summary</div>
            <div class="minecraft-item-grid">
                <div class="minecraft-item">
                    <span class="item-icon-large">✍️</span>
                    <div class="item-name">Content Creation</div>
                    <div class="item-description">Level 8 | +95 XP</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🌐</span>
                    <div class="item-name">Web Design</div>
                    <div class="item-description">Level 7 | +85 XP</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📊</span>
                    <div class="item-name">Research</div>
                    <div class="item-description">Level 7 | +85 XP</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📱</span>
                    <div class="item-name">Social Media</div>
                    <div class="item-description">Level 5 | +70 XP</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">❤️</span>
                    <div class="item-name">Healthcare</div>
                    <div class="item-description">Level 4 | +65 XP</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🎯</span>
                    <div class="item-name">Project Mgmt</div>
                    <div class="item-description">Level 6 | +75 XP</div>
                </div>
            </div>
        </div>

    `;
}

function createLeadershipMinecraftUI(container) {

    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">⚔️ Command Center</div>
            <div class="world-seed">Server: leadership.leocraft.net | Biome: Stronghold</div>
            <div class="world-mode">Creative Mode | Guild Leader | 6 Active Positions</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">♔ Guild Master: ObCHESSed</div>
            <div class="block-content">
                <p>👑 <strong>Founder & President | Princeton Day School Chess Club</strong></p>
                <p style="color: #FFD700;">📅 September 2025 - Present | Status: Active & Growing</p>
                <br>
                <p><strong>Guild Achievements:</strong></p>
                <p>⚔️ Founded official school chess club from scratch, building community of 20+ active members</p>
                <p>⚔️ Organize weekly club meetings featuring tactics training, tournament prep, and friendly matches</p>
                <p>⚔️ Coordinate school chess tournaments and inter-school competition participation</p>
                <p>⚔️ Manage club logistics including scheduling, communications, and member recruitment</p>
                <p>⚔️ Taught players of all skill levels from beginner to advanced</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🌍 Guild Master: Ti-Ratana Welfare Society</div>
            <div class="block-content">
                <p>🏛️ <strong>Founder - Orphanage Education Program</strong></p>
                <p style="color: #FFD700;">📅 2020 - Present | Status: 100+ Hours Contributed</p>
                <br>
                <p><strong>Guild Achievements:</strong></p>
                <p>📚 Founded educational initiative providing tutoring and mentorship to orphaned children</p>
                <p>📚 Teach English, mathematics, and science to students ranging from elementary to middle school</p>
                <p>📚 Develop custom lesson plans tailored to individual student needs and learning styles</p>
                <p>📚 Coordinate with welfare society staff to identify students most in need of academic support</p>
                <p>📚 Contributed 200+ volunteer hours since the beginning of the pandemic</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">📰 Senior Editor: The Spokesman</div>
            <div class="block-content">
                <p>✍️ <strong>Online Editor | Princeton Day School Newspaper</strong></p>
                <p style="color: #FFD700;">📅 Freshman Year - Present | Status: Active Publication</p>
                <br>
                <p><strong>Editorial Responsibilities:</strong></p>
                <p>📝 Manage digital content strategy and online publication platform for school newspaper</p>
                <p>📝 Edit and publish articles covering school news, student life, sports, and community events</p>
                <p>📝 Coordinate with writers to ensure timely, accurate, and engaging content production</p>
                <p>📝 Optimize web presence and reader engagement through SEO and social media integration</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💼 Executive Editor: Washington to Wallstreet</div>
            <div class="block-content">
                <p>📊 <strong>Executive Editor | Finance & Political Science Magazine</strong></p>
                <p style="color: #FFD700;">📅 2025 - Present | Status: Published Quarterly</p>
                <br>
                <p><strong>Editorial Responsibilities:</strong></p>
                <p>💰 Shape editorial direction for national student-run publication covering finance, economics, and policy</p>
                <p>💰 Review and edit submissions on topics ranging from market analysis to political commentary</p>
                <p>💰 Collaborate with editorial team to maintain high journalistic standards and analytical rigor</p>
                <p>💰 Contribute original articles analyzing intersection of business, government, and society</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">⚗️ Competitor: Science Olympiad</div>
            <div class="block-content">
                <p>🔬 <strong>Team Member | Princeton Day School</strong></p>
                <p style="color: #FFD700;">📅 2022 - Present | Status: Top 6 State Finalist</p>
                <br>
                <p><strong>Competition Achievements:</strong></p>
                <p>🧪 Compete in regional and state-level Science Olympiad tournaments across multiple events</p>
                <p>🧪 Placed Top 5 and 6 in Helicopter and Electric Vehicle in 2025 New Jersey State competition</p>
                <p>🧪 Placed 3rd regionally in Helicopter in 2025 Regionals</p>
                <p>🧪 Cohead of Middle School Science Olympiad Team, creating and grading practice tests and helping manage the middle school team</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🤺 Athlete: Varsity Fencing</div>
            <div class="block-content">
                <p>⚔️ <strong>Key Team Member | Épée Specialist</strong></p>
                <p style="color: #FFD700;">📅 2023 - Present | Status: 2nd Place Regional, State Qualifier</p>
                <br>
                <p><strong>Athletic Achievements:</strong></p>
                <p>🏅 Earned 2nd Place Regional finish in NJSIAA Fencing Championships Sophomore year</p>
                <p>🏅 Qualified for and competed in New Jersey State Championships Sophomore year</p>
                <p>🏅 Contributed key victories to team success throughout competitive season since Freshman year</p>
                <p>🏅 Competitively Fencing since 6 years old</p>
            </div>
        </div>

    `;
}

function createAchievementsMinecraftUI(container) {

    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">🏆 Trophy Hall</div>
            <div class="world-seed">Server: achievements.leocraft.net | Biome: Mesa</div>
            <div class="world-mode">Creative Mode | 15+ Achievements Unlocked | Level MAX</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🥇 PClassic Fall 2024</div>
            <div class="block-content">
                <p style="color: #FFD700; font-size: 14px;">⭐ 1ST PLACE - UNIVERSITY OF PENNSYLVANIA ⭐</p>
                <p>First place in University of Pennsylvania's competitive programming competition for high school students.</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💎 Other Achievements</div>
            <div class="block-content">
                <p>🥈 <strong>Scholastic Art & Writing Awards - Silver Key (Multiple)</strong></p>
                <p style="margin-left: 20px;">National recognition for creative writing including "Legacy" poem.</p>
                <br>
                <p>📖 <strong>Published Research - Journal of Emerging Investigators</strong></p>
                <p style="margin-left: 20px;">"Analyzing the Impact of Tweet Sentiment on Stock Price Prediction using LSTM Models"</p>
                <br>
                <p>🥉 <strong>HackBac Hackathon - 3rd Place</strong></p>
                <p style="margin-left: 20px;">Social justice-themed hackathon developing innovative solutions.</p>
                <br>
                <p>📊 <strong>National Economics Challenge - 4th Place State</strong></p>
                <p style="margin-left: 20px;">Prestigious competition testing micro and macroeconomic principles.</p>
                <br>
                <p>🔬 <strong>Science Olympiad - 3rd Place Regionals, 5th-6th Place NJ States</strong></p>
                <p style="margin-left: 20px;">High-level STEM competition across physics, chemistry, and engineering events.</p>
                <br>
                <p>💃 <strong>National Ballroom Dance Champion - 1st Place National</strong></p>
                <p style="margin-left: 20px;">Sophomore year national championship title.</p>
                <br>
                <p>🤺 <strong>NJSIAA Regional Fencing - 2nd Place Individual & Team</strong></p>
                <p style="margin-left: 20px;">Regional championship in varsity fencing (Sophomore).</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🎯 Achievement Statistics</div>
            <div class="minecraft-item-grid">
                <div class="minecraft-item">
                    <span class="item-icon-large">🥇</span>
                    <div class="item-name">1st Place Wins</div>
                    <div class="item-description">x2 Competitions</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🥈</span>
                    <div class="item-name">2nd-4th Place</div>
                    <div class="item-description">x3 Competitions</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📚</span>
                    <div class="item-name">Publications</div>
                    <div class="item-description">x6+ Total</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🏆</span>
                    <div class="item-name">Total Awards</div>
                    <div class="item-description">x15+ Earned</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">⭐</span>
                    <div class="item-name">State Level+</div>
                    <div class="item-description">x4 Competitions</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🌟</span>
                    <div class="item-name">National Level</div>
                    <div class="item-description">x2 Awards</div>
                </div>
            </div>
        </div>


    `;
}

function createAboutMinecraftUI(container) {

    container.innerHTML = `
        <div class="minecraft-world-header">
            <div class="world-title">👤 About Leo Chang</div>
            <div class="world-seed">Server: about.leocraft.net | Biome: Snowy Tundra</div>
            <div class="world-mode">Singleplayer | Creative Mode | Started: 2008</div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🎮 Player Profile</div>
            <div class="block-content">
                <p><strong>Name:</strong> Leo Chang</p>
                <p><strong>Current Level:</strong> Junior @ Princeton Day School</p>
                <p><strong>Location:</strong> Yardley, Pennsylvania</p>
                <br>
                <p style="color: #FFD700;"><strong>About:</strong></p>
                <p>Hi! Welcome to my personal portfolio website! My name is Leo Chang, and I am a Junior at Princeton Day School. I am currently interested in computer science, economics, and finance. I also have a passion for machine learning and want to dive more into the space of Artificial Intelligence. In my free time, I like to fence, write, and make various coding projects. If you want to reach out to me, my email is leochang017@gmail.com, and my phone number is (724) 624-2360.</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">🎓 Academic Inventory</div>
            <div class="block-content">
                <p style="color: #FFD700;"><strong>Advanced Placement Courses Roadmap:</strong></p>
                <p>⚔️ AP Computer Science A (Score: 4)</p>
                <p>⚔️ AP Microeconomics</p>
                <p>⚔️ AP Macroeconomics</p>
                <p>⚔️ AP Chemistry</p>
                <p>⚔️ AP Comparative Government</p>
                <br>
                <p style="color: #FFD700;"><strong>Current Advanced Coursework (Junior Year):</strong></p>
                <p>🏹 Advanced Computing: Coding with a Purpose (Post-AP)</p>
                <p>🏹 Honors Physics</p>
                <p>🏹 Honors Precalculus</p>
                <p>🏹 Latin 4 (Dual Enrollment Credit)</p>
    
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">💡 Interests</div>
            <div class="block-content">
                <p>💻 Computer Science & AI/ML</p>
                <p>📈 Economics & Finance</p>
                <p>🚀 Entrepreneurship</p>
                <p>✍️ Creative Writing</p>
                <p>⚔️ Competitive Programming, Fencing, Science Olympiad</p>
            </div>
        </div>

        <div class="minecraft-content-block">
            <div class="block-title">📧 Contact & Connect</div>
            <div class="minecraft-item-grid">
                <div class="minecraft-item">
                    <span class="item-icon-large">📧</span>
                    <div class="item-name">Email</div>
                    <div class="item-description">leochang017@gmail.com</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📱</span>
                    <div class="item-name">Phone</div>
                    <div class="item-description">(724) 624-2360</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">📍</span>
                    <div class="item-name">Location</div>
                    <div class="item-description">Princeton, NJ</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🏫</span>
                    <div class="item-name">School</div>
                    <div class="item-description">Princeton Day School</div>
                </div>
                <div class="minecraft-item">
                    <span class="item-icon-large">🎓</span>
                    <div class="item-name">Class Year</div>
                    <div class="item-description">Junior (2027)</div>
                </div>
                
            </div>
        </div>

    `;
}

function closeServerList() {
    document.querySelector('.minecraft-server-list').classList.remove('active');
    document.querySelector('.minecraft-main-menu').style.display = 'flex';
}

function refreshServers() {
    // Just a visual effect - servers are always "online"
    const serverItems = document.querySelectorAll('.server-item');
    serverItems.forEach(item => {
        const status = item.querySelector('.server-status');
        status.textContent = '🔄 Refreshing...';
        setTimeout(() => {
            const originalText = status.textContent.replace('🔄 Refreshing...', '').trim();
            if (originalText.includes('portfolio')) status.textContent = '📊 Online';
            else if (originalText.includes('projects')) status.textContent = '💻 Online';
            else if (originalText.includes('experience')) status.textContent = '🚀 Online';
            else if (originalText.includes('leadership')) status.textContent = '⭐ Online';
            else if (originalText.includes('achievements')) status.textContent = '🏆 Online';
        }, 1000);
    });
}

function closeOptions() {
    document.querySelector('.minecraft-options').classList.remove('active');
    document.querySelector('.minecraft-main-menu').style.display = 'flex';
}

function toggleMusic() {
    const button = document.getElementById('musicToggle');
    if (button.textContent === 'ON') {
        button.textContent = 'OFF';
        button.classList.add('off');
        musicEnabled = false;
        if (minecraftMusic) {
            minecraftMusic.pause();
        }
        // Also update the main music control button
        const mainMusicButton = document.getElementById('music-ctrl');
        if (mainMusicButton) {
            mainMusicButton.textContent = '♪ OFF';
        }
    } else {
        button.textContent = 'ON';
        button.classList.remove('off');
        musicEnabled = true;
        if (minecraftMusic) {
            minecraftMusic.play();
        } else {
            playMinecraftMusic();
        }
        // Also update the main music control button
        const mainMusicButton = document.getElementById('music-ctrl');
        if (mainMusicButton) {
            mainMusicButton.textContent = '♪ ON';
        }
    }
}

function toggleSound() {
    const button = document.getElementById('soundToggle');
    if (button.textContent === 'ON') {
        button.textContent = 'OFF';
        button.classList.add('off');
        soundEffectsEnabled = false;
    } else {
        button.textContent = 'ON';
        button.classList.remove('off');
        soundEffectsEnabled = true;
    }
}

function cycleRenderDistance() {
    const button = event.target;
    const distances = ['2 chunks', '4 chunks', '8 chunks', '16 chunks', '32 chunks'];
    const current = button.textContent;
    const currentIndex = distances.indexOf(current);
    const nextIndex = (currentIndex + 1) % distances.length;
    button.textContent = distances[nextIndex];
}

function deactivateMinecraftTheme() {
    document.body.classList.remove('minecraft-theme');
    document.documentElement.classList.remove('minecraft-theme');

    // Update toggle button
    setTimeout(() => {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = 'MINECRAFT';
        }
    }, 100);
}

function restoreOriginalContent() {
    // Content is now just styled with CSS, no need to reload
}

// Theme sound effects (optional - can be disabled)
function playThemeSound(theme) {
    // Create audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        if (theme === 'minecraft') {
            // Play minecraft-style sound
            playTone(audioContext, 220, 0.15, 'sawtooth');
            setTimeout(() => playTone(audioContext, 440, 0.15, 'sawtooth'), 150);
            setTimeout(() => playTone(audioContext, 880, 0.25, 'sine'), 300);
        } else {
            // Play stock market bell sound
            playTone(audioContext, 800, 0.1, 'sine');
            setTimeout(() => playTone(audioContext, 600, 0.2, 'sine'), 100);
        }
    } catch (e) {
        // Audio not available
    }
}

function playTone(audioContext, frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// Global music and sound variables
let minecraftMusic = null;
let musicEnabled = true;
let soundEffectsEnabled = true;

function playMinecraftMusic() {
    if (!musicEnabled) return;

    // If music is already playing, don't restart it
    if (minecraftMusic && !minecraftMusic.paused) {
        return;
    }

    try {
        // If music exists but is paused, just resume it
        if (minecraftMusic && minecraftMusic.paused) {
            minecraftMusic.play().catch(e => {
                // Silent fail
            });
            return;
        }

        // Create and play the actual MP3 file for the first time
        minecraftMusic = new Audio('assets/audio/C418 - Minecraft - Minecraft Volume Alpha 4.mp3');
        minecraftMusic.volume = 0.5;
        minecraftMusic.loop = true;

        minecraftMusic.play().then(() => {
            // Music playing successfully
        }).catch(e => {
            // Try user interaction workaround
            document.addEventListener('click', function playOnClick() {
                minecraftMusic.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });

    } catch (e) {
        // Audio not available
    }
}

function createAmbientTrack(audioContext) {
    // Create multiple Minecraft-style ambient tracks that play randomly
    const tracks = [
        // Track 1: Calm and peaceful like "Sweden"
        [
            { freq: 261.63, time: 0, duration: 2.5 },    // C4
            { freq: 329.63, time: 2.5, duration: 2.0 },  // E4
            { freq: 392.00, time: 4.5, duration: 2.5 },  // G4
            { freq: 523.25, time: 7, duration: 3.0 },    // C5
            { freq: 392.00, time: 10, duration: 2.0 },   // G4
            { freq: 329.63, time: 12, duration: 2.5 },   // E4
            { freq: 293.66, time: 14.5, duration: 2.0 }, // D4
            { freq: 261.63, time: 16.5, duration: 3.5 }  // C4
        ],
        // Track 2: Dreamy melody like "Mice on Venus"
        [
            { freq: 349.23, time: 0, duration: 1.5 },    // F4
            { freq: 440.00, time: 1.5, duration: 2.0 },  // A4
            { freq: 523.25, time: 3.5, duration: 2.5 },  // C5
            { freq: 659.25, time: 6, duration: 2.0 },    // E5
            { freq: 523.25, time: 8, duration: 1.5 },    // C5
            { freq: 440.00, time: 9.5, duration: 2.0 },  // A4
            { freq: 392.00, time: 11.5, duration: 2.5 }, // G4
            { freq: 349.23, time: 14, duration: 3.0 }    // F4
        ],
        // Track 3: Nostalgic like "Subwoofer Lullaby"
        [
            { freq: 196.00, time: 0, duration: 3.0 },    // G3
            { freq: 261.63, time: 3, duration: 2.5 },    // C4
            { freq: 329.63, time: 5.5, duration: 2.0 },  // E4
            { freq: 261.63, time: 7.5, duration: 2.5 },  // C4
            { freq: 196.00, time: 10, duration: 2.0 },   // G3
            { freq: 146.83, time: 12, duration: 3.0 },   // D3
            { freq: 196.00, time: 15, duration: 4.0 }    // G3
        ]
    ];

    // Randomly select a track
    const selectedTrack = tracks[Math.floor(Math.random() * tracks.length)];
    const trackDuration = Math.max(...selectedTrack.map(note => note.time + note.duration));

    // Play the selected track
    selectedTrack.forEach(note => {
        setTimeout(() => {
            if (musicEnabled && document.body.classList.contains('minecraft-theme')) {
                playAmbientNote(audioContext, note.freq, note.duration);

                // Add occasional harmony notes for richer sound
                if (Math.random() < 0.3) {
                    setTimeout(() => {
                        if (musicEnabled && document.body.classList.contains('minecraft-theme')) {
                            playAmbientNote(audioContext, note.freq * 1.5, note.duration * 0.8, 0.03);
                        }
                    }, 200);
                }
            }
        }, note.time * 1000);
    });

    // Add occasional nature sounds
    if (Math.random() < 0.7) {
        setTimeout(() => {
            if (musicEnabled && document.body.classList.contains('minecraft-theme')) {
                playNatureSound(audioContext);
            }
        }, Math.random() * trackDuration * 1000);
    }

    // Loop with random delay between tracks (like Minecraft)
    if (musicEnabled && document.body.classList.contains('minecraft-theme')) {
        const nextTrackDelay = (trackDuration + 5 + Math.random() * 15) * 1000; // 5-20 second gap
        setTimeout(() => createAmbientTrack(audioContext), nextTrackDelay);
    }
}

function playNatureSound(audioContext) {
    // Simulate subtle nature sounds like wind or distant water
    const soundType = Math.random();

    if (soundType < 0.5) {
        // Wind sound - filtered noise
        createWindSound(audioContext);
    } else {
        // Water droplet sound
        createWaterDropSound(audioContext);
    }
}

function createWindSound(audioContext) {
    const duration = 3 + Math.random() * 4; // 3-7 seconds
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate filtered white noise for wind
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.02; // Very quiet wind
    }

    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 200 + Math.random() * 300;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    source.start();
}

function createWaterDropSound(audioContext) {
    // Create a water drop sound effect
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    oscillator.type = 'sine';

    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playAmbientNote(audioContext, frequency, duration, volume = 0.08) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Add slight randomness to filter for more organic sound
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 600 + Math.random() * 400;
    filterNode.Q.value = 0.5 + Math.random() * 0.5;

    // More natural attack and decay envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, audioContext.currentTime + duration * 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

function stopMinecraftMusic() {
    musicEnabled = false;
    if (minecraftMusic) {
        minecraftMusic.pause();
        minecraftMusic.currentTime = 0;
    }
}

function toggleBackgroundMusic() {
    const button = document.getElementById('music-ctrl');
    const optionsButton = document.getElementById('musicToggle');

    if (musicEnabled) {
        musicEnabled = false;
        button.textContent = '♪ OFF';
        if (optionsButton) {
            optionsButton.textContent = 'OFF';
            optionsButton.classList.add('off');
        }
        if (minecraftMusic) {
            minecraftMusic.pause();
        }
    } else {
        musicEnabled = true;
        button.textContent = '♪ ON';
        if (optionsButton) {
            optionsButton.textContent = 'ON';
            optionsButton.classList.remove('off');
        }
        if (document.body.classList.contains('minecraft-theme')) {
            if (minecraftMusic) {
                minecraftMusic.play();
            } else {
                playMinecraftMusic();
            }
        }
    }
}

