/*
 * @author: yanxianliang
 * @date: 2025-06-05 08:55
 * @desc: $Desc$
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import React, {useCallback, useContext, useMemo} from "react";


type NodeInstance = {
  setExpanded?: (expand: boolean) => void;
};

const fn = () => {
};

const NodeInstanceContext = React.createContext<{
  instanceMap: Map<number, Set<NodeInstance>>;
  setInstance: (depth: number, instance: NodeInstance) => void;
  removeInstance: (depth: number, instance: NodeInstance) => void;
}>({
  instanceMap: new Map(),
  setInstance: fn,
  removeInstance: fn
});

export const NodeInstanceProvider = (props: {
  children: React.ReactNode;
}) => {

  const instanceMap = useMemo(() => {
    return new Map<number, Set<any>>();
  }, []);

  const setInstance = useCallback((depth: number, instance: NodeInstance) => {
    if (!instanceMap.has(depth)) {
      const instanceSet = new Set<NodeInstance>();
      instanceMap.set(depth, instanceSet);
    }
    instanceMap.get(depth)!.add(instance);
  }, []);

  const removeInstance = useCallback((depth: number, instance: NodeInstance) => {
    if (instanceMap.has(depth)) {
      instanceMap.get(depth)!.delete(instance);
    }
  }, []);


  const {children} = props;
  return (
    <NodeInstanceContext.Provider value={{instanceMap, setInstance, removeInstance}}>
      {useMemo(() => children, [])}
    </NodeInstanceContext.Provider>
  )
}

export const useInstanceRegister = () => {
  return useContext(NodeInstanceContext);
}
