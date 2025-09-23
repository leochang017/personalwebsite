// Clean Stock Market Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTerminal();
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
});

// Simple navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle hash navigation on page load
    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);
            const targetNavLink = document.querySelector(`a[href="${hash}"]`);

            if (targetSection && targetNavLink) {
                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                targetNavLink.classList.add('active');

                // Update active section
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
            }
        }
    }

    // Handle navigation on page load
    handleHashNavigation();

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');

            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Handle hash changes (back/forward browser navigation)
    window.addEventListener('hashchange', handleHashNavigation);
}

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

    const skills = {
        'programming': ['Python', 'JavaScript', 'Java', 'HTML/CSS', 'React', 'Node.js'],
        'data': ['Machine Learning', 'LSTM Models', 'Data Analysis', 'TensorFlow', 'NLP'],
        'tools': ['Git', 'Docker', 'VS Code', 'Jupyter', 'Linux', 'AWS'],
        'frameworks': ['Flask', 'Express.js', 'React', 'TensorFlow', 'Pandas', 'NumPy']
    };

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = '';

            // Add command to output
            addTerminalLine(`leo@cs-terminal:~$ ${command}`, 'command');

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
            case 'whoami':
                showWhoami();
                break;
            case 'pwd':
                addTerminalLine('/home/leo/portfolio/cs-projects');
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'exit':
                addTerminalLine('Thanks for visiting! Use "help" to see available commands.');
                break;
            default:
                addTerminalLine(`bash: ${cmd}: command not found`, 'error');
                addTerminalLine('Type "help" for available commands.');
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
            '',
            '  ls, list          List all CS projects',
            '  cat, view <name>  View project details',
            '  skills, tech      Show technical skills',
            '  whoami            Show user info',
            '  pwd               Show current directory',
            '  clear             Clear terminal',
            '  help              Show this help',
            '  exit              Exit message',
            '',
            'Examples:',
            '  ls',
            '  cat napkinnotes',
            '  skills'
        ];

        helpText.forEach(line => addTerminalLine(line));
    }

    function listProjects() {
        addTerminalLine('CS Projects:');
        addTerminalLine('');

        Object.keys(projects).forEach(key => {
            const project = projects[key];
            addTerminalLine(`${key.padEnd(15)} ${project.status.padEnd(20)} ${project.name}`);
        });

        addTerminalLine('');
        addTerminalLine('Use "cat <project-name>" to view details.');
    }

    function openProject(projectKey) {
        const project = projects[projectKey];

        addTerminalLine(`Opening ${project.name}...`);
        setTimeout(() => {
            window.location.href = project.url;
        }, 1000);
    }

    function showSkills() {
        addTerminalLine('Technical Skills:');
        addTerminalLine('');

        Object.keys(skills).forEach(category => {
            const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
            addTerminalLine(`${categoryTitle}:`);
            addTerminalLine(`  ${skills[category].join(', ')}`);
            addTerminalLine('');
        });
    }

    function showWhoami() {
        addTerminalLine('Leo Chang');
        addTerminalLine('High School Student & Developer');
        addTerminalLine('Location: Yardley, PA');
        addTerminalLine('Focus: Computer Science & Entrepreneurship');
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '';
        showWelcome();
    }

    function showWelcome() {
        const welcomeText = [
            'Welcome to Leo\'s CS Terminal',
            'Type "help" for available commands',
            ''
        ];

        welcomeText.forEach(line => addTerminalLine(line));
    }

    // Initialize with welcome message
    showWelcome();
}

// Simple timestamp update
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