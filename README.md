# Terminal Portfolio

Interactive terminal-style portfolio website built with Next.js 16, React 19, and modern web technologies.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Framer Motion, GSAP
- **Styling:** Tailwind CSS 4
- **3D:** Three.js
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Features

- Terminal-like interface with command input
- Interactive ASCII art
- Browser-style project showcase
- Smooth animations and transitions
- Responsive design

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── Terminal/           # Terminal UI components
│   ├── Browser/            # Browser overlay components
│   └── ui/                 # Reusable UI components
├── constants/              # Command definitions
├── data/                   # Projects & experience data
└── utils/                  # Utility functions
```

## Commands

Type `/command` in the terminal to see available commands.
