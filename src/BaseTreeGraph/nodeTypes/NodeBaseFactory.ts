/*
 * @author: yanxianliang
 * @date: 2025-05-16 19:21
 * @desc: 构建继承基类
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Cell, Shape} from '@antv/x6';

type BaseNodeClass = (...args: ConstructorParameters<typeof Cell>)=>Cell;

export const createNodeBaseClass = <T extends BaseNodeClass>(superClass: T)=>{
}
