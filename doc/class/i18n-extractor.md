# I18nExtractor

`I18nExtractor` parcourt le code TypeScript pour extraire automatiquement les tags i18n utilisés et générer les fichiers `local/*.json` et `local/*.hot.json`.

## Quand l'utiliser

- lors de l'ajout de nouvelles clés i18n dans le code ;
- pour garder les fichiers de traduction synchronisés avec le code source.

## Exemple d'exécution

Le module utilise TypeScript Compiler API. Exemple d'appel dans un script Node :

```ts
import { I18nExtractor } from '@/Class/I18n/I18nExtractor.shared'

// Génère local/en.json et local/en.hot.json dans outputDir
I18nExtractor.start('./local', 'en')
```

## Comportement

- collecte les clés des appels à `I18n.createColdContext<T>()` et `I18n.createHotContext<T>()` ;
- compare avec les fichiers existants et supprime les tags morts ;
- crée ou met à jour les fichiers JSON avec les tags trouvés.

## Notes

- Utilise `tsconfig.json` pour découvrir les fichiers source ;
- utile pour garder une base de traduction propre et éviter les clés orphelines.
