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
            tagName: 'text',
            selector: 'childCount',
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
    ],
    attrs: {
      collapseBtn: {
        ref: 'body',
        refX: '100%',
        refY: '50%',
        display: 'none',
      },
      collapseRect: {
        fill: '#fff',
        stroke: '#d9d9d9',
        strokeWidth: 1,
        x: 1,
        y: -9,
        height: 18,
        width: 18,
        rx: 9,
        ry: 9,
        cursor: 'pointer',
        event: 'topic:collapse',
      },
      childCount: {
        refX: 26,
        refY: 0,
        fontSize: 12,
        fill: '#333',
        display: 'none',
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
    const childCount = this.getData()?.childCount as number;
    if(childCount){
      this.updateChildCount(childCount);
      this.renderCollapsedState();
    }
  }

  private initTheme() {
    const {fontSize, fontFamily, primaryColor} = this.getData() as ThemeConfig;
    fontSize && this.attr('label/fontSize', fontSize);
    fontFamily && this.attr('label/fontFamily', fontFamily);
    if (primaryColor) {
      this.attr('body/stroke', primaryColor);
      this.attr('collapseIcon/stroke', primaryColor);
    }
  }

  private updateChildCount(childCount: number) {
    this.attr('collapseBtn/display', 'block');
    this.attr('childCount/display', 'block');
    this.setAttrByPath('childCount/text', childCount);
  }


  protected postprocess() {
  }

  public isCollapsed(){
    return this.store.get('collapsed') ?? true; // 默认是收起
  }

  public toggleCollapsed(){
    this.store.set('collapsed', !this.isCollapsed());
    this.renderCollapsedState();
  }

  // // 递归更新 visible 状态
  // private updateCollapseState(node: Cell = this) {
  //   const expanded = this.isExpanded();
  //   const graph = this.model?.graph;
  //   if (graph) {
  //     const targets = graph.getSuccessors(node, {distance: 1});
  //     if (targets) {
  //       targets.forEach((node) => {
  //         node.toggleVisible(expanded);
  //         if (node instanceof this.constructor && (node as CollapsedRect).isExpanded()) { // 后面所有的节点都需要隐藏
  //           this.updateCollapseState(node);
  //         }
  //       })
  //     }
  //   }
  // }

  renderCollapsedState() {
    const collapsed = this.isCollapsed();
    if (collapsed) {
      this.attr('collapseIcon', {
        d: 'M 1 5 9 5 M 5 1 5 9',
        strokeWidth: 1.6,
      });
      this.attr('childCount/display', 'block');
    } else {
      this.attr('collapseIcon', {
        d: 'M 2 5 8 5',
        strokeWidth: 1.8,
      });
      this.attr('childCount/display', 'none');
    }
    // this.store.set('expanded', newExpanded, {
    //   silent: true,
    // }); // 不触发事件
    // this.updateCollapseState();
  }
}
