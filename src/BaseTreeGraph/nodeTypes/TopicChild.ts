/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:55
 * @desc: Topic Child 节点注册
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Shape} from "@antv/x6";
import {merge} from "lodash";
import {IHoverActiveNode} from "../types";
import {RectWidthDefaultConfig} from "./RectWidthDefaultConfig";

class TopicChildNode extends RectWidthDefaultConfig implements IHoverActiveNode {
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
          tagName: 'rect',
          selector: 'line',
        },
      ],
      attrs: {
        body: {
          refY: '-50%',
          fill: 'transparent',
          strokeWidth: 0,
          event: 'topic:click',
          cursor: 'pointer',
          hoverable: true,
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          textVerticalAnchor: 'bottom',
          'pointer-events': 'none',
        },
        line: {
          refWidth: '100%',
          fill: '#5F95FF',
          refY: '50%',
          refY2: -1,
          strokeWidth: 0,
          height: 2,
          'pointer-events': 'none',
          class: 'x6-selected-line'
        }
      },
      size: {
        width: 60,
        height: 30
      }
    })

  onMouseOver() {
    this.attr('line/filter', 'url(#sub-topic-hover-shadow)');
  }

  onMouseOut() {
    this.attr('line/filter', 'none');
  }
}

Graph.registerNode('topic-child', TopicChildNode, true);
