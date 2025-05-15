import type {Graph, Node} from "@antv/x6";
import type React from "react";


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
