import fs, { readFileSync } from "fs";
import { ConsoleLogger } from "../ConsoleLogger.shared";
import { I18nColdContext } from "../I18n/I18nColdContext.shared";
import { EnvConfigContext } from "../EnvConfig/EnvConfigContext.shared";
import { I18n } from "../I18n/I18n.back";
import { EnvConfig } from "../EnvConfig/EnvConfig.back";
import { InitsClass } from "../InitsClass.shared";
import { CacheManager_EnvConfigMap, CacheManager_I18nMap } from "./type";
import { FilesManager } from "../FilesManager/FilesManager.back";
import { FilesManagerPremission, ReadFileOptions, ResultFilesSysteme } from "../FilesManager/type";
import { FilesSystemeFunction } from "../FilesManager/FilesSystemeFunction.back";

export class CacheManager extends FilesManager.Abstract {

    public console : ConsoleLogger;

    public static console : ConsoleLogger;
    public static I18n: I18nColdContext<CacheManager_I18nMap> 
    public static EnvConfig: EnvConfigContext<CacheManager_EnvConfigMap>
    private static _root : string

    public static _init() {
        CacheManager.console = ConsoleLogger.getInstance("CacheManager")
        CacheManager.I18n = I18n.createColdContext<CacheManager_I18nMap>()
        CacheManager.EnvConfig = EnvConfig.createEnvConfigContext<CacheManager_EnvConfigMap>()
        CacheManager._root = CacheManager.EnvConfig.string.OrDefault("CacheManager_cache_path" , "./cache/")
    }

    static { InitsClass.register( CacheManager._init) }

    protected constructor ( root : string , premission?: FilesManagerPremission , consoleTag ?: string) {
        super(root , premission )
        this.console =  ConsoleLogger.getInstance("CacheManager" , consoleTag ? consoleTag : root )
    }

    protected createInstance<Options extends Record<string, undefined> = Record<string, undefined>>(root: string, premission: FilesManagerPremission, options?: Options | undefined): this {
        return new CacheManager(root, premission , options?.consoleTag) as this;
    }

    getAbsolutePath( path : string = "") {
        return super.resolve(path)
    }

    set(pathFile: string, content: string | Buffer , options?: fs.WriteFileOptions) {
        const t = super.writeFile(pathFile , content , options)
        if (t.status === "error") { 
            this.console.error(CacheManager.I18n.get("cacheManager_error_set"))
            return false
        }
        return true
    }

    get(pathFile: string, options?: ReadFileOptions.String  ) : string | null
    get(pathFile: string, options?: ReadFileOptions.Buffer  ) : Buffer | null
    get(pathFile: string, options?: ReadFileOptions.String | ReadFileOptions.Buffer ) : string | Buffer | null {
        const t = super.readFile(pathFile , options as any)
        if (t.status === "error") {
            this.console.error(CacheManager.I18n.get("cacheManager_error_ get")) 
            return null
        }
        return t.value
    }


    setJson(pathFile: string, content: object ) {
        return this.set(pathFile , JSON.stringify(content) , {encoding : "utf-8"})
    }

    getJson<JsonType extends Object> (pathFile: string)  {

        const data = this.get(pathFile , "utf-8")
        if (data === null) {
            this.console.error(CacheManager.I18n.get("cacheManager_error_getJson"))
            return null
        }
       
        try {
            return JSON.parse(data) as JsonType
        } catch (error ) {
            const syntaxError = error as SyntaxError
            this.console.error(syntaxError)
            return null
        }
    }

    has(pathFile: string) {
        return super.exists(pathFile)
    }


    static getContext (root : string  = "", premission?: FilesManagerPremission , consoleTag ?: string ) {
        
        const createInstance = <Options extends Record<string, any> = Record<string, any>>(root: string, premission: FilesManagerPremission, options?: Options | undefined) => {
            return new CacheManager(root, premission, options?.consoleTag) as any
        }

        return FilesSystemeFunction.getContext<CacheManager>(
            createInstance , 
            CacheManager._root , 
            root , 
            premission ? premission : { read : true , write : true , create : true , delete : true } )
        
    }

    static clear () {
   
        fs.rmSync(
            CacheManager._root,
            {
                recursive: true,
            }
        );

        fs.mkdirSync(
            CacheManager._root,
            {
                recursive: true,
            }
        );
        
    }

}

