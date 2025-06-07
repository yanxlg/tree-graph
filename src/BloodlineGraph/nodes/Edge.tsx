/*
 * @author: yanxianliang
 * @date: 2025-06-02 21:29
 * @desc: $Desc$
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import React, {type FC} from 'react';
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  BaseEdge,
  type Edge,
  type EdgeProps,
  SmoothStepEdge
} from '@xyflow/react';

// this is a little helper component to render the actual edge label
function EdgeLabel({transform, label}: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        // background: 'rgba(255, 255, 255, 0.75)',
        // color: '#ff5050',
        fontSize: 10,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}


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
    data
  } = props;
  const edgeLabel = data?.edgeLabel;
  const edgeType = data?.edgeType;

  const stroke = getEdgeFill(edgeType);

  return (
    <>
      <SmoothStepEdge {...props} style={{stroke, zIndex: edgeType ? 10 : undefined}}/>
      <EdgeLabelRenderer>
        {edgeLabel && (
          <EdgeLabel
            transform={`translate(${targetX < sourceX ? '0%' : '-100%'}, -100%) translate(${targetX + (targetX < sourceX ? 5 : -5)}px,${targetY}px)`}
            label={edgeLabel}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
