import Hierarchy from '@antv/hierarchy';
import {HierarchyResult, MindMapData, NodeConfig, ThemeConfig} from "../types";
import {traverse} from "./traverse";
import {getNodeHeight, getNodeWidth} from "./dimension";


export function toHierarchyCells(data: MindMapData, graphScope: string, configs: {
  nodeConfig?: NodeConfig;
  themeConfig: ThemeConfig;
}) {
  const nodeConfig = configs?.nodeConfig;
  const themeConfig = configs?.themeConfig;
  const result = Hierarchy.mindmap(data, {
    direction: 'H',
    getHeight(d: MindMapData) {
      return getNodeHeight(d, themeConfig, nodeConfig, graphScope);
    },
    getWidth(d: MindMapData) {
      return getNodeWidth(d, themeConfig, nodeConfig, graphScope); // 需要修改节点的 width
    },
    getHGap() {
      return 40
    },
    getVGap() {
      return 20
    },
    getSide: () => {
      return 'right'
    },
  }) as HierarchyResult;
  return traverse(result, themeConfig);
}
