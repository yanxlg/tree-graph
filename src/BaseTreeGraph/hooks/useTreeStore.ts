/*
 * @author: yanxianliang
 * @date: 2025-05-20 21:44
 * @desc: 树状态管理
 *
 * 节点 展开、收起 支持 3 种模式：
 * 1. cache-diff：增量缓存模式，一次性计算好所有布局位置，节点和边通过增量方式创建，已创建节点不会销毁
 * 2. cache-all：全量缓存模式，一次性计算好所有布局位置，节点和边一次性创建，收起的节点默认隐藏
 * 3. cache-control：节点完全控制，一次性计算好所有布局信息，节点根据实际情况创建和销毁
 * 4. dynamic-calc：动态计算模式，动态计算布局位置，节点和边通过增量方式创建
 *
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {BaseTreeGraphProps, HierarchyResult, MindMapData, NodeConfig, ThemeConfig} from "../types";
import {useEffect, useRef} from "react";
import {getLayouts} from "../utils/getLayouts";
import {CellRegister} from "../register/CellRegister";
import {createCells} from "../utils/createCells";
import {Cell, Graph, Node} from "@antv/x6";
import {getChildren, getExpandedChildren} from "../utils/node";

export const useTreeStore = (
  root: MindMapData,
  strategy: BaseTreeGraphProps['strategy'] = 'cache-all', // 策略配置之后不可改变
  graph: Graph,
  configs: {
    nodeConfig?: NodeConfig;
    themeConfig: ThemeConfig;
  }
) => {
  const $nodeRegistry = useRef(new CellRegister()); // 节点信息存储

  const registry = $nodeRegistry.current;


  useEffect(() => {
    registry.clear(); // 清除

    const layout = getLayouts(root, graph, configs, strategy);

    const cells = createCells(layout, registry, configs.themeConfig, strategy);

    graph.model.getLastCell()?.removeZIndex(); // 不清除 zIndex 层级会有问题。

    graph.resetCells(cells);

    graph.zoomToFit({padding: 10, maxScale: 1}); // TODO 需要在 resize之后执行 zoomToFit
  }, [root, strategy]);

  const dynamicUpdateCells = () => {
    const newRegistry = new CellRegister();
    const layout = getLayouts(root, graph, configs, strategy);
    createCells(layout, newRegistry, configs.themeConfig, strategy);
    const {addItems, updateItems, removeItems} = registry.diff(newRegistry);

    graph.batchUpdate(() => {
      if (addItems && addItems.length > 0) {
        graph.addCell(addItems);
      }
      if (removeItems && removeItems.length > 0) {
        graph.removeCells(removeItems);
      }
      if (updateItems && updateItems.length > 0) {
        updateItems.forEach(item => {
          const node = graph.getCellById(item.id) as Node;
          const newPosition = (item as Node).getPosition();
          node.position(newPosition.x, newPosition.y);
        })
      }
    });
    registry.replaceWith(newRegistry);
  }


  /**
   * 收起节点
   */
  const collapseNode = (id: string) => {
    const node = registry.getNode(id)!;
    node.data.collapsed = true;
    switch (strategy) {
      case "dynamic-calc": {
        dynamicUpdateCells();
        break;
      }
      case 'cache-diff':
      case 'cache-all': { // 所有子节点都需要隐藏
        graph.batchUpdate(() => {
          // 获取所有子节点的 Id, 需要保留之前子节点展开状态。
          const childList = getChildren(node);
          childList.forEach(cellId => {
            const cell = graph.getCellById(cellId);
            if (cell) {
              cell.toggleVisible(false);
            }
          });
        })
        break;
      }
      case 'cache-control': {
        graph.batchUpdate(() => {
          const childList = getChildren(node);
          // 所有子节点都需要隐藏调
          graph.removeCells(childList);
        })
        break;
      }
    }
  }

  /**
   * 展开节点
   * @param id
   */
  const expandNode = (id: string) => {
    const node = registry.getNode(id)!;
    node.data.collapsed = false;
    switch (strategy) {
      case 'dynamic-calc': {
        dynamicUpdateCells();
        break;
      }
      case 'cache-diff': {
        // 增量, 显示 or 创建
        const cells = createCells(node as HierarchyResult, registry, configs.themeConfig, strategy, true);
        graph.batchUpdate(() => {
          const addItems: Cell[] = [];
          cells.forEach(cell => {
            if (graph.hasCell(cell.id)) {
              graph.getCellById(cell.id).toggleVisible(true);
            } else {
              addItems.push(cell);
            }
          });
          if (addItems && addItems.length > 0) {
            graph.addCell(addItems);
          }
        });
        break;
      }
      case 'cache-control': {
        const cells = createCells(node as HierarchyResult, registry, configs.themeConfig, strategy, true);
        graph.batchUpdate(() => {
          graph.addCell(cells);
        });
        break;
      }
      case 'cache-all': {
        const childList = getExpandedChildren(node);
        childList.forEach(cellId => {
          const cell = graph.getCellById(cellId);
          if (cell) {
            cell.toggleVisible(true);
          }
        });
        break;
      }
    }
  }


  return {
    collapseNode,
    expandNode,
    registry
  }
}
