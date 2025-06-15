/*
 * @author: yanxianliang
 * @date: 2025-06-01 18:36
 * @desc: 血缘视图
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {
  Background,
  BackgroundVariant,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {EventNode} from "./nodes/EventNode";
import {EventGroupNode} from "./nodes/EventGroup";
import {layoutElements} from "./utils/layout";
import {useEffect, useMemo, useRef} from "react";
import {EventData, GraphProps} from "./types";
import CustomEdge from "./nodes/Edge";
import {ConfigProvider} from "./providers/ConfigProvider";
import {createEventNode} from "./utils/createEventNode";
import {Legend} from "./components/Legend";
import DepthToolNode from "./nodes/DepthToolNode";
import {useStyles} from "./styles";
import {NodesManagerProvider, useNodesManager} from "./providers/NodesManagerProvider";
import Controls from './components/Controls';

const nodeTypes = {
  event: EventNode,
  'event-group': EventGroupNode,
  'toolbar': DepthToolNode,
}
const edgeTypes = {
  smoothstep: CustomEdge
}

const fitViewOptions = {padding: 2, minZoom: 1, maxZoom: 1};

const proOptions = {hideAttribution: true};

function Graph({root, showLegend = true}: { root?: EventData; showLegend?: boolean }) {
  const {nodes, setNodes} = useNodesManager();
  const containerRef = useRef<HTMLDivElement>(null);

  const {styles} = useStyles();

  useEffect(() => {
    if (root) {
      setNodes([createEventNode(root)]);
    } else {
      setNodes([]);
    }
  }, [root]);

  const {nodes: _nodes, edges: _edges} = useMemo(() => {
    if (nodes.length === 0) {
      return {nodes, edges: []};
    }
    return layoutElements(nodes);
  }, [nodes]);

  return (
    <div className={styles.graph} ref={containerRef}>
      <ReactFlow
        preventScrolling={false}
        panOnScroll={false}
        zoomOnScroll={false}
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
        {showLegend && <Legend/>}
        <Background bgColor="#F2F7FAFF" variant={BackgroundVariant.Dots}/>
        <Controls containerRef={containerRef} fitViewOptions={fitViewOptions} position={'top-right'} showInteractive={false}/>
      </ReactFlow>
    </div>
  )
}


export default (props: GraphProps) => {
  return (
    <ConfigProvider config={props}>
      <NodesManagerProvider>
        <Graph root={props.root} showLegend={props.showLegend}/>
      </NodesManagerProvider>
    </ConfigProvider>
  )
}
