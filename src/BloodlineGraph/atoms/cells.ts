/*
 * @author: yanxianliang
 * @date: 2025-06-02 20:25
 * @desc: cells
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {atom} from "jotai/index";
import {EdgeType, NodeType} from "../types";
import {initialNodes, initialEdges} from "../utils/layout";
import {focusAtom} from 'jotai-optics';


// 按照 depth 存储， root， 不需要维护 edge，edge 直接通过 node 关系创建

// root，1，-1，-2，
//
// const nodesAtom = atom({
//   root: null,
// });
//
//
// // 每一级都需要存储到 nodesAtom中
//
//
//
// type NodeMapType = {
//   root: NodeType;
//   [key: number]: {
//     sourceId: string; // 来源节点的 id,
//     handleId: string; // 来源链接桩的 id
//     items: Array<{ // 链接多个
//       edgeLabel: string;
//       edgeType: string;
//       node: NodeType;
//     }>;
//   }
// }
//
//
// function getCells(nodeStore: NodeMapType) {
//   const root = nodeStore.root;
//   const relationMap = new Map<string, string[]>();
//   const nodeMap = new Map<string, NodeType>();
//   const edges: EdgeType[] = [];
//   for (const depth in nodeStore) {
//     if (depth !== 'root') {
//       const _depth = Number(depth); // 真实 depth
//       const config = nodeStore[depth];
//       const {sourceId, handleId, items = []} = config;
//       if (!relationMap.has(sourceId)) {
//         relationMap.set(sourceId, []);
//       }
//       items.forEach(item => {
//         const {node, edgeLabel, edgeType} = item;
//         relationMap.get(sourceId)!.push(node.id)
//         nodeMap.set(node.id, node);
//         edges.push({
//           id: `${sourceId}___${node.id}`,
//           source: sourceId,
//           target: node.id,
//           sourceHandle: handleId,
//           targetHandle: 'input',
//           type: 'smoothstep',
//           data: {
//             depth: _depth,
//             edgeLabel: node.data.edgeLabel,
//             edgeType: node.data.edgeType
//           }
//         })
//       });
//     }
//   }
//
//   return {root, edges, nodeMap, relationMap}
// }


export const cellsAtom = atom<{
  nodes: NodeType[];
  edges: EdgeType[];
}>({
  nodes: initialNodes,
  edges: initialEdges
});

export const nodeAtom = focusAtom(cellsAtom, (optic) => optic.prop('nodes'))

