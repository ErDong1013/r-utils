import { useState, useEffect } from 'react';

export const useTableAutoHeight = (
  targetId: string,
  impurityHeight?: { paginationHeight?: number; tabHeight?: number; correctHeight?: number },
) => {
  const { paginationHeight = 60, tabHeight = 37, correctHeight = 20 } = impurityHeight || {};
  const [height, setHeight] = useState<string>('100%');

  // 高度计算
  const resize = () => {
    const targetRef = document.querySelectorAll(`.${targetId}`)[0];
    if (targetRef) {
      const _height = targetRef.getBoundingClientRect().top;
      const impurityHeight = paginationHeight + tabHeight + correctHeight;
      setHeight(`calc(100vh - ${_height}px - ${impurityHeight}px)`);
    }
  };

  useEffect(() => {
    // 监听
    window.addEventListener('resize', resize);
    // 初次执行
    resize();
    // 初次延迟执行
    setTimeout(resize, 1);
    // 销毁时注销
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return [height];
};
