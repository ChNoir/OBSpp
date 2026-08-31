# Guide Développeur OBSpp

Ce guide aide les développeurs à comprendre et contribuer au projet OBSpp.

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


## 📂 Structure Code Source (`src/`)
```
src/
├── Class/
│   ├── Système Core
│   │   ├── InitsClass/             # Classe d'initialisation partagée
│   │   ├── ConsoleLogger/          # Système de logging
│   │   ├── EnvConfig/              # Configuration environnement
│   │   ├── CLIManager/             # Gestion interface en ligne de commande
│   │   ├── EventClass/             # Gestion des événements
│   │   ├── OAuth2Manager/          # Gestion OAuth 2.0
│   │   ├── DOMStyleEmitter/        # Émetteur de styles DOM
│   │   ├── BuilderFront/           # Compilateur pour frontend
│   │   └── I18n/                   # Internationalisation multi-langue
│   │
│   ├── Données & Stockage
│   │   ├── SQLite/                 # Base de données locale
│   │   ├── CacheManager/           # Gestion du cache
│   │   └── FilesManager/           # Gestion des fichiers
│   │
│   ├── Communication & Réseau
│   │   ├── WebSocket/              # Serveur WebSocket temps réel
│   │   ├── WSClient/               # Client WebSocket 
│   │   ├── Express/                # Serveur HTTP Express
│   │   └── BuilderAPI/             # Endpoints API REST custom
│   │
│   ├── Chat & Commandes
│   │   ├── MessageChat/            # Gestion des messages chat
│   │   └── ChatCommandeManager/    # Traitement des commandes chat
│   │
│   ├── Intégrations Externes
│   │   ├── Twitch/                 # Intégration Twitch (OAuth, chat, viewers)
│   │   ├── ClientYoutube/          # Intégration YouTube
│   │   ├── Discord/                # Intégration Discord
│   │   └── OBS/                    # Contrôle et intégration OBS
│   │
│   ├── Frontend & UI
│   │   ├── Bootstrap/              # configuration du système cote front
│   │   ├── AudioPlayer/            # Lecteur audio
│   │   ├── PlayListeManager/       # Gestion des playlists
│   │   └── Overlays/               # Système de gestion des overlays
│   │
│   ├── Monitoring
│   │   └── PerformanceProfiler/     # Profiling et monitoring performance
│   │
│   └── Utilitaires
│       ├── ActionGrid/              # Grille d'actions personnalisées
│       ├── ViewerManager/           # Gestion des utilisateurs/viewers
│       └── ChatCommandeManager/    # Traitement des commandes chat
│
├── CSS/                             # Feuilles de style
├── EntryPoints/                     # Points d'entrée du code frontend
├── Function/                        # Fonctions utilitaires
└── Types/                           # Définitions TypeScript et constantes
```


## ➕ Ajouter ou modifier un module

### Structure recommandée

```
src/Class/MyFeature/
├── MyFeature.back.ts       # Logic backend
├── MyFeature.front.ts      # Logic frontend
├── MyFeature.shared.ts     # Types + utilitaires partagés
├── type.ts                 # Types TypeScript (optionnel)
└── index.ts                # Export (optionnel)
```

### Conventions de fichiers

| Extension | Contexte | Utilisation |
|---|---|---|
| `.back.ts` | Backend uniquement | Logique serveur, I/O |
| `.front.ts` | Frontend (navigateur) | DOM, UI, événements clients |
| `.shared.ts` | Backend + Frontend | Types, interfaces, utilitaires |

**Exemple :**
```typescript
// MyFeature.shared.ts

export class MyFeatureShared {
  static endpoint : string = "/MyFeature/enpoint"
}

// MyFeature.back.ts - Backend
import { MyFeatureShared } from './MyFeature.shared';
import { EventClass } from '../EventClass';

export class MyFeatureManager extends MyFeatureShared {
  init() {
    const endpoint = MyFeatureManager.endpoint
    /// code 
  }
}

// MyFeature.front.ts - Frontend
import { MyFeatureShared } from './MyFeature.shared';
export class MyFeatureManager extends MyFeatureShared {
  sendMessage() {
    const endpoint = MyFeatureManager.endpoint
    fetch(endpoint)
  }
}
```

### Enregistrement du module

Pour qu'un module soit initialisé, il doit être enregistré dans `InitsClass` :

```typescript

import { InitsClass } from '@/InitsClass.shared.ts';
export class MyFeatureManager extends MyFeatureShared {

  static {
    InitsClass.register(MyFeatureManager.#_init , 0)
  }

  static #_init( option ?: { [key : string] : any }) {}
}

```

### Communication entre modules




## 🔧 Conventions de développement

### Nommage

- **Classes** : PascalCase (`MyClass`)
- **Fonctions** : camelCase (`myFunction`)
- **Constantes** : UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **Interfaces** : PascalCase avec `I` prefix optionnel (`IMyInterface`)
- **Types** : PascalCase (`MyType`)

### Logging

```typescript
// Utiliser ConsoleLogger
import { ConsoleLogger } from '../ConsoleLogger';

const logger = ConsoleLogger.getInstance('MyFeature');

logger.info('Message d\'information');
logger.warn('Avertissement');
logger.error('Erreur');
logger.debug('Debug (seulement en mode debug)');
logger.fatalError("Fatal Error et arrete le programme")
```

### Gestion des erreurs

```typescript
try {
  // Code
} catch (error) {
  logger.error('Context', error);
}
```

---

### Profiling

Le projet génère automatiquement un rapport de profiling en mode debug. 
Deux façons de profiler le code :

**Méthode 1 : Décorateur (classe)**
```typescript
import { PerformanceProfiler } from '../PerformanceProfiler';

export class MyFeatureManager extends MyFeatureShared {
  
  @PerformanceProfiler.decorator()
  processData(data: any) {
    // Code à profiler
  }
}
```

**Méthode 2 : Context Manager (fonction)**
```typescript
import { PerformanceProfiler } from '../PerformanceProfiler';

function processLargeFile(filePath: string): void {
  using perf = PerformanceProfiler.measure('processLargeFile');
  // Code à profiler
  // Le temps d'exécution est enregistré à la sortie du bloc
}
```

Les rapports sont affichés à l'arrêt du serveur (Ctrl+C)

## 📝 Documentation

Toutes les classes et fonctions doivent être documentées avec JSDoc en TypeScript et dans la documentation VuePress.

### Structure VuePress

La documentation se trouve dans `./doc/class/`. Pour votre feature, créez :

```
./doc/class/MyFeature/
├── index.md           # Vue d'ensemble et sommaire
├── usage.md           # Guide d'utilisation
├── api.md             # Documentation des APIs
└── examples.md        # Exemples concrets
```

### Fichier index.md

```markdown
# MyFeature

Brève description de votre module.

## Vue d'ensemble

Explications détaillées du fonctionnement.

## Sommaire

- [Guide d'utilisation](./usage.md)
- [Référence API](./api.md)
- [Exemples](./examples.md)
```






---

Bon développement ! 🚀
