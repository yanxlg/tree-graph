/*
 * @author: yanxianliang
 * @date: 2025-05-15 13:02
 * @desc: traverse 递归处理
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Edge, Node, Cell, Graph} from "@antv/x6";
import {HierarchyResult, MindMapData, RefMap, ThemeConfig} from "../types";


const traverseLoop = (
  hierarchyItem: HierarchyResult,
  cells: Cell[] = [],
  $ref: RefMap = {},
  parents: MindMapData[] = [], //链路计算
  visible = true, // 默认收起状态的需要向下传递设置隐藏事项
  themeConfig: ThemeConfig,
) => {
  if (hierarchyItem) {
    const {data, children, x, y} = hierarchyItem;
    const {id, width, height} = data;
    $ref[id] = {
      parents,
      children: data.children
    };
    const expended = data.expanded ?? false; // 默认只展开一级，不自动向下展开
    cells.push(
      Node.create({
        id: data.id,
        shape: data.type === 'topic-child' ? 'topic-child' : 'topic',
        x,
        y,
        width: width as number,
        height,
        label: data.label,
        type: data.type,
        expanded: expended, // 默认的展开状态
        visible: visible,
        data: {
          childrenCount: data.children?.length ?? 0, // 子节点数量
          ...themeConfig
        },
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
        traverseLoop(item, cells, $ref, [...parents, data], visible ? expended : visible, themeConfig)
      })
    }
  }

  return {cells, $ref};
}

/**
 * 构建 graph 节点和边
 * @param hierarchyItem
 * @param themeConfig
 */
export const traverse = (
  hierarchyItem: HierarchyResult,
  themeConfig: ThemeConfig,
) => {
  return traverseLoop(hierarchyItem, [], {}, [], true, themeConfig);
}
