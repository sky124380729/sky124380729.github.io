export type A = Extract<'a' | 'b' | 'c', 'a' | 'b'>
export type B = Exclude<'a' | 'b' | 'c', 'a' | 'b'>

type Obj<T> = T extends { a: infer R; b: infer R } ? R : any

type b = Obj<{ a: string; b: string }>
