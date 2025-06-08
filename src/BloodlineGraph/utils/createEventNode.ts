/*
 * @author: yanxianliang
 * @date: 2025-06-03 13:05
 * @desc: createEventNode
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {EventData, EventNodeType, EventGroupData, EventGroupNodeType} from "../types";
import {createObserver} from "../hooks/useReactive";

export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID(); // 直接调用原生 API
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export const createEventNode = (nodeData: EventData) => {
  return {
    id: nodeData.id,
    type: 'event',
    data: {
      ...nodeData,
      $store: createObserver({
        handleMap: {}
      })
    },
  } as EventNodeType
}

export const createEventGroupNode = (nodeData: EventGroupData) => {
  const id = generateUUID();
  return {
    id,
    type: 'event-group',
    data: {
      ...nodeData,
      id,
      $store: createObserver({
        expanded: false,
        handleMap: {}
      })
    }
  } as unknown as EventGroupNodeType
}
