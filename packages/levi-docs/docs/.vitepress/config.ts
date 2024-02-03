import { defineConfig } from 'vitepress'

export default defineConfig({
    head: [
      [
        'link', { rel: 'shortcut icon', href: '/favicon.ico'}
      ],
      [
        'script', {}, `
        // 百度流量统计
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?bb6ad308cbbeaa342099abc91a8ee9cb";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
        `
      ]
    ],
    lastUpdated: true,
    title: 'LEVI NOTEBOOK',
    markdown:{
      lineNumbers: true
    },
    // TODO: FOR MONOREPO
    rewrites:{},
    themeConfig: {
      logo: '/logo.svg',
      editLink: {
        pattern: 'https://github.com/sky124380729/sky124380729.github.io/tree/master/packages/levi-docs/docs/:path',
        text: 'Edit this page on github'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/sky124380729/sky124380729.github.io' },
      ],
      sidebar: {
        'mini-code/vue-next-mini': [
          { text: 'reactivity', link: '/mini-code/vue-next-mini/reactivity' },
          { text: 'compiler-core', link: '/mini-code/vue-next-mini/compiler-core' },
          { text: 'compiler-dom', link: '/mini-code/vue-next-mini/compiler-dom' },
          { text: 'runtime-core', link: '/mini-code/vue-next-mini/runtime-core' },
          { text: 'runtime-dom', link: '/mini-code/vue-next-mini/runtime-dom' },
        ],
        '/framework': [
          {
            text: 'Vue',
            collapsed: true,
            items: [
              { text: 'Knowledge Points', link: '/framework/vue/knowledge' },
              { text: 'Source Code', link: '/framework/vue/code' }
            ]
          },
          {
            text: 'React',
            collapsed: true,
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
            collapsed: true,
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
            collapsed: true,
            items: [
              { text: 'Stack', link: '/algorithm/stack' },
              { text: 'Queue', link: '/algorithm/queue' },
              { text: 'Heap', link: '/algorithm/heap' },
              { text: 'Binary Tree', link: '/algorithm/binary-tree' },
            ]
          },
          {
            text: 'Algorithm',
            collapsed: true,
            items: [
              { text: 'Sort', link: '/algorithm/sort' },
              { text: 'Recursion', link: '/algorithm/recursion' },
              { text: 'KMP', link: '/algorithm/kmp' },
            ]
          }
        ],
        '/interview': [
          {
            text: 'Knowledge',
            collapsed: true,
            items: [
              { text: 'Restful', link: '/interview/restful' },
              { text: 'Optimization', link: '/interview/optimization' }
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
          { text: 'vue-next-mini', link: '/mini-code/vue-next-mini/reactivity' },
          { text: 'Vue-Router', link: '/mini-code/vue-router' },
          { text: 'Promise', link: '/mini-code/promise' },
          { text: 'Micro-Frontend', link: '/mini-code/micro-frontend' },
        ] },
        { text: 'Advanced', items: [
          { text: 'Framework', link: '/advanced/framework' },
          { text: 'CLI', link: '/advanced/cli/index' },
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
