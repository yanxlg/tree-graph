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

    const attrs = ellipsis && label ? {
      attrs: {
        label: {
          textWrap: {
            text: label,
            width: -defaultTextMargin,
            ...ellipsis==='multiLine'?{
            }:{
              height: (metadata.data?.fontSize ?? 14) + 6, // 默认显示一行。
            },
            ellipsis: true,
            breakWord: false,
          }
        }
      }
    } :{};

    return super.preprocess({
      ...metadata,
      ...attrs,
      width: width ?? defaults.size?.width ?? 1,
      height: height ?? defaults.size?.height ?? 1,
    }, ignoreIdCheck);
  }

  setLabel(label?: string | null, options?: Node.SetOptions) {
    super.setLabel(label, options);
    console.log(this.prop('ellipsis'));
    // 支持溢出显示。
    return this;
  }
}

//
// RectWidthDefaultConfig.config({
//   propHooks: (metadata)=>{
//     console.log('dddd', metadata); // label 设置溢出结果
//     const { label, ...others } = metadata
//     if (label) {
//       console.log(label);
//       ObjectExt.setByPath(others, 'attrs/text/textWrap/text', label);
//     }
//     return metadata;
//   }
// })
