/**
 * Main Application Controller
 * Handles state management, UI events, repository rendering, filters, sorting,
 * and project detail modal rendering.
 */

class PortfolioApp {
    constructor() {
        this.currentUsername = window.PORTFOLIO_CONFIG.defaultUsername;
        this.repos = [];
        this.filteredRepos = [];
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'stars';
        this.viewMode = 'grid'; // 'grid' or 'list'

        this.init();
    }

    async init() {
        this.bindEvents();
        this.renderSkills();
        await this.loadGitHubUser(this.currentUsername);
    }

    bindEvents() {
        // Search Input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.applyFiltersAndRender();
            });
        }

        // Category Filter Buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeCategory = btn.dataset.category || 'all';
                this.applyFiltersAndRender();
            });
        });

        // Sort Select Dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFiltersAndRender();
            });
        }

        // View Mode Toggles
        document.getElementById('gridViewBtn')?.addEventListener('click', () => this.setViewMode('grid'));
        document.getElementById('listViewBtn')?.addEventListener('click', () => this.setViewMode('list'));

        // Username Search Form in Hero/Nav
        const userForm = document.getElementById('usernameForm');
        if (userForm) {
            userForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userInput = document.getElementById('usernameInput')?.value.trim();
                if (userInput) {
                    await this.loadGitHubUser(userInput);
                }
            });
        }

        // Modal Close Button & Overlay backdrop
        document.getElementById('closeModalBtn')?.addEventListener('click', () => this.toggleModal(false));
        document.getElementById('projectModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') this.toggleModal(false);
        });

        // Crypto Donation Modal Logic
        const cryptoModal = document.getElementById('cryptoModal');
        const cryptoDonateBtn = document.getElementById('cryptoDonateBtn');
        const closeCryptoModalBtn = document.getElementById('closeCryptoModalBtn');
        const copyCryptoBtn = document.getElementById('copyCryptoBtn');

        cryptoDonateBtn?.addEventListener('click', () => {
            cryptoModal?.classList.add('active');
        });

        closeCryptoModalBtn?.addEventListener('click', () => {
            cryptoModal?.classList.remove('active');
        });

        cryptoModal?.addEventListener('click', (e) => {
            if (e.target.id === 'cryptoModal') cryptoModal.classList.remove('active');
        });

        copyCryptoBtn?.addEventListener('click', () => {
            const address = document.getElementById('cryptoAddressText')?.textContent || window.PORTFOLIO_CONFIG.profile.cryptoUsdtAddress;
            navigator.clipboard.writeText(address).then(() => {
                const span = copyCryptoBtn.querySelector('span');
                if (span) {
                    const originalText = span.textContent;
                    span.textContent = '✅ Copied!';
                    copyCryptoBtn.style.borderColor = '#4ade80';
                    setTimeout(() => {
                        span.textContent = originalText;
                        copyCryptoBtn.style.borderColor = '';
                    }, 2000);
                }
            }).catch(err => {
                console.error("Clipboard copy failed", err);
            });
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.toggleModal(false);
                cryptoModal?.classList.remove('active');
                if (window.portfolioTerminal) window.portfolioTerminal.toggleModal(false);
            }
        });
    }

    setViewMode(mode) {
        this.viewMode = mode;
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        const container = document.getElementById('projectsContainer');

        if (mode === 'grid') {
            gridBtn?.classList.add('active');
            listBtn?.classList.remove('active');
            container?.classList.remove('list-view');
        } else {
            listBtn?.classList.add('active');
            gridBtn?.classList.remove('active');
            container?.classList.add('list-view');
        }
    }

    async loadGitHubUser(username) {
        this.showLoading(true);
        this.currentUsername = username;

        try {
            // Fetch User Profile & Repos concurrently
            const [profile, repos] = await Promise.all([
                window.githubService.getUserProfile(username),
                window.githubService.getUserRepos(username)
            ]);

            window.currentProfileData = profile;
            window.currentReposData = repos;

            this.repos = repos;
            this.renderProfile(profile);
            this.renderStats(repos);
            this.applyFiltersAndRender();
        } catch (error) {
            console.error("Error loading GitHub data:", error);
            this.showError("Failed to fetch user repositories from GitHub.");
        } finally {
            this.showLoading(false);
        }
    }

    renderProfile(profile) {
        const avatarEl = document.getElementById('userAvatar');
        const nameEl = document.getElementById('userName');
        const handleEl = document.getElementById('userHandle');
        const bioEl = document.getElementById('userBio');
        const locationEl = document.getElementById('userLocation');
        const ghLinkEl = document.getElementById('userGithubLink');

        if (avatarEl) avatarEl.src = profile.avatar_url || window.PORTFOLIO_CONFIG.profile.avatarFallback;
        if (nameEl) nameEl.textContent = profile.name || profile.login;
        if (handleEl) handleEl.textContent = `@${profile.login}`;
        if (bioEl) bioEl.textContent = window.PORTFOLIO_CONFIG.profile.bio || profile.bio;
        if (ghLinkEl) ghLinkEl.href = window.PORTFOLIO_CONFIG.profile.github || profile.html_url || `https://github.com/${profile.login}`;
        const linkedinLinkEl = document.getElementById('userLinkedinLink');
        if (linkedinLinkEl && window.PORTFOLIO_CONFIG.profile.linkedin) linkedinLinkEl.href = window.PORTFOLIO_CONFIG.profile.linkedin;

        // Sync input field value
        const userInput = document.getElementById('usernameInput');
        if (userInput) userInput.value = profile.login;
    }

    renderStats(repos) {
        const stats = window.githubService.calculateStats(repos);

        document.getElementById('statTotalRepos').textContent = stats.totalRepos;
        document.getElementById('statTotalStars').textContent = `⭐ ${stats.totalStars}`;
        document.getElementById('statTotalForks').textContent = `🍴 ${stats.totalForks}`;

        // Render Language Bar
        const langContainer = document.getElementById('languageDistributionBar');
        if (langContainer && stats.topLanguages.length > 0) {
            langContainer.innerHTML = '';
            stats.topLanguages.forEach((langObj, idx) => {
                const color = this.getLanguageColor(langObj.language);
                const segment = document.createElement('div');
                segment.className = 'lang-segment';
                segment.style.width = `${langObj.percentage}%`;
                segment.style.backgroundColor = color;
                segment.title = `${langObj.language}: ${langObj.percentage}% (${langObj.count} repos)`;
                langContainer.appendChild(segment);
            });

            // Render Legend
            const legendContainer = document.getElementById('languageLegend');
            if (legendContainer) {
                legendContainer.innerHTML = stats.topLanguages.map(l => `
                    <div class="lang-legend-item">
                        <span class="dot" style="background-color: ${this.getLanguageColor(l.language)}"></span>
                        <span class="name">${l.language}</span>
                        <span class="percent">${l.percentage}%</span>
                    </div>
                `).join('');
            }
        }
    }

    renderSkills() {
        const container = document.getElementById('skillsGrid');
        if (!container) return;

        container.innerHTML = window.PORTFOLIO_CONFIG.skills.map(skill => `
            <div class="skill-card glass-panel" data-language="${skill.languageTag}">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-info">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-badge">${skill.category}</span>
                    </div>
                    <div class="skill-progress-track">
                        <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            </div>
        `).join('');

        // Clicking skill card triggers filter by that technology
        container.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => {
                const lang = card.dataset.language;
                if (lang) {
                    this.searchQuery = lang.toLowerCase();
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) searchInput.value = lang;
                    this.applyFiltersAndRender();
                    document.getElementById('projectsSection')?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    applyFiltersAndRender() {
        let result = [...this.repos];

        // 1. Filter by Search Query (Name, Description, Language, Topics)
        if (this.searchQuery) {
            result = result.filter(repo => {
                const nameMatch = repo.name.toLowerCase().includes(this.searchQuery);
                const descMatch = (repo.description || '').toLowerCase().includes(this.searchQuery);
                const langMatch = (repo.language || '').toLowerCase().includes(this.searchQuery);
                const topicMatch = (repo.topics || []).some(t => t.toLowerCase().includes(this.searchQuery));
                return nameMatch || descMatch || langMatch || topicMatch;
            });
        }

        // 2. Filter by Category Tab
        if (this.activeCategory !== 'all') {
            if (this.activeCategory === 'featured') {
                result = result.filter(r => r.featured || r.stargazers_count >= 5);
            } else {
                result = result.filter(r => (r.language || '').toLowerCase() === this.activeCategory.toLowerCase());
            }
        }

        // 3. Sorting
        result.sort((a, b) => {
            if (this.sortBy === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
            if (this.sortBy === 'forks') return (b.forks_count || 0) - (a.forks_count || 0);
            if (this.sortBy === 'name') return a.name.localeCompare(b.name);
            if (this.sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
            return 0;
        });

        this.filteredRepos = result;
        this.renderProjects(result);
    }

    renderProjects(repos) {
        const container = document.getElementById('projectsContainer');
        const countEl = document.getElementById('projectsCount');

        if (countEl) countEl.textContent = `${repos.length} project${repos.length === 1 ? '' : 's'}`;

        if (!container) return;

        if (repos.length === 0) {
            container.innerHTML = `
                <div class="empty-state glass-panel">
                    <div class="empty-icon">🔍</div>
                    <h3>No matching projects found</h3>
                    <p>Try refining your search query or choosing another filter category.</p>
                    <button class="btn btn-secondary" onclick="window.portfolioApp.resetFilters()">Reset Filters</button>
                </div>
            `;
            return;
        }

        container.innerHTML = repos.map((repo, idx) => `
            <div class="project-card glass-panel" style="animation-delay: ${idx * 0.05}s">
                <div class="project-card-header">
                    <div class="folder-icon">📁</div>
                    <div class="project-links">
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" title="Live Preview" class="icon-link">🌐</a>` : ''}
                        <a href="${repo.html_url}" target="_blank" rel="noopener" title="View Repository" class="icon-link">📦</a>
                    </div>
                </div>
                
                <h3 class="project-title" onclick="window.portfolioApp.openModal(${repo.id})">${this.escapeHtml(repo.name)}</h3>
                <p class="project-description">${this.escapeHtml(repo.description)}</p>

                <div class="project-topics">
                    ${(repo.topics || []).slice(0, 4).map(topic => `<span class="topic-tag">#${topic}</span>`).join('')}
                </div>

                <div class="project-card-footer">
                    <div class="project-meta">
                        <span class="lang-tag"><span class="lang-color-dot" style="background-color: ${this.getLanguageColor(repo.language)}"></span>${repo.language}</span>
                        <span class="meta-item">⭐ ${repo.stargazers_count}</span>
                        <span class="meta-item">🍴 ${repo.forks_count}</span>
                    </div>
                    <button class="btn-inspect" onclick="window.portfolioApp.openModal(${repo.id})">Details →</button>
                </div>
            </div>
        `).join('');
    }

    openModal(repoId) {
        const repo = this.repos.find(r => r.id === repoId) || 
                     window.PORTFOLIO_CONFIG.featuredProjects.find(r => r.id === repoId || r.name === repoId);

        if (!repo) return;

        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <div class="modal-project-header">
                <h2>${this.escapeHtml(repo.name)}</h2>
                <div class="modal-tags">
                    <span class="lang-badge" style="background-color: ${this.getLanguageColor(repo.language)}22; color: ${this.getLanguageColor(repo.language)}; border: 1px solid ${this.getLanguageColor(repo.language)}44">
                        ${repo.language}
                    </span>
                    <span class="badge">⭐ ${repo.stargazers_count} Stars</span>
                    <span class="badge">🍴 ${repo.forks_count} Forks</span>
                    ${repo.open_issues_count !== undefined ? `<span class="badge">🐛 ${repo.open_issues_count} Open Issues</span>` : ''}
                </div>
            </div>

            <p class="modal-description">${this.escapeHtml(repo.description)}</p>

            <div class="modal-action-buttons">
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="btn btn-primary">
                    <span class="icon">📦</span> View Source on GitHub
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" rel="noopener" class="btn btn-outline">
                        <span class="icon">🚀</span> Live Preview / Demo
                    </a>
                ` : ''}
            </div>

            <div class="modal-topics-list">
                <h4>Topics / Keywords</h4>
                <div class="topic-chips">
                    ${(repo.topics || []).map(t => `<span class="topic-chip">#${t}</span>`).join('') || '<span class="text-muted">No topic tags added</span>'}
                </div>
            </div>

            <div class="modal-readme-section">
                <h4>Repository Details / Summary</h4>
                <div class="readme-box glass-panel">
                    <pre>${this.escapeHtml(repo.readme || `# ${repo.name}\n\n${repo.description}\n\nLanguage: ${repo.language}\nLast updated: ${new Date(repo.updated_at || Date.now()).toLocaleDateString()}`)}</pre>
                </div>
            </div>
        `;

        this.toggleModal(true);
    }

    toggleModal(show = true) {
        const modal = document.getElementById('projectModal');
        if (modal) {
            if (show) modal.classList.add('active');
            else modal.classList.remove('active');
        }
    }

    resetFilters() {
        this.searchQuery = '';
        this.activeCategory = 'all';
        this.sortBy = 'stars';

        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-category="all"]')?.classList.add('active');

        this.applyFiltersAndRender();
    }

    showLoading(isLoading) {
        const loader = document.getElementById('loadingSpinner');
        if (loader) loader.style.display = isLoading ? 'flex' : 'none';
    }

    showError(msg) {
        console.warn(msg);
    }

    getLanguageColor(lang) {
        const colors = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f7df1e',
            'Python': '#3572A5',
            'Rust': '#dea584',
            'Go': '#00ADD8',
            'CSS': '#563d7c',
            'HTML': '#e34c26',
            'C++': '#f34b7d',
            'C#': '#178600',
            'Java': '#b07219',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Shell': '#89e051'
        };
        return colors[lang] || '#8b949e';
    }

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
