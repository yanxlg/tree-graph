/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:55
 * @desc: Topic Child 节点注册
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Shape} from "@antv/x6";
import {merge} from "lodash";

class TopicChildNode extends Shape.Rect {
  static defaults = merge(
    {},
    Shape.Rect.defaults,
    {
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
        {
          tagName: 'path',
          selector: 'line',
        },
      ],
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 0,
          stroke: '#5F95FF',
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          textVerticalAnchor: 'bottom',
          event: 'link:click'
        },
        line: {
          stroke: '#5F95FF',
          strokeWidth: 2,
          d: 'M 0 15 L 60 15',
        }
      },
    }, {
      shape: 'topic-child'
    })
}

Graph.registerNode('topic-child', TopicChildNode, true);
