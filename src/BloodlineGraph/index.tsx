/*
 * @author: yanxianliang
 * @date: 2025-06-01 18:36
 * @desc: 血缘视图
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {
  ReactFlow,
} from '@xyflow/react';
import {Provider, useAtomValue} from 'jotai';

import '@xyflow/react/dist/style.css';
import {EventNode} from "./nodes/EventNode";
import {EventGroupNode} from "./nodes/EventGroup";
import {layoutElements} from "./utils/layout";
import {useMemo} from "react";
import {GraphProps} from "./types";
import {cellsAtom} from "./atoms/cells";
import CustomEdge from "./nodes/Edge";
import {ConfigProvider} from "./providers/ConfigProvider";

const nodeTypes = {
  event: EventNode,
  'event-group': EventGroupNode
}
const edgeTypes = {
  smoothstep: CustomEdge
}

const fitViewOptions = {padding: 2};

const proOptions = {hideAttribution: true};

function Graph() {
  const {nodes, edges} = useAtomValue(cellsAtom);

  const {nodes: _nodes, edges: _edges} = useMemo(() => {
    return layoutElements(nodes, edges);
  }, [nodes, edges]);

  return (
    <div className="wrapper" style={{height: 500, backgroundColor: '#F2F7FAFF'}}>
      <ReactFlow
        nodesDraggable={false}
        proOptions={proOptions}
        nodes={_nodes}
        edges={_edges}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onlyRenderVisibleElements={false}
      >
      </ReactFlow>
    </div>
  )
}


export default (props: GraphProps) => {
  return (
    <ConfigProvider config={props}>
      <Provider>
        <Graph/>
      </Provider>
    </ConfigProvider>
  )
}
