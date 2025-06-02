/*
 * @author: yanxianliang
 * @date: 2025-05-26 14:36
 * @desc: 布局计算配置
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {
  BaseTreeGraphProps,
  HierarchyNode,
  LayoutOptionsUtil,
} from "@gx6/tree-graph";
import {getNodeHeight, getNodeWidth} from "./dimension";
import {getDefaultCollapsed} from "./node";
import {Graph} from "@antv/x6";

const defaultLayoutOptionsUtil: LayoutOptionsUtil = {
  getHeight(graph: Graph, node: HierarchyNode) { // 节点
    return getNodeHeight(node, graph);
  },
  getPreH(graph: Graph, node: HierarchyNode){
    return node.preH || 0;
  },
  getPreV(graph: Graph, node: HierarchyNode){
    return node.preV || 0;
  },
  getWidth(graph: Graph, node: HierarchyNode) {
    return getNodeWidth(node, graph); // 需要修改节点的 width
  },
  getHGap(graph: Graph, node: HierarchyNode) {
    return 40
  },
  getVGap(graph: Graph, node: HierarchyNode) {
    return 20
  },
  getSide: (graph: Graph, node: HierarchyNode, index: number) => {
    return 'right'
  },
  getChildren: (graph: Graph, node: HierarchyNode) => {
    const {strategy} = graph;
    const collapsed = getDefaultCollapsed(node);
    if (strategy === 'dynamic-calc') {
      // 动态计算，折叠的节点
      if (collapsed) {
        return [];
      }
      return node.children;
    }
    return node.children;
  }
}



export const getLayoutOptions = (layoutOptions: BaseTreeGraphProps['layoutOptionsUtil'] = 'default') => {
  if (typeof layoutOptions === 'object') {
    return layoutOptions;
  }
  return defaultLayoutOptionsUtil;
}
