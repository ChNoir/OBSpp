# ExpressResponse

`ExpressResponse` enrichit l’objet `res` d’Express avec une API structurée pour les réponses JSON.

## Fonctionnement

- un middleware injecte `res.api` sur chaque requête ;
- `res.api.send(option)` renvoie une réponse standardisée avec `success`, `status`, `code`, `message`, `data` et `meta`.

## API

- `send(option)` : réponse JSON complète ;
- `success({ data, message, code })` : réponse réussie ;
- `error({ message, code, error, data })` : réponse d’erreur.

## Exemple

```ts
app.get('/api/status', (req, res) => {
  res.api.success({
    data: { uptime: process.uptime() },
    message: 'OK'
  })
})

app.post('/api/login', (req, res) => {
  res.api.error({ message: 'Identifiants invalides', code: 'AUTH_FAIL' })
})
```

## Détails

- `success()` utilise `code: 'SUCCESS'` par défaut ;
- `error()` utilise `code: 'ERROR'` par défaut, mais le status HTTP reste `200` par conception de l’API.
- `ExpressResponse.getMeta(error)` ajoute `iso`, `timestamp`, `name` et `stack` quand `debug` est activé.
