import { EventEmitter } from 'events';
import type { UniversalEventMap } from '@/Types/Class/DOMStyleEmitter';
import { InitsClass } from '@/Class/InitsClass.shared';
import { I18n } from '@/Class/I18n/I18n.back';
import { ConsoleLogger } from '@/Class/ConsoleLogger.shared';
import { DOMStyleEmitterShared } from '@/Class/DOMStyleEmitter/DOMStyleEmitte.shared';


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


    static #init() { // Anti circular dependency
        DOMStyleEmitter.console = ConsoleLogger.getInstance("DOMStyleEmitter")
        DOMStyleEmitter.I18n = I18n.createColdContext<DOMStyleEmitter_I18nMap>()
    }


    static { InitsClass.register( DOMStyleEmitter.#init) }

    /**
     * Instance interne du EventEmitter Node.js.
     * Exposée en `protected` pour permettre aux sous-classes
     * (ex: EventBus) d'accéder aux listeners et d'enchaîner
     * des comportements personnalisés.
     */
    #emitter: EventEmitter 
  

    constructor( name : string | undefined = undefined ) {
        super(name)
        this.#emitter = new EventEmitter();
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
    addEventListener<K extends keyof EventMap>(event: K, listener: (detail: EventMap[K]) => void): void {
        this.#emitter.on(event as string, listener);
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
    removeEventListener<K extends keyof EventMap>(event: K, listener: (detail: EventMap[K]) => void): void {
        this.#emitter.off(event as string, listener);
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
    dispatchEvent<K extends keyof EventMap>(event: K, detail:  EventMap[K]): void {
        this.#emitter.emit(event as string, detail);
        this.logger("dispatchEvent", event as string , detail)
    }

    /**
     * Retourne le nombre de listeners enregistrés
     * pour un événement donné.
     * 
     * Principalement utile pour le debug sous Node.js.
     * 
     * Exemple :
     * 
     * const count = emitter.getAllEventListener("message");
     * 
     * @param eventName Nom de l'événement.
     * 
     * @returns Nombre de listeners enregistrés.
     */
    getAllEventListener<K extends keyof EventMap> (eventName: K) {
        return this.#emitter.listenerCount(eventName as string)
    }


}


type DOMStyleEmitter_I18nMap = {
    DOMStyleEmitter_log_addListener : { name : string; event : string }
    DOMStyleEmitter_log_removeListener : { name : string; event : string }
    DOMStyleEmitter_log_dispatchEvent : { name : string; event : string }
}
