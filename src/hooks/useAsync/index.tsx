import { useState, useEffect, useCallback, useRef } from 'react';

export type Service<TData> = (...args: any[]) => Promise<TData>;

export type Plugin<TData> = {
  onSuccess?: (res: TData) => void;
  onError?: (e: Error) => void;
  onFinally?: () => void;
};

export type Options<TData> = {
  initValue?: TData | undefined;
  ask?: boolean;
};

export default function useAsync<TData, TParams>(
  asyncFun: Service<TData>,
  options: Options<TData> = {},
  plugins: Plugin<TData> = {},
) {
  const { initValue = undefined, ask = true } = options;

  const serviceRef = useRef(asyncFun);

  const [value, setValue] = useState<TData | undefined>(initValue);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(
    (params: TParams | any) => {
      return params ? serviceRef.current(...params) : serviceRef.current();
    },
    [asyncFun],
  );

  const refreshAsync = useCallback(
    (params: TParams | any) => {
      setLoading(true);
      params
        ? refresh(params)
        : refresh(null)
            .then((res) => {
              setValue(res);
              typeof plugins.onSuccess === 'function' && plugins.onSuccess;
            })
            .catch((err) => {
              setError(err);
              typeof plugins.onError === 'function' && plugins.onError;
            })
            .finally(() => {
              setLoading(false);
              typeof plugins.onFinally === 'function' && plugins.onFinally;
            });
    },
    [refresh],
  );

  useEffect(() => {
    ask && refreshAsync(null);
  }, [refreshAsync]);

  const asyncData = { value, loading, error, setValue, refresh, refreshAsync };

  return [asyncData];
}
