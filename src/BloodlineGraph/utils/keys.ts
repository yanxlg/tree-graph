/*
 * @author: yanxianliang
 * @date: 2025-06-02 16:57
 * @desc: keys 生成
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {EventData} from "../types";

export const getHandleKey = (node: EventData, type: 'input' | 'output', version?: string) => {
  const id = node.id;
  return `${id}.${type}${version ? `.${version}` : ''}`;
}
