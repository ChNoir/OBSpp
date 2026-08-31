import { hopeTheme } from 'vuepress-theme-hope'
import { navbar } from './navbar'
import { sidebar } from './sidebar'

export default hopeTheme({
  darkmode: 'enable',
  navbar,
  sidebar,

  navbarLayout: {
    start: ['Brand'],
    center: [],
    end: ['Links', 'Search'],
  },

  lastUpdated: true,
  contributors: false,
  editLink: false,
  print: false,
  fullscreen: true,
  breadcrumb: true,

  markdown: {
    align: true,
    attrs: true,
    component: true,
    demo: true,
    include: true,
    mark: true,
    spoiler: true,
    sub: true,
    sup: true,
    tasklist: true,
    vPre: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    codeTabs: true,
    imgMark: true,
    tabs: true,

    highlighter: {
      type: 'prismjs',
      notationErrorLevel: true,
      notationWordHighlight: true,
      notationDiff: true,
      notationHighlight: true,
      notationFocus: true,
      lineNumbers: true,
    },
  },

  plugins: {
    search: {
      locales: {
        '/': {
          placeholder: 'Rechercher...',
        },
      },
    },
    components: {
      components: ['PDF'],
    },
    catalog: true,
  },
})
