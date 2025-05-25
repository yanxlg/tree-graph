/*
 * @author: yanxianliang
 * @date: 2025-05-22 21:18
 * @desc: 数据血缘
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {BloodlineGraphProps} from "@gx6/tree-graph";
import {useGraph} from "../BaseTreeGraph/hooks/useGraph";
import "../BaseTreeGraph/nodeTypes/Event";

export default function BloodlineGraph(props: BloodlineGraphProps) {
  const {GraphView, register, unRegister, getGraph} = useGraph(props);

  return GraphView;
}
