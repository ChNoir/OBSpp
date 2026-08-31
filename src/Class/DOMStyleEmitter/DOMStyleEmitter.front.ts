
import type { FontListener, UniversalEventMap } from '@/Types/Class/DOMStyleEmitter';
import { DOMStyleEmitterShared } from './DOMStyleEmitte.shared';


/**
 * Wrapper autour de EventEmitter avec une API inspirée du DOM.
 * 
 * Permet d'utiliser :
 * - addEventListener()
 * - removeEventListener()
 * - dispatchEvent()
 * 
 * comme dans le front-end.
 * 
 * Exemple :
 * ```js
 * const emitter = new DOMStyleEmitter();
 * 
 * emitter.addEventListener("message", (data) => {
 *     console.log(data);
 * });
 * 
 * emitter.dispatchEvent("message", {
 *     text: "Hello"
 * });
 * ```
 * 
 * Class qui indique mon endoctrinement par le front-end ¯\_(ツ)_/¯
 */
export class DOMStyleEmitter<EventMap extends Record<string, any> = UniversalEventMap> extends DOMStyleEmitterShared {

    /**
     * Instance interne du EventEmitter Node.js.
     * Exposée en `protected` pour permettre aux sous-classes
     * (ex: EventBus) d'accéder aux listeners et d'enchaîner
     * des comportements personnalisés.
     */
    #emitter: EventTarget
  

    constructor(name : string | undefined = undefined ) {
        super(name)
        this.#emitter = new EventTarget();
    }


    /**
     * Ajoute un listener sur un événement.
     * 
     * Exemple :
     * ```js
     * emitter.addEventListener("connect", (data) => {
     *     console.log(data.user);
     * });
     * ```
     * 
     * 
     * @param event Nom de l'événement.
     * @param listener Fonction appelée lors du déclenchement.
     */
    addEventListener<K extends keyof EventMap>(event: K, listener: FontListener<EventMap[K]> ) : void {
        this.#emitter.addEventListener(event as string, listener as EventListener);
        this.logger("addListener" , event as string)
        
    }

    /**
     * Supprime un listener d'un événement.
     * 
     * Le listener doit être exactement la même référence
     * que celle utilisée dans addEventListener().
     * 
     * Exemple :
     * 
     * ```js
     * const callback = () => {};
     * 
     * emitter.addEventListener("test", callback);
     * emitter.removeEventListener("test", callback);
     * ```
     * 
     * 
     * @param event Nom de l'événement.
     * @param listener Listener à supprimer.
     */
    removeEventListener<K extends keyof EventMap>(event: K, listener: FontListener<EventMap[K]>): void {
        this.#emitter.removeEventListener(event as string, listener as EventListener);
        this.logger("removeListener" , event as string)
    }

    /**
     * Déclenche un événement.
     * 
     * Exemple :
     * ```js
     * emitter.dispatchEvent("message", {
     *     content: "Hello"
     * });
     * ```
     * 
     * 
     * @param event Nom de l'événement.
     * @param detail Données transmises aux listeners.
     */
    dispatchEvent<K extends keyof EventMap>(event: K, detail :  EventMap[K]): void {
        this.#emitter.dispatchEvent(new CustomEvent(event as string, { detail }));
        this.logger("dispatchEvent" , event as string , detail)
    }

}


