/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:22
 * @desc: 类型定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Node, Edge} from "@xyflow/react";


export type HandleStoreMap = {
  [key: string]: {
    loading?: boolean;
    collapsed?: boolean;
    nextDepth: number;
    items?: EventGroupData[]
  }
}

export type EventRelation = {
  count?: number;
}

export type EventData = {
  id: string;
  depth: number;
  title: string;
  type: string;

  /**
   * 上游节点数量
   */
  upstream?: EventRelation;
  /**
   * 版本列表
   */
  downstream?: Array<EventRelation & { version: string; }>;
  /**
   * 颜色配置
   */
  color?: string;

  dispatch?: string;
}

export type EventGroupData = {
  id: string;
  depth: number;
  title: string;
  type: string;
  /**
   * 颜色配置
   */
  color?: string;
  events: EventData[];

  dispatch?: string;
}


export type EventNodeType = Node<EventData>

export type EventGroupNodeType = Node<EventGroupData>

export type NodeType = EventNodeType | EventGroupNodeType;

export type EdgeType = Edge<{
  depth: number;
}>;

export type CollapseButtonProps = {
  position: 'left' | 'right';
  relation: EventRelation;
  handleKey: string;
  nextDepth: number;
}


export type GraphProps = {
  /**
   * 加载上游依赖列表
   */
  getUpstream: (depth: number,) => Promise<EventGroupData[]>;
  /**
   * 加载下游依赖列表
   */
  getDownstream: (depth: number,) => Promise<EventGroupData[]>;

  getChildren: () => Promise<{
    total: number;
    list: EventData[]
  }>
}
