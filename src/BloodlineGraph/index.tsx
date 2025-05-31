/*
 * @author: yanxianliang
 * @date: 2025-05-22 21:18
 * @desc: 数据血缘
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {BloodlineGraphProps} from "@gx6/tree-graph";
import {useGraph} from "../BaseTreeGraph/hooks/useGraph";

export default function BloodlineGraph(props: Exclude<BloodlineGraphProps, 'layoutType'>) {
  const {GraphView, register, unRegister} = useGraph({
    ...props,
    layoutType: 'compactBox',
    layoutOptionsUtil: 'with-group'
  } as any);

  return GraphView;
}
