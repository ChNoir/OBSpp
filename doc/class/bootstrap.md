# Bootstrap

La classe Bootstrap sert de point d’entrée pour exposer des données de démarrage au frontend via une route JavaScript dédiée.

## Rôle

Elle permet de :

- initialiser des services de base au démarrage ;
- enregistrer des données à exposer au navigateur ;
- créer une route accessible depuis le client, par exemple `/bootstrap.js`.

## Exemple d’utilisation

Voici un exemple typique du style utilisé dans le projet :

```ts
import { Bootstrap } from '@/Class/Bootstrap.back'

Bootstrap.addBootstrap('appConfig', () => ({
  enabled: true,
  version: '1.0.0',
  mode: 'production',
}))
```

Le résultat est ensuite exposé au frontend sous forme de variables globales, par exemple :

```js
window.__APPCONFIG__ = {
  enabled: true,
  version: '1.0.0',
  mode: 'production'
}
```

## Comportement principal

Lors de l’initialisation, Bootstrap :

1. crée une instance de logger ;
2. prépare le contexte i18n ;
3. enregistre une route `/bootstrap.js` ;
4. expose les valeurs ajoutées via `addBootstrap()`.

## Méthode utile

### `addBootstrap(name, callback)`

Cette méthode permet d’ajouter une donnée de démarrage qui sera rendue disponible au navigateur.

```ts
Bootstrap.addBootstrap('playerSettings', () => ({
  volume: 0.8,
  autoplay: true,
}))
```

## Bonnes pratiques

- utiliser des noms de bootstrap explicites et uniques ;
- ne transmettre que des données simples et sérialisables ;
- éviter les fonctions non déterministes dans le callback.
