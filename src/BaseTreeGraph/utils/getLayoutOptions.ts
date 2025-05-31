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


export const groupSpace = 5;

const withGroupLayoutOptionsUtil: LayoutOptionsUtil = {
  getHeight(graph: Graph, node: HierarchyNode) { // group 节点需要计算内容的高度和
    return getNodeHeight(node, graph);
  },
  getWidth(graph: Graph, node: HierarchyNode) {
    return getNodeWidth(node, graph);
  },
  getPreH(graph: Graph, node: HierarchyNode){
    if(node.type === 'event' && !node.isRoot){
      return -140;
    }
    console.log(node);
    return node.preH || 0;
  },
  getPreV(graph: Graph, node: HierarchyNode){
    return node.preV || 0;
  },
  getHGap(graph: Graph, node: HierarchyNode) {
    if (node.type === "event-group") { // TODO 需要动态计算 group 需要将 children 放在内部显示。对后面的节点生效
      // return -150; // +- 150
    }
    return 60
  },
  getVGap(graph: Graph, node: HierarchyNode) { // TODO 子节点需要配置，对后面的节点生效。
    if(node.type === 'event' && !node.$isLast) {
      return groupSpace
    }
    return 30
  },
  getSide: (graph: Graph, node: HierarchyNode, index: number) => {
    return node.data?.layoutSide ?? 'right';
  },
  getChildren: (graph: Graph, node: HierarchyNode) => {
    const {strategy} = graph;
    const collapsed = getDefaultCollapsed(node);

    let children: any = [];
    if (strategy === 'dynamic-calc') {
      // 动态计算，折叠的节点
      if (collapsed) {
        children= [];
      }else{children= node.children}
    }else{
      children = node.children;
    }
    children.map((item:any, index: number)=>{
      item.$isLast = index === children.length - 1; // 是否是最后一个节点
    })
    return children;
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
