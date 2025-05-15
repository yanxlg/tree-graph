---
title: 基础TreeGraph组件
group: 组件
---


## 何时使用
需要用户触发动作时使用，支持主按钮、默认按钮等多种类型。

不知道什么情况啊，为什么不显示

```tsx
import React from 'react';
import {BaseTreeGraph, MindMapData} from '@shuhe/tree-graph';

const data: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题',
  width: 160,
  height: 50,
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1',
      width: 100,
      height: 40,
      children: [
        {
          id: '1-1-1',
          type: 'topic-child',
          label: '子主题1',
          width: 60,
          height: 30,
        },
        {
          id: '1-1-2',
          type: 'topic-child',
          label: '子主题2',
          width: 60,
          height: 30,
        },
      ],
    },
    {
      id: '1-2',
      type: 'topic-branch',
      label: '分支主题2',
      width: 100,
      height: 40,
    },
  ],
}

export default () => <BaseTreeGraph treeData={data} onNodeClick={(event)=>{console.log(event)}}/>;
```
