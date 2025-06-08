/*
 * @author: yanxianliang
 * @date: 2025-06-05 08:55
 * @desc: $Desc$
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import React, {useContext, useMemo, useState} from "react";
import {NodeType} from "../types";
import {useMemoizedFn} from "ahooks";

const NodesContext = React.createContext<{
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
  getNodes: () => NodeType[];
}>({
  nodes: [],
  setNodes: () => {
  },
  getNodes: () => []
});

export const NodesManagerProvider = (props: {
  children: React.ReactNode;
}) => {
  const {children} = props;
  const [nodes, setNodes] = useState<NodeType[]>([]);

  const getNodes = useMemoizedFn(() => {
    return nodes;
  });

  return (
    <NodesContext.Provider value={{nodes, setNodes, getNodes}}>
      {useMemo(() => children, [])}
    </NodesContext.Provider>
  )
}

export const useNodesManager = () => {
  return useContext(NodesContext);
}
