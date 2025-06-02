/*
 * @author: yanxianliang
 * @date: 2025-05-24 15:37
 * @desc: NodeCollapse Tool
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Cell, Graph, ObjectExt} from "@antv/x6";
import {Dom} from '@antv/x6-common';
import {Button} from '@antv/x6/es/registry/tool/button';
import './index.less';
import {CellView} from "@antv/x6/src/view/cell";

type NodeCollapseButtonOptions = Button.Options & {
  count: number;
  collapsed: boolean;
};

/**
 * 需要支持上游下游
 */
class NodeCollapseButton extends Button.Remove<any, NodeCollapseButtonOptions> {
  private loading: boolean = false; // loading状态
  private collapsed: boolean = true;
  public static defaults = {
    ...Button.Remove.defaults,
    name: 'collapse-btn',
    markup: [
      {
        tagName: 'text',
        attrs: {
          class: 'collapse-text',
          // refX2: 26,
          // refY: 0,
          x: 20,
          y: 13,
          fontSize: 12,
          fill: '#333',
          // transform: 'matrix(1,0,0,1,20,13)',
          'pointer-events': 'none',
        }
      },
      {
        tagName: 'rect',
        selector: 'button',
        attrs: {
          height: 18,
          width: 18,
          rx: 9,
          ry: 9,
          fill: '#fff',
          stroke: '#d9d9d9',
          strokeWidth: 1,
          cursor: 'pointer',
        },
      },
      {
        tagName: 'path',
        attrs: {
          class: 'collapse-icon collapse-icon-1',
          transform: 'matrix(1,0,0,1,4,4)',
          fill: 'none',
          strokeWidth: 1.6,
          stroke: '#1677ff',
          d: 'M 1 5 9 5 M 5 1 5 9',
          'pointer-events': 'none',
        },
      },
      {
        tagName: 'path',
        attrs: {
          class: 'collapse-icon collapse-icon-2',
          transform: 'matrix(1,0,0,1,4,4)',
          fill: 'none',
          strokeWidth: 1.8,
          stroke: '#1677ff',
          d: 'M 2 5 8 5',
          'pointer-events': 'none',
        },
      },
      {
        tagName: 'path',
        selector: 'loading', // loading
        attrs: {
          class: 'loading-icon',
          fill: '#1677ff',
          d: 'M13.9935 12.8474a0.70326 0.70326 0 0 1 0 0.9907 7.3285 7.3285 0 1 1-1.3149-11.4280l-0.1265-1.6928a0.70326 0.70326 0 0 1 1.4052-0.1054l0.2398 3.2743a0.70326 0.70326 0 0 1-1.1954 0.5474 5.9232 5.9232 0 1 0 0 8.3754 0.70326 0.70326 0 0 1 0.9907 0.0070z m-3.0916-6.8515l1.0329-0.1124a0.70326 0.70326 0 0 0 0.6177-0.7729 0.70326 0.70326 0 0 0-0.7729-0.6177l-1.0329 0.1124a0.70326 0.70326 0 0 0 0.0773 1.4052z'
        }
      }
    ],
    className: 'collapse-btn',
    x: '100%',
    y: '50%',
    offset: {x: 1, y: -9},
    events: {
      mousedown: 'onMouseDown',
      touchstart: 'onMouseDown',
    },
    onClick: function(this:CellView, args: {
      e: Dom.MouseDownEvent;
      view: CellView,
      cell: Cell,
      btn: NodeCollapseButton,
    }){
      const {btn} = args;
      const graph = btn.graph as unknown as Graph;
      graph.onCollapse?.(args);
    }
  };

  /**
   * 更新折叠状态
   * @param collapsed
   */
  public setCollapsed(collapsed: boolean){
    this.collapsed = collapsed;
    this.update();
  }

  public isCollapsed(): boolean {
    return this.collapsed;
  }

  public setLoading(loading: boolean){
    this.loading = loading;
    this.update();
  }

  protected getOptions(options: Partial<NodeCollapseButtonOptions>): NodeCollapseButtonOptions {
    const _options = super.getOptions(options);
    this.collapsed = _options.collapsed;
    const count = _options.count || 0;
    ObjectExt.setByPath(_options, 'markup/0/textContent', count); // 数量显示
    return _options;
  }

  update(){
    super.update();
    if (this.loading) {
      Dom.addClass(this.container,'collapse-spin');
    } else {
      Dom.removeClass(this.container,'collapse-spin');
    }
    if (!this.collapsed) {
      Dom.addClass(this.container,'collapse-expanded');
    } else {
      Dom.removeClass(this.container,'collapse-expanded');
    }
    return this;
  }

  onRender() {
    super.onRender();
    Dom.removeAttribute(this.parent.svgContainer, 'data-cell-id');
    Dom.removeAttribute(this.container, 'data-cell-id');
    Dom.setAttribute(this.parent.svgContainer, 'data-node-id', this.cell.id);
    Dom.setAttribute(this.container, 'data-node-id', this.cell.id);
  }
}


Graph.registerNodeTool('collapse-btn', NodeCollapseButton, true)
