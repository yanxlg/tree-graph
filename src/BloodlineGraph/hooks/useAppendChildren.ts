/*
 * @author: yanxianliang
 * @date: 2025-06-02 09:31
 * @desc: 添加子节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {useNodeId} from "@xyflow/react";
import {EventGroupData} from "../types";
import {createEventGroupNode} from "../utils/createEventNode";
import {useNodesManager} from "../providers/NodesManagerProvider";


export const useAppendChildren = (
  depth: number,
  sourceHandle: string // 链接桩 id
) => {
  const {setNodes} = useNodesManager();
  const id = useNodeId()!; // 来源节点 id
  return (children: EventGroupData[]) => {
    setNodes((nodes) => {
      const groupNodes = children.map(child => {
        const node = createEventGroupNode(child)
        return {
          ...node,
          edge: {
            id: `${id}___${node.id}`,
            source: id,
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
        }
      });
      return [...nodes, ...groupNodes]
    })
  }
}
