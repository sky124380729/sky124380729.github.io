# Source Code

Vue是一套`运行时` + `编译时`框架

## render函数

<<< @/public/demos/render.html

<iframe width="100%" src="/demos/render.html"></iframe>

## compile函数

把template中的html编译成render函数

<<< @/public/demos/compiler.html

<iframe width="100%" src="/demos/compiler.html"></iframe>

## reactivity

<<< @/public/demos/reactivity/reactive.html

<iframe width="100%" src="/demos/reactivity/reactive.html"></iframe>

## vue2

我们终于看到了 Vue 的庐山真面目，它实际上就是一个用 Function 实现的类，我们只能通过 new Vue 去实例化它

<<< @/snippets/framework/vue2.js

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement 方法创建的，我们接下来分析这部分的实现。

patch: 把虚拟dom转换为真实dom
mount: 把dom挂载到页面上
compiler: 把模板转换为render函数

## vue3

- 类型判断

```js
// 定义的时候
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}

// 判断的时候
if (shapeFlag & ShapeFlags.ELEMENT) {
  processElement(
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  )
} else if (shapeFlag & ShapeFlags.COMPONENT) {
  processComponent(
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  )
}
```

- 依赖收集时候关于依赖定义的写法

```js
const targetMap = new WeakMap()
let depsMap = targetMap.get(target)
if (!depsMap) {
  targetMap.set(target, (depsMap = new Map()))
}
let dep = depsMap.get(key)
if (!dep) {
  depsMap.set(key, (dep = createDep()))
}
```

- 触发依赖时候兼容数组写法

```js
export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (__DEV__ && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
      }
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }
}
```
