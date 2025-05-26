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


const withGroupLayoutOptionsUtil: LayoutOptionsUtil = {
  getHeight(graph: Graph, node: HierarchyNode) {
    return getNodeHeight(node, graph);
  },
  getWidth(graph: Graph, node: HierarchyNode) {
    return getNodeWidth(node, graph);
  },
  getHGap(graph: Graph, node: HierarchyNode) {
    if (node.type === "event-group") { // TODO 需要动态计算 group 需要将 children 放在内部显示。对后面的节点生效
      return -150;
    }
    return 40
  },
  getVGap(graph: Graph, node: HierarchyNode) { // TODO 子节点需要配置，对后面的节点生效。
    if(node.id === '2' || node.id === '3') {
      return 5
    }
    // if (node.type === 'event') {
    //   return 5
    // }
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
  if (layoutOptions === 'with-group') {
    return withGroupLayoutOptionsUtil;
  }
  if (typeof layoutOptions === 'object') {
    return layoutOptions;
  }
  return defaultLayoutOptionsUtil;
}
