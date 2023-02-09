import { track, trigger } from './effect'

const get = createGetter()

const set = createSetter()

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}

// 这里的闭包函数其实只是为了和源码的结构保持一致，因为不需要传额外的参数进来，所以没啥太大的意义
function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)

    // 收集依赖
    track(target, key)

    return res
  }
}

function createSetter() {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ) {
    const result = Reflect.set(target, key, value, receiver)

    // 触发依赖
    trigger(target, key, value)

    return result
  }
}
