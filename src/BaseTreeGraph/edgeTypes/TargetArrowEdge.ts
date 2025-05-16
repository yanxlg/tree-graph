/*
 * @author: yanxianliang
 * @date: 2025-05-16 13:21
 * @desc: 子节点箭头的 Edge
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Shape} from "@antv/x6";
import {merge} from "lodash";

export class TargetArrowEdge extends Shape.Edge {
  static defaults = merge({}, Shape.Edge.defaults, {
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
      }
    },
  }, {
    shape: 'target-arrow-edge'
  });
}

Graph.registerEdge('target-arrow-edge', TargetArrowEdge, true);
