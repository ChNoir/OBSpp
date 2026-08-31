import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.front"
import { InitsClass } from "@/Class/InitsClass.shared";
import { OverlayChat } from "@/Class/Overlays/OverlayChat/OverlayChat.front";

import "@CSS/reset.css";
import "@CSS/normal.css";
import "@CSS/font.css";
import "@CSS/default.css";

import "@CSS/OverlayChat/default.css"



async function  main () {
    await InitsClass.start() // Init all classes
    // Load Env
    await EnvConfig.load();

    OverlayChat.MAX_MESSAGES = 6
    OverlayChat.MESSAGE_LIFETIME = 5000
    await OverlayChat.Start( (data) => {
        
        const message = document.createElement("div");
        message.classList.add("message");
    
        const header = document.createElement("div");
        header.classList.add("message-header")
    
        const body = document.createElement("div");
        body.classList.add("message-body")
        body.textContent = data.text
    
        const author = document.createElement("div");
    
        author.style.color = OverlayChat.generateViewerColor(data.author)
    
        author.classList.add("message-author")
        author.textContent = data.author
    
        const badges = document.createElement("div");
        badges.classList.add("message-badges")
    
        if (data.badges && data.badges.length > 0) {
            data.badges.forEach((badge) => {
                const b = document.createElement("img");
                b.classList.add("badge" , badge.name )
                b.src = badge.icon
                badges.appendChild(b)
            })
        } 
        
    
        header.appendChild(author)
        header.appendChild(badges)
    
        message.appendChild(header)
        message.appendChild(body)
    
        return message
    } ,
    (data) => data.platform === "Twitch");


    OverlayChat.addMessage({
        author : "ChNoir",
        text : "Bonjour le chat 😸",
        platform : "Twitch",
        type : "message"
    })
}

main()