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
  hasChildren?: boolean; // hasChildren === false 则不显示下游展开
}

export type DownStreamItem = {
  code: string;
  /**
   * 版本
   */
  version: string;
  /**
   * 小版本号
   */
  miniVersion?: string;
  /**
   * 状态
   */
  status: string;
  /**
   * 显示类型
   */
  displayType?: string;
  /**
   * key，未设置会通过版本生成
   */
  key?: string
  id?: string;
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
  downstream?: Array<EventRelation & DownStreamItem>;
  /**
   * 颜色配置
   */
  color?: string;

  $store: {
    expanded: boolean;
    handleMap: {
      [handleKey: string]: {
        loading?: boolean;
        collapsed?: boolean;
        items?: Array<Omit<EventGroupData, '$store'>>;
        hasRelations?: boolean;
      }
    }
  };

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

  $store: {
    expanded: boolean;
    handleMap: {
      [handleKey: string]: {
        loading?: boolean;
        collapsed?: boolean;
        items?: Array<EventGroupData>;
        hasRelations?: boolean;
      }
    }
  };

  [key: string]: any;
}


export type EventNodeType = Node<EventData>

export type EventGroupNodeType = Node<EventGroupData>

export type NodeType = (EventNodeType | EventGroupNodeType) & {
  edge?: EdgeType;
};

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
  PopoverComponent: React.ComponentType<{ id?: string; title: string; code: string }>;
  root?: EventData;
  showLegend?: boolean;
  getRelation: (nextDepth: number, direction: 'down' | 'up', from: EventData, child: EventRelation) => Promise<Array<Omit<EventGroupData, '$store'>>>,
  getChildren: (data: EventGroupData, pageSize: number, pageNum: number) => Promise<{
    total: number;
    list: Array<Omit<EventData, '$store'>>
  }>
}
