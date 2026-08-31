# ServeurExpress

`ServeurExpress` initialise le serveur HTTP/HTTPS du projet et branche les routes définies par `RegisteRoutes`.

## Fonctionnalités

- application Express centralisée ;
- route statique ;
- middleware global ;
- serveurs HTTP et HTTPS automatiques ;
- support WebSocket via `upgrade`.

## Utilisation

```ts
import { ServeurExpress } from '@/Class/Express/ServeurExpress.back'

ServeurExpress.init({
  port: 8080,
  webSocket: true,
  certPath: './cert.pem',
  keyPath: './key.pem',
  serveurRun: ({ port, isSSL }) => {
    console.log(`Serveur démarré sur ${isSSL ? 'https' : 'http'}://${port}`)
  }
})
```

## Comportement

- la méthode `init(option)` branche les middlewares, routes statiques, routes et URLs ;
- `createServeur()` démarre en HTTPS si les certificats existent ;
- `SetWebSocket()` gère les upgrades WebSocket sur les routes enregistrées ;
- `close()` tente d’arrêter proprement le serveur en fermant les connexions.

## Bonnes pratiques

- utiliser `RegisteRoutes.addMiddleware()` pour les middlewares globaux ;
- ajouter les routes avant d’appeler `ServeurExpress.init()` ;
- définir `serveurRun` pour recevoir un callback de démarrage.
