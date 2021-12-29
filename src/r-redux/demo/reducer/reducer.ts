import produce from 'immer';
//  js 的不可变数据结构

export interface IState {
  /** const注释 */
  const: number;
  /** num注释 */
  num: number;
}

const initialState: IState = {
  const: 0,
  num: 0,
};

export enum ActionTypes {
  'CONST' = 'CONST',
  'NUM' = 'NUM',
}

export type Action =
  | { type: ActionTypes.CONST; payload: number }
  | { type: ActionTypes.NUM; payload: number };

const reducerFunction = produce((draft: IState, action: Action) => {
  switch (action.type) {
    case ActionTypes.CONST:
      draft.const = action.payload;
      break;
    case ActionTypes.NUM:
      draft.num = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export { reducerFunction, initialState };
