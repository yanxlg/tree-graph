/*
 * @author: yanxianliang
 * @date: 2025-05-16 23:10
 * @desc: selectable plugin
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

const {Selection} = require('@antv/x6-plugin-selection');

import {Graph} from '@antv/x6';

export const selectionPlugin: Graph.Plugin = new Selection();
