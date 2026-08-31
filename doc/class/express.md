# Express

Le module `Express` du projet expose une couche d’abstraction pour les routes HTTP, les middlewares, les fichiers statiques et les WebSocket.

## Composants principaux

- `RegisteRoutes` : registre les routes, middlewares, routers statiques et WebSocket.
- `ServeurExpress` : initialise et lance le serveur Express / HTTPS.
- `ExpressResponse` : étend `res` avec une interface API uniforme via `res.api`.

## Flux

1. `RegisteRoutes` collecte les routes et middlewares dans des caches internes.
2. `ServeurExpress.init(option)` branche ces routes sur l’application Express.
3. `ServeurExpress.createServeur()` démarre le serveur HTTP ou HTTPS.
4. `ExpressResponse` est injecté en middleware pour ajouter `res.api`.

## Exemple rapide

```ts
import { ServeurExpress } from '@/Class/Express/ServeurExpress.back'

ServeurExpress.init({ port: 3000, webSocket: true })
```

## Bonnes pratiques

- enregistrer les routes via `RegisteRoutes.addRoute` ou `addURLs`; 
- ajouter les middlewares avec une priorité explicite ;
- utiliser `ExpressResponse` pour renvoyer des réponses JSON structurées.
