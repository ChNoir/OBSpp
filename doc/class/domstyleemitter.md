# DOMStyleEmitter

`DOMStyleEmitter` est un wrapper sur `EventEmitter` de Node.js, avec une API inspirée du DOM pour travailler de manière similaire côté frontend.

## Rôle

- fournir `addEventListener`, `removeEventListener` et `dispatchEvent` ;
- offrir un pattern commun pour gérer les événements dans des classes backend et frontend ;
- permettre la journalisation des événements via `DOMStyleEmitterShared`.

## Principales méthodes

- `addEventListener(event, listener)` : ajoute un écouteur pour un événement.
- `removeEventListener(event, listener)` : supprime un écouteur.
- `dispatchEvent(event, detail)` : déclenche un événement avec des données.
- `getAllEventListener(event)` : retourne le nombre d'écouteurs enregistrés.

## Exemple d'utilisation

```ts
import { DOMStyleEmitter } from '@/Class/DOMStyleEmitter/DOMStyleEmitter.back'

interface MyEvents {
  message: { content: string }
  ready: {}
}

class MyService extends DOMStyleEmitter<MyEvents> {
  constructor() {
    super('MyService')
  }

  start() {
    this.dispatchEvent('ready', {})
  }
}

const service = new MyService()
service.addEventListener('message', detail => {
  console.log('Message reçu :', detail.content)
})
service.dispatchEvent('message', { content: 'Hello' })
```

## Notes techniques

- la classe utilise un `EventEmitter` privé pour stocker les listeners ;
- `DOMStyleEmitterShared` gère la journalisation d’événements lorsque `logEvent` est activé ;
- la classe s’initialise via `InitsClass.register(...)` pour charger `ConsoleLogger` et `I18n`.

## Quand l’utiliser

- pour normaliser la gestion des événements dans des services partagés ;
- lorsque l’on souhaite garder une interface d’événements proche du DOM dans du code backend ;
- pour faciliter la lecture et la maintenance des flux d’événements.
