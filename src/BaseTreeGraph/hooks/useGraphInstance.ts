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
import {BaseTreeGraphProps, NodeConfig, ThemeConfig, TooltipState} from "@gx6/tree-graph";
import {useMemo, useState} from "react";
import {StringExt} from "@antv/x6-common";
import {usePortal} from "../react-shape";
import {getLayoutOptions} from "../utils/getLayoutOptions";

function createGraphContainer() {
  const el = document.createElement('div');
  el.className = 'graph-root';
  return el;
}

export const useGraphInstance = (
  config: {
    graph: BaseTreeGraphProps['graph'];
    nodeConfig?: NodeConfig;
    theme: ThemeConfig;
    strategy: BaseTreeGraphProps['strategy'];
    layoutOptionsUtil: Exclude<BaseTreeGraphProps['layoutOptionsUtil'], undefined>;
  },
) => {
  const {graph: graphOptions, nodeConfig, theme, strategy, layoutOptionsUtil} = config;
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
    instance.strategy = strategy;
    instance.theme = theme;
    instance.nodeConfig = nodeConfig;
    instance.layoutOptionsUtil = getLayoutOptions(layoutOptionsUtil);

    instance.showTooltip = (target: HTMLElement, title: string) => {
      setTooltip({
        title: title,
        target
      })
    }

    instance.hideTooltip = () => {
      setTooltip(undefined);
    }

    instance.on('node:mouseenter', ({e, node}) => {
      const target = e.target as HTMLElement;
      node.onMouseEnter?.();
      const tooltip = node.getTooltip?.();
      if (tooltip) {
        setTooltip({
          title: tooltip,
          target,
        });
      }
    })

    instance.on('node:mouseleave', ({node}) => {
      node.onMouseLeave?.();
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
