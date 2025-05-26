import Hierarchy from '@antv/hierarchy';
import {HierarchyNode, HierarchyResult} from "../types";
import {Graph} from "@antv/x6";


export function getLayoutInfo(
  data: HierarchyNode,
  graph: Graph,
) {

  const {layoutOptionsUtil} = graph;
  return Hierarchy.mindmap(data, {
    direction: 'H',
    getHeight(node) {
      return layoutOptionsUtil.getHeight(graph, node);
    },
    getWidth(node) {
      return layoutOptionsUtil.getWidth(graph, node);
    },
    getHGap(node) {
      return layoutOptionsUtil.getHGap(graph, node);
    },
    getVGap(node) {
      return layoutOptionsUtil.getVGap(graph, node);
    },
    getSide: (node, index) => {
      return layoutOptionsUtil.getSide(graph, node, index);
    },
    getChildren: (node) => {
      return layoutOptionsUtil.getChildren(graph, node);
    }
  }) as HierarchyResult;
}
