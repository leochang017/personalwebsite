// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initTerminal();
    updateTimestamp();

    // Update timestamp every second
    setInterval(updateTimestamp, 1000);
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get target section
            const targetId = this.getAttribute('href').substring(1);

            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');

            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-moon';
        } else {
            body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Terminal functionality
function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    // Project data
    const projects = {
        'napkinnote': {
            name: 'NapkinNote',
            role: 'Co-Founder & Lead Developer',
            description: 'AI-powered platform for transforming class notes into study resources',
            tech: 'AI/ML, Web Development',
            status: 'Active',
            details: 'EdTech platform with peer-to-peer marketplace and automated summarization'
        },
        'stockml': {
            name: 'Stock Price Prediction ML',
            role: 'Researcher & Developer',
            description: 'LSTM models for stock price prediction using Twitter sentiment',
            tech: 'Python, TensorFlow, LSTM, NLP',
            status: 'Published',
            details: 'Published research in Journal of Emerging Investigators'
        },
        'orphanage': {
            name: 'Ti-Ratana Education Program',
            role: 'Founder & Director',
            description: 'Remote educational program for orphans in Malaysia',
            tech: 'Zoom, Educational Technology',
            status: 'Ongoing',
            details: 'Weekly interactive lessons reaching 20+ students since 2020'
        }
    };

    const skills = {
        'programming': ['Python', 'JavaScript', 'Java', 'HTML/CSS', 'Flask'],
        'data': ['Machine Learning', 'LSTM Models', 'Data Analysis', 'TensorFlow'],
        'leadership': ['Team Management', 'Strategic Planning', 'Public Speaking', 'Mentorship'],
        'writing': ['Technical Writing', 'Research Publication', 'Content Creation', 'Journalism']
    };

    const achievements = [
        'PClassic Fall 2024 - 1st Place (UPenn)',
        'Scholastic Art & Writing Awards - Silver Key (Multiple)',
        'Published Research - Journal of Emerging Investigators',
        'HackBac Hackathon - 3rd Place',
        'National Economics Challenge - 4th Place',
        'National Ballroom Dance Champion (Sophomore)',
        'NJSIAA Regional Fencing - 2nd Place'
    ];

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = '';

            // Add command to output
            addTerminalLine(`leo@portfolio:~/projects$ ${command}`, 'command');

            // Process command
            processCommand(command);
        }
    });

    function processCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const arg = parts[1];

        switch(cmd) {
            case 'help':
                showHelp();
                break;
            case 'list':
                listProjects();
                break;
            case 'view':
                if (arg && projects[arg]) {
                    viewProject(arg);
                } else {
                    addTerminalLine('Project not found. Use "list" to see available projects.', 'error');
                }
                break;
            case 'skills':
                showSkills();
                break;
            case 'achievements':
                showAchievements();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'welcome':
                showWelcome();
                break;
            default:
                addTerminalLine(`Command not found: ${cmd}. Type "help" for available commands.`, 'error');
        }
    }

    function addTerminalLine(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;

        if (type === 'command') {
            line.innerHTML = `<span class="prompt">${text}</span>`;
        } else {
            line.textContent = text;
        }

        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function showHelp() {
        const helpText = [
            'Available commands:',
            '  list              - Show all projects',
            '  view [project]    - View detailed project information',
            '  skills            - Show technical skills and expertise',
            '  achievements      - Show awards and recognition',
            '  clear             - Clear terminal output',
            '  help              - Show this help message',
            '',
            'Example: view jobber'
        ];

        helpText.forEach(line => addTerminalLine(line));
    }

    function listProjects() {
        addTerminalLine('Available projects:');
        addTerminalLine('');

        Object.keys(projects).forEach(key => {
            const project = projects[key];
            addTerminalLine(`  ${key.padEnd(15)} - ${project.name} (${project.status})`);
        });

        addTerminalLine('');
        addTerminalLine('Use "view [project-name]" to see details.');
    }

    function viewProject(projectKey) {
        const project = projects[projectKey];

        addTerminalLine(`Project: ${project.name}`);
        addTerminalLine(`Role: ${project.role}`);
        addTerminalLine(`Status: ${project.status}`);
        addTerminalLine(`Technologies: ${project.tech}`);
        addTerminalLine('');
        addTerminalLine(`Description: ${project.description}`);
        addTerminalLine(`Details: ${project.details}`);
    }

    function showSkills() {
        addTerminalLine('Technical Skills & Expertise:');
        addTerminalLine('');

        Object.keys(skills).forEach(category => {
            const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
            addTerminalLine(`${categoryTitle}:`);
            skills[category].forEach(skill => {
                addTerminalLine(`  • ${skill}`);
            });
            addTerminalLine('');
        });
    }

    function showAchievements() {
        addTerminalLine('Awards & Recognition:');
        addTerminalLine('');

        achievements.forEach((achievement, index) => {
            addTerminalLine(`${(index + 1).toString().padStart(2)}. ${achievement}`);
        });
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '';
        showWelcome();
    }

    function showWelcome() {
        const welcomeText = [
            'Welcome to Leo\'s Project Terminal!',
            '',
            'Available commands:',
            '- list: Show all projects',
            '- view [project]: View project details',
            '- skills: Show technical skills',
            '- achievements: Show awards and recognition',
            '- clear: Clear terminal',
            '- help: Show available commands'
        ];

        welcomeText.forEach(line => addTerminalLine(line));
    }
}

// Update timestamp
function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });

        timestampElement.textContent = `${dateString} ${timeString}`;
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add some interactivity to metric cards
document.addEventListener('DOMContentLoaded', function() {
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
});

// Terminal cursor blinking
setInterval(function() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }
}, 500);