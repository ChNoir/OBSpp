import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { I18n_EnvConfigMap, I18n_I18nMap, I18nArgsMap, UniversalI18nMap } from "@/Types/Class/I18n";



export abstract class I18nShared {
    

    protected static map : Record<string, string> = {} // Cold
    protected static locales : Record<string, Record<string,string>> = {} // Hot

    protected static local : string  = "fr"
    protected static localFolderPath : string = "./local/"

    protected static console: ConsoleLogger;
    static I18n: I18nColdContext<I18n_I18nMap> 
    static EnvConfig: EnvConfigContext<I18n_EnvConfigMap>

    public static setLocalFolderPath(path : string) {
        if (path.endsWith("/")) {
            I18nShared.localFolderPath = path 
        }else {
            I18nShared.localFolderPath = path  + "/"
        }
    }

    public static _get( key: string , args?: { [key: string]: any } , map ?: Record<string, string> ): string {
        const text = map ? map[key] : I18nShared.map[key] 
        if (text === undefined) return `{{missing:${key}}}`
        if (text == "") return `{{empty:${key}}}`
        return I18nShared.interpolate(text , args)
    }

    private static interpolate( text: string, args?: Record<string, any> ): string {

        if (!args) return text;

        return text.replace(
            /{{\s*([^}]+)\s*}}/g,
            (_, key: string) => {

                const value = args[key];
                if (value === undefined || value === null) {
                    return `{{${key}}}`;
                }
                return String(value);
            }
        );
    }

    public static _replacesInText( text : string , ListeTag: I18nArgsMap<UniversalI18nMap> = {}, map? : Record<string, string> ) {
        return text.replace(/{{\s*(\w+)\s*}}/g, (_,Tag) => {
            return this._get(Tag , ListeTag[Tag] || {} , map)
        });
    }

    public static createColdContext <I18nTagMap extends UniversalI18nMap>() {
        return new I18nColdContext<I18nTagMap>()
    }

}


