/*
 * @author: yanxianliang
 * @date: 2025-06-08 19:40
 * @desc: HandleStore
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {useInternalNode, useNodeId} from "@xyflow/react";
import {useCallback, useMemo} from "react";
import {EventData} from "../types";
import {useNodesManager} from "../providers/NodesManagerProvider";


const defaultHandleState = {
  collapsed: true,
  loading: false
}

export const useHandleStore = (handleKey: string) => {
  const nodeId = useNodeId();
  const internalNode = useInternalNode(nodeId!);
  const {getNodes} = useNodesManager();

  const store = useMemo(() => {
    const data = internalNode?.data as EventData;
    return data?.$store;
  }, []);

  const state = useMemo(() => {
    return store?.handleMap?.[handleKey];
  }, [store?.handleMap?.[handleKey]]);

  const mergeState = useCallback((state: Partial<EventData['$store']['handleMap'][string]>) => {
    if (!store) {
      return;
    }
    if (!store.handleMap) {
      store.handleMap = {
        [handleKey]: {
          ...defaultHandleState,
          ...state
        }
      };
    } else {
      store.handleMap[handleKey] = {
        ...defaultHandleState,
        ...store.handleMap[handleKey] || {},
        ...state
      };
    }
  }, []);

  const resetCollapsedWithDepth = useCallback((nextDepth: number) => {
    const depth = nextDepth > 0 ? nextDepth - 1 : nextDepth + 1;
    const nodes = getNodes();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const {depth: nodeDepth, $store} = node.data;
      if (depth > 0 && nodeDepth >= depth || depth < 0 && nodeDepth <= depth) {
        // 当前节点所有 handleState 都需要变成折叠状态
        const handleMap = $store.handleMap;
        if (handleMap) {
          const newHandleMap: EventData['$store']['handleMap'] = {};
          for (const handleMapKey in handleMap) {
            if (handleMapKey !== handleKey) {
              newHandleMap[handleMapKey] = {
                ...handleMap[handleMapKey],
                collapsed: true,
                loading: false
              }
            }else{
              newHandleMap[handleMapKey] = handleMap[handleMapKey];
            }
          }
          $store.handleMap = newHandleMap;
        }
      }
    }
  }, []);


  const getCollapseState=useCallback(()=>{
    return store?.handleMap?.[handleKey]?.collapsed;
  },[]);

  return {
    getCollapseState,
    state,
    mergeState,
    resetCollapsedWithDepth
  }
}

export const useCollapseWithDepth = (depth: number)=>{
  const {getNodes} = useNodesManager();
  return useCallback(()=>{
    const nodes = getNodes();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const {depth: nodeDepth, $store} = node.data;
      if (depth > 0 && nodeDepth >= depth || depth < 0 && nodeDepth <= depth) {
        // 当前节点所有 handleState 都需要变成折叠状态
        const handleMap = $store.handleMap;
        if (handleMap) {
          const newHandleMap: EventData['$store']['handleMap'] = {};
          for (const handleMapKey in handleMap) {
            newHandleMap[handleMapKey] = {
              ...handleMap[handleMapKey],
              collapsed: true,
              loading: false
            }
          }
          $store.handleMap = newHandleMap;
        }
      }
    }
},[])
}
