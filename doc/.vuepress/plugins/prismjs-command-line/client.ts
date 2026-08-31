import { defineClientConfig , onContentUpdated } from 'vuepress/client'
import Prism from "prismjs"

// ctrl + F5 is broken for building 

// @ts-ignore  to ignore missing types CSS module
import "prismjs/plugins/command-line/prism-command-line.css";
// @ts-ignore  to ignore missing types CSS module
import "./client-command-line.css";

import "prismjs/plugins/command-line/prism-command-line.js";
export default defineClientConfig({
    enhance({ app, router, siteData }) {

        // in case of server-side rendering

        const isRenderingOnServer = typeof window === "undefined" || typeof document === "undefined";
        if (isRenderingOnServer) { return; }

        // in client-side rendering

        const CommandLinePluginIsLoaded = typeof Prism !== "undefined" ;
        if (!CommandLinePluginIsLoaded) { 
            console.warn("Prismjs Treeview Plugin : Prismjs Treeview plugin is not loaded.");
            return;
        }

        const enhancePage = () => {
            
            const blocks = document.querySelectorAll('div[class*=language-].command-line')
            if (!blocks.length) return
            console.log("Highlighting command-line code blocks ( Number : "+blocks.length+" )...");
            blocks.forEach(block => {
                block.classList.remove('line-numbers-mode')
                block.querySelector('.vp-copy-code-button')?.remove()

                const code = block.querySelector('pre > code[class*=language-]');
                
                if (!code) { return } 
                const length = code.textContent.length
                code.textContent = code.textContent.substring(0, length - 2);
                console.log(code.textContent);
                Prism.highlightElement(code)
            })
        
        }

        onContentUpdated(() => {
            enhancePage()
        })

    }
})


