/*
 * @author: yanxianliang
 * @date: 2025-05-16 13:21
 * @desc: 子节点箭头的 Edge
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Shape} from "@antv/x6";
import {merge} from "lodash";

export class SourceArrowEdge extends Shape.Edge {
  static defaults = merge({}, Shape.Edge.defaults, {
    attrs: {
      line: {
        sourceMarker: 'block',
        targetMarker: '',
        stroke: '#A2B1C3',
        strokeWidth: 2,
      }
    },
  }, {
    shape: 'source-arrow-edge'
  });
}

Graph.registerEdge('source-arrow-edge', SourceArrowEdge, true);
