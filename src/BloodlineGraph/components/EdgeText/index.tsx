/*
 * @author: yanxianliang
 * @date: 2025-06-08 11:16
 * @desc: 边文字组件支持左对齐/右对齐
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {memo} from 'react';
import cc from 'classcat';
import {EdgeTextProps} from "@xyflow/react";

function EdgeText(
  {
    x,
    y,
    label,
    labelStyle,
    labelShowBg = true,
    labelBgStyle,
    labelBgPadding = [2, 4],
    labelBgBorderRadius = 2,
    children,
    className,
    ...rest
  }: EdgeTextProps) {
  const edgeTextClasses = cc(['react-flow__edge-textwrapper', className]);
  if (!label) {
    return null;
  }
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={edgeTextClasses}
      {...rest}
    >
      <text
        className={"react-flow__edge-text"}
        dy={"0.3em"}
        style={labelStyle}
      >
        {label}
      </text>
      {children}
    </g>
  )
}

export default memo(EdgeText);
