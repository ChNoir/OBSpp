import { path } from '@vuepress/utils'
export default (options = {})=> {

    return {
        name: "prismjs-treeview-Plugin",
        clientConfigFile : path.resolve(__dirname, 'client.ts'),
        onPrepared() {
            console.log("prismjs-treeview-Plugin : onPrepared hook called.");
        }
    }
}

