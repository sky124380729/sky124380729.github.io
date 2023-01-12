import { defineConfig } from 'vitepress'

export default defineConfig({
    head: [
      ['link', { rel: 'shortcut icon', href: '/favicon.ico'} ],
    ],
    lastUpdated: true,
    title: 'LEVI NOTEBOOK',
    themeConfig: {
      logo: '/logo.svg',
      editLink: {
        pattern: 'https://github.com/sky124380729/notebook/tree/master/packages/levi-docs/docs/:path',
        text: 'Edit this page on github'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/sky124380729/notebook' }
      ],
      sidebar: {
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
            text: 'Miniprogram',
            collapsed: true,
            items: [
              { text: 'Knowledge Points', link: '/framework/miniprogram/knowledge' },
            ]
          },
          {
            text: 'Micro Frontend',
            collapsible: true,
            items: [
              { text: 'Knowledge Points', link: '/framework/micro-frontend/knowledge' },
              { text: 'Single SPA', link: '/framework/micro-frontend/single-spa' },
              { text: 'Module Federation', link: '/framework/micro-frontend/module-federation' },
            ]
          }
        ],
        '/algorithm': [
          {
            text: 'Data Structure',
            collapsible: true,
            items: [
              { text: 'Stack', link: '/algorithm/stack' },
              { text: 'Queue', link: '/algorithm/queue' },
              { text: 'Heap', link: '/algorithm/heap' },
              { text: 'Binary Tree', link: '/algorithm/binary-tree' },
            ]
          },
          {
            text: 'Algorithm',
            collapsible: true,
            items: [
              { text: 'Sort', link: '/algorithm/sort' },
              { text: 'Recursion', link: '/algorithm/recursion' },
              { text: 'KMP', link: '/algorithm/kmp' },
            ]
          }
        ]
      },
      nav: [
        { text: 'Language', items: [
          { text: 'Javascript', link: '/language/javascript' },
          { text: 'Typescript', link: '/language/typescript' }
        ] },
        { text: 'Framework', items: [
          { text: 'Vue', link: '/framework/vue/knowledge' },
          { text: 'React', link: '/framework/react/knowledge' },
          { text: 'Miniprogram', link: '/framework/miniprogram/knowledge' },
          { text: 'Micro-Frontend', link: '/framework/micro-frontend/knowledge' },
        ] },
        { text: 'Bundle', items: [
          { text: 'Webpack', link: '/bundle/webpack' },
          { text: 'Vite', link: '/bundle/vite' },
          { text: 'Rollup', link: '/bundle/rollup' },
          { text: 'Esbuild', link: '/bundle/esbuild' }
        ] },
        { text: 'Algorithm', link: '/algorithm/index', activeMatch: '/algorithm/' },
        { text: 'Mini Code', items: [
          { text: 'Vue2', link: '/mini-code/vue2' },
          { text: 'Vue3', link: '/mini-code/vue3' },
          { text: 'Vue-Router', link: '/mini-code/vue-router' },
          { text: 'Promise', link: '/mini-code/promise' },
          { text: 'Micro-Frontend', link: '/mini-code/micro-frontend' },
        ] },
        { text: 'Advanced', items: [
          { text: 'Framework', link: '/advanced/framework' },
          { text: 'Design Patterns', link: '/advanced/design-patterns' },
          { text: 'Reg-Exp', link: '/advanced/reg-exp' }
        ] },
        { text: 'Links', items: [
          { text: 'Projects', link: '/links/projects' },
          { text: 'Plugins', link: '/links/plugins' },
          { text: 'Websites', link: '/links/websites' },
          { text: 'Blogs', link: '/links/blogs' },
        ] },
        { text: 'Interview ', link: '/interview/index', activeMatch: '/interview/' },
        { text: 'Q&A', link: '/qa/index', activeMatch: '/qa/' },
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-present Levi'
      }
    }
})
