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

export class CollapsedRect extends RectWidthDefaultConfig implements ICollapseNode {

  init() {
    super.init();
    this.initTheme();
    this.addCollapseTool();
  }

  private addCollapseTool() {
    const count = this.getData()?.childCount as number;
    console.log(count, this.visible);
    if (count && this.visible) {
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
      this.attr('collapseIcon/stroke', primaryColor);
    }
  }

  public setVisible(visible: boolean, options?: Cell.SetOptions): this {
    super.setVisible(visible, options);
    if (visible) {
      this.addCollapseTool();
    } else {
      this.removeTools({silent: false})
    }
    return this;
  }


  public isCollapsed() {
    return this.store.get('collapsed') ?? true; // 默认是收起
  }

  public toggleCollapsed() {
    const nextCollapsed = !this.isCollapsed();
    this.store.set('collapsed', nextCollapsed);
    const count = this.getData()?.childCount as number;
    this.setTools({
      name: 'collapse-btn',
      args: {
        count,
        collapsed: nextCollapsed
      },
    })
  }
}

CollapsedRect.config({
  zIndex: 2,
})
