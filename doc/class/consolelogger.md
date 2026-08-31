# ConsoleLogger

La classe ConsoleLogger centralise l’écriture des logs du projet avec un format commun, un préfixe temporel et un niveau de log configurable.

## Objectif

Elle sert à :

- afficher des messages de log, d’erreur ou d’avertissement de façon uniforme ;
- ajouter un contexte d’instance et un tag optionnel ;
- faciliter le débogage avec des préfixes lisibles.

## API disponible

### API d’instance

Créer une instance personnalisée pour un module spécifique :

```ts
import { ConsoleLogger } from '../Class/ConsoleLogger.shared'

const logger = ConsoleLogger.getInstance('Bootstrap', 'Init')
logger.log('Démarrage du service')
logger.warn('Attention, configuration partielle')
logger.error('Échec de l’initialisation')
```

### Méthodes principales

- `log(...message)` : affiche un message standard.
- `warn(...message)` : affiche un avertissement.
- `error(...message)` : affiche une erreur.
- `fatalError(...message)` : affiche une erreur fatale puis quitte le processus.
- `tag(tag: string)` : ajoute un tag au contexte du logger.

### API statique

Utilisation globale sans créer d’instance :

```ts
ConsoleLogger.log('Message système')
ConsoleLogger.warn('Avertissement système')
ConsoleLogger.error('Erreur système')
```

## Niveau de log

Le niveau de log peut être défini avec :

```ts
ConsoleLogger.SetLogLevel('Warn')
```

Valeurs autorisées :

- `All`
- `Warn`
- `Error`

## Format de sortie

Chaque message contient :

- l’heure au format `HH:MM:SS` ;
- le type de message (`LOG`, `WARN`, `ERROR`, `FATAL`) ;
- le nom de l’instance ;
- un tag optionnel.

Exemple :

```text
[14:32:11] [ LOG ] [Bootstrap] [Init] Démarrage du service
```

## Notes techniques

La classe gère aussi les cas particuliers suivants :

- les erreurs JavaScript sont formatées avec leur nom, leur message et leur stack ;
- les tableaux et objets sont sérialisés en JSON ;
- les valeurs primitives sont affichées directement.

## Bonnes pratiques

- privilégier `ConsoleLogger.getInstance(...)` pour les modules spécifiques ;
- utiliser des tags utiles pour différencier les sous-parties du système ;
- garder les logs lisibles et éviter les logs trop volumineux en production.
