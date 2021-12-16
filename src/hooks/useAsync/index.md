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
    value: TData | undefined,
    loading: boolean | null,
    error: null,
    setValue: React.Dispatch<React.SetStateAction<TData | undefined>>,
    refresh: (params: TParams | any) => void ,
    refreshAsync: (params: TParams | any) => Promise<TData> | Promise<void>,
}] = useAsync<TData, TParams>(
  asyncFun: (...args: TParams) => Promise<TData>,
  {
    initValue?: TData | undefined,
    ask?: boolean,
  },
  {
    onSuccess?: (data: TData) => void,
    onError?: (e: Error) => void,
    onFinally?: () => void,
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

### PARAMS

| 参数      | 说明                      | 类型                   |
| --------- | ------------------------- | ---------------------- |
| initValue | 初始 value 值             | `TData` \| `undefined` |
| ask       | 是否首次执行，默认为 true | `boolean`              |

### Options

| 参数      | 说明                    | 类型                    |
| --------- | ----------------------- | ----------------------- |
| onSuccess | asyncFun resolve 时触发 | `(data: TData) => void` |
| onError   | asyncFun reject 时触发  | `(e: Error) => void`    |
| onFinally | asyncFun 执行完成时触发 | `() => void`            |
