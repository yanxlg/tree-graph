import {register} from './react-shape';
import NodeRender from "./NodeRender";
import {useEffect, useRef} from "react";
import {useGraph} from './hooks/useGraph';
import {Options, Graph} from "@antv/x6";
import './nodeTypes/base';
import {BaseTreeGraphProps, MindMapData, RefMap} from './types';
import Manual = Options.Manual;
import {toHierarchyCells} from "./utils/toHierarchyCells";
import './edgeTypes/base';


// 支持 svg 节点注册，svg性能会好些，没有 react 开销
// top 节点注册
//register({
//  shape: 'topic',
//  component: NodeRender,
//})

export default function BaseTreeGraph(props: BaseTreeGraphProps) {
  const {treeData, graph, onNodeClick} = props;

  const {GraphView, register, unRegister, getGraph} = useGraph(
    graph,
    onNodeClick,
    treeData,
  ); // 使用的地方直接使用一个hooks 即可

  return GraphView;
}
