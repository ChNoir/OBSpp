import { CLIManagerConfig } from "@/Class/CLIManager/CLIManager.back";
import { CLI_debug } from "@/Function/CLI_debug";
import { CLI_env } from "@/Function/CLI_env";
import { CLI_i18n } from "@/Function/CLI_i18n";
import { CLI_token } from "@/Function/CLI_token";
import { I18n } from "@/Class/I18n/I18n.back";
import { CLI_Clear } from "./Function/CLI_Clear";
import { CLI_Build } from "./Function/CLI_Build";


const i18n = I18n.createColdContext<CLIManagerConfig_I18nMap>()

export function Config() : CLIManagerConfig[] { return [
    {
        name : "help",
        alias : "h",
        description : i18n.get("CLIManager_man_help"), // "Affiche ce message d'aide",
    },
    {
        name : "man",
        description :  i18n.get("CLIManager_man_man"), // "Affiche ce message d'aide (alias de --help)", 
    },
    {
        name : "token",
        alias : "t",
        description : i18n.get("CLIManager_man_token"), // "Lance le processus de récupération des tokens d'authentification pour les plateformes de streaming",
        callback : CLI_token,
        exitAfterAllRun :  true
    },
    {
        name : "i18n",
        alias : "i",
        description : i18n.get("CLIManager_man_i18n"), // "Cree un fichier de traductions i18n",
        defaultValue : "en",
        parameters : [
            { value : "[language]" , description : i18n.get("CLIManager_man_i18n_parameter_language") }, // "Nom de la localie : 'fr', 'en', etc." 
        ],
        callback : CLI_i18n,
        exitAfterAllRun :  true
        
    },
    {
        name : "env",
        alias : "e",
        description : i18n.get("CLIManager_man_env"), //  "Cree un fichier env"
        callback : CLI_env,
        exitAfterAllRun :  true
    },
    {
        name : "debug",
        alias : "d",
        callback : CLI_debug,
        description : i18n.get("CLIManager_man_debug"),// "Active le mode debug ",
        defaultValue : false,
        parameters : [ { value : "hard" , description : i18n.get("CLIManager_man_debug_parameter_hard") } ], // "Active le mode debug hard qui permet de voir plus de détails commet les configurations env" 
        globale : true
    },
    {
        name : "clear",
        callback : CLI_Clear,
        description :  i18n.get("CLIManager_man_clear"),
        globale : true
    },
    {
        name : "build",
        callback : CLI_Build,
        description : i18n.get("CLIManager_man_build"),
        exitAfterRun : true
    }
]}


type CLIManagerConfig_I18nMap = {
    "CLIManager_man_help" : undefined
    "CLIManager_man_man" : undefined
    "CLIManager_man_token" : undefined
    "CLIManager_man_i18n" : undefined
    "CLIManager_man_i18n_parameter_language" : undefined
    "CLIManager_man_env" : undefined
    "CLIManager_man_debug" : undefined
    "CLIManager_man_debug_parameter_hard" : undefined
    "CLIManager_man_clear" : undefined
    "CLIManager_man_build" : undefined
}