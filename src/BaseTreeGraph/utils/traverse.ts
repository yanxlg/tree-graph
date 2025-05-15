/*
 * @author: yanxianliang
 * @date: 2025-05-15 13:02
 * @desc: traverse 递归处理
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Edge, Node, Cell} from "@antv/x6";
import {HierarchyResult, MindMapData, RefMap} from "../types";



/**
 * 除了构建 cell 之外还需要构建对应的树关系，大数据不能放在节点 data 中，会进行 clone 性能消耗严重
 * @param hierarchyItem
 * @param cells
 * @param $ref
 * @param parents
 */
export const traverse = (
  hierarchyItem: HierarchyResult,
  cells: Cell[] = [],
  $ref: RefMap = {},
  parents: MindMapData[] = [], //链路计算
) => {
  if (hierarchyItem) {
    const {data, children} = hierarchyItem;
    const id = data.id;
    $ref[id] = {
      parents,
      children: data.children
    };
    cells.push(
      Node.create({
        id: data.id,
        shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
        x: hierarchyItem.x,
        y: hierarchyItem.y,
        width: data.width,
        height: data.height,
        label: data.label,
        type: data.type,
        data: {}, // 会全部进行 clone 吗？？
      }),
    )
    if (children) {
      children.forEach((item: HierarchyResult) => {
        cells.push(
          Edge.create({
            shape: 'bpmn-edge',
            source: hierarchyItem.id,
            target: item.id,
          }),
        )
        traverse(item, cells, $ref, [...parents, data])
      })
    }
  }

  return {cells, $ref};
}
