/*
 * @author: yanxianliang
 * @date: 2025-05-24 15:37
 * @desc: NodeCollapse Tool
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, ObjectExt} from "@antv/x6";
import {Button} from '@antv/x6/es/registry/tool/button';

type NodeCollapseButtonOptions = Button.Options & {
  count: number;
  collapsed: boolean;
};

class NodeCollapseButton extends Button.Remove<any, NodeCollapseButtonOptions> {
  public static defaults = {
    ...Button.Remove.defaults,
    name: 'collapse-btn',
    markup: [
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
        selector: 'icon',
        attrs: {
          transform: 'matrix(1,0,0,1,4,4)',
          fill: 'none',
          strokeWidth: 1.6,
          stroke: '#1677ff',
          d: 'M 1 5 9 5 M 5 1 5 9',
          'pointer-events': 'none',
        },
      },
      {
        tagName: 'text',
        selector: 'text',
        attrs: {
          refX: 26,
          refY: 0,
          fontSize: 12,
          fill: '#333',
          transform: 'matrix(1,0,0,1,20,13)',
          'pointer-events': 'none',
        }
      }
    ]
  };

  protected getOptions(options: Partial<NodeCollapseButtonOptions>): NodeCollapseButtonOptions {
    const _options = super.getOptions(options);
    const count = _options.count || 0;
    const collapsed = _options.collapsed;
    ObjectExt.setByPath(_options, 'x', '100%');
    ObjectExt.setByPath(_options, 'y', '50%');
    ObjectExt.setByPath(_options, 'offset', {
      x: 1,
      y: -9
    });
    ObjectExt.setByPath(_options, 'markup/2/textContent', count);
    ObjectExt.setByPath(_options, 'markup/1/attrs/strokeWidth', collapsed ? 1.6 : 1.8);
    ObjectExt.setByPath(_options, 'markup/1/attrs/d', collapsed ? 'M 1 5 9 5 M 5 1 5 9' : 'M 2 5 8 5');
    ObjectExt.setByPath(_options, 'markup/2/attrs/display', collapsed ? 'unset' : 'none');

    _options.onClick = () => {
      this.graph.trigger('node:collapse', {node: this.cell})
    }
    return _options;
  }

  onRender(){
    super.onRender(); // hack 处理，也可以防止触发 node:mouseenter
    this.parent.svgContainer.removeAttribute('data-cell-id');
    this.container.removeAttribute('data-cell-id');
  }
}


Graph.registerNodeTool('collapse-btn', NodeCollapseButton, true)
