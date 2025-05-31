---
title: 基础TreeGraph组件
group: 组件
---

## 使用场景

当需要使用简单的树视图来描述数据关联关系时，使用 BaseTreeGraph 能够快速构建基础的树状节点视图。

## 使用示例

<code src="./demos/basic/index.tsx"></code>
<code src="./demos/autoWidth/index.tsx"></code>
<code src="./demos/singleLineEllipsis/index.tsx"></code>
<code src="./demos/multiLineEllipsis/index.tsx"></code>

## 文档

|   属性   |                     类型                     |     描述      |   必填   |   默认值    |
|:------:|:------------------------------------------:|:-----------:|:------:|:--------:|
| width  |             `string \| number`             |  graph 宽度   | false  | `'100%'` |
| height |             `string \| number`             |  graph 高度   | false  | `'100%'` |
| graph  |        [GraphConfig](#GraphConfig)         | graph 初始化配置 | false  |   `--`   |
| theme  |        [ThemeConfig](#ThemeConfig)         |  主题配置 | false  |   `--`   |
| root  |           [TreeItem](#TreeItem)            |  树结构数据源 | `(必选)` |   `--`   |
| nodeConfig  |         [NodeConfig](#NodeConfig)          |  节点默认参数配置 | false  |   `--`   |
| onNodeClick  | (eventData: [NodeClickEventData](#NodeClickEventData))=>void |  节点点击回调 | false  |   `--`   |


### GraphConfig
|     属性      |      类型       |           描述           |  必填   |     默认值     |
|:-----------:|:-------------:|:----------------------:|:-----:|:-----------:|
| background  |   `string`    |       graph 背景色        | false | `'#F2F7FA'` |
|    grid     |   `boolean`   |    graph 开启 grid模式     | false |   `false`   |
|   panning   |   `boolean`   |   graph 是否开启 panning   | false |   `true`    |
| interacting | `boolean` | graph 是否开启 interacting | false |   `false`   |
|   virtual   |  `boolean`   | graph 是否开启 virtual 模式  | false |   `true`    |
| autoResize  |  `boolean`   |     graph 是否自动调整大小     | false |   `true`    |


### ThemeConfig
|   属性   |      类型       |           描述           |  必填   |   默认值   |
|:------:|:-------------:|:----------------------:|:-----:|:-------:|
| fontSize  |   `number`    |      字体大小配置        | false |  `14`   |
| fontFamily |   `string`   |   字体家族配置     | false | `"Arial, helvetica, sans-serif"` |
| primaryColor  |   `string`   |   主题色   | false | `"#5F95FF"`  |


### TreeItem
|   属性   |                            类型                            |                      描述                      |   必填   |     默认值     |
|:------:|:--------------------------------------------------------:|:--------------------------------------------:|:------:|:-----------:|
| id  |                         `string`                         |                    唯一 id                     | `(必选)` |    `--`     |
| type | `'topic'`\|<br/> `'topic-branch'`\|<br/> `'topic-child'` |                     节点类型                     | `(必选)` |    `--`     |
| label  |                         `string`                         |                    节点显示文案                    | `(必选)` | `--` |
| childCount  |                         `number`                         |        显示的子节点数，不配置会自动计算`children`的长度         | false  | `--` |
| collapsed  |                        `boolean`                         | 节点折叠状态，默认仅显示根节点，其它节点都被隐藏，<br/>可通过该属性配置哪些节点展开 |  true  | `--` |
| children  |               Array<[TreeItem](#TreeItem)>               |                    子节点列表                     | false  | `--` |
| level | `link` | 节点使用超链接样式显示 | false | false |

### NodeConfig
|   属性   |          类型          |                                   描述                                    |  必填   | 默认值  |
|:------:|:--------------------:|:-----------------------------------------------------------------------:|:-----:|:----:|
| width  | `number` \| `"auto"` |           节点默认宽度，当节点数据中未配置宽度时，使用全局默认宽度，<br/>不配置则使用对应节点类型内置的宽度           | false | `--` |
| height |       `number`       |            节点高度，当节点数据中未配置宽度时，使用全局默认宽度，<br/>不配置则使用对应节点类型内置的宽度            | false | `--` |
| minWidth  |       `number`       |                                 最小宽度限制                                  | false | `--` |
| maxWidth  |       `number`       |                                 最大宽度限制                                  | false | `--` |
| ellipsis  |    `boolean` \| `"multiLine"`     | 是否自动溢出显示，溢出配置后会自动 Tooltip 显示完整内容。<br/>配置为`true`仅显示一行文本，`multiLine`根据高度显示多行文本 | false | `--` |


### NodeClickEventData
|   属性   |                                 类型                                  |      描述       |  必填   | 默认值  |
|:------:|:-------------------------------------------------------------------:|:-------------:|:-----:|:----:|
| parents  |                    Array<[TreeItem](#TreeItem)>                     |     父节点列表     | `(必选)` | `[]` |
| children |                    Array<[TreeItem](#TreeItem)>                     |     子节点列表     | `(必选)` | `[]` |
| eventArg  |                  NodeView.EventArgs['node:click']                   | 点击事件 event 属性 | `(必选)` |  |

