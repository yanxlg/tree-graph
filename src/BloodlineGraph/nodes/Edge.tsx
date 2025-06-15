/*
 * @author: yanxianliang
 * @date: 2025-06-02 21:29
 * @desc: $Desc$
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import React, {type FC, memo} from 'react';
import {
  getSmoothStepPath,
  BaseEdge,
  type Edge,
  type EdgeProps,
} from '@xyflow/react';
// import EdgeText from '../components/EdgeText';


const getEdgeFill = (edgeType?: string) => {
  switch (edgeType) {
    case 'danger':
      return '#ff4d4f';
    default:
      return undefined;
  }
}

const CustomEdge: FC<
  EdgeProps<Edge<{ edgeLabel?: string; edgeType?: string }>>
> = (
  props) => {
  const {
    sourceX,
    targetX,
    targetY,
    data,
    sourceY,
    sourcePosition,
    targetPosition,
    pathOptions,
    id,
    interactionWidth,
    markerStart,
    markerEnd,
    style,
    // labelBgBorderRadius,
    // labelBgPadding,
    // labelBgStyle,
  } = props;

  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: pathOptions?.borderRadius,
    offset: pathOptions?.offset,
  });

  // const edgeLabel = data?.edgeLabel;
  const edgeType = data?.edgeType;

  const stroke = getEdgeFill(edgeType);

  return (
    <>
      <BaseEdge
        path={path}
        id={id}
        interactionWidth={interactionWidth}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={
          {
            ...style,
            stroke,
            zIndex: edgeType ? 10 : undefined
          }
        }
      />
      {/*<EdgeText*/}
      {/*  labelBgBorderRadius={labelBgBorderRadius}*/}
      {/*  labelBgPadding={labelBgPadding}*/}
      {/*  labelBgStyle={labelBgStyle}*/}
      {/*  labelShowBg={false}*/}
      {/*  labelStyle={{*/}
      {/*    textAnchor: targetX < sourceX ? 'start' : 'end',*/}
      {/*    dominantBaseline: 'ideographic',*/}
      {/*    fontSize: 12,*/}
      {/*  }}*/}
      {/*  label={edgeLabel}*/}
      {/*  x={targetX + (targetX < sourceX ? 5 : -5)}*/}
      {/*  y={targetY - 5}*/}
      {/*/>*/}
    </>
  );
};

export default memo(CustomEdge);
