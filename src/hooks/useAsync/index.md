---
title: useAsync
---

# useAsync

异步数据管理的 Hooks，React 项目中的网络请求场景使用

## 使用示例

### 基本用法

<code src="./demo/demo1.tsx"></code>

## API

```ts
const [{
  /** 返回数据 */
  data?: TData,
  /** loading状态 */
  loading: boolean,
  /** 异常 */
  error?: Error,
  /** 手动触发 asyncFun => void，可传参 */
  run: (...params: TParams) => void,
  /** 手动触发 asyncFun => Promise 执行，可传参 */
  runAsync: (...params: TParams) => Promise<TData>,
  /** 刷新 asyncFun => void 使用默认参数 */
  refresh: () => void,
  /** 刷新 asyncFun => Promise 使用默认参数 */
  refreshAsync: () => Promise<TData>,
  /** 直接修改 data */
  setData: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
}] = useAsync<TData, TParams>(
  /** 异步函数 */
  asyncFun: (...args: TParams) => Promise<TData>,
  {
  /** 是否需要手动执行 */
  manual?: boolean,
  /** 传递给 asyncFun 的参数 */
  params?: TParams,
  /** 设置 loading 变成 true 的延迟时间 */
  loadingDelay?: number,
  /** asyncFun 执行前触发 */
  onBefore?: (params: TParams) => void,
  /** asyncFun resolve 时触发 */
  onSuccess?: (data: TData, params: TParams) => void,
  /** asyncFun reject 时触发 */
  onError?: (e: Error, params: TParams) => void,
  /** asyncFun 执行完成时触发 */
  onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);

```

### 参数

### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| value | asyncFun 返回的数据 | `TData` \| `undefined` |
| setValue | 直接修改 `value` | `React.Dispatch<React.SetStateAction<TData \| undefined>>` |
| error | asyncFun 抛出的异常 | `Error` \| `undefined` |
| loading | asyncFun 是否正在执行 | `boolean` |
| refresh | 手动触发 asyncFun 执行，参数会传递给 asyncFun，异常自动处理，通过 `onError` 反馈 | `(params: TParams \| any) => void` |
| refreshAsync | 手动触发 asyncFun 执行，参数会传递给 asyncFun，但返回的是 Promise，需要自行处理。 | `(params: TParams \| any) => Promise<TData> \| Promise<void>` |

### Options

| 参数      | 说明                    | 类型                    |
| --------- | ----------------------- | ----------------------- |
| onSuccess | asyncFun resolve 时触发 | `(data: TData) => void` |
| onError   | asyncFun reject 时触发  | `(e: Error) => void`    |
| onFinally | asyncFun 执行完成时触发 | `() => void`            |
