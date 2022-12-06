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
      sidebar: {
        '/javascript': [
          {
            text: '指南',
            collapsible: true,
            items: [
              { text: '指南', link: '/javascript/index' },
            ],
         }
        ],
        '/vue': [
          {
            text: 'vue',
            collapsible: true,
            items: [
              { text: 'Knowledge Points', link: '/vue/knowledge' },
              { text: 'Source Code', link: '/vue/code' }
            ]
          }
        ],
        '/bundle': [
          {
            text: 'bundle',
            items: [
              { text: 'Webpack', link: '/bundle/webpack' },
              { text: 'Rollup', link: '/bundle/rollup' },
              { text: 'Vite', link: 'bundle/vite' }
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
        { text: 'Javascript', link: '/javascript/index', activeMatch: '/javascript/' },
        { text: 'Typescript', link: '/typescript/index', activeMatch: '/typescript/' },
        { text: 'Vue', link: '/vue/index', activeMatch: '/vue/' },
        { text: 'React', link: '/react/index', activeMatch: '/react/' },
        { text: 'Bundle', link: '/bundle/index', activeMatch: '/bundle/' },
        { text: 'Algorithm', link: '/algorithm/index', activeMatch: '/algorithm/' },
        { text: 'Mini Code', link: '/mini-code/index', activeMatch: '/mini-code/' },
        { text: 'Links', link: '/links/index', activeMatch: '/links/' },
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-present Levi'
      }
    }
})
