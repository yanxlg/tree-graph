/*
 * @author: yanxianliang
 * @date: 2025-06-02 09:31
 * @desc: 添加子节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {useNodeId} from "@xyflow/react";
import {EdgeType, EventGroupData, EventGroupNodeType} from "../types";
import {useSetAtom} from "jotai";
import {cellsAtom} from "../atoms/cells";
import {createEventGroupNode} from "../utils/createEventNode";


function getNewEdges(
  sourceId: string,
  depth: number,
  children: EventGroupNodeType[],
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
      data: {
        depth,
        edgeLabel: node.data.edgeLabel,
        edgeType: node.data.edgeType
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
  return (children: EventGroupData[]) => {
    setCells(({nodes, edges}) => {
      const groupNodes = children.map(child=>createEventGroupNode(child));
      const appendEdges = getNewEdges(id, depth, groupNodes, sourceHandle);
      return {
        nodes: [...nodes, ...groupNodes],
        edges: [...edges, ...appendEdges],
      }
    })
  }
}
