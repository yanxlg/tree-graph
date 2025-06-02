/**
 * title: 基础使用
 * description: 基本的血缘视图
 */

import React from 'react';
import {Bloodline} from '@gx6/tree-graph';
import {EventData, EventGroupData} from "../../types";


function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

function randomTitle() {
  const titles = ['分组A', '分组B', '分组C', '分组D', '分组E'];
  return titles[Math.floor(Math.random() * titles.length)];
}

function randomDataType() {
  const types = ['计划', '策略', '任务', '目标', '事件'];
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomNode(depth: number) {
  const id = randomId();
  return {
    id: id,
    type: 'event-group',
    data: {
      id,
      depth,
      title: randomTitle(),
      type: randomDataType(),
      dispatch: '调用'
    },
  } as unknown as EventGroupData;
}

// 生成指定数量的随机节点
function getRandomList(depth: number, count: number = 1) {
  return Array.from({length: count}, () => getRandomNode(depth));
}

function getRandomChildren() {
  return {
    id: randomId(),
    title: randomTitle(),
    type: randomDataType(),
    downstream: [{
      version: '1.0',
      count: 4
    }, {
      version: '1.1',
      count: 4
    }]
  } as EventData;
}


async function getDownstream(depth: number) {
  await new Promise(resolve => setTimeout(resolve, 4000));
  return getRandomList(depth, 5);
}

async function getUpstream(depth: number) {
  await new Promise(resolve => setTimeout(resolve, 4000));
  return getRandomList(depth, 5);
}

async function getChildren() {
  await new Promise(resolve => setTimeout(resolve, 4000));
  return {
    total: 10,
    list: Array.from({length: 3}, () => getRandomChildren())
  };
}


const Page = () => {
  return (
    <Bloodline getChildren={getChildren} getDownstream={getDownstream} getUpstream={getUpstream}/>
  )
}

export default Page;
