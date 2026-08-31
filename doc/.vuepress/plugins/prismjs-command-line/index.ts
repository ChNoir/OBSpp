import { path } from '@vuepress/utils'
import { Markdown } from 'vuepress/markdown'
export default (options = {})=> {

    return {
        name: "prismjs-command-line-Plugin",
        clientConfigFile : path.resolve(__dirname, 'client.ts'),

        extendsMarkdown(md : Markdown) {
            const rawFence = md.renderer.rules.fence;
            md.renderer.rules.fence = function (tokens, idx, options, env, self) {
                
                const token = tokens[idx];
                const info = (token.info || '').trim();

                const result = rawFence ? rawFence(tokens, idx, options, env, self) : '';
                
                if (info.includes(':command-line')) {
                    
                    const regex = /:([a-zA-Z0-9-]+)=([^\s]+)/g;

                    const tags = ["user", "host", "prompt", "output" ,'filter-output',"continuation-str" , "continuation-prompt" , "filter-continuation"];

                    const values: { [key: string]: string } = {};
                    for (const match of info.matchAll(regex)) {
                        if (tags.includes(match[1]))
                            values[match[1]] = match[2];
                    };

                    const DataStr = Object.keys(values).map(key => `data-${key}="${values[key]}"`).join(' ');

                    

                    // Wrap the original rendered code block
                    return result
                        .replace("<div class=\"","<div class=\"command-line ")
                        .replace("<pre", `<pre class="command-line" ${DataStr}`);

                   
                }



                return result;
            }
        }
    }
}

