/*
 * @author: yanxianliang
 * @date: 2025-06-02 09:31
 * @desc: 添加子节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {useNodeId} from "@xyflow/react";
import {EdgeType, NodeType} from "../types";
import {useSetAtom} from "jotai";
import {cellsAtom} from "../atoms/cells";


function getNewEdges(
  sourceId: string,
  depth: number,
  children: NodeType[],
  sourceHandle: string // 链接桩 id
) {
  const newEdges: EdgeType[] = [];
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    const edge = {
      id: `${sourceId}___${node.id}`,
      source: sourceId,
      target: node.id,
      sourceHandle,
      targetHandle: 'input',
      type: 'smoothstep',
      label: node.data.dispatch,
      data: {
        depth,
      }
    }
    newEdges.push(edge);
  }
  return newEdges;
}


export const useAppendChildren = (
  depth: number,
  sourceHandle: string // 链接桩 id
) => {
  const setCells = useSetAtom(cellsAtom);
  const id = useNodeId()!; // 来源节点 id
  return (children: NodeType[]) => {
    setCells(({nodes, edges}) => {
      const appendEdges = getNewEdges(id, depth, children, sourceHandle);
      return {
        nodes: [...nodes, ...children],
        edges: [...edges, ...appendEdges],
      }
    })
  }
}
