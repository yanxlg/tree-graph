import {useGraph} from './hooks/useGraph';
import './nodeTypes';
import './tools';
import {BaseTreeGraphProps} from './types';
import './edgeTypes';
import './index.less';
import {useBaseTreeStore} from "./hooks/useBaseTreeStore";
import {useEffect} from "react";
import {CollapsedRect} from "./nodeTypes/CollapsedRect";
import {NodeView} from "@antv/x6/src/view/node";
import {getParents, getPlainChildren} from "./utils/node";
import {useLatest} from "ahooks";
import {NodeCollapseButton} from "./tools/NodeCollapse";


export default function BaseTreeGraph(props: BaseTreeGraphProps) {
  const {root, onNodeClick} = props;
  const {GraphView, register, unRegister, graph} = useGraph(props); // 使用的地方直接使用一个hooks 即可
  const clickListener = useLatest(onNodeClick);
  const {collapseNode, expandNode, registry} = useBaseTreeStore(root, graph);

  useEffect(() => {
    // collapse 事件监听
    graph.onCollapse = ({cell, btn})=>{
      const node = cell as CollapsedRect;
      const tool = btn as NodeCollapseButton;
      const collapsed = tool.isCollapsed();
      tool.setCollapsed(!collapsed);
      node.setCollapsed(!collapsed);
      if (collapsed) {
        expandNode(node.id);
      } else {
        collapseNode(node.id);
      }
    }


    graph.on('node:click', (eventArg: NodeView.EventArgs['node:click']) => {
      const {node} = eventArg;
      const id = node.id;
      const parents = getParents(registry.getNode(id)!);
      const children = getPlainChildren(registry.getNode(id)!);
      clickListener.current?.({
        parents: parents,
        children: children,
        eventArg,
      });
    });
  }, []);
  return GraphView;
}
