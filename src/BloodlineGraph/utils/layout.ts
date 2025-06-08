/*
 * @author: yanxianliang
 * @date: 2025-06-01 21:37
 * @desc: layout 布局
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {mindmapNodes} from "./hierarchy";
import {NodeType} from "../types";


export const layoutElements = (nodes: NodeType[]) => {
  return mindmapNodes(nodes)
};

