/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:47
 * @desc: topic node 定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, ObjectExt} from "@antv/x6";
import {CollapsedRect} from "./CollapsedRect";

export class TopicNode extends CollapsedRect {
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

TopicNode.config({
  attrs: {
    body: {
      rx: 6,
      ry: 6,
      stroke: '#5F95FF',
      fill: '#EFF4FF',
      strokeWidth: 1,
      cursor: 'pointer',
      class: 'x6-selected-rect'
    },
    label: {
      fontSize: 14,
      fill: '#262626',
      'pointer-events': 'none',
    },
  },
  size: {width: 160, height: 50},
  propHooks: (metadata)=>{
    const {level, ...others} = metadata;
    if(level === 'link'){
      ObjectExt.setByPath(others, 'attrs/label/fill', '#1890ff'); // link 样式
    }
    return others;
  }
})

Graph.registerNode('topic', TopicNode, true);
