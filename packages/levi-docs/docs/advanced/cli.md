# 关于CLI

- shell、bash、cli关系图

  ![image](/assets/imgs/CLI.png)

- 直接执行`vue create vue-test-app`的原理

  ![image](/assets/imgs/CLI2.jpg)

  - 在终端输入 `vue create vue-test-app`
  - 终端解析出`vue`命令
  - 终端在环境变量中找到`vue`命令
  - 终端根据`vue`命令链接到实际文件`vue.js`
  - 终端利用`node`执行`vue.js`
  - `vue.js`解析`command/options`
  - `vue.js`执行`command`
  - 执行完毕，退出执行

- 为什么`vue`命令可以直接执行`vue.js`文件，而不是使用`node vue.js`

  原因就是以下的第一行，告诉操作系统在环境变量中找`node`命令，操作系统通过`node`命令去执行文件

  ```js
  #!/usr/bin/env node

  console.log(1)
  ```

- 脚手架的本质就是客户端，这里讲的客户端并不是指的我们编写的代码本身是客户端，而是`node`是客户端

- 软连接是可以嵌套的，因此比如不想使用`vue`命令，可以再创建一个`vue2`软连接指向`vue`
