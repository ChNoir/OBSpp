import { defineClientConfig , onContentUpdated } from 'vuepress/client'
import Prism from "prismjs"

// ctrl + F5 is broken for building 

// @ts-ignore  to ignore missing types CSS module
import "prismjs/plugins/treeview/prism-treeview.css";
// @ts-ignore  to ignore missing types CSS module
import "./client-treeview.css";
import "prismjs/plugins/treeview/prism-treeview.js";


export default defineClientConfig({
    enhance({ app, router, siteData }) {

        // in case of server-side rendering

        const isRenderingOnServer = typeof window === "undefined" || typeof document === "undefined";
        if (isRenderingOnServer) { return; }

        // in client-side rendering

        const TreeviewPluginIsLoaded = typeof Prism !== "undefined" &&  typeof Prism.languages.treeview !== "undefined" ;
        if (!TreeviewPluginIsLoaded) { 
            console.warn("Prismjs Treeview Plugin : Prismjs Treeview plugin is not loaded.");
            return;
        }

        

        const enhancePage = () => {
            
            const blocks = document.querySelectorAll('div.language-treeview:not(div[build])')
            console.log(document.querySelectorAll('div.language-treeview:not(div[build])'))
            if (!blocks.length) return
            console.log("Highlighting treeview code blocks ( Number : "+blocks.length+" )...");
            blocks.forEach(block => {
                // block.classList.remove('line-numbers-mode')
                // block.querySelector('.vp-copy-code-button')?.remove()

                const code = block.querySelector('pre > code.language-treeview')
    
                console.log(block.innerHTML)
                if (!code) { return }
                Prism.highlightElement(code)
                console.log(code.textContent);

                block.setAttribute("build","true");
            })
        
        }

        

        onContentUpdated(() => {
            console.log("Content updated - prismjs-treeview")
            enhancePage()
        })

     

    }

    
})



