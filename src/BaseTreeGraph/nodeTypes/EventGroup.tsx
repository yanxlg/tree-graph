/*
 * @author: yanxianliang
 * @date: 2025-05-25 15:19
 * @desc: 事件组
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Node, Graph} from '@antv/x6'
import {BloodlineEvent} from "@gx6/tree-graph";

export class EventGroup extends Node {
  private collapsed = false;
  private expandSize?: { width: number; height: number }


  public static getNodeHeight(eventData: BloodlineEvent) {
    return 400; // 计算所有子节点的动态高度，需要分页
  }

  protected postprocess() {
    this.toggleCollapse(false)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleCollapse(collapsed?: boolean) { // TODO 高度动态变化之后需要更新位置
    const target = collapsed == null ? !this.collapsed : collapsed
    if (target) {
      this.attr('buttonSign', {d: 'M 1 5 9 5 M 5 1 5 9'})
      this.expandSize = this.getSize()
      this.resize(100, 32)
    } else {
      this.attr('buttonSign', {d: 'M 2 5 8 5'})
      if (this.expandSize) {
        this.resize(this.expandSize.width, this.expandSize.height)
      }
    }
    this.collapsed = target
  }
}

EventGroup.config({
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label', // groupName 显示
    },
    {
      tagName: 'text',
      selector: 'count',
    },
    {
      tagName: 'g', // 折叠按钮
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
    {
      tagName: 'g',
      selector: 'pagination', // 分页组件
      children: [{
        tagName: 'path',
        selector: 'paginationPrev',
      }, {
        tagName: 'text',
        selector: 'paginationInfo',
        children: [
          {
            tagName: 'tspan',
            selector: 'current',
          },
          {
            tagName: 'tspan',
            selector: 'sep',
          },
          {
            tagName: 'tspan',
            selector: 'all',
          }
        ]
      }, {
        tagName: 'path',
        selector: 'paginationNext',
      }]
    }
  ],
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      stroke: 'blue',
      strokeWidth: 1,
      fill: 'transparent',
    },
    buttonGroup: {
      refX: '100%',
      refX2: -16 - 8,
      refY: 8,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: '#f5f5f5',
      stroke: '#ccc',
      cursor: 'pointer',
      event: 'event:collapse',
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: '#808080',
    },
    label: {
      fontSize: 18,
      fill: '#333',
      refX: 15,
      refY: 10,
      text: '11111'
    },
    count: {
      fontSize: 12,
      fill: '#ccc',
      refX: '100%',
      refX2: -55,
      refY: 10,
      text: '12个'
    },
    pagination: {
      refY: '100%',
      refY2: -20,
      refWidth: '100%',
    },
    paginationInfo: {
      refX: '50%',
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
    },
    current: {
      y: 0,
      text: '1',
      textVerticalAnchor: 'top',
    },
    sep: {
      y: 0,
      text: '/',
      textVerticalAnchor: 'top',
    },
    all: {
      y: 0,
      text: '3',
      textVerticalAnchor: 'top',
    },
    paginationPrev: {
      refX: '50%',
      refX2: -30,
      cursor: 'pointer',
      d: 'M0.245625 5.83266L5.84453 0.244062C6.01625 0.073125 6.23734 0 6.45844 0C6.67953 0 6.90047 0.073125 7.0725 0.244062C7.41625 0.585625 7.41625 1.12266 7.0725 1.46422L2.06281 6.44266L7.04781 11.348C7.39156 11.6897 7.39156 12.2266 7.04781 12.5439C6.70406 12.8855 6.16375 12.8855 5.84453 12.5439L0.245625 7.02859C0.0735941 6.85766 0 6.6625 0 6.41828C0.000156403 6.22297 0.0735941 6.00344 0.245625 5.83266Z',
    },
    paginationNext: {
      refX: '50%',
      refX2: 30,
      cursor: 'pointer',
      d: 'M7.08469 5.83266L1.48578 0.244062C1.31406 0.073125 1.09297 0 0.871875 0C0.650782 0 0.429844 0.073125 0.257812 0.244062C-0.0859375 0.585625 -0.0859375 1.12266 0.257812 1.46422L5.2675 6.44266L0.2825 11.348C-0.0612497 11.6897 -0.0612497 12.2266 0.2825 12.5439C0.62625 12.8855 1.16656 12.8855 1.48578 12.5439L7.08469 7.02859C7.25672 6.85766 7.33031 6.6625 7.33031 6.41828C7.33016 6.22297 7.25672 6.00344 7.08469 5.83266Z'
    }
  },
  size: {
    width: 320,
    height: 300 // 默认高度
  }
});


Graph.registerNode('event-group', EventGroup as unknown as Node.Definition, true);

