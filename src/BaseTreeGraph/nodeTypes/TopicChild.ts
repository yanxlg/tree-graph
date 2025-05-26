/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:55
 * @desc: Topic Child 节点注册
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Markup, Shape} from "@antv/x6";
import {RectWidthDefaultConfig} from "./RectWidthDefaultConfig";

class TopicChildNode extends RectWidthDefaultConfig {
  onMouseEnter() {
    const primaryColor = this.getData().primaryColor;
    this.attr('line/filter', {
      name: 'dropShadow',
      args: {
        dx: 0,
        dy: 0,
        blur: 2,
        opacity: 0.7,
        color: primaryColor
      },
    })
  }

  onMouseLeave() {
    this.attr('line/filter', 'none');
  }

  getTooltip() {
    const fullLabel = this.label;
    const view = this.model?.graph.findViewByCell(this);
    if (view) {
      // view.get
      const labelView = view.getMagnetFromEdgeTerminal({
        cell: this,
        selector: 'label'
      }) as any;
      if (fullLabel && labelView.textContent !== fullLabel) {
        return fullLabel as string;
      }
    }
    return undefined;
  }
}

TopicChildNode.config({
  markup: [
    ...Shape.Rect.getMarkup() as unknown as Exclude<Markup, string | Markup.JSONMarkup>,
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
      cursor: 'pointer',
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

Graph.registerNode('topic-child', TopicChildNode, true);
