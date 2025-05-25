/**
 * title: 单行溢出
 * description: 设置宽度，当文本超过该宽度时自动溢出显示
 */


import React from 'react';
import {BaseTreeGraph, MindMapData} from '@gx6/tree-graph';
import {message} from 'antd';

const data: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题中心主题中心主题中心主题中心主题',
  width: 100,
  ellipsis: true,
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1分支主题1分支主题1分支主题1',
      width: 90,
      ellipsis: true,
      children: [
        {
          id: '1-1-1',
          type: 'topic-child',
          label: '子主题1',
          width: 60,
        },
        {
          id: '1-1-2',
          type: 'topic-child',
          label: '子主题2',
          width: 60,
        },
      ],
    },
    {
      id: '1-2',
      type: 'topic-branch',
      label: '分支主题2',
      width: 'auto',
    },
  ],
}

const Page = ()=>{
  return (
    <>
      <BaseTreeGraph height={600} root={data} onNodeClick={(event)=>{
        const {parents, children, eventArg} = event;
        message.info(`父节点数量：${parents?.length};子节点数量：${children.length};当前节点 id：${eventArg.node.id}`);
      }}/>
    </>
  )
}

export default Page;
