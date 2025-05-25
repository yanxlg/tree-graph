/**
 * title: 基础使用
 * description: 基本的血缘视图
 */

import React, {useState} from 'react';
import {BloodlineGraph, BloodlineRoot} from '@gx6/tree-graph';

const data: BloodlineRoot = {
  id: '1',
  color: 'red',
  type: 'event',
  title: '1111122222222sadsdasdsadasddsadsafasdsada',
  descriptions: [
    "sadasdsa1111111111122222222sadsdasdsadasddsadsafasdsada11111111",
    "cscxzs"
  ],
  // children: [
  //   {
  //     id: '1-1',
  //     type: 'topic-branch',
  //     label: '分支主题1',
  //     width: 100,
  //     height: 40,
  //     ellipsis: 'multiLine',
  //     children: [
  //       {
  //         id: '1-1-1',
  //         type: 'topic-child',
  //         label: '子主题1',
  //         width: 60,
  //         height: 30,
  //       },
  //       {
  //         id: '1-1-2',
  //         type: 'topic-child',
  //         label: '子主题2',
  //         width: 60,
  //         height: 30,
  //       },
  //     ],
  //   },
  //   {
  //     id: '1-2',
  //     type: 'topic-branch',
  //     label: '分支主题2',
  //     width: 100,
  //     height: 40,
  //   },
  // ],
}


const Page = () => {
  return (
    <BloodlineGraph height={600} root={data}/>
  )
}

export default Page;
