// @ts-ignore
import Hierarchy from '@antv/hierarchy';
import {HierarchyResult, MindMapData} from "../types";
import {traverse} from "./traverse";
import {getRegisteredNodeClass} from "../react-shape";
import {Node} from "@antv/x6";


export function toHierarchyCells(data: MindMapData, graphScope?: string) {
  const result: HierarchyResult = Hierarchy.mindmap(data, {
    direction: 'H',
    getHeight(d: MindMapData) {
      const {type} = d;
      const ctr = getRegisteredNodeClass(type, graphScope);
      // 取不同节点的默认值
      const defaults = ctr?.getDefaults() as Node.Defaults;
      return d.height ?? defaults?.size?.height;
    },
    getWidth(d: MindMapData) {
      return d.width; // TODO 需要支持自动计算宽度
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
  });
  return traverse(result);
}
