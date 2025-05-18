import {useCallback, useEffect, useMemo, useRef} from "react";
import {Graph} from "@antv/x6";
import {
  register as globalRegister,
  unRegister as globalUnRegister,
  ReactShapeConfig,
  usePortal
} from "../react-shape";
import {BaseTreeGraphProps, IHoverActiveNode, RefMap} from "../types";
import {useLatest, useMemoizedFn} from 'ahooks';
import {toHierarchyCells} from "../utils/toHierarchyCells";
import {NodeView} from "@antv/x6/src/view/node";
import {CollapsedRect} from "../nodeTypes/CollapsedRect";
import {StringExt} from "@antv/x6-common";
import {selectionPlugin} from "../plugins/selection";
import {getTheme} from "../utils/theme";
import NodeTooltip from "../NodeTooltip";


// export function useGraph(graphConfig: BaseTreeGraphProps) {
//   const {onNodeClick, treeData, graph: graphOptions, theme, nodeConfig} = graphConfig;
//   const graphContainerRef = useRef<HTMLDivElement>(null);
//   const graphRef = useRef<Graph>(undefined);
//   const {portals, connect, disconnect} = useProtal();
//   const $nodeRef = useRef<RefMap>(undefined);
//   const themeConfig = useRef(getTheme(theme)).current;
//   const [tooltip, setTooltip] = useState<{
//     label: string;
//     triggerNode: HTMLElement;
//   }>(); // tooltip
//
//   const clickListener = useLatest(onNodeClick);
//
//   const graphScope = useMemo(() => {
//     return StringExt.uuid();
//   }, []);
//
//
//   const initGraphWithTreeData = useMemoizedFn(() => {
//     if (treeData) {
//       const graph = graphRef.current!;
//       const {cells, $ref} = toHierarchyCells(treeData, graphScope, {
//         themeConfig,
//         nodeConfig
//       });
//       $nodeRef.current = $ref;
//       graph.model.getLastCell()?.removeZIndex();
//       graph.resetCells(cells);
//     }
//   });
//
//   useUpdateEffect(() => {
//     initGraphWithTreeData();
//   }, [treeData])
//
//   useEffect(() => {
//     // 自动创建个dom ，然后直接创建graph
//     const graph = new Graph({
//       ...graphOptions,
//       // 画布拖拽
//       panning: graphOptions?.panning ?? {
//         enabled: true,
//         eventTypes: ['leftMouseDown'],
//       },
//       container: graphContainerRef.current!, // 渲染前设置容器
//       background: graphOptions?.background ?? {
//         color: '#F2F7FA',
//       },
//       connecting: {
//         router: 'manhattan',
//         connector: {
//           name: 'rounded',
//           args: {
//             radius: 4,
//           },
//         },
//       },
//       interacting: graphOptions?.interacting ?? false,
//     });
//     graph.use(selectionPlugin);
//     graph.id = graphScope;
//     graph.portal = {
//       connect,
//       disconnect
//     }
//     graphRef.current = graph;
//
//     // 定义 filter
//     graph.defineFilter({
//       id: 'topic-hover-shadow',
//       name: 'highlight',
//       args: {
//         width: 2,
//         blur: 3,
//         opacity: 0.2,
//         color: themeConfig.primaryColor
//       },
//     });
//
//     graph.defineFilter({
//       id: 'sub-topic-hover-shadow',
//       name: 'dropShadow',
//       args: {
//         dx: 0,
//         dy: 0,
//         blur: 2,
//         opacity: 0.7,
//         color: themeConfig.primaryColor
//       },
//     });
//
//
//     // graph.on('node:added', ({node}: { node: CollapsedRect }) => {
//     //   console.log('node:added');
//     // })
//
//     graph.on('topic:collapse', ({node}: { node: CollapsedRect }) => {
//       node.toggleExpanded();
//     })
//
//     // 全局事件处理
//     // graph.container.addEventListener('mouseover', (e)=>{
//     //   const target = e.target as SVGElement;
//     //   const hoverable = target.getAttribute('hoverable');
//     //   if(hoverable){
//     //     target.setAttribute('filter', hoverable);
//     //   }
//     // })
//     //
//     // graph.container.addEventListener('mouseout', (e)=>{
//     //   const target = e.target as SVGElement;
//     //   const hoverable = target.getAttribute('hoverable');
//     //   if(hoverable){
//     //     target.setAttribute('filter', 'none');
//     //   }
//     // })
//     graph.on('node:mouseenter', ({node, e})=>{
//       const label = node.label;
//       setTooltip({
//         label: label,
//         triggerNode: e.target,
//         key: StringExt.uuid()
//       });
//     })
//     graph.on('node:mouseleave', ({node})=>{
//       setTooltip(undefined);
//     })
//     graph.on('node:mouseover', ({e, node}) => {
//       const target = e.target as SVGElement;
//       const hoverable = target.getAttribute('hoverable');
//       if (hoverable === 'true') {
//         (node as unknown as IHoverActiveNode).onMouseOver?.();
//       }
//     })
//
//     graph.on('node:mouseout', ({e, node}) => {
//       const target = e.target as SVGElement;
//       const hoverable = target.getAttribute('hoverable');
//       if (hoverable === 'true') {
//         (node as unknown as IHoverActiveNode).onMouseOut?.();
//       }
//     })
//
//     graph.on('topic:click', (eventArg: NodeView.EventArgs['node:click']) => {
//       const {node} = eventArg;
//       const id = node.id;
//       const nodeRef = $nodeRef.current?.[id];
//       clickListener.current?.({
//         parents: nodeRef?.parents || [],
//         children: nodeRef?.children || [],
//         eventArg,
//       });
//     });
//
//     initGraphWithTreeData();
//     graph.zoomToFit({padding: 10, maxScale: 1}); // zommToFit 方法使用
//
//     return () => {
//       graph.dispose(true);
//     }
//   }, []);
//
//   const register = useCallback((config: ReactShapeConfig) => {
//     globalRegister(config, graphScope);
//   }, []);
//
//   const unRegister = useCallback((shape: string) => {
//     globalUnRegister(shape, graphScope);
//   }, []);
//
//   const getGraph = useCallback(() => graphRef.current, []);
//
//   const getTriggerDOMNode = useMemoizedFn(()=>{
//     return tooltip?.triggerNode;
//   });
//
//
//   const GraphView = useMemo(() => {
//     console.log(tooltip); // TODO  children 需要强制更新，触发 ref 操作。
//     return (
//       <>
//         {portals}
//         <div ref={graphContainerRef} className={'graph-root'} style={{width: '100%', height: 600}}/>
//         <Tooltip title={tooltip?.label} open={!!tooltip} getTriggerDOMNode={getTriggerDOMNode}>
//           <span key={tooltip?.key || '1'}/>
//         </Tooltip>
//       </>
//     )
//   }, [portals, tooltip]);
//
//
//   return {
//     GraphView,
//     register,
//     unRegister,
//     getGraph
//   }
// }


function createGraphContainer() {
  const el = document.createElement('div');
  el.className = 'graph-root';
  return el;
}

export function useGraph(graphConfig: BaseTreeGraphProps) {
  const {onNodeClick, treeData, graph: graphOptions, theme, nodeConfig, width = '100%', height = '100%'} = graphConfig;
  const fragmentRef = useRef<HTMLDivElement>(null);

  const {portals, connect, disconnect} = usePortal();

  const $nodeRef = useRef<RefMap>(undefined);
  const themeConfig = useRef(getTheme(theme)).current;

  const clickListener = useLatest(onNodeClick);
  const graphScope = useMemo(() => {
    return StringExt.uuid();
  }, []);

  const graph = useMemo(() => {
    // 创建的时候，元素 width 和 height 取的不对。 TODO 需要计算 width 和 height
    const graphContainer = createGraphContainer();
    const _graph_ = new Graph({
      ...graphOptions,
      // 画布拖拽
      panning: graphOptions?.panning ?? {
        enabled: true,
        eventTypes: ['leftMouseDown'],
      },
      container: graphContainer, // 渲染前设置容器
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
    _graph_.use(selectionPlugin);
    _graph_.id = graphScope;
    _graph_.portal = {
      connect,
      disconnect
    }

    // 定义 filter
    _graph_.defineFilter({
      id: 'topic-hover-shadow',
      name: 'highlight',
      args: {
        width: 2,
        blur: 3,
        opacity: 0.2,
        color: themeConfig.primaryColor
      },
    });

    _graph_.defineFilter({
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


    _graph_.on('topic:collapse', ({node}: { node: CollapsedRect }) => {
      node.toggleExpanded();
    })


    _graph_.on('node:mouseover', ({e, node}) => {
      const target = e.target as SVGElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        (node as unknown as IHoverActiveNode).onMouseOver?.();
      }
    })

    _graph_.on('node:mouseout', ({e, node}) => {
      const target = e.target as SVGElement;
      const hoverable = target.getAttribute('hoverable');
      if (hoverable === 'true') {
        (node as unknown as IHoverActiveNode).onMouseOut?.();
      }
    })

    _graph_.on('topic:click', (eventArg: NodeView.EventArgs['node:click']) => {
      const {node} = eventArg;
      const id = node.id;
      const nodeRef = $nodeRef.current?.[id];
      clickListener.current?.({
        parents: nodeRef?.parents || [],
        children: nodeRef?.children || [],
        eventArg,
      });
    });


    return _graph_;
  }, []);

  const initGraphWithTreeData = useMemoizedFn(() => {
    if (treeData) {
      const {cells, $ref} = toHierarchyCells(treeData, graphScope, {
        themeConfig,
        nodeConfig
      });
      $nodeRef.current = $ref;
      graph.model.getLastCell()?.removeZIndex();
      graph.resetCells(cells);
    }
  });

  useEffect(() => {
    fragmentRef.current!.append(graph.container);
    const width = fragmentRef.current?.clientWidth;
    const height = fragmentRef.current?.clientHeight;
    graph.resize(width, height); // 重新计算宽高
    return () => {
      graph.dispose(true);
    }
  }, []);

  useEffect(() => {

    initGraphWithTreeData();
    graph.zoomToFit({padding: 10, maxScale: 1});
  }, [treeData]);


  const register = useCallback((config: ReactShapeConfig) => {
    globalRegister(config, graphScope);
  }, []);

  const unRegister = useCallback((shape: string) => {
    globalUnRegister(shape, graphScope);
  }, []);

  const getGraph = useCallback(() => graph, []);

  const GraphView = useMemo(() => {
    return (
      <>
        {portals}
        <div ref={fragmentRef} style={{width: width, height: height, position: 'relative'}}/>
        <NodeTooltip graph={graph}/>
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
