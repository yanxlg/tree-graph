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

export type MindMapData = NodeConfig & {
  id: string; // 需要唯一 id，否则不好增量更新
  type: 'topic' | 'topic-branch' | 'topic-child';
  label: string;
  children?: MindMapData[];
  expanded?: boolean; // 控制默认展开状态
};

export interface HierarchyResult extends MindMapData {
  id: string
  x: number
  y: number
  data: MindMapData;
  children?: HierarchyResult[];
  height: number;
  width: number;
}

export type NodeConfig = {
  /**
   * @description 节点默认宽度，当节点数据中未配置宽度时，使用全局默认宽度，不配置则使用对应节点类型内置的宽度
   */
  width?: number | 'auto';

  /**
   * @description 节点高度，当节点数据中未配置宽度时，使用全局默认宽度，不配置则使用对应节点类型内置的宽度
   */
  height?: number;
  /**
   * @description 最小宽度限制
   */
  minWidth?: number;
  /**
   * @description 最大宽度限制
   */
  maxWidth?: number;

  /**
   * @description 是否自动溢出显示，溢出配置后会自动 Tooltip 显示完整内容。自动计算？？？
   */
  ellipsis?: boolean;
}

export type ThemeConfig = {
  /**
   * @description 字体大小配置
   * @default 14
   */
  fontSize?: number;
  /**
   * @description 字体家族配置
   * @default "Arial, helvetica, sans-serif"
   */
  fontFamily?: string;

  /**
   * @description 主题色
   * @default "#5F95FF"
   */
  primaryColor?: string;
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
  theme?: ThemeConfig;
  /**
   * @description 树结构数据源
   */
  treeData: MindMapData;

  /**
   * @description 节点默认参数配置
   */
  nodeConfig?: NodeConfig;
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
