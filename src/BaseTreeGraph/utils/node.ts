/*
 * @author: yanxianliang
 * @date: 2025-05-22 18:51
 * @desc: node 节点处理
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Node} from '@antv/hierarchy';
import {HierarchyNode, HierarchyResult, MindMapData} from "@gx6/tree-graph";

export const getDefaultCollapsed = (data: HierarchyNode) => {
  return data.collapsed ?? true; // 默认是收起状态
}

export const getChildren = (node: Node, recursive = true) => {
  const {children} = node;
  const childrenIds: string[] = [];

  children?.forEach((child: Node) => {
    childrenIds.push(child.id);
    if (recursive) {
      childrenIds.push(...getChildren(child));
    }
  })
  return childrenIds;
}


export const getNodeVisible = (node: HierarchyResult, parentVisible: boolean) => {
  let visible = true;
  const {parent} = node;
  if (parent && (getDefaultCollapsed(parent.data) || !parentVisible)) {
    visible = false;
  }
  return visible;
}


export const getExpandedChildren = (node: Node) => {
  const {children} = node;
  const childrenIds: string[] = [];
  const collapsed = getDefaultCollapsed(node.data);
  if (!collapsed) {
    children?.forEach((child: Node) => {
      childrenIds.push(child.id);
      childrenIds.push(...getExpandedChildren(child));
    })
  }
  return childrenIds;
}


export const getParents = (node?: Node) => {
  if (!node) {
    return []
  }
  const parents: MindMapData[] = [];
  let curr = node;
  while (curr.parent) {
    parents.unshift(curr.parent.data);
    curr = curr.parent;
  }
  return parents;
}

export const getPlainChildren = (node?: Node) => {
  const childrenList:MindMapData[]  = [];
  node?.data?.children?.forEach((child: MindMapData) => {
    childrenList.push(child, ...getPlainChildren(child));
  })
  return childrenList;
}
