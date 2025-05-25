/*
 * @author: yanxianliang
 * @date: 2025-05-22 21:49
 * @desc: 血缘事件节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {CollapsedRect} from "./CollapsedRect";
import {omit} from "lodash";
import {BloodlineEvent} from "../types";
import {Graph, Markup, Node, ObjectExt, Shape} from "@antv/x6";
import Defaults = Node.Defaults;

const lineWidth = 6;


export class EventNode extends CollapsedRect {
  public static getNodeHeight(eventData: BloodlineEvent) {
    // 根据节点属性，动态计算节点高度，支持根据内容构建 layout
    const {descriptions = []} = eventData;
    const sizeConfig = this.getSizeConfig(eventData)
    return sizeConfig.paddingV * 2 + sizeConfig.titleFontSize + (sizeConfig.titleMB - sizeConfig.descSpace) + (sizeConfig.descSpace + sizeConfig.descFontSize) * descriptions.length;
  }

  private static getSizeConfig(eventData: BloodlineEvent) {
    return {
      paddingV: 12,
      paddingH: 10,
      titleFontSize: 14,
      descFontSize: 12,
      titleMB: 8,
      descSpace: 4,
      titleColor: '#262626',
      descColor: '#bfbfbf'
    }
  }

  static defaults: Defaults = {
    ...omit(CollapsedRect.defaults, ['markup', 'attrs']),
    markup: [
      ...CollapsedRect.getMarkup() as unknown as Array<Markup> || [],
      {
        tagName: 'rect',
        selector: 'line'
      }
    ],
    attrs: {
      ...omit(CollapsedRect.defaults.attrs, ['text']),
      body: {
        refWidth: '100%',
        refHeight: '100%',
        rx: 0,
        ry: 0,
        fill: 'transparent',
        cursor: 'pointer',
        class: 'x6-selected-rect'
      },
      line: {
        strokeWidth: 0,
        refHeight: '100%',
        width: 6,
        rx: 0,
        ry: 0,
        'pointer-events': 'none',
      },
    },
    size: {width: 280, height: 32}
  } as Defaults

  init() {
    // 构建 markup 和 attrs
    const markup = [...this.markup as Array<Markup>];
    const attrs = this.attrs!;
    const data = this.getData() as BloodlineEvent;
    const descriptions = data?.descriptions;
    const title = data.title;
    const color = data.color || '#5F95FF';
    const sizeConfig = (this.constructor as typeof EventNode).getSizeConfig(data);
    const titleHeight = sizeConfig.titleFontSize;
    markup.push({
      tagName: 'text',
      selector: 'title',
    })
    console.log(sizeConfig.titleFontSize + 5);
    attrs.title = {
      refX: 0,
      refX2: sizeConfig.paddingH + lineWidth,
      refY: 0,
      refY2: sizeConfig.paddingV,
      // refWidth: '100%',
      // refWidth2: -lineWidth,
      fontSize: sizeConfig.titleFontSize,
      textAnchor: 'start',
      textVerticalAnchor: 'top',
      fill: sizeConfig.titleColor,
      'pointer-events': 'none',
      text: title,
      lineHeight: sizeConfig.titleFontSize,
      textWrap: {
        width: -sizeConfig.paddingH * 2 - lineWidth,
        height: sizeConfig.titleFontSize + 2,
        ellipsis: true,
        breakWord: false,
      },
    }
    // 颜色动态渲染
    ObjectExt.setByPath(attrs, 'line/fill', color);
    ObjectExt.setByPath(attrs, 'body/stroke', color);

    if (descriptions && descriptions.length) {
      let index = 0;
      descriptions.forEach((content) => {
        if (content) {
          const textSelector = `desc_${index}`;
          markup.push({
            tagName: 'text',
            selector: textSelector,
          });
          attrs[textSelector] = {
            refX: 0,
            refX2: lineWidth + sizeConfig.paddingH,
            refY: 0,
            refY2: sizeConfig.paddingV + titleHeight + sizeConfig.titleMB + (sizeConfig.descFontSize + sizeConfig.descSpace) * index,
            textAnchor: 'start',
            textVerticalAnchor: 'top',
            text: content,
            lineHeight: sizeConfig.descFontSize,
            textWrap: {
              width: -sizeConfig.paddingH * 2 - lineWidth,
              height: sizeConfig.descFontSize + 2,
              ellipsis: true,
              breakWord: false,
            },
            fill: sizeConfig.descColor,
            'pointer-events': 'none',
            fontSize: sizeConfig.descFontSize,
          }
          index++;
        }
      });
      this.setMarkup(markup as unknown as Markup, {silent: true});
      this.setAttrs(attrs, {silent: true});
    }
  }

  onMouseEnter() {
    const color = this.getData().color;
    this.attr('body/filter', {
      name: 'highlight',
      args: {
        width: 2,
        blur: 3,
        opacity: 0.2,
        color
      }
    })
  }

  onMouseLeave() {
    this.attr('body/filter', 'none');
  }
}

Graph.registerNode('event', EventNode, true);
