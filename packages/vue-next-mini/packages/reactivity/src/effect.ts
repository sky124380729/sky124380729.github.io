import { isArray } from '@vue/shared'
import { ComputedRefImpl } from './computed'
import { createDep, Dep } from './dep'

export type EffectScheduler = (...args: any[]) => any

type KeyToDepMap = Map<any, Dep>

const targetMap = new WeakMap<any, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  // 完成第一次fn函数的执行
  _effect.run()
}

// 当前被激活的effect
export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  computed?: ComputedRefImpl<T>

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null
  ) {}

  run() {
    // 标记当前激活的effect
    activeEffect = this
    return this.fn()
  }
}

// 收集依赖
export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  trackEffects(dep)
}

// 利用 dep 一次跟踪指定 key 的 所有 effect
export function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

// 触发依赖
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function trigger(target: object, key: unknown, newValue: unknown) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep: Dep | undefined = depsMap.get(key)
  if (!dep) return
  triggerEffects(dep)
}

// 依次触发 dep 中保存的依赖
export function triggerEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep]

  // REVIEW: 这里如果不这么写的话会产生死循环，太特么绕了...脑细胞已经没了

  // 先执行计算属性的for循环
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect)
    }
  }

  // 再执行非计算属性的for循环
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect)
    }
  }
}

// 触发指定依赖
export function triggerEffect(effect: ReactiveEffect) {
  // 如果有调度器执行调度，否则执行run
  if (effect.scheduler) {
    effect.scheduler()
  } else {
    effect.run()
  }
}
