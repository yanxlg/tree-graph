/*
 * @author: yanxianliang
 * @date: 2025-05-17 14:18
 * @desc: 支持默认配置的 Rect
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Node, Shape} from "@antv/x6";
import {defaultTextMargin} from "../utils/dimension";


export class RectWidthDefaultConfig extends Shape.Rect {
  protected preprocess(metadata: Node.Metadata, ignoreIdCheck?: boolean): Node.Properties {
    const {width, height, label, ellipsis} = metadata;
    const ctr = this.constructor as Node.Definition;
    const defaults = ctr.getDefaults() as Node.Defaults;
    const fontSize = metadata.data?.fontSize ?? 14;

    const isMultiLine = ellipsis === 'multiLine';

    const attrs = ellipsis && label ? {
      attrs: {
        label: {
          ...isMultiLine ? {} : {
            lineHeight: fontSize,
          },
          text: label,
          textWrap: {
            width: -defaultTextMargin,
            ...isMultiLine ? {} : {
              height: fontSize + 2,
            },
            ellipsis: true,
            breakWord: false,
          }
        }
      }
    } : {};

    return super.preprocess({
      ...metadata,
      ...attrs,
      width: width ?? defaults.size?.width ?? 1,
      height: height ?? defaults.size?.height ?? 1,
    }, ignoreIdCheck);
  }
}
