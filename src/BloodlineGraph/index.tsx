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
  Controls,
  ReactFlow,
} from '@xyflow/react';
import {Provider, useAtomValue, useSetAtom} from 'jotai';

import '@xyflow/react/dist/style.css';
import {EventNode} from "./nodes/EventNode";
import {EventGroupNode} from "./nodes/EventGroup";
import {layoutElements} from "./utils/layout";
import {useEffect, useMemo} from "react";
import {EventData, GraphProps} from "./types";
import {cellsAtom, nodeAtom} from "./atoms/cells";
import CustomEdge from "./nodes/Edge";
import {ConfigProvider} from "./providers/ConfigProvider";
import {createEventNode} from "./utils/createEventNode";
import {Legend} from "./components/Legend";
import DepthToolNode from "./nodes/DepthToolNode";
import {NodeInstanceProvider} from "./providers/NodeInstanceProvider";
import {useStyles} from "./styles";

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
  const {nodes, edges} = useAtomValue(cellsAtom);
  const setNodes = useSetAtom(nodeAtom);

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
      return {nodes, edges};
    }
    return layoutElements(nodes, edges);
  }, [nodes, edges]);

  return (
    <div className={styles.graph}>
      <ReactFlow
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
        <Background bgColor="#F2F7FAFF" variant={BackgroundVariant.Dots} />
        <Controls style={{zIndex: 200}} position={'top-right'} showInteractive={false}/>
      </ReactFlow>
    </div>
  )
}


export default (props: GraphProps) => {
  return (
    <ConfigProvider config={props}>
      <NodeInstanceProvider>
        <Provider>
          <Graph root={props.root} showLegend={props.showLegend}/>
        </Provider>
      </NodeInstanceProvider>
    </ConfigProvider>
  )
}
