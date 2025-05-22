/*
 * @author: yanxianliang
 * @date: 2025-05-21 21:12
 * @desc: useGraphInstance
 *
 * 创建 graph 实例
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {Graph} from "@antv/x6";
import {BaseTreeGraphProps} from "@shuhe/tree-graph";
import {useMemo} from "react";
import {StringExt} from "@antv/x6-common";
import {usePortal} from "../react-shape";

function createGraphContainer() {
  const el = document.createElement('div');
  el.className = 'graph-root';
  return el;
}

export const useGraphInstance = (
  graphOptions: BaseTreeGraphProps['graph'],
) => {
  const {portals, connect, disconnect} = usePortal();

  const instance = useMemo(() => {
    const id = StringExt.uuid();
    const graphContainer = createGraphContainer();
    const instance = new Graph({
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
    instance.id = id;
    instance.portal = {
      connect,
      disconnect
    }
    return instance;
  }, []);

  return {
    portals,
    graph: instance
  }
}
