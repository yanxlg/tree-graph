import Hierarchy, {TreeNode} from '@antv/hierarchy';
import {BaseTreeGraphProps, HierarchyResult, MindMapData, NodeConfig, ThemeConfig} from "../types";
import {getNodeHeight, getNodeWidth} from "./dimension";
import {Graph} from "@antv/x6";
import {getDefaultCollapsed} from "./node";


export function getLayouts(
  data: MindMapData,
  graph: Graph,
  configs: {
    nodeConfig?: NodeConfig;
    themeConfig: ThemeConfig;
  },
  strategy: BaseTreeGraphProps['strategy'],
) {
  const nodeConfig = configs?.nodeConfig;
  const themeConfig = configs?.themeConfig;
  // 隐藏的需要过滤掉，不创建
  const root = Hierarchy.mindmap(data as TreeNode<MindMapData>, {
    direction: 'H',
    getHeight(d: MindMapData) {
      return getNodeHeight(d, themeConfig, nodeConfig, graph.id);
    },
    getWidth(d: MindMapData) {
      return getNodeWidth(d, themeConfig, nodeConfig, graph.id); // 需要修改节点的 width
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
    getChildren: (data) => {
      const collapsed = getDefaultCollapsed(data); // 默认收起
      if (strategy === 'dynamic-calc') {
        // 动态计算，折叠的节点
        if (collapsed) {
          return [];
        }
        return data.children;
      }
      return data.children;
    }
  }) as HierarchyResult;
  return root;
}
