# Créer une classe dans le système

Ce guide montre le pattern recommandé pour ajouter une nouvelle classe dans le projet (backend / shared / frontend), en respectant les conventions du repository et l'ordre d'initialisation.

## Principes clés

- Séparer le code `back` / `front` / `shared` via les suffixes de fichier (`.back.ts`, `.front.ts`, `.shared.ts`).
- Utiliser `ConsoleLogger`, `I18n`, `EnvConfig` et `InitsClass` pour l'intégration cohérente avec le reste du projet.
- Enregistrer les initialisations via `InitsClass.register(...)` dans un bloc `static {}` pour qu'elles soient exécutées au démarrage.

## Template recommandé (Backend)

```ts
import { ConsoleLogger } from '@/Class/ConsoleLogger.shared'
import { I18n } from '@/Class/I18n/I18n.back'
import type { I18nColdContext } from '@/Class/I18n/I18nColdContext.shared'
import { EnvConfig } from '@/Class/EnvConfig/EnvConfig.back'
import type { EnvConfigContext } from '@/Class/EnvConfig/EnvConfigContext.shared'
import { InitsClass } from '@/Class/InitsClass.shared'

export class MyService {
  public static console: ConsoleLogger
  public static I18n: I18nColdContext<MyService_I18nMap>
  public static EnvConfig: EnvConfigContext<MyService_EnvConfigMap>

  // Méthode d'initialisation (peut être async)
  static async #init() {
    MyService.console = ConsoleLogger.getInstance('MyService')
    MyService.I18n = I18n.createColdContext<MyService_I18nMap>()
    MyService.EnvConfig = EnvConfig.createEnvConfigContext<MyService_EnvConfigMap>()

    // TODO: logique d'initialisation (connexion, setup, caches...)
  }

  // Enregistrement automatique au démarrage via InitsClass
  static { InitsClass.register(MyService.#init, 10) }
}
```

## Pattern Shared → Backend/Frontend

Créer d'abord un `MyClass.shared.ts` contenant le code partagé, puis étendre ce comportement dans les variantes backend ou frontend si nécessaire :

```ts
// MyClass.shared.ts
export class MyClassShared {
  public static console: ConsoleLogger
  // propriétés partagées...
}

// MyClass.back.ts
export class MyClass extends MyClassShared {
  static async #init() {
    MyClassShared.console = ConsoleLogger.getInstance('MyClass')
    // initialisation partie backend
  }

  static { InitsClass.register(MyClass.#init, 10) }
}
```

## Exemple d'utilisation réelle

Supposons que vous voulez enregistrer un service de lecture audio :

```ts
export class AudioPlayerService {
  static async #init() {
    AudioPlayerService.console = ConsoleLogger.getInstance('AudioPlayer')
    // charger playlist, initialiser le moteur audio…
  }

  static { InitsClass.register(AudioPlayerService.#init, 5) }
}
```

Ici la priorité `5` place l'initialisation après les services critiques (priorité plus élevée).

## Bonnes pratiques

- Utiliser des priorités explicites pour gérer les dépendances entre modules.
- Garder les fonctions d'initialisation courtes et idempotentes.
- Préférer `async/await` pour les opérations asynchrones et gérer proprement les erreurs.
- Eviter d'effectuer des tâches lourdes ou bloquantes dans `#init` — déléguer au runtime ou à des workers si nécessaire.

## Où documenter

Ajouter un fichier Markdown dans `doc/class/` (ex : `doc/class/myservice.md`) décrivant le rôle de la classe, ses méthodes publiques et exemples d'usage.

