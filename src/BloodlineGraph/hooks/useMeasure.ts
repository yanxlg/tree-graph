/*
 * @author: yanxianliang
 * @date: 2025-06-01 22:56
 * @desc: 更新节点宽、高信息
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {useEffect, useRef} from "react";
import {useSetAtom} from "jotai";
import {nodeAtom} from "../atoms/cells";

export const useMeasure = (id: string, measure: boolean)=>{
  const ref = useRef<HTMLDivElement>(null);
  const setNodes = useSetAtom(nodeAtom);

  useEffect(() => {
    if (ref.current && measure) {
      const resizeObserver = new ResizeObserver((entries) => {
        // 获取节点的新尺寸
        const { width, height } = entries[0].contentRect;
        setNodes(nodes=>{
          return nodes.map(node=>{
            if(node.id === id){
              return {
                ...node,
                width,
                height,
                measured: {
                  width,
                  height
                }
              }
            }
            return node;
          })
        })
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return ref;
}
