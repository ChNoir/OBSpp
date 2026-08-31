import { Markdown } from "vuepress/markdown";


export default (options = {})=> {

    return {
        name: "Tag-Plugin",
        // plugin code here
        extendsMarkdown(md : Markdown) {
            // extend markdown-it instance here
            
            md.use((md) => {
                const rawFence = md.renderer.rules.fence;
                md.renderer.rules.fence = function (tokens, idx, options, env, self) {
                    const token = tokens[idx];

                    const info = (token.info || '').trim();
                    const parts = info.split(/\s+/).filter(Boolean);
                    const meta = parts.slice(1);

                    const tagMeta = meta.find(m => m.startsWith('tag='));
                    const tag = tagMeta ? tagMeta.split('=')[1] : null;

                    if (tag) {
                        const esc = (s : string) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                        const safeTag = esc(tag);
                        const rendered = rawFence ? rawFence(tokens, idx, options, env, self) : '';
                        return `<div data-tag="${safeTag}">${rendered}</div>`;
                    }

                    return rawFence ? rawFence(tokens, idx, options, env, self) : '';
                };
            })
        },
    }
}