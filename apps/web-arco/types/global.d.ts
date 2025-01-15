declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type EmitType = (event: string, ...args: any[]) => void

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T> 
