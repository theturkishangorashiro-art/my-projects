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
        bio: "Crafting elegant solutions, high-performance web apps, and open-source tools. Driven by code quality, modern UX, and creative technology.",
        location: "Global / Remote",
        email: "dev@example.com",
        github: "https://github.com/theturkishangorashiro-art",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        avatarFallback: "https://avatars.githubusercontent.com/u/9919?v=4"
    },

    // Curated showcase projects with rich fallback data (used for instant loading & rate-limit resilience)
    featuredProjects: [
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
