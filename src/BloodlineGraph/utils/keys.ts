/*
 * @author: yanxianliang
 * @date: 2025-06-02 16:57
 * @desc: keys 生成
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {DownStreamItem, EventData} from "../types";

export const getHandleKey = (node: EventData, type: 'input' | 'output', downstream?: DownStreamItem) => {
  const id = node.id;
  if (!downstream) {
    return `${id}.${type}`;
  }
  const {version, key} = downstream;
  if (key) {
    return `${id}.${type}.${key}`;
  }
  return `${id}.${type}${version ? `.${version}` : ''}`;
}
