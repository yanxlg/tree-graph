// @ts-ignore
import Hierarchy from '@antv/hierarchy';
import {HierarchyResult, MindMapData} from "../types";
import {traverse} from "./traverse";


export function toHierarchyCells(data: MindMapData){
  const result: HierarchyResult = Hierarchy.mindmap(data, {
    direction: 'H',
    getHeight(d: MindMapData) {
      return d.height;
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
