import {useCallback, useEffect, useMemo, useRef} from "react";
import {Graph} from "@antv/x6";
import {useProtal, register as globalRegister, unRegister as globalUnRegister, ReactShapeConfig} from "../react-shape";
import {BaseTreeGraphProps, IHoverActiveNode, MindMapData, RefMap} from "../types";
import {useLatest, useMemoizedFn, useUpdateEffect} from 'ahooks';
import {toHierarchyCells} from "../utils/toHierarchyCells";
import {NodeView} from "@antv/x6/src/view/node";
import {CollapsedRect} from "../nodeTypes/CollapsedRect";
import {StringExt} from "@antv/x6-common";
import {selectionPlugin} from "../plugins/selection";
import {getTheme} from "../utils/theme";


export function useGraph(graphConfig: BaseTreeGraphProps) {
  const {onNodeClick, treeData, graph: graphOptions, theme} = graphConfig;
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>(undefined);
  const {portals, connect, disconnect} = useProtal();
  const $nodeRef = useRef<RefMap>(undefined);

  const clickListener = useLatest(onNodeClick);

  const graphScope = useMemo(() => {
    return StringExt.uuid();
  }, []);


  const initGraphWithTreeData = useMemoizedFn(() => {
    if (treeData) {
      const graph = graphRef.current!;
      const {cells, $ref} = toHierarchyCells(treeData, graphScope);
      $nodeRef.current = $ref;
      graph.model.getLastCell()?.removeZIndex(); // TODO 清除 zIndex 缓存，还是 edge 生成，否则 resetCells 调用时对应未设置 zIndex 的会从当前 zIndex 重新计算
      graph.resetCells(cells);
    }
  });

  useUpdateEffect(() => {
    initGraphWithTreeData();
  }, [treeData])

  useEffect(() => {
    const themeConfig = getTheme(theme);
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
    graph.use(selectionPlugin);
    graph.id = graphScope;
    graph.portal = {
      connect,
      disconnect
    }
    graphRef.current = graph;

    // 定义 filter
    graph.defineFilter({
      id: 'topic-hover-shadow',
      name: 'highlight',
      args: {
        width: 2,
        blur: 3,
        opacity: 0.2,
        color: themeConfig.primaryColor
      },
    });

    graph.defineFilter({
      id: 'sub-topic-hover-shadow',
      name: 'dropShadow',
      args: {
        dx: 0,
        dy: 0,
        blur: 2,
        opacity: 0.7,
        color: themeConfig.primaryColor
      },
    });


    // graph.on('node:added', ({node}: { node: CollapsedRect }) => {
    //   console.log('node:added');
    // })

    // TODO 希望能够将事件放在内层
    graph.on('topic:collapse', ({node}: { node: CollapsedRect }) => {
      node.toggleExpanded();
    })

    // 全局事件处理
    // graph.container.addEventListener('mouseover', (e)=>{
    //   const target = e.target as SVGElement;
    //   const hoverable = target.getAttribute('hoverable');
    //   if(hoverable){
    //     target.setAttribute('filter', hoverable);
    //   }
    // })
    //
    // graph.container.addEventListener('mouseout', (e)=>{
    //   const target = e.target as SVGElement;
    //   const hoverable = target.getAttribute('hoverable');
    //   if(hoverable){
    //     target.setAttribute('filter', 'none');
    //   }
    // })
    graph.on('node:mouseover', ({e, node}) => {
      const target = e.target as SVGElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        (node as unknown as IHoverActiveNode).onMouseOver?.();
      }
    })

    graph.on('node:mouseout', ({e, node}) => {
      const target = e.target as SVGElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        (node as unknown as IHoverActiveNode).onMouseOut?.();
      }
    })

    graph.on('topic:click', (eventArg: NodeView.EventArgs['node:click']) => {
      const {node} = eventArg;
      const id = node.id;
      const nodeRef = $nodeRef.current?.[id];
      clickListener.current?.({
        parents: nodeRef?.parents || [],
        children: nodeRef?.children || [],
        eventArg,
      });
    });

    initGraphWithTreeData();
    graph.zoomToFit({padding: 10, maxScale: 1}); // zommToFit 方法使用

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
