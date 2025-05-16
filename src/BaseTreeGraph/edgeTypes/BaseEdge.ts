/*
 * @author: yanxianliang
 * @date: 2025-05-16 13:13
 * @desc: 基础的 Edge
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Shape} from "@antv/x6";
import {merge} from "lodash";

export class BaseEdge extends Shape.Edge {
  static defaults = merge({}, Shape.Edge.defaults, {
    attrs: {
      line: {
        targetMarker: '',
        stroke: '#A2B1C3',
        strokeWidth: 2,
      }
    },
  },{
    shape: 'base-edge'
  });
}

Graph.registerEdge('base-edge', BaseEdge, true);
