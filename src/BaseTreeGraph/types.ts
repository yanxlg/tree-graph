import {Graph, Node, Options} from "@antv/x6";
import type React from "react";
import {NodeView} from "@antv/x6/src/view/node";

export type NodeRenderProps = {
  node: Node;
  graph: Graph;
};

export type NodeRenderComponent = React.ComponentType<NodeRenderProps>;

export type NodeRenderNode = React.ReactElement<NodeRenderProps>;

export type GraphNode = {
  /**
   * 扩展的 shape，基于内置 shape 扩展为 业务场景中使用的 shape
   */
  shape: 'topic';
  /**
   * 节点内容直接使用组件定义，如有需要后续开放 markup 内置配置
   */
  component: NodeRenderComponent;
}

export type MindMapData = {
  id: string; // 需要唯一 id，否则不好增量更新
  type: 'topic' | 'topic-branch' | 'topic-child';
  label: string;
  width: number;
  /**
   * 节点高度，支持外部自定义，不同节点类型有不同的默认高度，通常不需要配置
   */
  height?: number;
  children?: MindMapData[];
  expanded?: boolean; // 控制默认展开状态
};

export interface HierarchyResult {
  id: string
  x: number
  y: number
  data: MindMapData;
  children?: HierarchyResult[]
}


export type BaseTreeGraphProps = {
  /**
   * @description graph配置
   */
  graph?: {
    background?: Options.Manual['background'];
    grid?: Options.Manual['grid'];
    panning?: boolean;
    interacting?: boolean;
    virtual?: boolean;
  };
  /**
   * @description 主题配置
   */
  theme?: {
    /**
     * @description 字体大小配置
     * @default 14px
     */
    fontSize?: number;
    /**
     * @description 字体家族配置
     * @default Arial, helvetica, sans-serif
     */
    fontFamily?: string;

    /**
     * @description 主题色
     * @default #5F95FF
     */
    primaryColor?: string;
  };
  /**
   * @description 树结构数据源
   */
  treeData: MindMapData;
  /**
   * @description 节点点击回调
   */
  onNodeClick?: (
    eventData: {
      parents: MindMapData[];
      children: MindMapData[];
      eventArg: NodeView.EventArgs['node:click']
    }) => void;
};


export type RefMap = {
  [id: string]: {
    parents: MindMapData[];
    children?: MindMapData[]
  }
};


export interface IHoverActiveNode {
  onMouseOver: () => void;
  onMouseOut: () => void;
}
