/**
 * title: 自动计算宽度
 * description: 当不清楚节点中文字长度时，如果希望能够一直显示完成的文字，则可以设置宽度为 auto，会自动计算文字宽度
 */


import React from 'react';
import {BaseTreeGraph, MindMapData} from '@shuhe/tree-graph';
import {message} from 'antd';

const data: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题中心主题中心主题中心主题中心主题',
  width: 'auto',
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1分支主题1分支主题1分支主题1',
      width: 'auto',
      ellipsis: 'multiLine',
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
      <BaseTreeGraph height={600} treeData={data} onNodeClick={(event)=>{
        const {parents, children, eventArg} = event;
        message.info(`父节点数量：${parents?.length};子节点数量：${children.length};当前节点 id：${eventArg.node.id}`);
      }}/>
    </>
  )
}

export default Page;
