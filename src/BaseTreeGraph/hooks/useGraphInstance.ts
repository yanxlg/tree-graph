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
import {BaseTreeGraphProps, IHoverActiveNode, IPopoverNode, TooltipState} from "@gx6/tree-graph";
import {useMemo, useState} from "react";
import {StringExt} from "@antv/x6-common";
import {usePortal} from "../react-shape";

declare module '@antv/x6' {

  interface Graph {
    /**
     * 扩展 Graph Tooltip api
     */
    showTooltip: (target: HTMLElement, title: string) => void;
    hideTooltip: () => void;
  }
}

function createGraphContainer() {
  const el = document.createElement('div');
  el.className = 'graph-root';
  return el;
}

export const useGraphInstance = (
  graphOptions: BaseTreeGraphProps['graph'],
) => {
  const {portals, connect, disconnect} = usePortal();
  const [tooltip, setTooltip] = useState<TooltipState>();

  const instance = useMemo(() => {
    const id = StringExt.uuid();
    const graphContainer = createGraphContainer();
    const instance = new Graph({
      ...graphOptions,
      // // 画布拖拽
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
      //  TODO配置会强制关闭tools，需要了解下原因
      interacting: graphOptions?.interacting ?? {
        nodeMovable: false,
        edgeMovable: false,
      },
    });
    instance.id = id;
    instance.portal = {
      connect,
      disconnect
    }



    // tooltip 逻辑，Popover 逻辑

    // 显示悬浮提示
    instance.showTooltip = (target: HTMLElement, title: string) => {
      setTooltip({
        title,
        target,
      });
    }
    instance.hideTooltip = () => {
      setTooltip(undefined);
    }


    instance.on('node:mouseenter', ({e, node}) => {
      const target = e.target as HTMLElement;
      (node as unknown as IHoverActiveNode).onMouseOver?.();
      const tooltip = (node as unknown as IPopoverNode).getTooltip?.();
      if (tooltip) {
        setTooltip({
          title: tooltip,
          target,
        });
      }
    })

    instance.on('node:mouseleave', ({node}) => {
      (node as unknown as IHoverActiveNode).onMouseOut?.();
      setTooltip(undefined);
    })

    return instance;
  }, []);

  return {
    portals,
    graph: instance,
    tooltip
  }
}
