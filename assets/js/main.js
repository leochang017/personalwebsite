// Clean JavaScript for multi-page portfolio
document.addEventListener('DOMContentLoaded', function() {
    initTerminal();
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
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
            'Use project names from "ls" command with "cat"'
        ];
        helpText.forEach(line => addTerminalLine(line, 'info'));
    }

    function listProjects() {
        addTerminalLine('Projects:');
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
            '  Languages: Python, JavaScript, Java, C++',
            '  Frameworks: React, Node.js, Flask, TensorFlow',
            '  Tools: Git, Docker, AWS, MongoDB',
            '  Specialties: AI/ML, Full-Stack Development'
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
            weekday: 'short',
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