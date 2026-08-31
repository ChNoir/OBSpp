/**
 * @type { import('@vuepress/theme-default').SidebarOptions }
 */
export const sidebar = {
  '/guide/': [
    {
      text: 'Guide',
      children: [
        '/guide/',
        '/guide/getting-started',
      ],
    },
  ],
  '/architecture/': [
    {
      text: 'Architecture',
      children: [
        '/architecture/',
        '/architecture/project-structure',
      ],
    },
  ],
  '/class/': [
    {
      text: 'Classes',
      children: [
        '/class/',
        '/class/bootstrap',
        '/class/consolelogger',
        '/class/initsclass',
        '/class/envconfig',
        '/class/express',
        '/class/registeroutes',
        '/class/serveurexpress',
        '/class/expressresponse',
        '/class/domstyleemitter',
        '/class/i18n',
        '/class/i18n-cold',
        '/class/i18n-hot',
        '/class/i18n-extractor',
        '/class/main-class',
      ],
    },
  ],
}