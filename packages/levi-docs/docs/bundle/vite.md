# Vite

## Vite本身服务器也不错

- vite不打包，打包写的什么就是什么，甚至vue文件都不编译，通过请求头设置为`application/javascript`直接抓取vue文件
- 生产环境可以开启https,直接dev启动给用户使用，前提是用户的浏览器要支持es module
- 缺点就是代码都暴露了

## Vite依赖是强缓存，开发源码是协商缓存，所以调试node\_modules的时候会有问题

> 解析后的依赖请求会以 HTTP 头 max-age=31536000,immutable 强缓存，以提高在开发时的页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。如果安装了不同的版本（这反映在包管理器的 lockfile 中），则附加的版本 query 会自动使它们失效。如果你想通过本地编辑来调试依赖项，你可以:

- 通过浏览器 devtools 的 Network 选项卡暂时禁用缓存；
- 重启 Vite dev server，使用 --force 标志重新打包依赖；
- 重新载入页面。
