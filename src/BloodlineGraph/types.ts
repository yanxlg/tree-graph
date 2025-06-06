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
    hasRelations: boolean; // 如果是 false 则隐藏展开节点
    loading?: boolean;
    items?: EventGroupData[];
    collapsed?: boolean;
    nextDepth: number;
  }
}

export type EventRelation = {
  count?: number;
}

export type EventData = {
  id: string;
  depth: number;
  title: string;
  /**
   * 血缘类型
   */
  type: string;
  /**
   * 血缘类型名称
   */
  typeLabel: string;

  /**
   * 上游节点数量
   */
  upstream?: EventRelation;
  /**
   * 版本列表
   */
  downstream?: Array<EventRelation & { version: string; status: string; displayType?: string}>;
  /**
   * 颜色配置
   */
  color?: string;

  [key: string]: any;
}

export type EventGroupData = {
  depth: number;
  title: string;
  /**
   * 血缘类型
   */
  type: string;
  /**
   * 血缘类型名称
   */
  typeLabel: string;

  totalCount: number; // 总个数
  /**
   * 颜色配置
   */
  color?: string;

  /**
   * edge 显示的 label
   */
  edgeLabel: string;
  /**
   * edge is danger
   */
  edgeType?: 'danger';

  [key: string]: any;
}


export type EventNodeType = Node<EventData>

export type EventGroupNodeType = Node<EventGroupData>

export type NodeType = EventNodeType | EventGroupNodeType;

export type EdgeType = Edge<{
  depth: number;
}>;

export type CollapseButtonProps = {
  node: EventData;
  position: 'left' | 'right';
  relation: EventRelation;
  handleKey: string;
  nextDepth: number;
}

// 分层工具节点
export type DepthToolbarData = {
  depth: number;
  count: number;
}


export type GraphProps = {
  PopoverComponent: React.ComponentType<{ id: string; title: string }>;
  root?: EventData;
  showLegend?: boolean;
  getRelation: (nextDepth: number, direction: 'down' | 'up', from: EventData, child: EventRelation) => Promise<EventGroupData[]>,
  getChildren: (data: EventGroupData, pageSize: number, pageNum: number) => Promise<{
    total: number;
    list: EventData[]
  }>
}
