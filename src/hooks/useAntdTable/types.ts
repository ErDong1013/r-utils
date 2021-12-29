import type { Result, Options } from 'ahooks/lib/useRequest/src/types';

export type Data = { total: number; list: any[] };
export type Params = [
  {
    current: number;
    pageSize: number;
    [key: string]: any;
  },
  ...any[]
];
export type Service<TData extends Data, TParams extends Params> = (
  ...args: TParams
) => Promise<TData>;

export interface AntdTableResult<TData extends Data, TParams extends Params>
  extends Result<TData, TParams> {
  tableProps: {
    key: string;
    rowKey: string;
    dataSource: any[];
    className: string;
    loading: boolean;
    onChange: (pagination: any) => void;
    pagination: any;
    // TODO 类型冲突
    tableAlertRender: boolean | any;
    scroll: { scrollToFirstRowOnChange: boolean; y: string };
    rowSelection?:
      | {
          selected: boolean;
          type: 'checkbox';
          onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
        }
      | undefined;
    [key: string]: any;
  };
  /** 搜索请求 */
  submit: (params: { [key: string]: any }) => void;
}

export interface AntdTableOptions<TData extends Data, TParams extends Params>
  extends Options<TData, TParams> {
  /** 唯一ID 必传（不可与其他table重名） */
  onlyId: string;
  /** 是否支持 table 多选 */
  checkbox?: boolean;
  /** tab对应返回数据路径，参考 lodash get 方法 path 入参 */
  optionDataPath?: string;
  /** correctHeight */
  correctHeight?: number;
  /** 默认分页数量 默认20  */
  defaultPageSize?: number;
  /** 选中项发生变化时的回调 */
  onChangeCheckbox?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
}
