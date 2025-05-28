/*
 * @author: yanxianliang
 * @date: 2025-05-18 15:33
 * @desc: Tooltip 显示完整内容
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import React, {forwardRef, useEffect} from "react";
import {Tooltip, Popover} from "antd";
import {TooltipState} from "@gx6/tree-graph";


const DynaminTooltip = forwardRef(({tooltip}: {
  tooltip?: {
    title: string;
    target: HTMLElement;
  }
}, ref) => {
  useEffect(() => {
    if (tooltip && tooltip.target) {
      const target = tooltip.target;
      if (typeof ref === 'function') {
        ref(target);
      } else if (ref) {
        ref.current = target;
      }
    }
  }, [tooltip]);
  return null;
})


const NodeTooltip = (
  {
    tooltip
  }: {
    tooltip?: TooltipState;
  }) => {

  return (
    <Tooltip title={tooltip?.title} open={!!tooltip}>
      <DynaminTooltip tooltip={tooltip}/>
    </Tooltip>
  )
}

export default NodeTooltip;
