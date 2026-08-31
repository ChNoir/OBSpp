# I18n — Cold Context

Le `ColdContext` est utilisé pour accéder aux traductions statiques chargées au démarrage (fichiers `local/*.json`).

## Usage

```ts
import { I18n } from '@/Class/I18n/I18n.back'

type I18nTagMap = { welcome: { name: string } }

// Crée un contexte typé
const i18n = I18n.createColdContext<I18nTagMap>()

// Récupère une clé
const text = i18n.get('welcome', { name: 'Alice' })
```

## Comportement

- Les clés absentes retournent `{{missing:<key>}}`.
- Les clés vides retournent `{{empty:<key>}}`.
- Les placeholders `{{name}}` dans les textes sont remplacés par les valeurs fournies.

## Bonnes pratiques

- typer le contexte via l'argument générique pour profiter de l'auto-complétion.
- éviter d'utiliser des traductions dynamiques non-sérialisables.
