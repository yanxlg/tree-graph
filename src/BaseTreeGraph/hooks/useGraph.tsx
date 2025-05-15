import {useCallback, useEffect, useMemo, useRef} from "react";
import {Graph} from "@antv/x6";
import {useProtal, register as globalRegister, unRegister as globalUnRegister, ReactShapeConfig} from "../react-shape";
import {v4 as uuidv4} from 'uuid';
import {BaseTreeGraphProps, MindMapData, RefMap} from "../types";
import {useLatest} from 'ahooks';
import {toHierarchyCells} from "../utils/toHierarchyCells";
import {NodeView} from "@antv/x6/src/view/node";


export function useGraph(
  graphOptions: BaseTreeGraphProps['graph'],
  onNodeClick: BaseTreeGraphProps['onNodeClick'],
  initialState?: MindMapData, // 暂时只支持树类型，后续可扩展不同类型的初始化值及内部默认处理逻辑
) {
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>(undefined);
  const {portals, connect, disconnect} = useProtal();
  const $nodeRef = useRef<RefMap>(undefined);

  const clickListener = useLatest(onNodeClick);

  const graphScope = useMemo(() => {
    return uuidv4();
  }, []);


  const initGraph = useCallback((graph: Graph)=>{
    if(initialState){
      const {cells, $ref} = toHierarchyCells(initialState);
      $nodeRef.current = $ref;
      graph.resetCells(cells);
    }
  },[]);


  useEffect(() => {
    const graph = new Graph({
      ...graphOptions,
      // 画布拖拽
      panning: graphOptions?.panning ?? {
        enabled: true,
        eventTypes: ['leftMouseDown'],
      },
      container: graphContainerRef.current!, // 渲染前设置容器
      background: graphOptions?.background ?? {
        color: '#F2F7FA',
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 4,
          },
        },
      },
      interacting: graphOptions?.interacting ?? false,
    });
    graph.id = graphScope;
    graph.portal = {
      connect,
      disconnect
    }
    graphRef.current = graph;
    initGraph(graph);
    graph.zoomToFit({padding: 10, maxScale: 1}); // zommToFit 方法使用

    graph.on('node:click', (eventArg: NodeView.EventArgs['node:click']) => {
      const {node} = eventArg;
      const id = node.id;
      const nodeRef = $nodeRef.current?.[id];
      clickListener.current?.({
        parents: nodeRef?.parents,
        children: nodeRef?.children,
        eventArg,
      });
    });

    return () => {
      graph.dispose(true);
    }
  }, []);

  const register = useCallback((config: ReactShapeConfig) => {
    globalRegister(config, graphScope);
  }, []);

  const unRegister = useCallback((shape: string) => {
    globalUnRegister(shape, graphScope);
  }, []);

  const getGraph = useCallback(() => graphRef.current, []);

  const GraphView = useMemo(() => {
    return (
      <>
        {portals}
        <div ref={graphContainerRef} className={'graph-root'} style={{width: '100%', height: 600}}/>
      </>
    )
  }, [portals]);


  return {
    GraphView,
    register,
    unRegister,
    getGraph
  }
}
