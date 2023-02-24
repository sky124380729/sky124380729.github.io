# reactivity

## reactive

::: code-group
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
<<< @/../../vue-next-mini/packages/reactivity/src/ref.ts
:::

::: tip 总结

1. `ref`函数返回的就是`RefImpl`的实例
2. `RefImpl`实例在构造的时候，会判断当前传入的`value`是否是对象，并存到`this._value`上
   1. 复杂数据类型：转化为`reactive`函数返回其`proxy`实例
   2. 简单数据类型：不做处理
3. 当访问`ref.value`的时候，会调用`RefImpl`的`get value`，触发`trackRefValue`函数进行依赖收集，并返回`this._value`

:::
