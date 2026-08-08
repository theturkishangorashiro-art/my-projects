/**
 * Portfolio Configuration File
 * Customize your default GitHub username, profile details, and showcase defaults here.
 */

window.PORTFOLIO_CONFIG = {
    // Default GitHub username to fetch repositories for when the page loads
    defaultUsername: "theturkishangorashiro-art",

    // Custom profile override details (used if API fails or for personal branding)
    profile: {
        name: "Shubham Sunil Kumar",
        title: "Full-Stack Developer & Software Architect",
        bio: "Turning coffee and AI prompts into working apps before my context window runs out. ☕✨ Building full-stack web apps, solving real-world challenges, and always open to learn, collaborate, or build new projects!",
        location: "Global / Remote",
        email: "dev@example.com",
        github: "https://github.com/theturkishangorashiro-art",
        linkedin: "https://www.linkedin.com/in/shubham-sunil-kumar-333547133/",
        twitter: "https://twitter.com",
        githubSponsor: "https://github.com/sponsors/theturkishangorashiro-art",
        cryptoUsdtAddress: "0x512f80a85f23a30742675f2d14b2a7b285499131",
        cryptoNetwork: "BSC (BEP20)",
        avatarFallback: "https://avatars.githubusercontent.com/u/9919?v=4"
    },

    // Curated showcase projects with rich fallback data
    featuredProjects: [
        {
            name: "Desktop_pet",
            description: "Lightweight virtual desktop companion featuring custom pixel animations, physics interactions, and integrated Pomodoro productivity reminders.",
            html_url: "https://github.com/theturkishangorashiro-art/Desktop_pet",
            homepage: "",
            stargazers_count: 420,
            forks_count: 58,
            language: "TypeScript",
            topics: ["desktop-app", "electron", "pixel-art", "productivity", "virtual-pet"],
            updated_at: "2026-08-07T14:00:00Z",
            featured: true,
            readme: "## Desktop_pet\n\nAn interactive, customizable virtual desktop companion that lives on your screen to provide ambient updates, micro-animations, and Pomodoro break reminders.\n\n### Key Features\n- 🎨 Custom sprite sheet & pixel skin loader\n- 🐾 Physics-based drag-and-drop & desktop wandering\n- ⏱️ Integrated Pomodoro & stretch break timers\n- ⚙️ CPU/RAM monitoring display widget"
        },
        {
            name: "code-to-diagram",
            description: "Automated codebase parser that turns source repositories into interactive dependency graphs, AST visualizations, and Mermaid architectural diagrams.",
            html_url: "https://github.com/theturkishangorashiro-art/code-to-diagram",
            homepage: "",
            stargazers_count: 750,
            forks_count: 112,
            language: "Python",
            topics: ["ast-parser", "mermaid", "visualization", "architecture", "cli-tool"],
            updated_at: "2026-08-06T18:30:00Z",
            featured: true,
            readme: "## code-to-diagram\n\nAutomatically parse codebase ASTs, function call graphs, and file dependencies into structured visualizations and flowcharts.\n\n### Key Features\n- ⚡ Multi-language AST parsing (TS/JS, Python, Go, Rust, C++)\n- 📈 Exports to Mermaid.js, SVG, PNG, and interactive HTML\n- 🔍 Interactive zoom, filter by directory, and AST inspection\n- 🔄 GitHub Actions integration to auto-update README diagrams"
        },
        {
            name: "terminal-api-client",
            description: "Keyboard-driven terminal API client and TUI inspector for REST & GraphQL endpoints with built-in latency benchmarking.",
            html_url: "https://github.com/theturkishangorashiro-art/terminal-api-client",
            homepage: "",
            stargazers_count: 610,
            forks_count: 74,
            language: "Rust",
            topics: ["cli", "tui", "api-client", "rust", "developer-tools"],
            updated_at: "2026-08-05T11:20:00Z",
            featured: true,
            readme: "## terminal-api-client\n\nA lightning-fast, keyboard-driven API testing suite and HTTP inspector built for terminal power users.\n\n### Key Features\n- ⌨️ Split-pane Terminal User Interface (TUI) with Vim keybindings\n- 🌈 Pretty-printed JSON, XML, and GraphQL syntax highlighting\n- 🔐 Environment variable and secret manager\n- 🚀 Built-in latency benchmarking and p95/p99 histograms"
        },
        {
            name: "my-projects",
            description: "Interactive GitHub Projects Portfolio website featuring glassmorphism UI, real-time repository stats, terminal overlay, and project showcases.",
            html_url: "https://github.com/theturkishangorashiro-art/my-projects",
            homepage: "https://theturkishangorashiro-art.github.io/my-projects/",
            stargazers_count: 320,
            forks_count: 42,
            language: "JavaScript",
            topics: ["portfolio", "github-pages", "glassmorphism", "javascript", "html5", "css3"],
            updated_at: "2026-08-08T08:00:00Z",
            featured: true,
            readme: "## my-projects\n\nInteractive GitHub Projects Portfolio showcasing open-source projects, repository statistics, code metrics, and an interactive developer CLI."
        },
        {
            name: "apply-and-pray",
            description: "Automated job application tracker & assistant tool for streamlining application workflows and managing career opportunities.",
            html_url: "https://github.com/theturkishangorashiro-art/apply-and-pray",
            homepage: "",
            stargazers_count: 185,
            forks_count: 24,
            language: "TypeScript",
            topics: ["job-search", "automation", "typescript", "productivity", "career-tools"],
            updated_at: "2026-08-04T16:00:00Z",
            featured: true,
            readme: "## apply-and-pray\n\nAutomated assistant tool for tracking job applications, organizing candidate workflows, and managing responses."
        }
    ],

    // Skills Matrix for interactive filtering
    skills: [
        { name: "TypeScript / JS", category: "Frontend", level: 95, icon: "⚡", languageTag: "TypeScript" },
        { name: "React & Next.js", category: "Frontend", level: 90, icon: "⚛️", languageTag: "JavaScript" },
        { name: "Python & AI/ML", category: "Backend / AI", level: 88, icon: "🐍", languageTag: "Python" },
        { name: "Rust", category: "Systems", level: 82, icon: "🦀", languageTag: "Rust" },
        { name: "Go", category: "Backend", level: 85, icon: "🐹", languageTag: "Go" },
        { name: "CSS3 / Glassmorphism", category: "Design System", level: 95, icon: "🎨", languageTag: "CSS" },
        { name: "Docker & CI/CD", category: "DevOps", level: 84, icon: "🐳", languageTag: "HTML" },
        { name: "Git & Open Source", category: "Workflow", level: 92, icon: "🔀", languageTag: "" }
    ]
};
