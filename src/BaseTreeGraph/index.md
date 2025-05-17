---
title: 基础TreeGraph组件
group: 组件
---


## 使用场景

当需要使用简单的树视图来描述数据关联关系时，使用 BaseTreeGraph 能够快速构建基础的树状节点视图。

## 使用示例

<code src="./demos/basic/index.tsx"></code>

## 文档

<API id="BaseTreeGraph"></API>


增量更新优化策略：
graph.freeze();
diff.added.forEach(node => graph.addNode(node));
diff.removed.forEach(id => graph.removeNode(id));
graph.unfreeze();
