import { EnvConfigShared } from "./EnvConfig.shared"



export class EnvConfigContext<EnvMap extends string> {

    public constructor() {}

    public int           = EnvConfigShared._build<number ,EnvMap>(EnvConfigShared._int)
    public float         = EnvConfigShared._build<number,EnvMap>(EnvConfigShared._float)
    public boolean       = EnvConfigShared._build<boolean,EnvMap>(EnvConfigShared._boolean)
    public string        = EnvConfigShared._build<string,EnvMap>(EnvConfigShared._string)
    public positiveInt   = EnvConfigShared._build<number,EnvMap>(EnvConfigShared._positiveInt)
    public positiveFloat = EnvConfigShared._build<number,EnvMap>(EnvConfigShared._positiveFloat)
    public array = {
        OrNull : (tag : EnvMap , Separator : string = ";") => EnvConfigShared._array(tag , null , Separator),
        OrUndefined : (tag : EnvMap , Separator : string = ";") => EnvConfigShared._array(tag , undefined , Separator),
        OrDefault : (tag : EnvMap , Default : Array<string>  , Separator : string = ";") => EnvConfigShared._array(tag , Default , Separator),
        OrError : (tag : EnvMap , ErrorName : string  , Throw : boolean = false  , Separator : string = ";" ) => {
            const t = EnvConfigShared._array(tag , undefined , Separator) ;
            if (t === undefined) {
                if (Throw)throw new Error(ErrorName)
                return new Error(ErrorName)
            }
            return t 
        }
    }
    public json = {
        OrNull : <JsonType extends {} | []>(tag : EnvMap ) => EnvConfigShared._json<JsonType , null>(tag , null ),
        OrUndefined : <JsonType extends {} | []>(tag : EnvMap ) => EnvConfigShared._json<JsonType , undefined>(tag , undefined ),
        OrDefault : <JsonType extends {} | []>(tag : EnvMap , Default : JsonType ) => EnvConfigShared._json<JsonType , JsonType>(tag , Default ),
        OrError : <JsonType extends {} | []>(tag : EnvMap , ErrorName : string  , Throw : boolean = false ) => {
            const t = EnvConfigShared._json<JsonType , undefined>(tag , undefined) ;
            if (t === undefined) {
                if (Throw)throw new Error(ErrorName)
                return new Error(ErrorName)
            }
            return t 
        }
    }
    public url          = EnvConfigShared._build<URL, EnvMap>(EnvConfigShared._url)
    public email        = EnvConfigShared._build<string, EnvMap>(EnvConfigShared._email)
    public hostname     = EnvConfigShared._build<string, EnvMap>(EnvConfigShared._hostname)
    public duration     = EnvConfigShared._build<number, EnvMap>(EnvConfigShared._duration)
    public enum< EnumType extends string>( Values: readonly EnumType[]) {
        return {
            OrNull: (tag: string) => EnvConfigShared._enum(tag,Values,null),
            OrUndefined: (tag: string) =>EnvConfigShared._enum(tag,Values,undefined),
            OrDefault: (tag: string,Default: EnumType) =>EnvConfigShared._enum(tag,Values,Default),
            OrError: (tag: string,ErrorName: string,Throw: boolean = false) => {
                const t =EnvConfigShared._enum(tag,Values,undefined)
                if (t === undefined) {
                    if (Throw)throw new Error(ErrorName)
                    return new Error(ErrorName)
                }
                return t
            }
        }
    }
    public ip = EnvConfigShared._build<string>(EnvConfigShared._ip)
    public port = EnvConfigShared._build<number>(EnvConfigShared._port)
    public hexColor = EnvConfigShared._build<string>(EnvConfigShared._hexColor)

}

