import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import type { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import type { EnvConfig_I18nMap } from "./type";
import { EnvConfigContext } from "./EnvConfigContext.shared";


export class EnvConfigShared {

    protected static data : { [name: string]: string; } ;

    protected static console: ConsoleLogger;
    protected static I18n: I18nColdContext<EnvConfig_I18nMap> 
   

    public static createEnvConfigContext<EnvMap extends string>() { return new EnvConfigContext<EnvMap>() }

    public static  display() {
        console.log("EnvConfigShared :")
        for (const key in EnvConfigShared.data) {
            console.log(`  ${key} = ${EnvConfigShared.data[key]}`)
        }
    }

    //////////////////////////////////////////////////
    // API

    static _build<Type , TagType extends string = string>( callback : <T>( tag : string , Default : T) => Type | T ) {
        return {
            OrNull : (tag : TagType) =>  callback(EnvConfigShared.checkTag(tag) , null),
            OrUndefined : (tag : TagType) =>  callback(EnvConfigShared.checkTag(tag) , undefined),
            OrDefault : (tag : TagType , Default : Type ) =>  callback(EnvConfigShared.checkTag(tag) , Default),
            require : (tag : TagType) => {
                const t = callback(EnvConfigShared.checkTag(tag) , undefined) ;
                if (!EnvConfigShared._isDefined<Type>(t)) return EnvConfigShared.console.fatalError( new Error(EnvConfigShared.I18n.get("EnvConfig_require_error" , { tag : tag })) )
                return t
            } 
        }
    }

    static checkTag (tag : string) : string {
        return tag.trim().toLocaleUpperCase().replaceAll(" " , "_")
    }

     static  _isDefined<T>( value: T | undefined ): value is T { return value !== undefined; }

     static _int<T>( tag : string , Default : T) : number | T  {
        const data = EnvConfigShared.data[tag]
        if (!data) return Default ;
        
        const value = parseInt(data , 10);
        return isNaN(value) ? Default : value;
    }

     static _float<T>( tag : string , Default : T) : number | T  {
        const data = EnvConfigShared.data[tag]
        if (!data) return Default ;

        const value = parseFloat(data);
        return isNaN(value) ? Default : value;
    }

    public static _boolean<T>( tag : string , Default : T) : boolean | T  {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default ;

        switch (data) {
            case "true":
            case "1":
            case "yes":
            case "on":
                return true
            case "false":
            case "0":
            case "no":
            case "off":
                return false
            default:
                return Default
        }
    }

     static _string<T>( tag : string , Default : T) : string | T {
        const data = EnvConfigShared.data[tag] ;
        return data ?? Default;
    }

     static _array<T>( tag : string , Default : T , Separator : string = ";") : string[] | T  {
        const data = EnvConfigShared.data[tag] ;
        if (!data) return Default ;

        return data.split(Separator).map(v => v.trim());
    }

     static _json< JsonType , T>( tag : string , Default : T) : JsonType | T {

        const data = EnvConfigShared.data[tag] ;
        if (!data) return Default ;
            
        if ( data.startsWith("{") === false && data.startsWith("[") === false ) return Default
        if ( data.endsWith("}") === false && data.endsWith("]") === false ) return Default

        try {
            return JSON.parse(data);
        } catch (e) {
            return Default;
        }
    }

     static _positiveInt<T>( tag : string , Default : T) : number | T {

        const data = EnvConfigShared.data[tag] ;
        if (!data) return Default ;

        const value = parseInt(data);
        return isNaN(value) || value < 0 ? Default : value;
    }
    
     static _positiveFloat<T>( tag : string , Default : T) : number | T {

        const data = EnvConfigShared.data[tag] ;
        if (!data) return Default ;

        const value = parseFloat(data);
        return isNaN(value) || value < 0 ? Default : value;
    }

     static _url<T>(tag: string, Default: T): URL | T {

        const data = EnvConfigShared.data[tag]

        if (!data) return Default

        try {
            return new URL(data)
        }
        catch {
            return Default
        }
    }

     static _email<T>(tag: string,Default: T): string | T {

        const data = EnvConfigShared.data[tag]
        if (!data)return Default

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

        return regex.test(data)
            ? data
            : Default
    }

     static _hostname<T>(tag: string,Default: T): string | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const regex = /^(?=.{1,253}$)(localhost|([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63})$/ ;

        return regex.test(data)
            ? data
            : Default
    }

     static _duration<T>( tag: string, Default: T ): number | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const regex = /^(\d+)(ms|s|m|h|d)$/ ;
        const match = data.match(regex);

        if (!match) return Default

        const value =parseInt(match[1], 10)
        const unit = match[2]

        switch (unit) {
            case "ms": return value
            case "s" : return value * 1000
            case "m" : return value * 60_000
            case "h" : return value * 3_600_000
            case "d" : return value * 86_400_000
            default  : return Default
        }
    }

     static _enum< EnumType extends string,T >( tag: string, Values: readonly EnumType[],Default: T ): EnumType | T {

        const data =
            EnvConfigShared.data[tag]

        if (!data)
            return Default

        return Values.includes(
            data as EnumType
        )
            ? data as EnumType
            : Default
    }

     static _ip<T>(tag: string, Default: T): string | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/ ;

        const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/ ;

        return (ipv4.test(data) || ipv6.test(data))
            ? data
            : Default
    }

     static _port<T>(tag: string, Default: T): number | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const value = parseInt(data, 10)

        return (Number.isInteger(value) && value >= 0 && value <= 65535)
            ? value
            : Default
    }

     static _range<T>(
        tag: string,
        min: number,
        max: number,
        Default: T
    ): number | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const value = parseInt(data, 10)

        if (isNaN(value)) return Default

        return (value >= min && value <= max)
            ? value
            : Default
    }

     static _hexColor<T>(
        tag: string,
        Default: T
    ): string | T {

        const data = EnvConfigShared.data[tag]
        if (!data) return Default

        const regex =
            /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

        return regex.test(data)
            ? data
            : Default
    }

}

