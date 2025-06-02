/*
 * @author: yanxianliang
 * @date: 2025-06-02 10:22
 * @desc: Node控制方法
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {NodeType, EdgeType} from "../types";
import {useSetAtom} from "jotai";
import {cellsAtom} from "../atoms/cells";


function filterNodesByDepth(nodes: Array<NodeType>, nextDepth: number) {
  let newNodes: NodeType[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (nextDepth > 0) {
      if (node.data.depth < nextDepth) {
        newNodes.push(node);
      }
    } else {
      if (node.data.depth > nextDepth) {
        newNodes.push(node);
      }
    }
  }
  return newNodes;
}

function filterEdgesByDepth(edges: EdgeType[], nextDepth: number) {
  let newEdges: EdgeType[] = [];
  for (let i = 0; i < edges.length; i++) {
    const node = edges[i];
    if (nextDepth > 0) {
      if (node.data!.depth < nextDepth) {
        newEdges.push(node);
      }
    } else {
      if (node.data!.depth > nextDepth) {
        newEdges.push(node);
      }
    }
  }
  return newEdges;
}

export const useCleanWithDepth = (nextDepth: number)=>{
  const setCells = useSetAtom(cellsAtom);
  return ()=>{
    setCells(({nodes, edges})=>{
      const _nodes = filterNodesByDepth(nodes as NodeType[], nextDepth);
      const _edges = filterEdgesByDepth(edges as EdgeType[], nextDepth);
      return {
        nodes: _nodes,
        edges: _edges
      }
    });
  }
}
