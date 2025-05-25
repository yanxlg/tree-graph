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

export class TopicNode extends CollapsedRect {
  static defaults =
    merge({}, CollapsedRect.defaults, {
      attrs: {
        body: {
          rx: 6,
          ry: 6,
          stroke: '#5F95FF', //  TODO 应该换成主题色
          fill: '#EFF4FF',
          strokeWidth: 1,
          cursor: 'pointer',
          event: 'topic:click',
          nodeBody: true,
          class: 'x6-selected-rect'
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          'pointer-events': 'none',
        },
      },
      size: {width: 160, height: 50},
    })

  onMouseEnter() {
    const primaryColor = this.getData().primaryColor;
    this.attr('body/filter', {
      name: 'highlight',
      args: {
        width: 2,
        blur: 3,
        opacity: 0.2,
        color: primaryColor
      }
    })
  }

  onMouseLeave() {
    this.attr('body/filter', 'none');
  }

  getTooltip() {
    const fullLabel = this.label;
    const view = this.model?.graph.findViewByCell(this);
    if (view) {
      // view.get
      const labelView = view.getMagnetFromEdgeTerminal({
        cell: this,
        selector: 'label'
      });
      if (fullLabel && labelView.textContent !== fullLabel) {
        return fullLabel;
      }
    }
    return undefined;
  }
}

Graph.registerNode('topic', TopicNode, true);
