import minimist from "minimist"
import { CLIConfig } from "@/Class/CLIManager/CLIConfig.shared"
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { InitsClass } from "@/Class/InitsClass.shared";




export class CLIManager {

    public  static debug = false;
    private static rawArgs = process.argv.slice(2);
    private static args : minimist.ParsedArgs = minimist(process.argv.slice(2))

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<CLIManager_I18nMap> 
    public static EnvConfig: EnvConfigContext<CLIManager_EnvConfigMap>
    public static CLIConfig : CLIConfig

    private static _init() {
        CLIManager.console = ConsoleLogger.getInstance("CLIManager")
        CLIManager.I18n = I18n.createColdContext<CLIManager_I18nMap>()
        CLIManager.EnvConfig = EnvConfig.createEnvConfigContext<CLIManager_EnvConfigMap>()
        CLIManager.CLIConfig = CLIManager.getContext()
    }

    static { InitsClass.register(CLIManager._init) }


    public static async init( options : CLIManagerConfig[]) {

        const manOptions : ConfigArgsForMan[] = []
        const configCallbacks : ConfigCallback[] = [];

        for (const option of options) {
            
            // configMan 
            manOptions.push({
                name : option.name,
                alias : option.alias,
                description : option.description,
                defaultValue : option.defaultValue,
                parameters : option.parameters,
                required : option.required,
                globale : option.globale
            })

            // configCallback
            if (option.callback) {
                configCallbacks.push({
                    name : option.name,
                    alias : option.alias,
                    callback : option.callback,
                    exitAfterRun : option.exitAfterRun,
                    exitIfCallbackReturnFalse : option.exitIfCallbackReturnFalse,
                    defaultValue : option.defaultValue,
                    exitAfterAllRun : option.exitAfterAllRun,
                    globale : option.globale,
                })
            }
        }
        // if --help : Display man
        CLIManager.displayMan(manOptions)
        // Run required args
        if (!CLIManager.requiredArgs(configCallbacks)) { process.exit(0) }
        // Run callback
        await CLIManager.runMultiple(configCallbacks)
    }

    /////////////////////////////////////////////////
    // API

    public static getContext() { return new CLIConfig(CLIManager.args) }

    /////////////////////////////////////////////////

    private static requiredArgs(args : ConfigCallback[]) : boolean {
        let isGood = true
        
        for (const arg of args) {
            if (!arg.required) { continue }
            const value = CLIManager.CLIConfig.getArgByAliasOrNull(arg.name , arg.alias ?? "")
            if (value === null) {
                CLIManager.console.error( CLIManager.I18n.get("CLIManager_arg_required" , { name : arg.name})) // `Argument --${arg.name} is required`
                isGood = false
            }
        }
        return isGood
    }

    public static async  runMultiple(options : ConfigCallback[]) {

        const { Globales , Commandes } = CLIManager.filterConfigGlobales(options) // just to log the args in the right order in debug mode
        
        let exitAfterAllRun = false 

        // Run globales first in the order they were given in the CLI
        for (const Globale of Globales) {
            if (CLIManager.CLIConfig.hasArg(Globale.name) || (Globale.alias && CLIManager.CLIConfig.hasArg(Globale.alias)) ) {
                if (CLIManager.debug) { CLIManager.console.log( CLIManager.I18n.get("CLIManager_debug_globale" , { name : Globale.name }) )} // `Running globale argument --${Globale.name}`

                if (Globale.callback === undefined) continue;
                const value =  CLIManager.CLIConfig.getArgByAlias(Globale.name , Globale.alias ?? "" , "")
                
                try {
                    await Globale.callback(value)
                }
                catch (error) {
                    CLIManager.console.fatalError( CLIManager.I18n.get("CLIManager_callback_globale_error" , { name : Globale.name }) , error ) // `Error in callback for argument --${Globale.name} `
                }
            }
        }

        // Then run commandes in the order they were given in the CLI
        for (const Commande of Commandes) {
            if (CLIManager.CLIConfig.hasArg(Commande.name) || (Commande.alias && CLIManager.CLIConfig.hasArg(Commande.alias)) ) {
                if (CLIManager.debug) { CLIManager.console.log( CLIManager.I18n.get("CLIManager_debug_commande" , { name : Commande.name }) )} // `Running command argument --${Commande.name}`
                if (Commande.callback === undefined) continue;
                const value =  CLIManager.CLIConfig.getArgByAlias(Commande.name , Commande.alias ?? "" , "")

                try {
                    const result = await Commande.callback(value)

                    if (Commande.exitAfterAllRun) exitAfterAllRun = true;
                    if (Commande.exitAfterRun) process.exit(0)
                    if (Commande.exitIfCallbackReturnFalse && result === false) process.exit(0)
                }
                catch (error) {
                    CLIManager.console.fatalError( CLIManager.I18n.get("CLIManager_callback_commande_error" , { name : Commande.name }) , error ) // `Error in callback for argument --${Commande.name} `
                }
              
            }
        }

        if (exitAfterAllRun) process.exit(0)
    }

    private static displayMan( args : ConfigArgsForMan[]) {

        if (CLIManager.CLIConfig.getArgByAliasOrNull("help" , "h") || CLIManager.CLIConfig.getArgOrNull("man")) {

            for (const arg of args) {
                const keys = `--${arg.name}` + (arg.alias ? `, -${arg.alias}` : "")
                const description = arg.description
                const defaultValue = arg.defaultValue !== undefined ? ` (${CLIManager.I18n.get("Word_default")}: ${arg.defaultValue})` : "" // default
                const required = arg.required ? ` (${CLIManager.I18n.get("Word_required")})` : "" // required
                const globale = arg.globale ? ` (${CLIManager.I18n.get("Word_globale")})` : "" // globale
                console.log(`${keys} : ${description}${defaultValue}${required}${globale}`)
                if (arg.parameters) {
                    console.log(`   ↳ ${CLIManager.I18n.get("Word_possible_values")} :`) // Values possibles
                    for (const param of arg.parameters) {
                        console.log(`       ━ ${param.value} : ${param.description}`)
                    }
                }
            }

            process.exit(0);
        }
    }

    public static displayAllArgs() {
        const prefix = "Args : "
        const args = CLIManager.CLIConfig.getArgs()
        console.log(prefix)
        for (const key in args) {
            if (key === "_") continue
            const value = args[key]
            console.log(`  ${key} : ${value}`)
        }
    }

    private static filterConfigGlobales(configCallbacks : ConfigCallback[]) {
        const ArgsGlobales : ConfigCallback[] = [];
        const ArgsCommandes : ConfigCallback[] = [];

        for (const config of configCallbacks) {
            if (config.globale) { ArgsGlobales.push(config) }
            else { ArgsCommandes.push(config) }
        }
        return { Globales : ArgsGlobales , Commandes : ArgsCommandes }
    }


}

type ConfigArgsForMan = {
    name : string
    alias? : string
    description : string
    defaultValue? : string | number | boolean | string[]
    parameters? : Array<{ value: string, description: string }>
    required? : boolean
    globale ?: boolean
}

type ConfigCallback = {
    name : string
    alias? : string
    required? : boolean
    globale ?: boolean
    callback? : (value : string | number | boolean | string[] ) => boolean | void | Promise<boolean | void>
    exitAfterRun? : boolean
    exitAfterAllRun? : boolean
    exitIfCallbackReturnFalse? : boolean
    defaultValue? : string | number | boolean | string[]
}

export type CLIManagerConfig = ConfigCallback & ConfigArgsForMan


type CLIManager_I18nMap = {
    "Word_default" : undefined
    "Word_required" : undefined
    "Word_possible_values" : undefined
    "CLIManager_arg_required" : { name: string; }
    "Word_globale" : undefined
    "CLIManager_callback_globale_error" : { name: string; }
    "CLIManager_callback_commande_error" : { name: string; }
    "CLIManager_debug_globale" : { name: string; }
    "CLIManager_debug_commande" : { name: string; }
}

type CLIManager_EnvConfigMap = ""

