import Hierarchy from '@antv/hierarchy';
import {HierarchyNode, HierarchyResult} from "../types";
import {Graph} from "@antv/x6";


export function getLayoutInfo(
  root: HierarchyNode,
  graph: Graph,
) {
  const {layoutOptionsUtil} = graph;
  const layoutType = graph.layoutType;
  // root.isRoot = true; // 标记根节点
  // root 需要处理 左右分隔
  // if ('downstream' in root || 'upstream' in root) {
  //   const {downstream = [], upstream = []} = root;
  //   root.children = [
  //     ...root.children || [],
  //     ...downstream.map((child: any) => ({...child, layoutSide: 'left'})),
  //     ...upstream || []
  //   ]
  //   delete root.downstream;
  //   delete root.upstream;
  // }

  return Hierarchy[layoutType](root, {
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
    getPreH(node){
      return layoutOptionsUtil.getPreH(graph, node);
    },
    getPreV(node){
      return layoutOptionsUtil.getPreV(graph, node);
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
