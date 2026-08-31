import SetupShutdown from "@/SetupShutdown"
import { Config } from "@/CLIManagerConfig";
import { CLIManager } from "@/Class/CLIManager/CLIManager.back";
import { SQLite } from "@/Class/SQLite.back";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { MessageManager } from "@/Class/EventClass/MessageManager";

import { ClientTwitch } from "@/Class/Twitch/ClientTwitch";
import { ServeurExpress } from "@/Class/Express/ServeurExpress.back";
import { ClientYoutube } from "@/Class/ClientYoutube/ClientYoutube.back";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { OverlayChat } from "@/Class/Overlays/OverlayChat/OverlayChat.back";

import "@/Class/Bootstrap.back"
import { PerformanceProfiler } from "./Class/PerformanceProfiler/PerformanceProfiler.shared";
import { MessageChat } from "./Class/MessageChat/MessageChat.shared";

const main = async () => {
    using perf = PerformanceProfiler.measure("Main")



    await InitsClass.start() // Init all classes



    // Set I18n local and SQLite path
    await I18n.setLocal(I18n.EnvConfig.string.OrDefault("I18N_LOCAL" , "fr"));

    
    // CLI Manager
    await CLIManager.init(Config())

    // SQLite
    SQLite.setPathDB( SQLite.EnvConfig.string.OrDefault("SQLITE_PATH" , "./sqlite.db") );
    if (SQLite.connection({ fileMustExist : false })){
        //RegisteTables.initTables(); // Init tables if not exist
    } 
   
    // Registe Routes URL
    RegisteRoutes.addStaticRouter("/" , "./public");




    // Message Manager
    const messageManager = new MessageManager();

    messageManager.addEventListener("message" , (message) => {
       OverlayChat.sendMessage(message)
    })

    // Twitch Client
    const clientTwitch = ClientTwitch.getInstance();
    clientTwitch.addEventListener("register" , () => {
        clientTwitch.register("channel.chat.message" ,"1")
    });

    clientTwitch.addEventListener( "channel.chat.message" , (data) => {

        const messageChat = new MessageChat({
            type : "message",
            platform : "Twitch",
            text : data.message.payload.event?.message.text,
            author : data.message.payload.event?.chatter_user_name,
            timestamp : 100
        })

        messageManager.sendMessage(messageChat)
    });


    ClientYoutube.init()
    ClientYoutube.addEventListener("Observator" , ( {Observator}) => {

        Observator.addEventListener("TEXT_MESSAGE_EVENT" , ( { message }) => {
            const messageChat = new MessageChat({
                type : "message",
                platform : "Twitch",
                text : message.snippet?.textMessageDetails?.messageText as string,
                author : message.authorDetails?.displayName as string,
                isOwner : message.authorDetails?.isChatOwner as boolean,
                isModerator : message.authorDetails?.isChatModerator as boolean,
                isSubscriber :  message.authorDetails?.isChatSponsor as boolean,
                timestamp : 100
            })

            messageManager.sendMessage(messageChat)
        })
    })

    ClientYoutube.start()


    ServeurExpress.init({
        port : ServeurExpress.EnvConfig.int.OrDefault("ServeurExpress_PORT" , 3000),
        certPath : ServeurExpress.EnvConfig.string.OrUndefined("ServeurExpress_CERT_PATH"),
        keyPath : ServeurExpress.EnvConfig.string.OrUndefined("ServeurExpress_KEY_PATH"),
        webSocket : true
    })

  

    SetupShutdown(async () => {
        ClientTwitch.disconnect()
        SQLite.disconnect()
        OverlayChat.close()
        ServeurExpress.close()
        ClientYoutube.stop()
        PerformanceProfiler.report()
    })

}

main();

