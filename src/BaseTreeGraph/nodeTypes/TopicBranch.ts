/*
 * @author: yanxianliang
 * @date: 2025-05-17 14:07
 * @desc: topic branch node 定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {TopicNode} from "./Topic";
import {Graph} from "@antv/x6";
import {merge} from "lodash";

class TopicBranchNode extends TopicNode {
  static defaults =
    merge({}, TopicNode.defaults, {
      size: {width: 100, height: 40},
    })
}

Graph.registerNode('topic-branch', TopicBranchNode, true);
