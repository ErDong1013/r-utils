import { useRequest } from 'ahooks';
import { Options as Configure } from 'ahooks/es/useRequest/src/types';

export type AsyncFun<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;

export interface Options<TData, TParams extends any[]> {
  /** 是否需要手动执行 */
  manual?: boolean;
  /** 传递给 asyncFun 的参数 */
  params?: TParams;
  /** 设置 loading 变成 true 的延迟时间 */
  loadingDelay?: number;
  /** asyncFun 执行前触发 */
  onBefore?: (params: TParams) => void;
  /** asyncFun resolve 时触发 */
  onSuccess?: (data: TData, params: TParams) => void;
  /** asyncFun reject 时触发 */
  onError?: (e: Error, params: TParams) => void;
  /** asyncFun 执行完成时触发 */
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
}

export function useAsync<TData, TParams extends any[]>(
  asyncFun: AsyncFun<TData, TParams>,
  options?: Options<TData, TParams>,
) {
  const configure: Configure<TData, TParams> = { ...options, defaultParams: options?.params };
  const { data, error, loading, run, runAsync, refresh, refreshAsync, mutate } = useRequest<
    TData,
    TParams
  >(asyncFun, { ...configure });

  const asyncData = {
    data,
    error,
    loading,
    run,
    runAsync,
    refresh,
    refreshAsync,
    setData: mutate,
  };

  return [asyncData];
}

export default useAsync;
