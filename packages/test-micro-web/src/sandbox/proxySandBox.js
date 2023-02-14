let defaultValue = {}

// 代理沙箱
export class ProxySandBox {
  constructor() {
    this.active()
  }

  active() {
    this.proxy = new Proxy(window, {
      set(target, name, value) {
        defaultValue[name] = value
        return true
      },

      get(target, name) {
        if (typeof target[name] === 'function' && /^[a-z]/.test(name)) {
          return target[name].bind && target[name].bind(target)
        } else {
          return defaultValue[name] || target[name]
        }
      }
    })
  }

  inactive() {
    defaultValue = {}
    console.log('关闭沙箱')
  }
}
