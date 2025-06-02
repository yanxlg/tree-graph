import {useCallback, useEffect, useMemo, useRef} from "react";
import {
  register as globalRegister,
  unRegister as globalUnRegister,
  ReactShapeConfig,
} from "../react-shape";
import {BaseTreeGraphProps} from "../types";
import {getTheme} from "../utils/theme";
import NodeTooltip from "../NodeTooltip";
import {useGraphInstance} from "./useGraphInstance";
import NodePopover from "../NodePopover";


export function useGraph(graphConfig: BaseTreeGraphProps) {
  const {
    graph: graphOptions,
    theme,
    nodeConfig,
    width = '100%',
    height = '100%',
    strategy = 'dynamic-calc',
    layoutOptionsUtil = 'default',
    layoutType = 'mindmap',
    showPopover,
    PopoverComponent,
  } = graphConfig;
  const fragmentRef = useRef<HTMLDivElement>(null);
  const themeConfig = useRef(getTheme(theme)).current;

  const {portals, graph, tooltip, popover} = useGraphInstance({
    graph: graphOptions,
    theme: themeConfig,
    nodeConfig,
    strategy,
    layoutOptionsUtil,
    layoutType,
    showPopover,
    PopoverComponent
  });

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


  const register = useCallback((config: ReactShapeConfig) => {
    globalRegister(config, graph.id);
  }, []);

  const unRegister = useCallback((shape: string) => {
    globalUnRegister(shape, graph.id);
  }, []);

  const GraphView = useMemo(() => {
    return (
      <>
        {portals}
        <div ref={fragmentRef} style={{width: width, height: height, position: 'relative'}}/>
        <NodeTooltip tooltip={tooltip}/>
        <NodePopover popover={popover}/>
      </>
    )
  }, [portals, tooltip, popover]);


  return {
    GraphView,
    register,
    unRegister,
    graph
  }
}
