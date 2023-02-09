import { mutableHandlers } from './baseHandlers'

export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  const existingProxy = proxyMap.get(target)

  // 如果该实例已经被代理，直接返回该代理
  if (existingProxy) return existingProxy

  // 未被代理则生成proxy代理
  const proxy = new Proxy(target, baseHandlers)

  // 缓存代理对象
  proxyMap.set(target, proxy)

  return proxy
}
