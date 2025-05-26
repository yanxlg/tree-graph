/**
 * title: 基础使用
 * description: 基本的节点树渲染，支持折叠配置，支持节点点击回调
 */

import React, {useState} from 'react';
import {BaseTreeGraph, MindMapData} from '@gx6/tree-graph';
import {Button, message} from 'antd';

const data1: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题',
  width: 160,
  height: 50,
  level: 'link',
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1',
      width: 100,
      height: 40,
      ellipsis: 'multiLine',
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

const data2: MindMapData = {
  id: '1',
  type: 'topic',
  label: '中心主题',
  width: 160,
  height: 50,
  collapsed: false,
  children: [
    {
      id: '1-1',
      type: 'topic-branch',
      label: '分支主题1',
      width: 100,
      height: 40,
      collapsed: false,
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
    }
  ],
}


const Page = ()=>{
  const [treeData, setTreeData] = useState(data1);
  return (
    <>
      <Button style={{marginBottom: 12}} onClick={()=>setTreeData(data2)}>显示新数据（全部展开）</Button>
      <BaseTreeGraph height={600} root={treeData} onNodeClick={(event)=>{
        const {parents, children, eventArg} = event;
        message.info(`父节点数量：${parents?.length};子节点数量：${children.length};当前节点 id：${eventArg.node.id}`);
      }}/>
    </>
  )
}

export default Page;
