/*
 * @author: yanxianliang
 * @date: 2025-06-01 21:37
 * @desc: layout 布局
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Edge} from '@xyflow/react';
import {mindmapNodes} from "./hierarchy";
import {NodeType} from "../types";


export const initialNodes = [
  {
    id: '0',
    type: 'event',
    data: {
      id: '0',
      depth: 0,
      title: '12121321321321',
      type: '策略',
      upstream: {
        count: 20
      },
      downstream: [{
        version: '1.0',
        count: 4
      }]
    },
  },
] as NodeType[];

export const initialEdges = [];


export const layoutElements = (nodes: NodeType[], edges: Edge<{ depth: number }>[]) => {
  return {nodes: mindmapNodes(nodes, edges), edges};
};

