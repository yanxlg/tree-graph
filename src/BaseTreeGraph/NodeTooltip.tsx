/*
 * @author: yanxianliang
 * @date: 2025-05-18 15:33
 * @desc: Tooltip 显示完整内容
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import React, {forwardRef, useEffect, useState} from "react";
import {Graph} from "@antv/x6";
import {Tooltip} from "antd";


const DynaminTooltip = forwardRef(({tooltip}: {
  tooltip?: {
    title: string;
    target: HTMLElement;
  }
}, ref) => {
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(tooltip?.target); // 更新 Tooltip 目标元素
    }
  }, [tooltip]);
  return null;
})


const NodeTooltip = (
  {
    graph
  }: {
    graph: Graph;
  }) => {
  const [tooltip, setTooltip] = useState<{
    title: string;
    target: HTMLElement;
  }>();

  useEffect(() => {

    graph.on('node:mouseover', ({e, node}) => {
      const target = e.target as HTMLElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        const nodeRoot = target.parentElement; // node 的根节点
        const textNode = nodeRoot?.querySelector('text');
        if (textNode) {
          const fullText = (node as unknown as { label: string }).label || '';
          if (textNode.textContent !== fullText) {
            setTooltip({
              title: fullText,
              target,
            });
          }
        }
      }
    })

    graph.on('node:mouseout', ({e, node}) => {
      const target = e.target as SVGElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        setTooltip(undefined);
      }
    })
  }, []);

  return (
    <Tooltip title={tooltip?.title} open={!!tooltip}>
      <DynaminTooltip tooltip={tooltip}/>
    </Tooltip>
  )
}

export default NodeTooltip;
