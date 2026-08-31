# RegisteRoutes

`RegisteRoutes` centralise l’enregistrement des routes Express, middlewares, fichiers statiques et WebSocket.

## API

- `addStaticRouter(url, path)` : expose un dossier statique depuis une URL.
- `addRoute(url, Router)` : ajoute un router Express sur un chemin.
- `addMiddleware(handler, priorite)` : ajoute un middleware global trié par priorité.
- `addWsRoute(url, callback)` : enregistre une route WebSocket.
- `addURLs(...option)` : ajoute des routes HTTP simples avec méthode et handler.

## Récupération

`ServeurExpress` utilise ensuite :

- `getMiddlewares()` ;
- `getStaticRouter()` ;
- `getRoutes()` ;
- `getURLs()` ;
- `getWsRouter()`.

## Exemple

```ts
import { RegisteRoutes } from '@/Class/Express/RegisteRoutes.back'
import express from 'express'

const router = express.Router()
router.get('/hello', (req, res) => res.send('Hello'))

RegisteRoutes.addRoute('/api', router)
RegisteRoutes.addMiddleware((req, res, next) => {
  console.log('middleware global')
  next()
}, 10)

RegisteRoutes.addStaticRouter('/public', './public')
```

## Notes

- Les middlewares sont triés par priorité descendante.
- `addURLs` permet des routes auto-déclarées sans router Express.
- `addWsRoute` est utilisé par `ServeurExpress` pour gérer les upgrades WebSocket.
