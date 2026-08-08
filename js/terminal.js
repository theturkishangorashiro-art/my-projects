/**
 * Developer Interactive CLI Terminal Component
 * Provides a command-line interface overlay for tech enthusiasts.
 */

class PortfolioTerminal {
    constructor() {
        this.container = document.getElementById('terminalOverlay');
        this.outputArea = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
        this.promptUser = document.getElementById('terminalUser');
        this.history = [];
        this.historyIndex = -1;
        this.currentUsername = window.PORTFOLIO_CONFIG.defaultUsername;

        if (this.input) {
            this.init();
        }
    }

    init() {
        // Toggle terminal open/close
        document.querySelectorAll('.js-toggle-terminal').forEach(btn => {
            btn.addEventListener('click', () => this.toggleModal());
        });

        document.getElementById('closeTerminalBtn')?.addEventListener('click', () => this.toggleModal(false));

        // Keyboard handler
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandStr = this.input.value.trim();
                this.executeCommand(commandStr);
                if (commandStr) {
                    this.history.push(commandStr);
                    this.historyIndex = this.history.length;
                }
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.historyIndex];
                } else {
                    this.historyIndex = this.history.length;
                    this.input.value = '';
                }
            }
        });

        // Focus input on click anywhere inside terminal content
        document.querySelector('.terminal-window')?.addEventListener('click', () => {
            this.input.focus();
        });
    }

    toggleModal(show = true) {
        if (show) {
            this.container.classList.add('active');
            this.input.focus();
            if (this.outputArea.children.length === 0) {
                this.printWelcome();
            }
        } else {
            this.container.classList.remove('active');
        }
    }

    printWelcome() {
        this.appendLine(`<span class="term-cyan">⚡ Developer Portfolio CLI [v1.2.0]</span>`);
        this.appendLine(`Type <span class="term-yellow">'help'</span> to see available commands or <span class="term-yellow">'fetch &lt;username&gt;'</span> to load a GitHub profile.\n`);
    }

    executeCommand(cmdRaw) {
        if (!cmdRaw) return;

        this.appendLine(`<div class="term-prompt-line"><span class="term-green">guest@portfolio</span>:<span class="term-blue">~$</span> ${this.escapeHtml(cmdRaw)}</div>`);

        const parts = cmdRaw.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                this.appendLine(`
<span class="term-bold">Available Commands:</span>
  <span class="term-yellow">help</span>             - Show this help menu
  <span class="term-yellow">fetch &lt;user&gt;</span>     - Fetch live repositories & profile for any GitHub user
  <span class="term-yellow">repos</span> | <span class="term-yellow">ls</span>        - List currently loaded projects
  <span class="term-yellow">bio</span> | <span class="term-yellow">whoami</span>       - Display developer summary
  <span class="term-yellow">skills</span>           - Print technical skills matrix
  <span class="term-yellow">stats</span>            - Print repository summary statistics
  <span class="term-yellow">theme</span>            - Toggle vibrant background accents
  <span class="term-yellow">clear</span>            - Clear terminal output
  <span class="term-yellow">exit</span>             - Close CLI terminal window
`);
                break;

            case 'clear':
                this.outputArea.innerHTML = '';
                break;

            case 'exit':
                this.toggleModal(false);
                break;

            case 'whoami':
            case 'bio':
                const p = window.currentProfileData || window.PORTFOLIO_CONFIG.profile;
                this.appendLine(`
<span class="term-magenta">Name:</span> ${p.name || p.login}
<span class="term-magenta">Bio:</span> ${p.bio || 'Open source developer'}
<span class="term-magenta">Location:</span> ${p.location || 'Global'}
<span class="term-magenta">GitHub:</span> ${p.html_url || `https://github.com/${p.login}`}
`);
                break;

            case 'skills':
                let skillText = `<span class="term-bold">Tech Stack & Proficiency:</span>\n`;
                window.PORTFOLIO_CONFIG.skills.forEach(s => {
                    const bar = '█'.repeat(Math.floor(s.level / 10)) + '░'.repeat(10 - Math.floor(s.level / 10));
                    skillText += `  ${s.icon} ${s.name.padEnd(20)} [${bar}] ${s.level}%\n`;
                });
                this.appendLine(`<pre class="term-code">${skillText}</pre>`);
                break;

            case 'ls':
            case 'repos':
                const repos = window.currentReposData || window.PORTFOLIO_CONFIG.featuredProjects;
                let repoOutput = `<span class="term-bold">Loaded Repositories (${repos.length}):</span>\n`;
                repos.forEach(r => {
                    repoOutput += `  ⭐ ${String(r.stargazers_count).padStart(4)} | 🍴 ${String(r.forks_count).padStart(3)} | <span class="term-cyan">${r.name.padEnd(24)}</span> (${r.language || 'Code'})\n`;
                });
                this.appendLine(`<pre class="term-code">${repoOutput}</pre>`);
                break;

            case 'stats':
                const allRepos = window.currentReposData || window.PORTFOLIO_CONFIG.featuredProjects;
                const stats = window.githubService.calculateStats(allRepos);
                this.appendLine(`
<span class="term-bold">Portfolio Metrics:</span>
  • Total Projects: <span class="term-cyan">${stats.totalRepos}</span>
  • Total Stars: <span class="term-yellow">⭐ ${stats.totalStars}</span>
  • Total Forks: <span class="term-green">🍴 ${stats.totalForks}</span>
  • Top Language: <span class="term-magenta">${stats.topLanguages[0]?.language || 'N/A'}</span>
`);
                break;

            case 'fetch':
                if (args.length === 0) {
                    this.appendLine(`<span class="term-red">Error: Username required. Usage: fetch &lt;username&gt;</span>`);
                } else {
                    const username = args[0];
                    this.appendLine(`<span class="term-yellow">Fetching GitHub data for '@${username}'...</span>`);
                    if (window.portfolioApp) {
                        window.portfolioApp.loadGitHubUser(username).then(() => {
                            this.appendLine(`<span class="term-green">✔ Successfully updated portfolio for '@${username}'!</span>`);
                        }).catch(err => {
                            this.appendLine(`<span class="term-red">✖ Failed to load profile: ${err.message}</span>`);
                        });
                    }
                }
                break;

            case 'theme':
                document.body.classList.toggle('alt-theme');
                this.appendLine(`<span class="term-cyan">Theme style toggled!</span>`);
                break;

            default:
                this.appendLine(`<span class="term-red">Command not recognized: '${cmd}'. Type 'help' for available commands.</span>`);
        }

        this.scrollToBottom();
    }

    appendLine(htmlStr) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = htmlStr;
        this.outputArea.appendChild(div);
    }

    scrollToBottom() {
        this.outputArea.scrollTop = this.outputArea.scrollHeight;
    }

    escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.portfolioTerminal = new PortfolioTerminal();
});
