import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import theme from "./theme";


// import test from "./plugins/Test.js"

import prismjs_treeview from "./plugins/prismjs-treeview/index.js"
import prismjs_command_line from "./plugins/prismjs-command-line/index.js"





export default defineUserConfig({
  lang: 'fr-FR',
  title: 'ServeurStream',
  description: 'Documentation technique et utilisateur du projet ServeurStream.',

  base: '/',
  dest: './dist',
  public: './public',

  bundler: viteBundler(),
  theme,

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  port : 8081,
  pagePatterns:  ['**/*.md'],

  // plugins: [plugin_smooth_scroll],


  plugins : [ prismjs_treeview() , prismjs_command_line() ]

})

