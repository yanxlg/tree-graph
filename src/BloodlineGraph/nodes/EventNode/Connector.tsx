/*
 * @author: yanxianliang
 * @date: 2025-06-02 15:14
 * @desc: 上下游链接器
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {EventData, EventRelation} from "../../types";
import {Handle, Position} from "@xyflow/react";
import {CollapseButton} from "./CollapseButton";
import React from "react";
import {useConnectorStyles} from "./styles";

export const Connector = (
  {
    nextDepth,
    relation,
    position,
    handleKey,
    handleType,
    node
  }: {
    nextDepth: number;
    relation: EventRelation;
    position: 'left' | 'right';
    handleKey: string;
    handleType: 'source' | 'target';
    node: EventData;
  }) => {
  const {styles} = useConnectorStyles();
  const count = relation.count; // 需要同步更新到 relation 信息中
  if (count === 0) {
    return null;
  }
  return (
    <>
      <Handle className={styles.handle} type={handleType} position={position as Position} id={handleKey}/>
      <CollapseButton
        node={node}
        nextDepth={nextDepth}
        handleKey={handleKey}
        position={position}
        relation={relation}
      />
    </>
  )
}
