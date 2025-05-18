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
import {RectWidthDefaultConfig} from "./RectWidthDefaultConfig";
import {ThemeConfig} from "../types";


export class CollapsedRect extends RectWidthDefaultConfig {
  static defaults = merge({}, Shape.Rect.defaults, {
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
        selector: 'childCount',
      }
    ],
    attrs: {
      childCount: {
        ref: 'body',
        refX: '100%',
        refY: '50%',
        height: 18,
        textAnchor: 'start',
        x: 2,
        y: -20,
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
        strokeWidth: 1,
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

  constructor(metadata: Node.Metadata = {}) {
    super(metadata);
  }

  protected setup() {
    super.setup();
  }

  // 初始化
  init() {
    super.init();
    this.initTheme();
    this.updateChildCount();
    this.toggleExpanded(this.isExpanded());
  }

  private initTheme() {
    const {fontSize, fontFamily, primaryColor} = this.getData() as ThemeConfig;
    fontSize && this.attr('label/fontSize', fontSize);
    fontFamily && this.attr('label/fontFamily', fontFamily);
    if(primaryColor){
      this.attr('body/stroke', primaryColor);
      this.attr('collapseIcon/stroke', primaryColor);
    }
  }

  private updateChildCount() {
    const childCount = this.getData()?.childCount as number;
    this.attr('collapseBtn/display', childCount ? 'block' : 'none');
    this.attr('childCount/display', childCount ? 'block' : 'none');
    if (childCount) {
      this.setAttrByPath('childCount/text', childCount);
    }
  }


  protected postprocess() {
  }

  isExpanded(): boolean {
    return this.store.get('expanded') ?? false;
  }

  // 递归更新 visible 状态
  private updateCollapseState(node: Cell = this) {
    const expanded = this.isExpanded();
    const graph = this.model?.graph;
    if (graph) {
      const targets = graph.getSuccessors(node, {distance: 1});
      if (targets) {
        targets.forEach((node) => {
          node.toggleVisible(expanded);
          if (node instanceof this.constructor && (node as CollapsedRect).isExpanded()) { // 后面所有的节点都需要隐藏
            this.updateCollapseState(node);
          }
        })
      }
    }
  }

  toggleExpanded(expanded?: boolean) {
    const newExpanded = expanded === undefined ? !this.isExpanded() : expanded;
    if (!newExpanded) {
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
    this.store.set('expanded', newExpanded, {
      silent: true,
    }); // 不触发事件
    this.updateCollapseState();
  }
}
