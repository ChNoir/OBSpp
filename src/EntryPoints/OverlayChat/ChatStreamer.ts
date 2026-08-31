import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.front"
import { InitsClass } from "@/Class/InitsClass.shared";
import { OverlayChat } from "@/Class/Overlays/OverlayChat/OverlayChat.front";

import "@CSS/reset.css";
import "@CSS/normal.css";
import "@CSS/font.css";
import "@CSS/default.css";

import "@CSS/OverlayChat/ChatStreamer.css"
import Scrollbar from 'smooth-scrollbar';


async function  main () {
    await InitsClass.start() // Init all classes
    // Load Env
    await EnvConfig.load();

    const Sb = Scrollbar.init(document.querySelector('body') as HTMLElement )
    Sb.addListener((status)=> {
        if (status.limit.y == status.offset.y) SbLock = true
        if ( SbLock  && status.limit.y != status.offset.y) SbLock = false
    })
    let SbLock = true

    OverlayChat.MAX_MESSAGES = 500
    OverlayChat.MESSAGE_LIFETIME = 0
    await OverlayChat.Start( (data) => {
        const message = document.createElement("div");
        message.classList.add("message")

        const heard = document.createElement("div")
        heard.classList.add("message-heard")

        message.appendChild(heard)

        // Ensure the platform key is valid for indexing IconsPath.platform
        const platformKey = data.platform as keyof typeof OverlayChat.IconsPath.platform;
        const iconPath = OverlayChat.IconsPath.platform[platformKey] ?? OverlayChat.IconsPath.platform.Other;

        // Use the resolved icon path (example usage, adjust if createIcone expects different params)
        const img = OverlayChat.createIcone(iconPath);


        heard.appendChild(img)

        if (data.isModerator) {
            const img = OverlayChat.createIcone(OverlayChat.IconsPath.statf.moderator);
            heard.appendChild(img)
        }

        if (data.isOwner) {
            const img = OverlayChat.createIcone(OverlayChat.IconsPath.statf.owner);
            heard.appendChild(img)
        }
        

        const name = document.createElement("p")
        name.textContent = data.author
        name.style.color =  OverlayChat.generateViewerColor(data.author)
        
        heard.appendChild(name)

        const text = document.createElement("p")
        text.textContent = "| " + data.text
        text.classList.add("message-body")

        message.appendChild(text)

        setTimeout(()=> {
            Sb.update();
            if (SbLock) Sb.scrollIntoView(message)
        }, 100)

        return message;
    })



    OverlayChat.addMessage({
        author : "ChNoir",
        text : "Bonjour le chat 😸",
        platform : "Twitch",
        type : "message",
        isOwner : true
    })

   
    
}

main()

