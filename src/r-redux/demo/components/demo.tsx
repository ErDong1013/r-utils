import React, { useContext } from 'react';
import { ActionTypes, GlobalContext } from '../reducer/Provider';

import { Button, Space } from 'antd';

export default (() => {
  const { state, dispatch } = useContext(GlobalContext);

  const onClick_1 = () => {
    dispatch({ type: ActionTypes.CONST, payload: state.const + 1 });
  };

  const onClick_2 = () => {
    dispatch({ type: ActionTypes.NUM, payload: state.num + 2 });
  };

  return (
    <>
      <Space>
        <Button onClick={onClick_1}>{state.const}点击</Button>
        <Button onClick={onClick_2}>{state.num}点击</Button>
      </Space>
    </>
  );
}) as React.FC;
