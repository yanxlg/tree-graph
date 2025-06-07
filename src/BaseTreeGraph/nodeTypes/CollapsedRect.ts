/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:49
 * @desc: 具有折叠交互的节点定义抽象类
 *
 * 自动添加 markup
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Cell} from '@antv/x6';
import {RectWidthDefaultConfig} from "./RectWidthDefaultConfig";
import {ICollapseNode, ThemeConfig} from "../types";

/**
 * 折叠器，支持多种模式，默认模式为 children 折叠：children + childrenCount
 *
 *
 *
 */
export class CollapsedRect extends RectWidthDefaultConfig implements ICollapseNode {

  init() {
    super.init();
    this.initTheme();
    this.addCollapseTool();
  }

  private addCollapseTool() {
    const count = this.getData()?.childCount as number;
    const visible = this.visible;
    if (count && visible) {
      const collapsed = this.isCollapsed();
      this.addTools({
        name: 'collapse-btn',
        args: {
          count,
          collapsed
        },
      }, {silent: false});
    }
  }

  private initTheme() {
    const {fontSize, fontFamily, primaryColor} = this.getData() as ThemeConfig;
    fontSize && this.attr('label/fontSize', fontSize);
    fontFamily && this.attr('label/fontFamily', fontFamily);
    if (primaryColor) {
      this.attr('body/stroke', primaryColor);
    }
  }

  public setVisible(visible: boolean, options?: Cell.SetOptions): this {
    super.setVisible(visible, options);
    if (visible) {
      this.addCollapseTool();
    } else {
      this.removeTool('collapse-btn', {silent: false});
    }
    return this;
  }

  public setCollapsed(collapsed: boolean){
    this.store.set('collapsed', collapsed);
  }

  public isCollapsed() {
    return this.store.get('collapsed') ?? true; // 默认是收起
  }
}

CollapsedRect.config({
  zIndex: 2,
})
