# Knowledge Points

## Vue的版本

- vue(.runtime).global(.prod).js

  - 通过浏览器的`<script src="">`直接引入
  - 我们之前通过`CDN`和下载的`Vue`版本就是这个版本
  - 会暴露一个全局的`Vue`来使用

- vue(.runtime).esm-browser(.prod).js

  - 用于原生`ES`模块导入使用，在浏览器中是通过`<script type="module" src="">`来使用

- vue(.runtime).esm-bundle.js

  - 用于`webpack`，`rollup`，`parcel`等构建工具
  - 构建工具中（例如`vue-cli`）默认是`vue.runtime.esm-bundle.js`，我们可以看到webpack配置的`alias`有一句话

  ```js
  alias: {
    '@': '/src',
    // 其中这里的$是webpack的语法，精确匹配的意思，这里没有引号
    vue$: 'vue/dist/vue.runtime.esm.js'
  }
  ```

## 关于watch

为了发现对象内部值得变化，可以在选项参数中指定`deep:true`，这个选项同样适用于监听数组变更

:::warning
当变更(不是替换)对象或数组并使用deep选项时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue不会保留变更之前值得副本。
:::

黑科技用法

```js
const App = {
  template: '#my-app',
  data() {
    return {
      friends: [
        { name: "levi" },
        { name: "zq" }
      ]
    }
  },
  watch:{
    // 这样做不可以，可以使用deep做深度监听，也可以采用左键的方式，
    // 把name传到组件内部再进行监听，如下面的components，
    // 然后再模板中v-for这个BaseFriend组件即可
    "friends[0].name": function(newName, oldName) {
      console.log(newName, oldName)
    }
  },
  components: {
    BaseFriend: {
      props: {
        friend: Object
      }
    }
  }
}
```

## mixin如何传参

```js
export default rightType => ({ // rightType作为参数传入，返回特定mixin
  computed: {
    hasRight() { // 判断用户是否有权限进入本页面的计算属性
      // 这里的user是之前在app中通过接口返回注入store的用户信息
      const { rightList } = this.$store.state.user
      return rightList.indexOf(rightType)
    }
  }
})
```

## computed如何传参

```vue
<template>
  <h2>{{total(3)}}</h2>
</template>

<script>
export default {
  data() {
    return {
      x: 1
    }
  },
  computed: {
    total() {
      return function(n) {
        return x * 2
      }
    }
  }
}
</script>
```

## 不刷新页面的情况下更新页面

> 这个`issue`由来已久，目前可以使用`redirect`的方案

<div class="filename">redirect.vue</div>

```vue
<script lang="ts" setup name="redirect">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  const { params, query } = route
  const { path } = params

  router.replace({
    path: '/' + (Array.isArray(path) ? path.join('/') : path),
    query
  })
})
</script>
```

<div class="filename">xxx.vue</div>

```vue
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { push } = useRouter()

const refreshRoute = () => {
  const { fullPath } = route
  push(`/redirect${fullPath}`)
}
</script>

<template>
  <div @click="refreshRoute">刷新路由</div>
</template>
```

## 监听第三方组件的生命周期

```vue
<Test @hook:mounted="doSomething" />
```

## Vue中的防抖和节流

> Vue不包含对去抖动或节流的内置支持，但可以使用Lodash等库来实现

如果某个组件仅使用一次：

```js
Vue.createApp({
  methods: {
    // Debouncing with Lodash
    click: _.debounce(function() {
      // ... respond to click ...
    }, 500)
  }
}).mount('#app')
```

但是，这种方法对于重用的组件可能会出现问题，因为它们都将共享相同的去抖动功能。为了使组件实例彼此独立，我们可以在created生命周期挂钩中添加去抖动功能：

```js
app.component('save-button', {
  created() {
    // Debouncing with Lodash
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // Cancel the timer when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  },
  template: `
    <button @click="debouncedClick">
      Save
    </button>
  `
})
```

## 多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```vue
<template>
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">
  Submit
</button>
</template>

<script>
methods: {
  one(event) {
    // first handler logic...
  },
  two(event) {
    // second handler logic...
  }
}
</script>
```

## .exact 修饰符

> .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```vue
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

## Teleport

> Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。

让我们修改 modal-button 以使用 `teleport`，并告诉 Vue Teleport 这个 HTML 到该body标签

```js
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal!
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

## 关于Setup

`setup`相当于beforeCreate和created，只会执行一次

当`setup`中的响应式数据发生变化的时候，会重新触发`render`

```ts
export default defineComponent({
  setup() {
    const numRef = ref(0)

    setInterval(() => {
      numRef.value += 1
    })

    // 如果在此定义num，那这个值只会执行一次，dom里面的值不会发生变化
    const num = numRef.value

    return () => {
      return h('div',num)
    }
  }
})

export default defineComponent({
  setup() {
    const numRef = ref(0)

    setInterval(() => {
      numRef.value += 1
    })

    return () => {
      // 如果在此定义num，由于每次numRef发生变化的时候return函数都会触发，因此在这里dom会发生更新
      const num = numRef.value
      return h('div',num)
    }
  }
})
```

## 如何监听`slot`元素的内容

- vue2可以使用`$on`，`$emit`，`$off`
- vue3移除了上述API，可以使用第三方库，比如`mitt`

## 如何以方法的形式弹出`message`组件

<div class="filename">createMessage.ts</div>

```ts
import { creteApp } from 'vue'
import Message from './index.vue'
import type { MessageType } from './types'

const createMessage = (message:string, type: MessageType, timeout = 2000) => {
  // 这里注意createApp 第一个参数为组件跟选项对象  第二个参数为组件的props
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const domNode = document.createElement('div')
  messageInstance.mount(domNode)
  document.body.appendChild(domNode)

  setTimeout(() => {
    messageInstance.unmount(domNode)
    document.body.removeChild(domNode)
  })
}

export default createMessage
```

## 关于Vue3， props单独定义的坑

> typescript中，如果对象设置为Readonly的话，此时如果对象有`{ required:true }`属性，那么会让这个对象是必传的，`as const` 其实就是让对象变为Readonly

```tsx
import { defineComponent } from 'vue'
import { NInput, inputProps } from 'naive-ui'

// 注意这里的as const，这样可以告诉typescript这个是readonly的，不然会导致required:true不生效
const VInputProps = {
  ...inputProps
} as const

export default defineComponent({
  name: 'v-input',
  props: VInputProps,
  setup(props, { slots, attrs }) {
    return () => (
      <NInput {...props} {...attrs}>
        {slots}
      </NInput>
    )
  }
})
```

## 关于provide，inject

- 为了防止provide,inject的key重复，官方建议key使用Symbol

<div class="filename">context.ts</div>

```ts
export const MyKey = Symbol()
```

<div class="filename">a.tsx</div>

```tsx
import { MyKey } from './context.ts'
export default defineComponent({
  setup() {
    const context = {}
    provide(MyKey,context)
  }
})
```

<div class="filename">b.tsx</div>

```tsx
import { MyKey } from './context.ts'
export default defineComponent({
  setup() {
    inject(MyKey,context)
  }
})
```

:::warning
provide下去的内容需要reactive或者ref才会响应
:::

- this和响应式

```js
import { computed } from 'vue'
export default {
  data() {
    return {
      age: 18
    }
  },
  provide: {
    name: 'levi',
    age: this.age // 这里的this指向是什么？这样写会报错
  },
  provide() {
    return {
      name: 'levi',
      age: this.age // 这样写没问题，但是依然不是响应式的
    }
  },
  provide() {
    return {
      name: 'levi',
      age: computed(() => this.age) //这样this指向没问题，传递的数据也是响应式的
    }
  }
}
```

## 使用withDirectives实现各种指令

```tsx
import { defineComponent, ref, Transition, withDirectives, vShow } from 'vue';
import './style.less';

const App = defineComponent({
  setup() {
    const count = ref(0);
    const handleClick = () => {
      count.value ++;
    }

    return () => (
      <div >
        <button onClick={handleClick}>toggle</button>
        <Transition name="slide-fade">
          {withDirectives(<h1>Count: {count.value}</h1>, [[
            vShow, count.value % 2 === 0
          ]])}
        </Transition>
      </div>
    )
  }
})
```

## Vue的动画原理

- v-enter-from: 定义过渡的开始状态，在元素被插入之前生效，在元素被插入之后的下一帧移除
- v-enter-active: 定义进入过渡生效时的状态，在整个过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后溢出。这个类可以用来定义进入过渡的过程时间，延迟和曲线函数
- v-enter-to: 定义过渡的结束状态。在元素被插入之后下一帧生效(与此同时v-enter-from被移除)，在过渡/动画完成之后移除
- v-leave-from,v-leave-active,v-leave-to 类似

如果写transition相当于需要告诉动画from 和 to，就需要些v-enter-from和v-enter-to

如果写animation因为是完整的动画，所以不需要写v-enter-from和v-enter-to

```css
.levi-enter-active {
  animation: bounce 1s ease;
}
.levi-enter-active {
  animation: bounce 1s ease reverse;
}
@keyframes bounce {
  0% {
    transition: scale(0);
  }
  50% {
    transiton: scale(1.2);
  }
  100% {
    transition: scale(1);
  }
}
```

animation 和 transition 可以同时存在，但是两个动画时间可能不一致

- 如果我们只设置其实一个，vue能自动识别类型并设置监听
- 如果两个都设置了（用的比较少），可能一个动画执行结束时，另外一个动画还没有结束，这个时候我们可以通过设置type 为 animation或者transtion明确告知vue监听的类型
- 也可以手动设置`duration`，用的比较少

## 子元素的根组件

使用scoped后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件有作用域的CSS和子组件有作用域的CSS的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

## Bundler Build Feature Flags

Starting with 3.0.0-rc.3, esm-bundler builds now exposes global feature flags that can be overwritten at compile time:

- VUE_OPTIONS_API (enable/disable Options API support, default: true)
- VUE_PROD_DEVTOOLS (enable/disable devtools support in production, default: false)

The build will work without configuring these flags, however it is strongly recommended to properly configure them in order to get proper tree-shaking in the final bundle. To configure these flags:

- webpack: use [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
- rollup: use [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)
- vite: configured by default, but can be overwritten using the [define option](https://github.com/vitejs/vite/blob/a4133c073e640b17276b2de6e91a6857bdf382e1/src/node/config.ts#L72-L76)

:::warning
Note: the replacement value must be boolean literals and cannot be strings, otherwise the bundler/minifier will not be able to properly evaluate the conditions.
:::
