/*
 * @author: yanxianliang
 * @date: 2025-05-21 20:46
 * @desc: 根据 MindMapData 生成 cells
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {HierarchyNode} from "../types";
import {CellRegister} from "../register/CellRegister";
import {Cell, Edge, Graph, Node} from "@antv/x6";
import {getDefaultCollapsed, getNodeVisible} from "./node";


// 需要调整逻辑，分组需要加入到 group 中，否则路径计算会出问题
export function createCells(
  node: HierarchyNode,
  registry: CellRegister,
  graph: Graph,
  ignoreRoot?: boolean,
  visible = true,
) {
  const {strategy, theme} = graph;
  const {data, children, x, y} = node;
  const {id, width, height, type, label, ellipsis, level, childCount} = data; // TODO  hack event 节点，不同节点需要不同处理方式，内置到节点中
  const cells: Cell[] = [];

  const collapsed = getDefaultCollapsed(data);

  const _visible = strategy !== 'cache-all' || getNodeVisible(node, visible);

  const count = data.children?.length;

  if (!ignoreRoot) { // 不同的节点类型需要定义不同的属性处理逻辑
    const cell = Node.create({
      id: id,
      shape: type,
      x,
      y,
      width: width as number,
      height: height, // group 节点高度需要特殊处理
      label: label,
      collapsed,
      visible: _visible,
      ellipsis: ellipsis,
      level: level, // 显示样式控制
      data: {
        primaryColor: theme.primaryColor,
        childCount: childCount ?? count ?? 0, // 子节点数量
        ...theme,
        descriptions: (data as any).descriptions,
        color: (data as any).color
      }
    });

    registry.addCell({node, cell}); // 节点注册
    cells.push(cell);
  }


  if (
    (
      strategy === 'cache-diff' ||
      strategy === 'cache-control'
    ) && collapsed) {
    return cells; // 不向下创建
  }

  if (children) {
    children.forEach((item: HierarchyNode) => {
      const edgeId = `${id}_${item.id}`;
      // 分组和内部不创建 cell
      // @ts-ignore
      if (item.parent?.data?.type !== 'event-group') {
        const cell = Edge.create({
          id: edgeId,
          shape: 'base-edge',
          source: id,
          target: item.id,
          zIndex: 0, // edge 默认显示在最底层
        });
        registry.addCell({cell}); // 边注册
        cells.push(cell);
      }

      cells.push(...createCells(item, registry, graph, false, _visible));
    })
  }

  return cells;
}
