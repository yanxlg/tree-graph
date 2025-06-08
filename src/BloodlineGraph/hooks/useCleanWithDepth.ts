/*
 * @author: yanxianliang
 * @date: 2025-06-02 10:22
 * @desc: Node控制方法
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {NodeType} from "../types";
import {useNodesManager} from "../providers/NodesManagerProvider";


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

export const useCleanWithDepth = (nextDepth: number) => {
  const {setNodes} = useNodesManager();
  return () => {
    setNodes((nodes) => {
      return filterNodesByDepth(nodes as NodeType[], nextDepth)
    });
  }
}
