# I18n — Hot Context

Le `HotContext` permet d'utiliser des traductions chargées à chaud (édition locale via `<lang>.hot.json`).

## Usage

```ts
import { I18n } from '@/Class/I18n/I18n.back'

type I18nTagMap = { welcome: { name: string } }

const hot = await I18n.createHotContext<I18nTagMap>('en')
const text = hot.get('welcome', { name: 'Eve' })
```

## Différences avec Cold

- Le `HotContext` prend en argument un `local` spécifique et peut être rechargé indépendamment.
- Idéal pour les éditeurs ou les interfaces d'administration qui modifient les traductions sans redéployer.

## Bonnes pratiques

- conserver les clés synchronisées entre les fichiers cold et hot ;
- utiliser le hot seulement pour modifications temporaires ou tests.
