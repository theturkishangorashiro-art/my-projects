# 🚀 Interactive GitHub Projects Portfolio

A modern, highly-interactive, glassmorphic portfolio web application designed specifically to showcase open-source GitHub projects. Built with pure static web standards (HTML5 + CSS3 + Modular JS), zero build steps required, and ready for 1-click **GitHub Pages** hosting!

![Portfolio Preview Banner](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 🎨 **Glassmorphism & Rich Dark Aesthetics**: Deep space dark mode with glowing HSL accents, smooth micro-interactions, and custom cursor glow effects.
- 🌌 **Interactive Constellation Canvas**: Particle canvas background that dynamically reacts to mouse movement.
- ⚡ **Live GitHub API Integration**: Auto-fetches repositories, stargazers, forks, topics, and language breakdowns for *any* GitHub user in real-time.
- 🔄 **Live Username Switcher**: Type any GitHub handle directly in the navigation bar or CLI terminal to view live portfolio metrics for that profile.
- 🔍 **Real-Time Filtering & Search**: Instant full-text search across project titles, tags, and languages with multi-category tab filters.
- 🔀 **Sort & Layout Toggles**: Sort projects by Most Stars ⭐, Recent Activity 🕒, Most Forks 🍴, or Name, with Grid vs List view toggles.
- 📖 **Interactive Project Detail Modal**: Click any project to view language badges, stats, direct links, and summary/README view.
- 💻 **Embedded Developer CLI Terminal Overlay**: Press `>_ CLI` or press terminal buttons to open an interactive terminal shell with custom commands (`help`, `repos`, `fetch <user>`, `skills`, `stats`, `theme`, `clear`).
- 🎯 **Interactive Tech Matrix**: Click any skill badge to automatically filter the portfolio for projects built with that technology.

---

## 🌐 How to Host on GitHub Pages (Step-by-Step)

Hosting your portfolio on GitHub Pages is free and takes less than 2 minutes:

### Option 1: Standard Repository Hosting (`username.github.io/portfolio`)

1. **Create a GitHub Repository**:
   - Go to [GitHub New Repository](https://github.com/new).
   - Name your repo (e.g., `portfolio` or `my-projects`).

2. **Push Code to GitHub**:
   Run the following commands in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Navigate to your GitHub Repository -> **Settings** -> **Pages** (under Code and automation).
   - Under **Source**, select **GitHub Actions** (or **Deploy from a branch** -> select `main` / root).
   - Click **Save**. Your site will automatically build and publish at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`!

---

### Option 2: Main Profile Site (`username.github.io`)

To make this your main website URL (`https://YOUR_GITHUB_USERNAME.github.io`):
1. Create a repository named exactly `YOUR_GITHUB_USERNAME.github.io`.
2. Push this project code to that repository.
3. Enable GitHub Pages in settings, and it will be live at `https://YOUR_GITHUB_USERNAME.github.io`!

---

## 🛠️ Personalization & Customization

Open `js/config.js` to customize default settings:

```javascript
window.PORTFOLIO_CONFIG = {
    // 1. Change your default GitHub username
    defaultUsername: "YOUR_GITHUB_USERNAME",

    // 2. Personal Bio & Links
    profile: {
        name: "Your Name",
        title: "Software Engineer & Open Source Creator",
        bio: "Crafting modern web apps and open source tools...",
        github: "https://github.com/YOUR_GITHUB_USERNAME",
        linkedin: "https://linkedin.com/in/YOUR_PROFILE"
    },

    // 3. Customize skills matrix & category levels
    skills: [
        { name: "TypeScript", category: "Frontend", level: 90, icon: "⚡", languageTag: "TypeScript" },
        { name: "Python", category: "AI / Backend", level: 85, icon: "🐍", languageTag: "Python" }
    ]
};
```

---

## 💻 Interactive CLI Commands

Try opening the CLI overlay by clicking **`>_ CLI`** in the top navigation bar and running:

| Command | Action |
|---|---|
| `help` | Display list of available commands |
| `fetch <username>` | Dynamically load projects for any GitHub account |
| `repos` or `ls` | List current repositories with stars and forks |
| `skills` | Print technical skills matrix in ASCII format |
| `stats` | Print summary star/fork counts and language stats |
| `bio` | Display developer biography and links |
| `theme` | Toggle accent theme styles |
| `clear` | Clear terminal screen |

---

## 📄 License

Distributed under the MIT License. Feel free to customize and use it for your own portfolio!
