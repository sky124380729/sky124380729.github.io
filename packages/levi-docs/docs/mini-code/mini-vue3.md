# Mini Vue3

## <div class="filename">index.html</div>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./renderer.js"></script>
  <script src="./reactive.js"></script>
  <script src="./index.js"></script>
  <script>
    // 1.创建根组件
    const App = {
      data: reactive({
        counter: 0
      }),
      render() {
        return h('div', null, [
          h('h2', null, `当前计数${this.data.counter}`),
          h('button', {
            onClick: () => {
              this.data.counter++
            }
          }, "+1")
        ])
      }
    }
    // 2. 挂载根组件
    const app = createApp(App)
    app.mount('#app')
  </script>
</body>
</html>
```

## <div class="filename">index.js</div>

```js
function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector)
      let isMounted = false
      let oldVNode = null
      watchEffect(function() {
        if(!isMounted) {
          oldVNode = rootComponent.render()
          mount(oldVNode, container)
          isMounted = true
        } else {
          const newVNode = rootComponent.render()
          patch(oldVNode, newVNode)
        }
      })
    }
  }
}
```

## <div class="filename">reactive.js</div>

```js
class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if(activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

let activeEffect = null

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// 这里的WeakMap key必须是对象，是弱引用
const targetMap = new WeakMap()

function getDep(target, key) {
  // 1. 根据对象(target)取出对应的map对象
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 2.取出具体的dep对象
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

// 对raw进行数据劫持
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      dep.depend()
      return target[key]
    },
    set(target, key, newValue) {
      const dep = getDep(target, key)
      target[key] = newValue
      dep.notify()
    }
  })
}
```

## <div class="filename">renderer.js</div>

```js
const h = (tag, props, children) => {
  return { tag, props, children }
}

// vnode -> element
const mount = (vnode, container) => {
  // 1.创建出真实的原生，并且在vnode上保留el
  const el = vnode.el = document.createElement(vnode.tag)
  // 2.处理props
  if(vnode.props) {
    for(const key in vnode.props) {
      const value = vnode.props[key]
      if(key.startsWith('on')) { // 对事件的监听
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  // 3.处理children
  if(vnode.children) {
    if(typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(item => {
        mount(item, el)
      })
    }
  }
  // 4.将el挂载到container
  container.appendChild(el)
}

const patch = (n1, n2) => {
  if(n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentElement
    n1ElParent.removeChild(n1.el)
    mount(n2, n1ElParent)
  } else {
    // 1.取出element对象，并且在n2中进行保存
    const el = n2.el = n1.el
    // 2.处理props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    // 2.1获取所有的newProps添加到el
    for(const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(newValue !== oldValue) {
        if(key.startsWith('on')) { // 对事件的监听
          el.addEventListener(key.slice(2).toLocaleLowerCase(), newValue)
        } else {
          el.setAttribute(key, newValue)
        }
      }
    }
    // 2.2删除旧的props
    /* for(const key in oldProps) {
        if(!(key in newProps)) {
            if(key.startsWith('on')) { // 对事件的监听
                const value = oldProps[key]
                el.removeEventListener(key.slice(2).toLocaleLowerCase(), value)
            } else {
                el.removeAttribute(key)
            }
        }
    } */
    // 2.2删除旧的props改进版，之前由于传进来的事件函数每次都是新的引用
    // 所以判断是否相等的时候始终是不等的，因此会造成事件的重复添加
    for(const key in oldProps) {
      if(key.startsWith('on')) { // 对事件的监听
        const value = oldProps[key]
        el.removeEventListener(key.slice(2).toLocaleLowerCase(), value)
      }
      if(!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    // 3.处理children
    const oldChildren = n1.children || []
    const newChildren = n2.children || []
    if(typeof newChildren === 'string') {
      // 边界情况(edge case)
      if(typeof oldChildren === 'string') {
        if(newChildren !== oldChildren) {
            el.textContent = newChildren
        }
      } else {
        el.innerHTML = newChildren
      }
    } else { // 情况而： newChildren本身是个数组
        if(typeof oldChildren === 'string') {
          el.innerHTML = "";
          newChildren.forEach(item => {
            mount(item, el)
          })
        } else {
          // oldChildren [v1, v2, v3]
          // newChildren [v1, v5, v6, v8, v9]
          // 1.前面有相同节点的元素进行patch操作
          const commonLength = Math.min(oldChildren.length, newChildren.length)
          for(let i = 0; i< commonLength; i++) {
            patch(oldChildren[i], newChildren[i])
          }
          // 2.newChildren.length > oldChildren.length
          if(newChildren.length > oldChildren.length) {
            newChildren.slice(oldChildren.length).forEach(item => {
              mount(item, el)
            })
          }
          // 3. newChildren.length < oldChildren.length
          if(newChildren.length < oldChildren.length) {
            oldChildren.slice(newChildren.length).forEach(item => {
              el.removeChild(item.el);
            })
          }
        }
    }
  }
}
```
