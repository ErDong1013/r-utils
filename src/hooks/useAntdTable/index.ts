import { get } from 'lodash';
import { useMemoizedFn, usePagination } from 'ahooks';
import { useTableAutoHeight } from '../useTableAutoHeight';
import type { Data, Params, Service, AntdTableResult, AntdTableOptions } from './types';

/**
 * useAntdTable 基于 ahooks: useRequest、usePagination 实现
 * @param asyncFun
 * @param param
 * @returns
 */
export const useAntdTable = <TData extends Data, TParams extends Params>(
  asyncFun: Service<TData, TParams>,
  {
    onlyId,
    checkbox = true,
    optionDataPath = 'records',
    defaultPageSize = 20,
    onChangeCheckbox,
    correctHeight = 20,
    ...rest
  }: AntdTableOptions<TData, TParams>,
) => {
  const result = usePagination<TData, TParams>(asyncFun, { defaultPageSize, ...rest });

  const { params = [], run } = result;

  const [height] = useTableAutoHeight(onlyId, { correctHeight });

  const onTableChange = (pagination: any) => {
    const [paginationParams] = params || [];

    run(
      // @ts-ignore
      {
        ...paginationParams,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    );
  };

  const submit = (params: { [key: string]: any }) => {
    // @ts-ignore
    run({ current: 1, pageSize: result.pagination.pageSize, ...params });
  };

  const tableProps = {
    key: onlyId,
    rowKey: 'id',
    className: onlyId,
    dataSource: get(result.data, optionDataPath, []) as Array<TData>,
    loading: result.loading,
    tableAlertRender: false,
    onChange: useMemoizedFn(onTableChange),
    scroll: { scrollToFirstRowOnChange: true, y: height },
    rowSelection: checkbox
      ? {
          selections: false,
          type: 'checkbox', // 单选为radio 多选为checkbox
          onChange:
            typeof onChangeCheckbox === 'function' ? useMemoizedFn(onChangeCheckbox) : () => {},
        }
      : undefined,
    pagination: {
      current: result.pagination.current,
      pageSize: result.pagination.pageSize,
      total: result.pagination.total,
    },
  };

  return { ...result, tableProps, submit: useMemoizedFn(submit) } as AntdTableResult<
    TData,
    TParams
  >;
};
