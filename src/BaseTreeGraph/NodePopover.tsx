/*
 * @author: yanxianliang
 * @date: 2025-05-18 15:33
 * @desc: Popover 显示节点信息
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import React, {forwardRef, useEffect, useMemo, useRef, useState} from "react";
import {Tooltip, Popover} from "antd";
import {PopoverState, TooltipState} from "@gx6/tree-graph";


const DynaminPopover = forwardRef(({target}: {
  target?: HTMLElement;
}, ref) => {
  useEffect(() => {
    if (target) {
      if (typeof ref === 'function') {
        ref(target);
      } else if (ref) {
        ref.current = target;
      }
    }
  }, [target]);
  return null;
})


const NodePopover = (
  {
    popover
  }: {
    popover?: PopoverState;
  }) => {
  const {target, show, content} = popover || {};

  return (
    <Popover content={content} open={show} placement={'right'}>
      <DynaminPopover target={target}/>
    </Popover>
  )
}

export default NodePopover;
