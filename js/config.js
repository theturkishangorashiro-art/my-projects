/**
 * Portfolio Configuration File
 * Customize your default GitHub username, profile details, and showcase defaults here.
 */

window.PORTFOLIO_CONFIG = {
    // Default GitHub username to fetch repositories for when the page loads
    defaultUsername: "theturkishangorashiro-art",

    // Custom profile override details (used if API fails or for personal branding)
    profile: {
        name: "Developer & Open Source Creator",
        title: "Full-Stack Developer & Software Architect",
        bio: "Turning coffee and AI prompts into working apps before my context window runs out. ☕✨ Building full-stack web apps, solving real-world challenges, and always open to learn, collaborate, or build new projects!",
        location: "Global / Remote",
        email: "dev@example.com",
        github: "https://github.com/theturkishangorashiro-art/apply-and-pray",
        linkedin: "https://www.linkedin.com/in/shubham-sunil-kumar-333547133/",
        twitter: "https://twitter.com",
        githubSponsor: "https://github.com/sponsors/theturkishangorashiro-art",
        cryptoUsdtAddress: "0x512f80a85f23a30742675f2d14b2a7b285499131",
        cryptoNetwork: "BSC (BEP20)",
        avatarFallback: "https://avatars.githubusercontent.com/u/9919?v=4"
    },

    // Curated showcase projects with rich fallback data (used for instant loading & rate-limit resilience)
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
            name: "antigravity-studio",
            description: "Next-generation AI agent workstation with real-time multi-agent orchestration, interactive browser automation, and visual workflow canvas.",
            html_url: "https://github.com/topics/ai",
            homepage: "https://github.com",
            stargazers_count: 1420,
            forks_count: 310,
            language: "TypeScript",
            topics: ["ai", "react", "agentic-ai", "visualization", "desktop-app"],
            updated_at: "2026-08-01T12:00:00Z",
            featured: true,
            readme: "## AntiGravity Studio\n\nA high-performance workstation for orchestrating multi-agent systems with live canvas visualizers, Chrome DevTools integrations, and modular skill execution.\n\n### Key Features\n- 🚀 Real-time agent visualizer\n- 🎨 Modern Glassmorphic UI\n- 🔌 Extensible Plugin architecture"
        },
        {
            name: "hyper-mesh-db",
            description: "Ultra-fast distributed in-memory key-value database built in Rust with zero-copy deserialization and raft consensus algorithm.",
            html_url: "https://github.com/topics/rust",
            homepage: "",
            stargazers_count: 890,
            forks_count: 145,
            language: "Rust",
            topics: ["rust", "database", "distributed-systems", "raft-consensus", "high-performance"],
            updated_at: "2026-07-28T09:30:00Z",
            featured: true,
            readme: "## HyperMesh DB\n\nUltra-fast distributed storage powered by Rust and io_uring.\n\n### Benchmarks\n- Read throughput: 2.4M ops/sec\n- Write latency: < 0.4ms"
        },
        {
            name: "cyber-canvas-ui",
            description: "Modern component library & design system featuring glassmorphism, responsive layout primitives, and micro-interactions for modern web applications.",
            html_url: "https://github.com/topics/css",
            homepage: "https://github.com",
            stargazers_count: 630,
            forks_count: 92,
            language: "CSS",
            topics: ["design-system", "css3", "glassmorphism", "components", "web-design"],
            updated_at: "2026-08-05T15:45:00Z",
            featured: true,
            readme: "## Cyber Canvas UI\n\nA futuristic UI kit built with native CSS custom properties and zero-dependency animation primitives."
        },
        {
            name: "vision-flow-ml",
            description: "Lightweight computer vision pipeline for real-time gesture recognition and object tracking using WebAssembly and WebGL acceleration.",
            html_url: "https://github.com/topics/machine-learning",
            homepage: "",
            stargazers_count: 512,
            forks_count: 78,
            language: "Python",
            topics: ["python", "computer-vision", "webassembly", "deep-learning", "opencv"],
            updated_at: "2026-07-15T18:20:00Z",
            featured: false,
            readme: "## VisionFlow ML\n\nReal-time object detection running directly in the browser via WebAssembly."
        },
        {
            name: "quantum-cli",
            description: "Developer CLI productivity toolkit with interactive fuzzy finders, git workflow automation, and custom dashboard widgets.",
            html_url: "https://github.com/topics/cli",
            homepage: "",
            stargazers_count: 340,
            forks_count: 42,
            language: "Go",
            topics: ["go", "cli", "terminal", "developer-tools", "productivity"],
            updated_at: "2026-08-02T11:10:00Z",
            featured: false,
            readme: "## Quantum CLI\n\nLightning-fast terminal interface for dev workflows."
        },
        {
            name: "nexus-api-gateway",
            description: "Scalable API gateway featuring rate limiting, JWT validation, automated swagger doc generation, and low-latency proxy routing.",
            html_url: "https://github.com/topics/api",
            homepage: "",
            stargazers_count: 285,
            forks_count: 38,
            language: "JavaScript",
            topics: ["javascript", "nodejs", "api-gateway", "microservices", "express"],
            updated_at: "2026-06-20T10:00:00Z",
            featured: false,
            readme: "## Nexus API Gateway\n\nHigh throughput gateway built on Node.js cluster mode."
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
