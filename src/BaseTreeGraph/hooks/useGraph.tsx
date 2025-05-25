import {useCallback, useEffect, useMemo, useRef} from "react";
import {
  register as globalRegister,
  unRegister as globalUnRegister,
  ReactShapeConfig,
} from "../react-shape";
import {BaseTreeGraphProps, IHoverActiveNode, RefMap} from "../types";
import {useLatest, useMemoizedFn} from 'ahooks';
import {NodeView} from "@antv/x6/src/view/node";
import {CollapsedRect} from "../nodeTypes/CollapsedRect";
import {getTheme} from "../utils/theme";
import NodeTooltip from "../NodeTooltip";
import {useGraphInstance} from "./useGraphInstance";
import {useTreeStore} from "./useTreeStore";
import {getParents, getPlainChildren} from "../utils/node";


export function useGraph(graphConfig: BaseTreeGraphProps) {
  const {
    onNodeClick,
    root,
    graph: graphOptions,
    theme,
    nodeConfig,
    width = '100%',
    height = '100%',
    strategy
  } = graphConfig;
  const fragmentRef = useRef<HTMLDivElement>(null);
  const themeConfig = useRef(getTheme(theme)).current;
  const clickListener = useLatest(onNodeClick);


  const {portals, graph, tooltip} = useGraphInstance(graphOptions);

  // TODO 需要先 resize, 后执行 zoomToFit
  useEffect(() => {
    fragmentRef.current!.innerHTML = ''; // 清空
    fragmentRef.current!.append(graph.container);
    const width = fragmentRef.current?.clientWidth;
    const height = fragmentRef.current?.clientHeight;
    graph.resize(width, height); // 重新计算宽高
    return () => {
      graph.dispose(true);
    }
  }, []);


  const {collapseNode, expandNode, registry} = useTreeStore(root, strategy, graph, {themeConfig, nodeConfig});


  useEffect(() => {
    graph.on('node:collapse', ({node}: { node: CollapsedRect }) => {
      const collapsed = node.isCollapsed();
      node.toggleCollapsed();
      if (collapsed) {
        expandNode(node.id);
      } else {
        collapseNode(node.id);
      }
    })


    graph.on('topic:click', (eventArg: NodeView.EventArgs['node:click']) => {
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


  const register = useCallback((config: ReactShapeConfig) => {
    globalRegister(config, graph.id);
  }, []);

  const unRegister = useCallback((shape: string) => {
    globalUnRegister(shape, graph.id);
  }, []);

  const getGraph = useCallback(() => graph, []);

  const GraphView = useMemo(() => {
    return (
      <>
        {portals}
        <div ref={fragmentRef} style={{width: width, height: height, position: 'relative'}}/>
        <NodeTooltip tooltip={tooltip}/>
      </>
    )
  }, [portals, tooltip]);


  return {
    GraphView,
    register,
    unRegister,
    getGraph
  }
}
