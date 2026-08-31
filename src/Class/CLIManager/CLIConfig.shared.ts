import type minimist from "minimist"

export class CLIConfig {


    #args: minimist.ParsedArgs

    constructor(args: minimist.ParsedArgs) { 
        this.#args = args
    }

    public  positionalArgs() : string[] {
        return this.#args._ as string[]
    }

    public getArgs() : minimist.ParsedArgs {
        return this.#args
    }

    public getArg(key : string , defaultValue : string | number | boolean | string[]) : string | number | boolean | string[]  {
        return this.#args[key] ?? defaultValue
    }

    public getArgOrNull(key : string) : string | number | boolean | string[] | null {
        const value = this.#args[key]
        return value !== undefined ? value : null
    }

    public hasArg(key : string) : boolean {
        return this.#args[key] !== undefined
    }

    public getArgByAlias (key : string , alias : string , defaultValue : string | number | boolean | string[]) : string | number | boolean | string[] {
        if ( this.#args[key] !== undefined ) return this.#args[key]
        if ( this.#args[alias] !== undefined ) return this.#args[alias]
        return defaultValue
    }

    public getArgByAliasOrNull (key : string , alias : string) : string | number | boolean | string[] | null {
        if ( this.#args[key] !== undefined ) return this.#args[key]
        if ( this.#args[alias] !== undefined ) return this.#args[alias]
        return null
    }
}