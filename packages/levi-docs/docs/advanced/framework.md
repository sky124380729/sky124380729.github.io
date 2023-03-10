# Framework

> 关于框架设计的一些思考

[[toc]]

## 软件设计原则

- 单一职责原则
  - 概念：永远不应该有多语义一个原因来改变某个类
  - 理解：对于一个类而言，应该仅有一个引起它变化的原因
  - 应用：如果一个类拥有了两种职责，那就可以将这个类分成两个类

- 开放封闭原则
  - 概念：软件实体扩展应该是开放的，但对于修改应该是封闭的
  - 理解：`对扩展开放，对修改封闭`。可以去扩展类，尽量不要去修改类
  - 应用：当需求有改动，尽量用继承或者组合的方式来扩展类的功能，而不是直接去修改类的代码

- 里氏替换原则（deprecated）
  - 理解：父类一定能被子类替换

- 迪米特原则（最少知识原则）
  - 概念：只与你最直接的对象交流
  - 理解：`高内聚，低耦合`
  - 应用：做系统设计时，尽量减小依赖关系

- 接口隔离原则
  - 一个类与另一个类直接的依赖性，应该依赖于尽可能小的接口
  - 理解：不要对外暴露没有实际意义的接口。用户不应该依赖它不需要的接口
  - 应用：当需要对外暴露接口时，如果是非必要对外提供，尽量删除

- 依赖倒置原则
  - 高层模块不应该依赖于底层模块，他们应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象
  - 理解：应该面向接口编程，不应该面向实现类编程

以上原则英文首字母拼在一起就是`SOLID`(稳定的)，所以也称之为`SOLID`原则

以下是一些补充的设计原则

- 组合/聚合复用原则
  - 当要扩展类的功能时，优先考虑使用`组合`，而不是`继承`
  - 该原则在23中经典设计模式中频繁使用
  - 如：代理模式、装饰模式、适配器模式

- 无环依赖选择
  - 当A依赖B,B依赖C，C依赖A，此时会出现循环依赖
  - 在设计中避免该问题，可通过引入`中介者模式`解决

- 共同封装原则
  - 应该将易变的类放在同一个包里，将变化隔离出来
  - 该原则是基于`开放封闭`的延伸

## 软件设计分层

- 系统级架构
  - 应用在整个系统内，如与后台服务如何通信，与第三方系统如何集成
  - 设计前端首要条件：了解前端系统与其他系统之间的关系，包括`业务关系`和`协作机制`
  - 设计后端：只需要规定与后端数据传递的机制，包括`api`设计规则，访问授权的一个开放标准(oAuth)跳转token的验证，数据传递`Cookie`等
  - 前端与后端的关系主要考虑的因素：前后端分离架构的设计，前后端分离架构其实是如何实施`技术决策`，`用户鉴权`，`API结构管理和设计`，`API文档管理`，`Mock的使用`，`BFF`(服务于前端的后端，nodejs)，`是否需要服务端渲染`等
- 应用级架构
  - 应用级架构可以看做是系统级架构的细化
  - 单个应用与其他外部应用的关系，微服务/微前端框架下多个应用的协作，数据交换等
  - 一般包含`脚手架`，`模式库`，`设计系统`
- 模块级架构
  - 业务编码执行进行设计，我们称之为迭代
- 代码级架构
  - 规范与原则，一般指的是`开发流程`，`代码质量以及改善`，`规范而非默契`

## 编程范式

- 命令式编程：`详细描述做事过程`的方式就叫`命令式`，命令式变成的核心是`关注过程`
- 声明式编程：我们在使用Vue`模板语法`的时候，实际上就是使用的`声明式`编程，因此所谓的声明式，就是`只关注结果，不关注过程`（不代表不需要过程，声明式只是把过程隐藏了）

### 性能

命令式的性能 `优于` 声明式的性能

### 可维护性

声明式的可维护性 `优于` 命令式的可维护性

### 总结

企业级的项目中，考虑成本和开发体验（心智负担），声明式的项目要`明显优于`命令式的项目，也因此，现在选择新项目基本上都是选择`Vue`而非`jQuery`

## 框架设计

尤雨溪在一次演讲中提到：框架的设计过程其实是一个`不断取舍`的过程

对于`Vue`框架而言，调用者是使用`声明式`的方式去使用框架，而`Vue`内部是通过`命令式`的方式进行实现

可以理解为，`Vue`封装了`命令式`的逻辑，而对外暴露了`声明式`的接口

框架作者需要做的就是封装命令式逻辑，同时`尽可能减少性能的损耗`，它需要在`性能`和`可维护性`之间，找到一个平衡点，从而找到`可维护性更好，性能相对更优`的点
