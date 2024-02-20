# Monorepo

## 关于入口文件的定义

`monorepo` 是多个项目的集合体，比如`xx-ui`和`xx-utils`在同一个`workspace`中，他们本身可以互相引用，也都可以独立发布，然而在同一个仓库中由于`工具链一致`，直接引用没有问题，但是发布到`npm`中，一般都要经过打包的(`mjs`和`cjs`)，才能不对调用方对工具链做约束。因此，对于包的引用方式就需要区别对待。

我们来看`vueuse`的解决方案

- 目录结构

```
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── FUNDING.json
├── LICENSE
├── README.md
├── eslint.config.js
├── meta
│   ├── ecosystem-functions.ts
│   ├── packages.ts
│   └── versions.ts
├── netlify.toml
├── package.json
├── packages
│   ├── add-ons.md
│   ├── components
│   ├── contributors.json
│   ├── contributors.ts
│   ├── core
│   ├── ecosystem.md
│   ├── electron
│   ├── export-size.json
│   ├── export-size.md
│   ├── firebase
│   ├── functions.md
│   ├── guide
│   ├── guidelines.md
│   ├── index.md
│   ├── integrations
│   ├── math
│   ├── metadata
│   ├── nuxt
│   ├── public
│   ├── router
│   ├── rxjs
│   ├── shared
│   └── why-no-translations.md
├── playgrounds
│   ├── build.sh
│   ├── nuxt
│   ├── vite
│   └── vite-vue2.7
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── rollup.config.ts
├── scripts
│   ├── build-run.ts
│   ├── build.ts
│   ├── changelog.ts
│   ├── export-size.ts
│   ├── fix-types.ts
│   ├── og-template.svg
│   ├── publish.ts
│   ├── redirects.ts
│   ├── release.ts
│   ├── update.ts
│   └── utils.ts
├── taze.config.ts
├── tsconfig.json
├── unocss.config.ts
└── vitest.config.ts
```

- 包入口文件的定义

```json
{
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs"
    },
    "./*": "./*",
    "./metadata": {
      "import": "./metadata.mjs",
      "require": "./metadata.cjs"
    }
  },
  "main": "./index.cjs",
  "module": "./index.mjs",
  "unpkg": "./index.iife.min.js",
  "jsdelivr": "./index.iife.min.js",
  "types": "./index.d.cts",
  ...
}
```

- tsconfig.json定义

```json
{
  "compilerOptions": {
    "target": "es2020",
    "jsx": "preserve",
    "lib": ["ESNext", "DOM", "DOM.Iterable", "webworker"],
    "baseUrl": ".",
    "rootDir": ".",
    "module": "esnext",
    "moduleResolution": "Bundler",
    "paths": {
      "@vueuse/core": ["./packages/core/index.ts"],
      "@vueuse/core/*": ["./packages/core/*"],
      "@vueuse/docs-utils": ["./packages/.vitepress/plugins/utils.ts"],
      "@vueuse/integrations": ["./packages/integrations/index.ts"],
      "@vueuse/metadata": ["./packages/metadata/index.ts"],
      "@vueuse/math": ["./packages/math/index.ts"],
      "@vueuse/shared": ["./packages/shared/index.ts"],
      "@vueuse/shared/*": ["./packages/shared/*"]
    },
    "resolveJsonModule": true,
    "types": [
      "vitest",
      "@types/web-bluetooth"
    ],
    "strict": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "declaration": true,
    "declarationDir": "./types",
    "esModuleInterop": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true
  },
  "include": [
    "*.ts",
    "packages",
    "packages/.vitepress/components/*.vue",
    "packages/.vitepress/*.ts",
    "meta",
    "vitest.config.ts"
  ],
  "exclude": [
    "unocss.config.ts",
    "node_modules",
    "**/*.md",
    "**/dist",
    "packages/.test",
    "packages/_docs"
  ]
}
```
