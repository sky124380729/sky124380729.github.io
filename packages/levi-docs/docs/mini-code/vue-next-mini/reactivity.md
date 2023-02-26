# reactivity

## reactive

::: code-group
<<< @/../../vue-next-mini/packages/vue/examples/reactivity/reactive.html
<<< @/../../vue-next-mini/packages/reactivity/src/reactive.ts
<<< @/../../vue-next-mini/packages/reactivity/src/effect.ts
<<< @/../../vue-next-mini/packages/reactivity/src/baseHandlers.ts
<<< @/../../vue-next-mini/packages/reactivity/src/dep.ts
:::

::: tip 总结

1. `reactive`返回目标对象的代理对象
2. `effect`函数执行的时候，实例化了一个`ReactiveEffect`，并将该实例存到全局`activeEffect`中，同时执行`effect`传递进去的`fn`函数
3. `fn`函数由于访问了`代理对象`的某个属性，因此也触发了`track`依赖收集
4. 当后续修改`代理对象`的该属性的时候，由于记录了该属性的依赖，因此可以`trigger`来触发依赖，实现了响应式

:::

## ref

::: code-group
<<< @/../../vue-next-mini/packages/vue/examples/reactivity/ref.html
<<< @/../../vue-next-mini/packages/reactivity/src/ref.ts
:::

::: tip 总结

1. `ref`函数返回的就是`RefImpl`的实例
2. `RefImpl`实例在构造的时候，会判断当前传入的`value`是否是对象，并存到`this._value`上
   1. 复杂数据类型：转化为`reactive`函数返回其`proxy`实例
   2. 简单数据类型：不做处理
3. 当访问`ref.value`的时候，会调用`RefImpl`的`get value`，触发`trackRefValue`函数进行依赖收集，并返回`this._value`
4. 当使用`ref.value = xxx`设置值得时候，会调用`RefImpl`的`set value`，使用`triggerRefValue`来触发依赖
:::

::: warning 注意

需要注意的是，`ref`对于**简单数据类型**的值，它是通过`Object.defineProperty`或者`Proxy`来监听的吗？

并不是，它是通过`RefImpl`类的`get value`和`set value`的**主动触发**来做响应式，因此在使用`ref`的时候，必须要使用`.value`

也就是说`ref`对于**简单数据类型没有**所谓的监听

:::

## computed

::: code-group
<<< @/../../vue-next-mini/packages/vue/examples/reactivity/computed.html
<<< @/../../vue-next-mini/packages/reactivity/src/computed.ts
:::

::: tip 总结

由以上代码可知，整个计算属性的逻辑是非常复杂的：

1. 整个事件由 `obj.name = '李四'`开始
2. 触发了`proxy`实例的`setter`
3. 执行`trigger`，**第一次触发依赖**
4. 注意，此时`effect`包含调度器属性，所以会触发调度器
5. 调度器执行`ComputedRefImpl`的构造函数中传入的匿名函数
6. 在匿名函数中会**再次触发依赖**
7. 即：**两次触发依赖**
8. 最后执行:

  ```js
  () => {
    return '姓名：' + obj.name
  }
  ```

:::
