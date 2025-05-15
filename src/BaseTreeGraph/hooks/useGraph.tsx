import {useCallback, useEffect, useMemo, useRef} from "react";
import {Graph} from "@antv/x6";
import {useProtal, register as globalRegister, unRegister as globalUnRegister, ReactShapeConfig} from "../react-shape";
import {v4 as uuidv4} from 'uuid';


export function useGraph() {
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>(undefined);
  const {portals, connect, disconnect} = useProtal();

  const graphScope = useMemo(() => {
    return uuidv4();
  }, []);

  useEffect(() => {
    const graph = new Graph({
      container: graphContainerRef.current!, // 渲染前设置容器
      background: {
        color: '#F2F7FA',
      },
    });
    graph.id = graphScope; // 生成 id, 绑定 portal
    graph.portal = {
      connect,
      disconnect
    }
    graphRef.current = graph;

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

  const GraphView =  useMemo(()=>{
    return (
      <>
        {portals}
        <div ref={graphContainerRef} className={'graph-root'} style={{width: '100%', height: 600}}/>
      </>
    )
  },[portals]);


  return {
    GraphView,
    register,
    unRegister,
    getGraph
  }
}
