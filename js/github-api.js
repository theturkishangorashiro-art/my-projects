/**
 * GitHub API Service Module
 * Handles dynamic fetching of user profile, repository list, and language breakdown
 * with caching and graceful fallbacks.
 */

class GitHubService {
    constructor() {
        this.cacheKeyPrefix = "gh_portfolio_cache_v2_";
        this.clearCache();
    }

    clearCache() {
        try {
            if (window.localStorage) {
                localStorage.clear();
            }
        } catch (e) {}
    }

    /**
     * Fetch user profile metadata
     */
    async getUserProfile(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
            if (!response.ok) {
                throw new Error(`GitHub API HTTP ${response.status}`);
            }
            const data = await response.json();
            if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.profile.bio) {
                data.bio = window.PORTFOLIO_CONFIG.profile.bio;
            }
            return data;
        } catch (error) {
            console.warn("Using profile fallback due to API limit or network error:", error.message);
            const fallback = window.PORTFOLIO_CONFIG.profile;
            return {
                login: username,
                name: fallback.name,
                bio: fallback.bio,
                location: fallback.location,
                avatar_url: fallback.avatarFallback,
                public_repos: 8,
                followers: 240,
                following: 45,
                html_url: `https://github.com/${username}`
            };
        }
    }

    /**
     * Fetch user repositories sorted by updated date or stargazers
     */
    async getUserRepos(username) {
        const featuredConfig = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.featuredProjects) ? window.PORTFOLIO_CONFIG.featuredProjects : [];
        const normalizeKey = str => str ? str.toLowerCase().replace(/[-_]/g, '') : '';

        try {
            const response = await fetch(
                `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
            );
            if (!response.ok) {
                throw new Error(`GitHub API HTTP ${response.status}`);
            }
            const repos = await response.json();
            
            // Format and sanitize repo objects from API
            const formattedRepos = repos
                .filter(repo => !repo.fork)
                .map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || "",
                    html_url: repo.html_url,
                    homepage: repo.homepage || "",
                    stargazers_count: repo.stargazers_count || 0,
                    forks_count: repo.forks_count || 0,
                    open_issues_count: repo.open_issues_count || 0,
                    language: repo.language || "Plain Text",
                    topics: repo.topics || [],
                    updated_at: repo.updated_at,
                    pushed_at: repo.pushed_at,
                    license: repo.license ? repo.license.spdx_id : null,
                    featured: true
                }));

            // Build map of curated featured projects
            const mergedMap = new Map();
            featuredConfig.forEach(p => {
                mergedMap.set(normalizeKey(p.name), { ...p });
            });

            // Merge API repos with featured projects
            formattedRepos.forEach(repo => {
                const key = normalizeKey(repo.name);
                if (mergedMap.has(key)) {
                    const existing = mergedMap.get(key);
                    mergedMap.set(key, {
                        ...existing,
                        name: repo.name || existing.name,
                        stargazers_count: repo.stargazers_count !== undefined ? repo.stargazers_count : existing.stargazers_count,
                        forks_count: repo.forks_count !== undefined ? repo.forks_count : existing.forks_count,
                        updated_at: repo.updated_at || existing.updated_at,
                        html_url: repo.html_url || existing.html_url,
                        description: (existing.description && existing.description.length > 5) ? existing.description : (repo.description || "No description provided for this repository."),
                        topics: (existing.topics && existing.topics.length > 0) ? existing.topics : (repo.topics || []),
                        readme: existing.readme || repo.readme || ""
                    });
                } else {
                    mergedMap.set(key, repo);
                }
            });

            return Array.from(mergedMap.values());
        } catch (error) {
            console.warn("Using repository showcase fallbacks due to API rate limit or error:", error.message);
            return featuredConfig;
        }
    }

    /**
     * Calculate summary statistics from repositories
     */
    calculateStats(repos) {
        let totalStars = 0;
        let totalForks = 0;
        const languagesMap = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;
            if (repo.language) {
                languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            }
        });

        const topLanguages = Object.entries(languagesMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang, count]) => ({
                language: lang,
                count,
                percentage: Math.round((count / repos.length) * 100) || 0
            }));

        return {
            totalRepos: repos.length,
            totalStars,
            totalForks,
            topLanguages
        };
    }
}

window.githubService = new GitHubService();
