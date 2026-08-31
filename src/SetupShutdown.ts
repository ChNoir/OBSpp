import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { I18n } from "@/Class/I18n/I18n.back";

let isShuttingDown = false

const envConfig = EnvConfig.createEnvConfigContext()
const i18n = I18n.createColdContext()


export default ( callback : () => Promise<void> ) => {

    const shutdown = async (signal: string) => {

        if (isShuttingDown) return
        isShuttingDown = true

        ConsoleLogger.warn(`Shutdown signal: ${signal}`)
        
        try {
        
            ///////////////////////////////////////
            // Cleanup app

            await callback()

            ///////////////////////////////////////
            // 🚨 Si la config demande un stop forcé → on coupe net

            if ( envConfig.boolean.OrDefault("SERVEUR_FORCE_STOP_SIGINT" , false)) {
                ConsoleLogger.warn(i18n.get("Serveur_force_ServeurStop"))
                process.exit(0);    
            }

        }
        catch (err) {

            ConsoleLogger.error(err)
            process.exit(1)
        }

    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
}