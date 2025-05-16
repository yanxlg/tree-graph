/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:47
 * @desc: topic node 定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph} from "@antv/x6";
import {CollapsedRect} from "./CollapsedRect";
import {merge} from "lodash";

class TopicNode extends CollapsedRect {
  static defaults =
    merge({},CollapsedRect.defaults,{
      attrs: {
        body: {
          rx: 6,
          ry: 6,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          strokeWidth: 1,
          cursor: 'pointer',
          event: 'topic:click',
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          event: 'link:click'
        },
      },
    }, {shape: 'topic'})
}

Graph.registerNode('topic', TopicNode, true);
