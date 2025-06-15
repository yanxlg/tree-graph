/*
 * @author: yanxianliang
 * @date: 2025-06-09 10:31
 * @desc: 计算 relations 总数
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {EventGroupData} from "../types";

/**
 * 在布局中计算所有节点总数
 * @param groups
 */
export function countAllGroupItems(groups: any[]) {
  return groups.reduce((prev, node) => prev + node.data.data.totalCount || 0, 0);
}

export function countCollapseItems(items: Array<Omit<EventGroupData, '$store'>> = []){
  return items.reduce((prev, item) => prev + (item?.totalCount?? 0), 0);
}
