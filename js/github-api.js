/**
 * GitHub API Service Module
 * Handles dynamic fetching of user profile, repository list, and language breakdown
 * with caching and graceful fallbacks.
 */

class GitHubService {
    constructor() {
        this.cacheKeyPrefix = "gh_portfolio_cache_";
        this.cacheTTL = 15 * 60 * 1000; // 15 minutes cache
        this.clearCache();
    }

    clearCache() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.cacheKeyPrefix)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (e) {}
    }

    /**
     * Fetch user profile metadata
     */
    async getUserProfile(username) {
        const cacheKey = `${this.cacheKeyPrefix}user_${username}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.profile.bio) {
                cached.bio = window.PORTFOLIO_CONFIG.profile.bio;
            }
            return cached;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
            if (!response.ok) {
                throw new Error(`GitHub API HTTP ${response.status}`);
            }
            const data = await response.json();
            if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.profile.bio) {
                data.bio = window.PORTFOLIO_CONFIG.profile.bio;
            }
            this.setCache(cacheKey, data);
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
                public_repos: 12,
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
        const cacheKey = `${this.cacheKeyPrefix}repos_${username}`;
        const cached = this.getFromCache(cacheKey);
        
        const featuredConfig = window.PORTFOLIO_CONFIG.featuredProjects || [];

        if (cached) {
            // Ensure featured projects are present in cached list
            const mergedMap = new Map();
            featuredConfig.forEach(p => mergedMap.set(p.name.toLowerCase(), p));
            cached.forEach(repo => {
                const key = repo.name.toLowerCase();
                if (!mergedMap.has(key)) {
                    mergedMap.set(key, repo);
                }
            });
            return Array.from(mergedMap.values());
        }

        try {
            const response = await fetch(
                `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
            );
            if (!response.ok) {
                throw new Error(`GitHub API HTTP ${response.status}`);
            }
            const repos = await response.json();
            
            // Format and sanitize repo objects
            const formattedRepos = repos
                .filter(repo => !repo.fork) // Filter out forks unless needed
                .map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || "No description provided for this repository.",
                    html_url: repo.html_url,
                    homepage: repo.homepage || "",
                    stargazers_count: repo.stargazers_count,
                    forks_count: repo.forks_count,
                    open_issues_count: repo.open_issues_count,
                    language: repo.language || "Plain Text",
                    topics: repo.topics || [],
                    updated_at: repo.updated_at,
                    pushed_at: repo.pushed_at,
                    license: repo.license ? repo.license.spdx_id : null,
                    featured: repo.stargazers_count > 5 || repo.topics?.includes("featured")
                }));

            // Merge featured config projects into API results
            const mergedMap = new Map();
            featuredConfig.forEach(p => mergedMap.set(p.name.toLowerCase(), { ...p }));
            formattedRepos.forEach(repo => {
                const key = repo.name.toLowerCase();
                if (mergedMap.has(key)) {
                    const existing = mergedMap.get(key);
                    mergedMap.set(key, {
                        ...existing,
                        stargazers_count: repo.stargazers_count !== undefined ? repo.stargazers_count : existing.stargazers_count,
                        forks_count: repo.forks_count !== undefined ? repo.forks_count : existing.forks_count,
                        updated_at: repo.updated_at || existing.updated_at,
                        html_url: existing.html_url || repo.html_url,
                        description: existing.description || repo.description,
                        topics: (existing.topics && existing.topics.length > 0) ? existing.topics : (repo.topics || [])
                    });
                } else {
                    mergedMap.set(key, repo);
                }
            });

            const finalRepos = Array.from(mergedMap.values());

            this.setCache(cacheKey, finalRepos);
            return finalRepos;
        } catch (error) {
            console.warn("Using repository showcase fallbacks due to API rate limit or error:", error.message);
            return window.PORTFOLIO_CONFIG.featuredProjects;
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

    getFromCache(key) {
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (e) {
            return null;
        }
    }

    setCache(key, value) {
        try {
            const item = {
                value: value,
                expiry: Date.now() + this.cacheTTL
            };
            localStorage.setItem(key, JSON.stringify(item));
        } catch (e) {
            // localStorage full or disabled
        }
    }
}

window.githubService = new GitHubService();
