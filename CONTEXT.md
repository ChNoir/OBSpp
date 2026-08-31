# OBSpp - Contexte du Projet

## 📋 Vue d'ensemble
**Nom**: OBSpp  (OBS++)  
**Type** : Fullstack
**Langage**: TypeScript , HTML/CSS 
**Builder**: Esbuild
**Http** : Express.JS
**Runtime** : NodeJS
**OAuth 2.0**: Google , Twitch
**Structure** : POO (Class Modulaire)

### Extension de fichier
- `*.back.ts`: Code backend (Serveur)
- `*.front.ts`: Code frontend (Client)
- `*.shared.ts`: Code partagé (Backend + Frontend)

## 🏗️ Build 

### Entrée principale (Backend)
- `src/index.ts` → compilé vers `dist/index.js`
- Build process: `node build.js`
- Code builder : `build.js`

### Entrée secondaire (Frontend)
- `src/EntryPoints/**/*.ts` → compilé vers `cache/BuilderFront/bundles/**/*.js`
- Build process: `node ./dist/index.js --build`
- Code builder : `src/Class/BuilderFront/BuilderFront.back.ts`
- Note : Le serveur definie c'est besoin pour le frontend, puis cree les pages


## 🏗️ Architecture

### Environnements
- **Source**: `src/` (TypeScript)
- **Production**: `dist/` (JavaScript compilé)
- **Cache**: `cache/` (Fichier de cache, comme les bundles compilés)
- **Public**: `public/` (Fichier statique, woff2,png,jpg,svg )
- **OAuth**: `OAuth/`(Fichier Json de 2oauth)
- **Doc**: `doc/`(VuePress du projet)
- **Local**: `local/`(fichier Json I18n)
- **Musiques**: `musiques/`(Musiques et pictures)


## 📂 Structure Code Source (`src/`)

- **Class/**: Classes métier et modules principaux
  - **Système Core**
    - **Bootstrap/**: Initialisation et configuration du système
    - **InitsClass/**: Classe d'initialisation partagée
    - **ConsoleLogger/**: Système de logging
    - **EnvConfig/**: Configuration environnement
    - **CLIManager/**: Gestion interface en ligne de commande
    - **EventClass/**: Gestion des événements
  - **Données & Stockage**
    - **SQLite/**: Base de données locale
    - **CacheManager/**: Gestion du cache
    - **FilesManager/**: Gestion des fichiers
  - **Communication & Réseau**
    - **WebSocket/**: Serveur WebSocket temps réel
    - **WSClient/**: Client WebSocket
    - **Express/**: Serveur HTTP Express
    - **BuilderAPI/**: Endpoints API REST custom
  - **Chat & Commandes**
    - **MessageChat/**: Gestion des messages chat
    - **ChatCommandeManager/**: Traitement des commandes chat
  - **Intégrations Externes**
    - **Twitch/**: Intégration Twitch (OAuth, chat, viewers)
    - **ClientYoutube/**: Intégration YouTube
    - **Discord/**: Intégration Discord
    - **OBS/**: Contrôle et intégration OBS
    - **OAuth2Manager/**: Gestion OAuth 2.0
  - **Frontend & UI**
    - **AudioPlayer/**: Lecteur audio
    - **PlayListeManager/**: Gestion des playlistes
    - **Overlays/**: Système de gestion des overlays
    - **DOMStyleEmitter/**: Émetteur de styles DOM
    - **BuilderFront/**: Compilateur pour frontend
  - **Monitoring**
    - **ViewerManager/**: Gestion des utilisateurs/viewers
    - **PerformanceProfiler/**: Profiling et monitoring performance
  - **Utilitaires**
    - **ActionGrid/**: Grille d'actions personnalisées
    - **I18n/**: Internationalisation multi-langue
- **CSS/**: Feuilles de style (reset, default, font, normal)
- **EntryPoints/**: Points d'entrée pour le code frontend 
- **Function/**: Function utilitaires
- **Types/**: Définitions TypeScript et constantes

## 📜 Scripts & Commandes

### Development
| Commande | Description |
|-|-|
| `npm run build` | Compile le backend + frontend (esbuild + BuilderFront) |
| `npm run dev` | Build complet + lance le serveur |
| `npm run dev:debug` | Build complet + lance avec mode debug |
| `npm run build:front` | Build uniquement le frontend (`EntryPoints/`) |

### Documentation
| Commande | Description |
|-|-|
| `npm run doc` | Lance VuePress en mode développement |

### CLI & Gestion
| Commande | Description |
|-|-|
| `npm run help` | Affiche l'aide CLI |
| `npm run i18n` | Gère l'internationalisation |
| `npm run token` | Gère les tokens OAuth |

### Options CLI Directes

Appelées via `node ./dist/index.js [option]` 

| Option | Alias | Description | Paramètres | Bloquant |
|--|-|-|--|-|
| `--help` | `-h` | Affiche ce message d'aide | - | Oui |
| `--man` | - | Affiche ce message d'aide (alias de --help) | - | Oui |
| `--token` | `-t` | Lance le processus de récupération des tokens d'authentification | - | Oui* |
| `--i18n` | `-i` | Crée un fichier de traductions i18n avec les fichier source | `[language]` (ex: fr, en) | Oui* |
| `--env` | `-e` | Crée un fichier .env avec les fichier source | - | Oui* |
| `--debug` | `-d` | Active le mode debug | `hard` (optionnel pour debug détaillé) | Non |
| `--clear` | - | Nettoie les caches/fichiers temporaires | - | Non |
| `--build` | - | Build le frontend uniquement | - | Oui |

**Note sur "Bloquant"**: Une option bloquante ("Oui") arrête l'exécution du programme après son traitement. Une option non-bloquante ("Non") permet au programme de continuer à s'exécuter après. 

(*) indique les options bloquantes qui arrêtent l'exécution du programme après le traitement de toutes les autres options


## 🚀 Flux de démarrage

Le démarrage du projet suit généralement ce schéma :

1. `src/index.ts` est exécuté au lancement du programme.
2. `InitsClass.start()` charge les classes système et les modules nécessaires.
3. Les fichiers de traduction I18n sont initialisés.
4. Le gestionnaire CLI lit les options passées en paramètre.
5. La base SQLite est initialisée et accessible.
6. Les routes statiques sont enregistrées dans le serveur HTTP.
7. Les événements de chat/messages sont branchés via `MessageManager`.
8. Les intégrations Twitch / YouTube / Discord / OBS sont initialisées.
9. Le serveur Express démarre avec WebSocket activé.
10. Le shutdown propre nettoie les ressources et affiche le rapport de performance.

Cela signifie que le cœur de compréhension du projet est :
- initialisation globale
- gestion des événements
- intégrations externes
- overlays
- serveur web



## Ce que on doit retenir pour comprendre le projet

L’idée générale du projet est la suivante :

- OBSpp est un backend TypeScript qui enrichit OBS Studio avec des fonctionnalités interactives.
- Il agit comme un hub central pour les messages, les overlays, les intégrations de plateformes et les services web.
- Le système est modulaire : chaque domaine est séparé dans `src/Class/...` selon sa responsabilité.
- Le projet combine :
  - serveur HTTP Express
  - WebSocket temps réel
  - intégration Twitch / YouTube / Discord / OBS
  - génération d’overlays
  - affichage frontend personnalisé
  - stockage local SQLite
  - cache et fichiers statiques
  - i18n et configuration

En pratique, le projet n’est pas juste “un site web”, mais plutôt une “application de streaming / controleur d’overlay / assistant de chat / outil de supervision” organisé en modules.


---

**Dernière mise à jour**: 31/08/2026

---


