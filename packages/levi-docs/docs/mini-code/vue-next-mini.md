# vue-next-mini

## reactivity

::: code-group

<<< @/../../vue-next-mini/packages/reactivity/src/reactive.ts

<<< @/../../vue-next-mini/packages/reactivity/src/effect.ts

<<< @/../../vue-next-mini/packages/reactivity/src/baseHandlers.ts

<<< @/../../vue-next-mini/packages/reactivity/src/dep.ts
:::

总结：`reactive`返回目标对象的代理对象，`effect`函数执行的时候，实例化了一个`ReactiveEffect`，并将该示例存到全局`activeEffect`中，同时执行`effect`传递进去的`fn`函数，
此时，`fn`函数由于访问了`代理对象`的某个属性，因此也触发了`track`依赖收集，当后续修改`代理对象`的该属性的时候，由于记录了该属性的依赖，因此可以`trigger`来触发依赖，实现了响应式

## runtime-core
