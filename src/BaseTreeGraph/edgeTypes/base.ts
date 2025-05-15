/*
 * @author: yanxianliang
 * @date: 2025-05-15 13:08
 * @desc: 内置 edge 类型
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Graph} from "@antv/x6";

Graph.registerEdge(
  'bpmn-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
  },
  true,
)
