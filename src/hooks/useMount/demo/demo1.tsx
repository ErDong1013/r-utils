import React, { useState, useCallback } from 'react';
// @ts-ignore
import { useMount } from 'r-utils';

export default () => {
  const [isMount, setIsMount] = useState(false);

  const handleClick = useCallback(() => {
    setIsMount((v) => !isMount);
  }, [isMount]);

  return (
    <div>
      <button onClick={handleClick}>点击{isMount ? '卸载' : '挂载'} mount 组件</button>
      {isMount && <MountComponent />}
    </div>
  );
};

const MountComponent = () => {
  useMount(() => {
    alert('mount 阶段被执行了');
  });
  return <div>新组件挂载了</div>;
};
