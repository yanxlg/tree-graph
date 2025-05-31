import {Cell, Graph, Node, Options} from "@antv/x6";
import type React from "react";
import {NodeView} from "@antv/x6/src/view/node";

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

export type LayoutType = 'compactBox' | 'mindmap';

// 扩展内置属性
declare module '@antv/x6' {
  namespace Node {
    interface Definition {
      getNodeHeight?: (meta: HierarchyNode, graph: Graph) => number;
    }
  }

  // Node 扩展方法
  interface Node {
    onMouseEnter(): void;

    onMouseLeave(): void;

    getTooltip(): string | undefined;
  }

  interface Graph {
    id?: string;
    portal?: {
      disconnect: (id: string) => void;
      connect: (id: string, portal: React.ReactPortal) => void;
    }
    /**
     * 扩展 Graph Tooltip api
     */
    showTooltip: (target: HTMLElement, title: string) => void;
    hideTooltip: () => void;

    strategy: BaseTreeGraphProps['strategy'];
    layoutType: LayoutType;
    theme: ThemeConfig; // 主题配置注入
    nodeConfig?: NodeConfig; // 节点配置注入
    layoutOptionsUtil: LayoutOptionsUtil;
    collapse: (node: Cell) => void; // 折叠
    expand: (node: Cell) => (Promise<void> | void) // 展开，展开支持异步
  }
}

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


export type HierarchyNode = {
  id?: string;
  type: string; // 节点视图类型
  collapsed?: boolean; // 折叠状态控制
  label: string;
  height?: number;
  width?: number | 'auto'; // 自动计算宽度，仅简单节点支持通过 label 自动计算宽度
  minWidth?: number;
  maxWidth?: number;
  children?: HierarchyNode[];
  [key: string]: any;
}


export type MindMapData = NodeConfig & {
  id: string; // 需要唯一 id，否则不好增量更新
  type: 'topic' | 'topic-branch' | 'topic-child';
  label: string;
  children?: MindMapData[];
  childCount?: number; // 外部传入的 count数量
  collapsed?: boolean; // 控制折叠状态
  level?: 'link'; // 显示为link样式
};

export interface HierarchyResult extends MindMapData {
  id: string
  x: number
  y: number
  data: MindMapData;
  children?: HierarchyResult[];
  height: number;
  width: number;
  parent?: HierarchyResult;
}

export type NodeConfig = {
  /**
   * @description 节点默认宽度，当节点数据中未配置宽度时，使用全局默认宽度，不配置则使用对应节点类型内置的宽度
   */
  width?: number | 'auto'; // TODO 并不是所有节点都支持 auto 选项，只有简单的节点才支持 auto 自动计算宽度。根据 label 值进行计算

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
   * @description 是否自动溢出显示，溢出配置后会自动 Tooltip 显示完整内容。
   */
  ellipsis?: boolean | 'multiLine';
}

export type LayoutOptionsUtil = {
  getHeight: (graph: Graph, node: HierarchyNode) => number;
  getWidth: (graph: Graph, node: HierarchyNode) => number;
  getHGap: (graph: Graph, node: HierarchyNode) => number;
  getVGap: (graph: Graph, node: HierarchyNode) => number;
  getPreH: (graph: Graph, node: HierarchyNode) => number;
  getPreV: (graph: Graph, node: HierarchyNode) => number;
  getSide: (graph: Graph, node: HierarchyNode, index: number) => 'left' | 'right';
  getChildren: (graph: Graph, node: HierarchyNode) => HierarchyNode[] | undefined;
};


export type BaseTreeGraphProps = {
  /**
   * @description graph 宽度
   */
  width?: string | number;

  /**
   * @description graph 高度
   */
  height?: string | number;

  /**
   * @description 布局方式
   * @default 'mindmap'
   */
  layoutType?: LayoutType;
  /**
   * @description graph配置
   */
  graph?: {
    autoResize?: boolean;
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
  root: MindMapData;

  /**
   * 渲染策略，不同的策略
   */
  strategy?: 'cache-diff' | 'cache-all' | 'cache-control' | 'dynamic-calc';

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

  layoutOptionsUtil?: 'default' | 'with-group' | LayoutOptionsUtil;

  showPopover?: (node: Cell) => boolean; // 是否显示 popover, 节点 hover时是否显示对应的 popover

  PopoverComponent?: React.ComponentType<{ node: Cell }>; // popover 组件
};


export type BloodlineEvent = {
  id: string;
  type: 'event';
  name: string; // 事件名称，用来描述事件类型
  color: string; // 颜色
  label: string;
  descriptions?: string[];
  children?: BloodlineEvents;
  collapsed?: boolean;
}

export type BloodlineGroup = HierarchyNode & {
  type: 'event-group';
  dispatch: string; // 连线
  children: Array<BloodlineEvent>;
}


export type BloodlineEvents = Array<BloodlineGroup>;

export type BloodlineRoot = Omit<HierarchyNode, 'children'> & {
  upstream?: BloodlineGroup[];
  downstream?: BloodlineGroup[];
};

export type BloodlineGraphProps = {
  height?: number;
  root: BloodlineRoot;
}

export type TooltipState = {
  show: boolean;
  title?: string;
  target?: HTMLElement;
}

export type PopoverState = {
  show: boolean;
  content?: React.ReactNode;
  target?: HTMLElement;
}

export interface ICollapseNode {
  isCollapsed: () => boolean;
  toggleCollapsed: () => void;
}
