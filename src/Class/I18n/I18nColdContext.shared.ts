import { I18nArgsMap, UniversalI18nMap } from "@/Types/Class/I18n"
import { I18nShared } from "./I18n.shared"


export class I18nColdContext<I18nTagMap extends Record<string, any> = UniversalI18nMap > {

    public get<K extends keyof I18nTagMap>(key: K , args?: I18nTagMap[K]): string {
        return I18nShared._get(String(key), args)
    }

    public replacesInText(text : string , ListeTag: I18nArgsMap<I18nTagMap> ) {
        return I18nShared._replacesInText(text, ListeTag )
    }

}
