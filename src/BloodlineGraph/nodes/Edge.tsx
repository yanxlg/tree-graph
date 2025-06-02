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
} from '@xyflow/react';

// this is a little helper component to render the actual edge label
function EdgeLabel({transform, label}: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        // background: 'rgba(255, 255, 255, 0.75)',
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

const CustomEdge: FC<
  EdgeProps<Edge<{ label: string; depth: number }>>
> = (
  {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    data
  }) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const depth = data?.depth ?? 0;

  return (
    <>
      <BaseEdge id={id} path={edgePath}/>
      <EdgeLabelRenderer>
        {label && (
          <EdgeLabel
            transform={`translate(${depth < 0 ? '100%' : '-100%'}, -100%) translate(${targetX}px,${targetY}px)`}
            label={String(label)}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
