# Typescript

[[toc]]

## interface 和 type 的区别

- 如果定义非对象类型，通常推荐使用`type`， 比如`Direction`、`Alignment`、一些`Function`
- 如果定义对象类型，他们是有区别的
  - `interface`可以重复的第某个接口来定义属性和方法
  - `type`定义的是别名，别名是不能重复的

## 各个ts文件定义变量的时候冲突

```ts
const name:string = 'levi'

// 注意下面这一行
export {} // [!code hl]
```

`typescript` 默认会把所有文件都放在一个作用域下，因此定义的单变量可能和其他文件的变量产生冲突，这个使用需要使用`export {}`，告诉 `typescript` 当前文件是一个模块，这样就不会有变量冲突的问题

## 关于 as const

```ts
const options = {
  url: 'https://www.baidu.com',
  method: 'POST'
} as const

request(options.url, options.method)

export {}
```

`as const`，字面量推理，把类型直接转成字面量类型，限制死

## 关于函数返回void类型

函数返回如果定义是`void`，就可以返回任何类型，也可以不返回

## 关于只读属性

```ts
class Person {
  // 1.只读属性是可以在构造函数中赋值，赋值之后就不可以修改
  // 2.属性本身不能进行修改，但是如果它是对象类型，对象中的属性是可以修改的
  readonly name: string
  readonly friend?: Person
  age?: number
  constructor(name: string, friend?: Person) {
    this.name = name
    this.friend = friend
  }
}

const p = new Person('levi', new Person('Kobe'))
console.log(p.name)
console.log(p.friend)

// 不可以直接修改friend
// p.friend = new Person('James')
if(p.friend) {
  p.friend.age = 30
}
```

## 关于类型扩展

为了利用模块扩展的优势，你需要确保将扩展的模块放在 [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) 模块 中。 也就是说，该文件需要包含至少一个顶级的 `import` 或 `export`，即使它只是 `export {}`。

:::danger
如果扩展被放在模块之外，它将覆盖原始类型，而不是扩展!
:::

```typescript
// 不工作，将覆盖原始类型。
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```typescript
// 正常工作。
export {} // [!code hl]

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## npm包的声明文件

### export

npm包的声明文件与全局变量的声明文件有很大的区别。在npm包的声明文件中，使用`declare`不再会声明一个<strong>全局变量</strong>，而只会在当前文件中声明一个<strong>局部变量</strong>。

:::danger
对于npm包的声明文件，只有在声明文件中使用`export`导出，然后在使用方`import`导入后，才会应用到这些类型声明。
:::

`export` 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现

```ts
// types/foo/index.d.ts

export const name: string
export function getName(): string
export class Animal {
    constructor(name: string)
    sayHi(): string
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any
}
```

对应的导入和使用模块应该是这样：

```ts
// src/index.ts

import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name)
let myName = getName()
let cat = new Animal('Tom')
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
let options: Options = {
    data: {
        name: 'foo'
    }
}
```

### 混用 declare 和 export

我们也可以使用 `declare` 先声明多个变量，最后再用 export 一次性导出。上例的声明文件可以等价的改写为:

```ts
// types/foo/index.d.ts

declare const name: string
declare function getName(): string
declare class Animal {
    constructor(name: string)
    sayHi(): string
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any
}

export { name, getName, Animal, Directions, Options }
```

:::warning
注意，与全局变量的声明文件类似，`interface` 前是不需要 `declare` 的。
:::

## 关于tsconfig.json部分字段说明

- paths字段

  `paths`用来配置**路径映射**

  例如一个项目的目录结构如下

  ```txt
  └─packages
    ├─compiler-core
    │  └─src
    ├─compiler-dom
    │  └─src
    ├─reactivity
    │  └─src
    ├─runtime-core
    │  └─src
    ├─runtime-dom
    │  └─src
    ├─shared
    │  └─src
    └─vue
      └─src
  ```

  其中有个包叫`vue`，`vue`包下某个文件想要引入`shared`包下的方法

  ```js
  import { isArray } from '../../shared/src'

  console.log(isArray)
  ```

  以上写法一个比较明显的问题就是，当`shared`包目录位置发生变化，路径要重写，并且这样写不方便也不美观

  可以通过配置`tsconfig.json`的`paths`

  ```json
  {
    "compilerOptions": {
      // 这里也需要配合指定
      "baseUrl": "./",
      "paths": {
        "@vue/*": ["packages/*/src"]
      }
    }
  }
  ```

  这样，就可以使用以下写法

  ```js
  import { isArray } from '@vue/shared/src'

  console.log(isArray)
  ```

- types字段

  如果使用`types`选项，又没有被包含的库，不影响正常使用，只是不会加入到项目全局中去，也不会出现在自动导入提示中

  ```json
  {
    "compilerOptions": {
      "types": ["node", "express"]
    }
  }
  ```

- lib字段

  ts内置了一些库，比如`Math`,`document`之类的，但是假如你在`node`环境下使用，则不需要`document`，所以不需要`dom`选项

  或者你的平台下面浏览器有兼容性需求，要指定某个`es`版本，会使用到此项

  ```json
  {
    "compilerOptions": {
      "lib": ["dom", "esnext"]
    }
  }
  ```

## 开发中常用的名称

- T: Type的缩写，类型
- K、v: Key和Value的缩写，键值对
- E: Element的缩写，元素
- O: Object的缩写，对象

## typescript中高级类型

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {};

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
```

### `extends`

```ts
T extends U ? X : Y
```

看起来是不是有点像三元运算符: `condition ? result(1) : result(2)`，用大白话可以表示为：如果T包含的类型 是 U包含的类型的 '子集'，那么取结果X，否则取结果Y

- demo1

  ```ts
  type Extract<T, U> = T extends U ? T : never;
  ```

  以上`never`可以简单理解为就是去掉该类型，也就是说，`T`的类型存在于`U`中，则留下的意思

  ```ts
  export type A = Extract<'a' | 'b' | 'c', 'a' | 'b'> // 'a' | 'b'
  ```

- demo2

  ```ts
  type Exclude<T, U> = T extends U ? never : T;
  ```

  同上，这个类型意味着`T`类型存在于`U`中，则去掉

  ```ts
  export type B = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'
  ```

### `infer`

在`extends`语句中，还支持`infer`关键字，可以推断一个类型变量，高效的对类型进行模式匹配。

:::warning
注意：这个类型变量只能在`true`的分支中使用
:::

- demo1

  ```ts
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  ```

- demo2

  ```ts
  type Obj<T> = T extends { a: infer R; b: infer R } ? R : any
  type A = Obj<{ a: string, b: string }> // string
  type b = Obj<{ a: string, b: number }> // any
  ```

- demo3(Vue3中的UnwrapRef)

  ```ts
  // 如果泛型变量T是ComputedRef的'子集'，那么使用UnwrapRefSimple处理infer指代的ComputedRef泛型参数V
  // 否则进一步判断是否为Ref的'子集'，进一步UnwrapRefSimple
  export type UnwrapRef<T> = T extends ComputedRef<infer V>
    ? UnwrapRefSimple<V>
    : T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>

  // 如果T为Function | CollectionTypes | BaseTypes | Ref之一的'子集'，直接返回。
  // 否则判断是否为数组的'子集'，不是的话视为object，调用UnwrappedObject
  type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref
    ? T
    : T extends Array<any> ? T : T extends object ? UnwrappedObject<T> : T

  // 调用UnwrapRef，产生递归效果，解决了ts类型递归
  type UnwrappedObject<T> = { [P in keyof T]: UnwrapRef<T[P]> } & SymbolExtract<T>

  // 泛型Ref
  export interface Ref<T = any> {
    [Symbol()]: true
    value: T
  }

  export interface ComputedRef<T = any> extends WritableComputedRef<T> {
    readonly value: T
  }

  export interface WritableComputedRef<T> extends Ref<T> {
    readonly effect: ReactiveEffect<T>
  }
  ```
