---
title: useMount
---

# useMount

在组件挂载阶段执行。

## 使用示例

### 基本用法

Demo:

```tsx
import React, { useState, useCallback } from 'react';
import { useMount } from 'r-hooks';

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
```

## API

```ts
useMount(fn:() => void);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | mount 时执行的函数 | `() => void` | -      |
