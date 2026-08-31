# InitsClass

InitsClass est un utilitaire d’initialisation utilisé pour exécuter plusieurs fonctions d’initialisation de façon ordonnée et configurable.

## Rôle

Cette classe permet de :

- enregistrer des fonctions d’initialisation ;
- définir une priorité d’exécution ;
- lancer toutes les initialisations à partir d’un seul point ;
- gérer les enregistrements ajoutés pendant l’exécution.

## Fonctionnement principal

### Enregistrement d’une initialisation

```ts
import { InitsClass } from '../Class/InitsClass.shared'

InitsClass.register(async () => {
  console.log('Initialisation du module')
}, 10)
```

Chaque fonction est enregistrée avec :

- une fonction `init` ;
- une `priorite` numérique.

### Lancement de l’initialisation

```ts
await InitsClass.start()
```

La méthode `start()` exécute toutes les fonctions enregistrées dans l’ordre défini par la priorité.

## Priorité

Les fonctions avec une priorité plus élevée sont exécutées en premier.

Exemple :

```ts
InitsClass.register(async () => {
  // priorité par défaut
}, 0)

InitsClass.register(async () => {
  // exécutée avant la précédente
}, 20)
```

## Comportement interne

La classe gère deux listes internes :

- une liste principale des initialisations à exécuter ;
- une liste tampon pour les enregistrements ajoutés pendant la phase d’initialisation.

Cela permet d’éviter les problèmes d’exécution si un module s’enregistre pendant qu’un autre est déjà en cours d’initialisation.

## Bonnes pratiques

- utiliser des priorités cohérentes pour éviter les dépendances implicites ;
- garder les fonctions d’initialisation courtes et explicites ;
- éviter les initialisations qui dépendent de modules non encore prêts.

## Exemple concret dans une classe

Voici un exemple d’utilisation dans une classe du projet, où l’initialisation est enregistrée au chargement de la classe :

```ts
import { InitsClass } from '@/Class/InitsClass.shared'

export class ExampleService {
  private static async init() {
    console.log('Initialisation de ExampleService')
  }

  static {
    InitsClass.register(ExampleService.init, 10)
  }
}
```

Dans ce pattern :

- la méthode `init()` contient la logique d’initialisation ;
- le bloc `static {}` enregistre cette initialisation au démarrage ;
- la priorité `10` permet de la lancer avant les initialisations moins prioritaires.

Cela correspond bien au style d’intégration utilisé dans le projet pour brancher des modules au cycle de démarrage.

