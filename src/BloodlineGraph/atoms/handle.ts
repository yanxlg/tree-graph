/*
 * @author: yanxianliang
 * @date: 2025-06-02 16:50
 * @desc: Desc
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {atom, useAtomValue, useAtom} from 'jotai';
import {HandleStoreMap} from "../types";

export const handleStoreAtom = atom<HandleStoreMap>({});

export const useHandleState = (handleKey: string) => {
  const handleStore = useAtomValue(handleStoreAtom);
  return handleStore[handleKey];
}

export const useSetHandleState = (handleKey: string) => {
  const [handleStore, setHandleStore] = useAtom(handleStoreAtom);

  return (state: {
    loading: boolean;
    collapsed: boolean;
    nextDepth: number;
    items: any[]
  }) => {
    // 其它所有的状态都需要重置
    const newHandleStore: HandleStoreMap = {};
    for (const key in handleStore) {
      if (key !== handleKey) {
        const beforeState = handleStore[key];
        const nextDepth = state.nextDepth;
        if (nextDepth > 0 && beforeState.nextDepth >= nextDepth) {
          newHandleStore[key] = {
            ...beforeState,
            loading: false,
            collapsed: true,
          };
        } else if (nextDepth < 0 && beforeState.nextDepth <= nextDepth) {
          newHandleStore[key] = {
            ...beforeState,
            loading: false,
            collapsed: true,
          };
        } else {
          newHandleStore[key] = beforeState;
        }
      }
    }
    newHandleStore[handleKey] = state;
    setHandleStore(newHandleStore);
  }
}
