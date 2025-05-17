/*
 * @author: yanxianliang
 * @date: 2025-05-17 14:18
 * @desc: 支持默认配置的 Rect
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Node, Shape} from "@antv/x6";

export class RectWidthDefaultConfig extends Shape.Rect {
  protected preprocess(metadata: Node.Metadata, ignoreIdCheck?: boolean): Node.Properties {
    const {width, height} = metadata;
    const ctr = this.constructor as Node.Definition;
    const defaults = ctr.getDefaults() as Node.Defaults;
    return super.preprocess({
      ...metadata,
      width: width ?? defaults.size?.width ?? 1,
      height: height ?? defaults.size?.height ?? 1,
    }, ignoreIdCheck);
  }
}
