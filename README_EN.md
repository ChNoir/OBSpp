# OBSpp

**README** : [Français](./README.md) , [English](./README_EN.md)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-black?logo=express)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite)
![Esbuild](https://img.shields.io/badge/Build-esbuild-FFCF00?logo=esbuild)
![License](https://img.shields.io/github/license/ChNoir/OBSpp)
![GitHub repo size](https://img.shields.io/github/repo-size/ChNoir/OBSpp)
![Senior Dev Warning](https://img.shields.io/badge/Senior%20Dev%20Warning-👁️%20Protect%20Your%20Eyes%20🤡-red)

**OBSpp (OBS++)** is a fullstack TypeScript application designed to enhance **OBS Studio** with interactive features, custom overlays, streaming platform integrations (Twitch, YouTube, Discord), and a real-time communication system.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Google OAuth credentials (optional, for integrations)
- Twitch OAuth credentials (optional, for integrations)

### Installation

```bash
# Clone the project
git clone https://github.com/ChNoir/OBSpp.git
cd OBSpp

# Install dependencies
npm install

# Configure the environment
node ./dist/index.js --env

# Build the project
npm run build
```

### Launch

```bash
# Development mode (build + server)
npm run dev

# Debug mode
npm run dev:debug

# Start the server
npm run start
```

## ✨ Main Features

| Feature | Description |
|---|---|
| 💬 **Centralized chat** | Unify Twitch, YouTube, and Discord |
| 🎨 **Dynamic overlays** | Generate and serve overlays in real time |
| 🔌 **Real-time WebSocket** | Instant bidirectional communication |
| 🗄️ **SQLite + Cache** | Local persistence and optimization |
| 🌍 **Internationalization** | Multi-language support (i18n) |
| 🔐 **OAuth 2.0** | Secure Google/Twitch authentication |
| 📊 **Profiling** | Monitoring and performance analysis |

## 🛠️ Main Commands

| Command | Effect |
|---|---|
| `npm run dev` | Build and launch the server |
| `npm run build` | Compile backend and frontend |
| `npm run build:front` | Compile frontend only |
| `npm run start` | Start the server |
| `npm run help` | Display CLI help |
| `npm run token` | Launch OAuth 2.0 authentication |
| `npm run i18n` | Manage a file with translation keys |
| `npm run doc` | Launch the VuePress documentation |

## 📁 Project Structure

```
OBSpp/
├── src/                    # TypeScript source code
│   ├── Class/              # Business modules (Twitch, YouTube, OBS, etc.)
│   ├── EntryPoints/        # Frontend entry points
│   ├── Function/           # Utilities and CLI
│   └── Types/              # TypeScript definitions
├── cache/BuilderFront/     # Compiled frontend
├── dist/                   # Compiled backend JavaScript
├── public/                 # Static assets
├── OAuth/                  # OAuth configuration
├── local/                  # Translation files (i18n)
└── doc/                    # VuePress documentation
```

## 🤔 TypeScript Conventions

The project uses suffixes to identify the runtime context:

| Extension | Context |
|---|---|
| `.back.ts` | Backend (server) |
| `.front.ts` | Frontend (browser) |
| `.shared.ts` | Frontend + Backend |

Example: `MessageChat.shared.ts`

## 📚 Full Documentation

All detailed documentation is available in the `doc/` folder or by running:

```bash
npm run doc
```

## 🗺️ Project Roadmap

The roadmap below reflects the current state of the project and the priority development areas for OBSpp.

| Status | Context |
|---|---|
| 🟢 | Modular TypeScript architecture with `.back.ts`, `.front.ts`, and `.shared.ts` suffixes |
| 🟢 | Express server with WebSocket management |
| 🟡 | Twitch integration (OAuth, EventSub, chat, and websocket) |
| 🟡 | YouTube integration (OAuth + chat observer) |
| 🟡 | Discord integration (client and message management) |
| 🟡 | OBS control via `obs-websocket-js` |
| 🟢 | Centralized OAuth 2.0 system |
| 🟢 | Local cache management |
| 🟡 | SQLite |
| 🟡 | Dynamic overlays and frontend generation |
| 🟢 | Multi-language i18n system |
| 🟢 | Performance profiler and diagnostics |
| 🟢 | Build, env, and token CLI |
| 🟡 | Advanced custom command system |
| 🔴 | More complete viewer and badge management |
| 🔴 | Richer chat interaction events |
| 🔴 | Message moderation and automation |
| 🟡 | Smoother chat-to-overlay integration |
| 🔴 | Creation of reusable new overlays |
| 🔴 | Advanced overlay customization system |
| 🔴 | More dynamic and modular UI components |
| 🔴 | Frontend performance improvements |
| 🔴 | Better theme and layout management |
| 🔴 | Add more languages |
| 🟢 | Simplified translation addition |
| 🟡 | More complete developer documentation |
| 🟡 | More detailed extension and integration guides |
| 🔴 | Optimize frontend generation and loading |
| 🟡 | Better module documentation and responsibilities |
| 🔴 | Plugin / extension system |
| 🔴 | Community-extensible module system |
| 🔴 | Complete web administration interface |
| 🟡 | Stronger error handling and reconnect management for integrations |

## 🧪 A message to senior developers

> **Dear senior developer,**
>
> If you made it this far and just looked at the source code...
>
> **I am sorry.** 😅
>
> I want to clarify that any attempt to understand some parts of the code may cause:
>
> * 👁️ temporary vision loss;
> * 🧠 severe migraines;
> * 🤯 questioning your career choices;
> * ☕ abnormally high coffee consumption.
>
> If your eyes start burning after a few minutes of reading, do not panic.
>
> **I can send you free bleach or any other sufficiently powerful acid to clean your eyes.** 🧪👀
>
> *(Well... maybe take regular water instead. It is probably safer.)* 😂
>
> Thank you for having the courage to look at this code.
>
> **Respect.**

---

**OBSpp (OBS++)** — Fullstack TypeScript application to enhance OBS Studio  
Last updated: 31/08/2026
