# OBSpp

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-black?logo=express)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite)
![Esbuild](https://img.shields.io/badge/Build-esbuild-FFCF00?logo=esbuild)
![License](https://img.shields.io/github/license/ChNoir/OBSpp)
![GitHub repo size](https://img.shields.io/github/repo-size/ChNoir/OBSpp)
![Senior Dev Warning](https://img.shields.io/badge/Senior%20Dev%20Warning-👁️%20Protect%20Your%20Eyes%20🤡-red)

**OBSpp (OBS++)** est une application Fullstack TypeScript permettant d'enrichir **OBS Studio** avec des fonctionnalités interactives, des overlays personnalisés, des intégrations de plateformes de streaming (Twitch, YouTube, Discord) et un système de communication temps réel.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- npm 10+
- Google OAuth credentials (optionnel, pour intégration)
- Twitch OAuth credentials (optionnel, pour intégration)

### Installation

```bash
# Cloner le projet
git clone https://github.com/ChNoir/OBSpp.git
cd OBSpp

# Installer les dépendances
npm install

# Configurer l'environnement
node ./dist/index.js --env

# Compiler le projet
npm run build
```

### Lancement

```bash
# Mode développement (build + serveur)
npm run dev

# Mode debug
npm run dev:debug

# Start le serveur
npm run start
```


## ✨ Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| 💬 **Chat centralisé** | Unifier Twitch, YouTube, Discord |
| 🎨 **Overlays dynamiques** | Générer et servir des overlays en temps réel |
| 🔌 **WebSocket temps réel** | Communication bidirectionnelle instantanée |
| 🗄️ **SQLite + Cache** | Persistance locale et optimisation |
| 🌍 **Internationalisation** | Support multi-langues (i18n) |
| 🔐 **OAuth 2.0** | Authentification sécurisée Google/Twitch |
| 📊 **Profiling** | Monitoring et analyse de performance |

## 🛠️ Commandes principales

| Commande | Effet |
|---|---|
| `npm run dev` | Build + lancer le serveur |
| `npm run build` | Compiler backend et frontend |
| `npm run build:front` | Compiler frontend uniquement |
| `npm run start` | Start le serveur |
| `npm run help` | Afficher l'aide CLI |
| `npm run token` | Lancer les authentification OAuth 2.0 |
| `npm run i18n` | Gérer un ficher avec les clés de traductions |
| `npm run doc` | Lancer la documentation VuePress |

## 📁 Structure du projet

```
OBSpp/
├── src/                    # Code source TypeScript
│   ├── Class/              # Modules métier (Twitch, YouTube, OBS, etc.)
│   ├── EntryPoints/        # Points d'entrée frontend
│   ├── Function/           # Utilitaires et CLI
│   └── Types/              # Définitions TypeScript
├── cache/BuilderFront/     # Frontend compilé
├── dist/                   # Backend JavaScript compilé
├── public/                 # Assets statiques
├── OAuth/                  # Configuration OAuth
├── local/                  # Fichiers de traduction (i18n)
└── doc/                    # Documentation VuePress
```

## 🤔 Conventions TypeScript

Le projet utilise des suffixes pour identifier le contexte d'exécution :

| Extension | Contexte |
|---|---|
| `.back.ts` | Backend (serveur) |
| `.front.ts` | Frontend (navigateur) |
| `.shared.ts` | Frontend + Backend |

Exemple : `MessageChat.shared.ts`

## 📚 Documentation complète

Toute la documentation détaillée est disponible dans le dossier `doc/` ou fait : 

```bash
npm run doc
```

## 🗺️ Roadmap projet

La roadmap ci-dessous reflète l’état actuel du projet et les axes de développement prioritaires pour OBSpp.

| Statut | Contexte |
|---|---|
| 🟢 | Architecture modulaire TypeScript avec suffixes `.back.ts`, `.front.ts`, `.shared.ts`|
| 🟢 | Serveur Express avec gestion WebSocket|
| 🟡 | intégration Twitch (OAuth, EventSub, chat et websocket)|
| 🟡 | intégration YouTube (OAuth + observateur de chat)|
| 🟡 | intégration Discord (client et gestion de messages)|
| 🟡 | contrôle OBS via `obs-websocket-js`|
| 🟢 | système OAuth 2.0 centralisé|
| 🟢 | gestion de cache locale |
| 🟡 | SQLite|
| 🟡 | overlays dynamiques et génération frontend|
| 🟢 | système d’i18n multi-langues|
| 🟢 | profiler de performance et diagnostics|
| 🟢 | CLI de build, env et gestion des tokens|
| 🟡 | Système de commandes personnalisées avancées|
| 🔴 | Gestion plus complète des viewers et badges|
| 🔴 | Événements d’interactions chat plus riches|
| 🔴 | Modération et automatisation de messages|
| 🟡 | Intégration plus fluide entre chat et overlays|
| 🔴 | Création de nouveaux overlays réutilisables|
| 🔴 | Système de personnalisation avancée des overlays|
| 🔴 | Composants UI plus dynamiques et modulaires|
| 🔴 | Amélioration des performances frontend|
| 🔴 | Meilleure gestion des thèmes et des layouts|
| 🔴 | Ajout de nouvelles langues|
| 🟢 | Simplification de l’ajout de traductions |
| 🟡 | Documentation développeur plus complète|
| 🟡 | Guides d’extension et d’intégration plus détaillés|
| 🔴 | Optimiser la génération et le chargement des frontends|
| 🟡 | Mieux documenter les modules et leurs responsabilités|
| 🔴 | Système de plugins / extensions|
| 🔴 | Système de modules extensibles par la communauté|
| 🔴 | Interface Web complète d’administration|
| 🟡 | Renforcer la gestion des erreurs et reconnects des intégrations|


## 🧪 Message aux développeurs seniors

> **Cher développeur senior,**
>
> Si tu es arrivé jusqu'ici et que tu viens de regarder le code source...
>
> **Je suis désolé.** 😅
>
> Je tiens à préciser que toute tentative de comprendre certaines parties du code peut provoquer :
>
> * 👁️ une perte temporaire de vision ;
> * 🧠 des migraines sévères ;
> * 🤯 une remise en question de tes choix de carrière ;
> * ☕ une consommation anormalement élevée de café.
>
> Si tes yeux commencent à piquer après quelques minutes de lecture, pas de panique.
>
> **Je peux t'envoyer gratuitement de l'eau de Javel ou tout autre acide suffisamment puissant pour nettoyer tes yeux.** 🧪👀
>
> *(Bon... finalement, prends plutôt de l'eau normale. C'est probablement plus prudent.)* 😂
>
> Merci d'avoir eu le courage de regarder ce code.
>
> **Respect.**

---

**OBSpp (OBS++)** — Application Fullstack TypeScript pour enrichir OBS Studio  
Dernière mise à jour : 31/08/2026
