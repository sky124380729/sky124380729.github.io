import { defineConfig } from 'vitepress'

export default defineConfig({
    head: [
      ['link', { rel: 'shortcut icon', href: '/favicon.ico'} ],
    ],
    lastUpdated: true,
    title: 'LEVI NOTEBOOK',
    // base: '/notebook',
    themeConfig: {
      logo: '/logo.svg',
      editLink: {
        pattern: 'https://github.com/sky124380729/notebook/tree/master/docs/:path',
        text: 'Edit this page on github'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/sky124380729/notebook' }
      ],
      sidebar: {
        '/language': [
          {
            text: 'Javascript',
            collapsible: true,
            items: [
              { text: 'knowledge', link: '/language/javascript/index' },
            ],
          },
          {
            text: 'Typescript',
            collapsible: true,
            items: [
              { text: 'knowledge', link: '/language/typescript/index' },
            ],
          }
        ],
        '/framework': [
          {
            text: 'Vue',
            collapsible: true,
            items: [
              { text: 'Knowledge Points', link: '/framework/vue/knowledge' },
              { text: 'Source Code', link: '/framework/vue/code' }
            ]
          },
          {
            text: 'React',
            collapsible: true,
            items: [
              { text: 'Knowledge Points', link: '/framework/react/knowledge' },
              { text: 'Source Code', link: '/framework/react/code' }
            ]
          },
          {
            text: 'Micro Frontend',
            collapsible: true,
            items: [
              { text: 'Single SPA', link: '/framework/micro-frontend/single-spa' },
              { text: 'Module Federation', link: '/framework/micro-frontend/module-federation' },
            ]
          }
        ],
        '/bundle': [
          {
            text: 'Webpack',
            items: [
              { text: 'information', link: '/bundle/webpack/information' },
              { text: 'config reference', link: '/bundle/webpack/config' },
            ]
          },
          {
            text: 'Rollup',
            items: [
              { text: 'information', link: '/bundle/rollup/information' },
              { text: 'config reference', link: '/bundle/rollup/config' },
            ]
          },
          {
            text: 'Vite',
            items: [
              { text: 'information', link: '/bundle/vite/information' },
              { text: 'config reference', link: '/bundle/vite/config' },
            ]
          }
        ],
        '/algorithm': [
          {
            text: 'Data Structure',
            collapsible: true,
            items: [
              { text: 'Array', link: '/algorithm/array' }
            ]
          },
          {
            text: 'Algorithm',
            collapsed: true,
            items: [
              { text: 'RECURSION', link: '/algorithm/recursion' },
              { text: 'KMP', link: '/algorithm/kmp' },
            ]
          }
        ]
      },
      nav: [
        { text: 'Language', link: '/language/index', activeMatch: '/language/' },
        { text: 'Framework', link: '/framework/index', activeMatch: '/framework/'  },
        { text: 'Bundle', link: '/bundle/index', activeMatch: '/bundle/' },
        { text: 'Algorithm', link: '/algorithm/index', activeMatch: '/algorithm/' },
        { text: 'Mini Code', link: '/mini-code/index', activeMatch: '/mini-code/' },
        { text: 'Links', link: '/links/index', activeMatch: '/links/' },
        { text: 'RegExp', link: '/reg-exp/index', activeMatch: '/reg-exp/' },
        { text: 'Interview ', link: '/interview/index', activeMatch: '/interview/' },
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-present Levi'
      }
    }
})
