/*
 * @author: yanxianliang
 * @date: 2025-05-21 20:46
 * @desc: 根据 MindMapData 生成 cells
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {BaseTreeGraphProps, HierarchyResult, ThemeConfig} from "../types";
import {CellRegister} from "../register/CellRegister";
import {Cell, Edge, Node} from "@antv/x6";
import {getDefaultCollapsed, getNodeVisible} from "./node";


export function createCells(
  node: HierarchyResult,
  registry: CellRegister,
  themeConfig: ThemeConfig,
  strategy: BaseTreeGraphProps['strategy'], // cache-all 时，如果父节点是 折叠的，需要隐藏
  ignoreRoot?: boolean,
  visible = true,
) {
  const {data, children, x, y} = node;
  const {id, width, height} = data; // TODO  hack event 节点，不同节点需要不同处理方式，内置到节点中

  const cells: Cell[] = [];

  const collapsed = getDefaultCollapsed(data);

  const _visible = strategy !== 'cache-all' || getNodeVisible(node, visible);

  if (!ignoreRoot) {
    const cell = Node.create({
      id: data.id,
      shape: data.type,
      x,
      y,
      width: width as number,
      height,
      label: data.label,
      // type: data.type,
      collapsed,
      visible: _visible,
      ellipsis: data.ellipsis,
      data: {
        primaryColor: themeConfig.primaryColor,
        childCount: data.childCount ?? data.children?.length ?? 0, // 子节点数量
        ...themeConfig,
        title: data.title,
        descriptions: data.descriptions,
        color: data.color
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
    children.forEach((item: HierarchyResult) => {
      const edgeId = `${id}_${item.id}`;
      const cell = Edge.create({
        id: edgeId,
        shape: 'base-edge',
        source: id,
        target: item.id,
        zIndex: 0, // edge 默认显示在最底层
      });
      registry.addCell({cell}); // 边注册
      cells.push(cell);
      cells.push(...createCells(item, registry, themeConfig, strategy, false, _visible));
    })
  }

  return cells;
}
