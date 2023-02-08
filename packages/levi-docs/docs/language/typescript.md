# Typescript

[[toc]]

## 关于tsconfig.json部分字段说明

- paths字段

  `paths`用来配置**路径映射**

  例如一个项目的目录结构如下

  ```txt
  └─packages
    ├─compiler-core
    │  └─src
    ├─compiler-dom
    │  └─src
    ├─reactivity
    │  └─src
    ├─runtime-core
    │  └─src
    ├─runtime-dom
    │  └─src
    ├─shared
    │  └─src
    └─vue
      └─src
  ```

  其中有个包叫`vue`，`vue`包下某个文件想要引入`shared`包下的方法

  ```js
  import { isArray } from '../../shared/src'

  console.log(isArray)
  ```

  以上写法一个比较明显的问题就是，当`shared`包目录位置发生变化，路径要重写，并且这样写不方便也不美观

  可以通过配置`tsconfig.json`的`paths`

  ```json
  {
    "compilerOptions": {
      // 这里也需要配合指定
      "baseUrl": "./",
      "paths": {
        "@vue/*": ["packages/*/src"]
      }
    }
  }
  ```

  这样，就可以使用以下写法

  ```js
  import { isArray } from '@vue/shared/src'

  console.log(isArray)
  ```

- types字段

  如果使用`types`选项，又没有被包含的库，不影响正常使用，只是不会加入到项目全局中去，也不会出现在自动导入提示中

  ```json
  {
    "compilerOptions": {
      "types": ["node", "express"]
    }
  }
  ```

- lib字段

  ts内置了一些库，比如`Math`,`document`之类的，但是假如你在`node`环境下使用，则不需要`document`，所以不需要`dom`选项

  或者你的平台下面浏览器有兼容性需求，要指定某个`es`版本，会使用到此项

  ```json
  {
    "compilerOptions": {
      "lib": ["dom", "esnext"]
    }
  }
  ```
