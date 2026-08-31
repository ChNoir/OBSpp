# EnvConfig

`EnvConfig` fournit une couche commune pour lire les variables d'environnement et les exposer dans le projet.

## Rôle

- charger les variables d'environnement depuis `.env` en backend ;
- exposer les variables publiques au frontend via `Bootstrap` ;
- offrir un contexte typé pour récupérer les valeurs sous forme d'entier, booléen, tableau, JSON, URL, etc.

## Architecture

Le système se compose de trois parties :

- `EnvConfigShared` : fonctions utilitaires de lecture et validation ;
- `EnvConfigContext` : API typée pour accéder aux variables environnementales ;
- `EnvConfig` backend/front : initialisation et lecture des données.

## Exemple d'utilisation

```ts
import { EnvConfig } from '@/Class/EnvConfig/EnvConfig.back'

type EnvConfigTagMap = 'PORT' | 'ENABLE_FEATURE'

const config = EnvConfig.createEnvConfigContext<EnvConfigTagMap>()

const port = config.int.OrDefault('PORT', 3000)
const enabled = config.boolean.OrDefault('ENABLE_FEATURE', false)
```

## Exposer des configs au frontend

En backend, `EnvConfig` ajoute une variable publique via `Bootstrap.addBootstrap('CONFIG', ...)`.

```ts
EnvConfig.addPublicConfigTag('API_URL')
```

Cela permet de retrouver dans le navigateur un objet JSON contenant les tags publics définis.

## Chargement backend vs frontend

- backend (`EnvConfig.back.ts`) : lit `.env` via `dotenv.config()` ;
- frontend (`EnvConfig.front.ts`) : lit les valeurs publiques exposées dans `__CONFIG__`.

## Bonnes pratiques

- utiliser `checkTag()` en interne pour normaliser les clés (`MAJUSCULES`, `_`).
- déclarer les variables publiques nécessaires avec `addPublicConfigTag(...)`.
- préférer `OrDefault` ou `OrError` pour éviter les valeurs `undefined` silencieuses.
