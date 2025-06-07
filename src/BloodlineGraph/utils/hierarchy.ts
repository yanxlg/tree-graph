/*
 * @author: yanxianliang
 * @date: 2025-06-02 22:33
 * @desc: 计算布局
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import Hierarchy from '@antv/hierarchy';
import {DepthToolbarData, EventGroupNodeType, NodeType} from "../types";
import {Node, Edge} from "@xyflow/react";
import {EVENT_GROUP_NODE_WIDTH, EVENT_NODE_WIDTH} from "../constants";
import {generateUUID} from "./createEventNode";

function getNodeWidth(node: Node) {
  switch (node.type) {
    case 'event-group':
      return EVENT_GROUP_NODE_WIDTH;
    default:
      return EVENT_NODE_WIDTH;
  }
}

function getNodeHeight(node: Node) {
  const actualHeight = node.height || node.measured?.height;
  if (actualHeight) {
    return actualHeight;
  }
  switch (node.type) {
    case 'event':
      return 68;
    case 'event-group':
      return 80;
    default:
      return 68;
  }
}


function getNodeTree(nodes: NodeType[], edges: Edge[]) {
  const nodeMap = new Map<string, NodeType>();
  let root: NodeType = nodes[0];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    nodeMap.set(node.id, node);
  }

  const relationMap = new Map<string, string[]>();
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    edge.zIndex = edge.data?.edgeType ? 1 : 0; // 如果边高亮，提升优先级

    const {source, target} = edge; // source 是父级
    if (relationMap.has(source)) {
      relationMap.get(source)!.push(target);
    } else {
      relationMap.set(source, [target]);
    }
  }

  return {
    root,
    relationMap,
    nodeMap
  }
}

function countAllGroupItems(groups: any[]) {
  return groups.reduce((prev, node) => prev + node.data.data.totalCount || 0, 0);
}

export const mindmapNodes = (nodes: NodeType[], edges: Edge[]) => {
  // 构建 tree
  const {root, relationMap, nodeMap} = getNodeTree(nodes, edges);
  const layoutResult = Hierarchy.compactBox(root, {
    direction: 'H',
    getHeight(node) {
      return getNodeHeight(node);
    },
    getWidth(node) {
      return getNodeWidth(node);
    },
    getHGap(node) {
      return 40;
    },
    getVGap(node) {
      return 20;
    },
    getSide: (node, index) => {
      // @ts-ignore
      return node.data.data.depth < 0 ? 'left' : 'right';
    },
    getChildren: (node) => {
      const nodeIds = relationMap.get(node.id) || [];
      return nodeIds.map(id => nodeMap.get(id)!);
    }
  })
  let layoutNodes: Array<NodeType | Node<DepthToolbarData>> = [];
  layoutResult.BFTraverse((node: any) => {
    // TODO 需要自动创建toolbar 节点。
    const {x, y, data} = node;
    layoutNodes.push({
      ...data,
      position: {x, y},
      zIndex: 10 // 节点默认 zIndex
    })

    if (node.children?.length) {
      const children = node.children;
      // 根据 depth 分组
      const groupByDepth: Record<string, any[]> = {};
      children.forEach((child: any) => {
        const depth = child.data.data.depth;
        if (!groupByDepth[depth]) {
          groupByDepth[depth] = [];
        }
        groupByDepth[depth].push(child);
      });

      Object.keys(groupByDepth).forEach((depth) => {
        const subChildren = groupByDepth[depth];
        const firstNode = subChildren[0];
        layoutNodes.push({
          id: `toolbar_depth_${depth}`,
          type: 'toolbar',
          data: {
            depth: firstNode.data.data.depth,
            count: countAllGroupItems(subChildren), // 需要计算总数
          },
          position: {
            x: firstNode.x,
            y: firstNode.y - 30,
          }
        })
      })
    }
  })
  return layoutNodes;
}
