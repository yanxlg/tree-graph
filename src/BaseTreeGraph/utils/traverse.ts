/*
 * @author: yanxianliang
 * @date: 2025-05-15 13:02
 * @desc: traverse 递归处理
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Edge, Node, Cell, Graph} from "@antv/x6";
import {HierarchyResult, MindMapData, RefMap} from "../types";


/**
 * 除了构建 cell 之外还需要构建对应的树关系，大数据不能放在节点 data 中，会进行 clone 性能消耗严重
 * @param hierarchyItem
 * @param cells
 * @param $ref
 * @param parents
 * @param visible
 */
export const traverse = (
  hierarchyItem: HierarchyResult,
  cells: Cell[] = [],
  $ref: RefMap = {},
  parents: MindMapData[] = [], //链路计算
  visible = true, // 默认收起状态的需要向下传递设置隐藏事项
) => {
  if (hierarchyItem) {
    const {data, children} = hierarchyItem;
    const id = data.id;
    $ref[id] = {
      parents,
      children: data.children
    };
    const expended = data.expanded ?? false; // 默认只展开一级，不自动向下展开
    const {height,} = data;
    cells.push(
      Node.create({
        id: data.id,
        shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
        x: hierarchyItem.x,
        y: hierarchyItem.y,
        width: data.width,
        ...'height' in data ?{
          height,
        }:{},
        label: data.label,
        type: data.type,
        expanded: expended, // 默认的展开状态
        visible: visible,
        childrenCount: data.children?.length ?? 0 // 子节点数量
      }),
    )
    if (children) {
      children.forEach((item: HierarchyResult) => {
        cells.push(
          Edge.create({
            shape: 'base-edge',
            source: hierarchyItem.id,
            target: item.id,
            zIndex: 0, // edge 默认显示在最底层
          }),
        )
        traverse(item, cells, $ref, [...parents, data], visible ? expended : visible)
      })
    }
  }

  return {cells, $ref};
}
