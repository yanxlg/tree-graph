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
import {useVersionStyle} from "./styles";

export const Downstream = (
  {
    depth,
    versionClassName,
    event
  }: {
    depth: number;
    versionClassName: string;
    event: EventData;
  }) => {
  const downstream = event.downstream;
  const {styles, cx} = useVersionStyle();

  const nextDepth = depth < 0 ? depth - 1 : depth + 1;

  const position = nextDepth < 0 ? Position.Left : Position.Right;

  if (!downstream || downstream.length === 0) {
    return null;
  }

  // 只有 1 个版本，
  if (downstream.length === 1) {
    const _downstream = downstream[0];
    const {version = '-', status = '-',displayType} = _downstream;
    return (
      <>
        <Connector
          node={event}
          handleType={'source'}
          nextDepth={nextDepth}
          relation={_downstream}
          position={position}
          handleKey={getHandleKey(event, 'output', _downstream)}
        />
        <div className={cx(versionClassName, {
          [styles.danger]: displayType === 'danger'
        })}>
          Version：{version}({status})
        </div>
      </>
    )
  }
  return downstream.map((_downstream, index) => {
    const {version = '-', status = '-',displayType} = _downstream;
    return (
      <div
        key={index}
        className={cx(versionClassName, {
          [styles.danger]: displayType === 'danger'
        })}>
        Version：{version}({status})
        <Connector
          node={event}
          handleType={'source'}
          nextDepth={nextDepth}
          relation={_downstream}
          position={position}
          handleKey={getHandleKey(event, 'output', _downstream)}
        />
      </div>
    )
  })
}
