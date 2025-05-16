/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:49
 * @desc: 具有折叠交互的节点定义抽象类
 *
 * 自动添加 markup
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Cell, Shape} from '@antv/x6';
import {merge} from "lodash";
import {Node} from "@antv/x6/src/model/node";

export class CollapsedRect extends Shape.Rect {
  static defaults = merge({},Shape.Rect.defaults, {
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
        tagName: 'g',
        selector: 'collapseBtn',
        children: [
          {
            tagName: 'rect',
            selector: 'collapseRect',
            attrs: {
              'pointer-events': 'visiblePainted',
            },
          },
          {
            tagName: 'path',
            selector: 'collapseIcon',
            attrs: {
              fill: 'none',
              'pointer-events': 'none',
            },
          },
        ],
      },
      {
        tagName: 'text',
        selector: 'childrenCount',
      }
    ],
    attrs: {
      childrenCount: {
        ref: 'body',
        refX: '100%',
        refY: '50%',
        height: 18,
        textAnchor: 'start',
        x: 0,
        y: -22,
        text: '120', // 文字
        fill: '#333', // 文字颜色
      },
      collapseBtn: {
        ref: 'body',
        refX: '100%',
        refY: '50%',
      },
      collapseRect: {
        fill: '#fff',
        stroke: '#d9d9d9',
        x: 1,
        y: -9,
        height: 18,
        width: 18,
        cursor: 'pointer',
        event: 'topic:collapse',
      },
      collapseIcon: {
        refX: 5,
        refY: -5,
        strokeWidth: 1.6,
        stroke: '#1677ff',
        d: 'M 1 5 9 5 M 5 1 5 9',
      }
    },
    zIndex: 2
  });

  private collapsed: boolean = false;

  // constructor(metadata: Node.Metadata = {}) {
  //   super(metadata);
  //   // this.on('chan')
  //   console.log(this.model);
  //   this.on('added', ({ cell, index, options }) => {
  //     console.log('cell:added')
  //   })
  // }

  // 动态样式，可以实现 hover效果
  protected postprocess() {
    this.toggleCollapse(false);
  }


  isCollapsed() {
    return this.collapsed
  }

  private updateCollapseState(node: Cell){
    const collapsed = this.collapsed;
    const graph = this.model?.graph;
    if(graph){
      const targets = graph.getSuccessors(node, { distance: 1 });
      if (targets) {
        targets.forEach((node) => {
          node.toggleVisible(!collapsed)
          if (node instanceof this.constructor && !(node as CollapsedRect).isCollapsed()) {
            this.updateCollapseState(node);
          }
        })
      }
    }
  }

  toggleCollapse(collapsed?: boolean) {
    const target = collapsed == null ? !this.collapsed : collapsed;
    if (!target) {
      this.attr('collapseIcon', {
        d: 'M 1 5 9 5 M 5 1 5 9',
        strokeWidth: 1.6,
      })
    } else {
      this.attr('collapseIcon', {
        d: 'M 2 5 8 5',
        strokeWidth: 1.8,
      })
    }
    this.collapsed = target;
    this.updateCollapseState(this);
  }
}
