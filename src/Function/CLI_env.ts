import { EnvConfigExtractor } from "@/Class/EnvConfig/EnvConfigExtractor.back";

export function CLI_env(value: string | number | boolean | string[]) : boolean | void {

    const OUTPUT_FILE = "./.env.example";

    EnvConfigExtractor.start()
    
}