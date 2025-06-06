/*
 * @author: yanxianliang
 * @date: 2025-06-02 15:07
 * @desc: 上游节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {EventData} from "../../types";
import {Position} from "@xyflow/react";
import React from "react";
import {Connector} from "./Connector";
import {getHandleKey} from "../../utils/keys";

export const Upstream = (
  {
    depth,
    event
  }: {
    depth: number;
    event: EventData;
  }) => {
  return !event.upstream ? null :
    <Connector
      node={event}
      handleType={'source'}
      handleKey={getHandleKey(event, 'input')}
      position={Position.Left}
      nextDepth={depth - 1}
      relation={event.upstream}
    />
}
