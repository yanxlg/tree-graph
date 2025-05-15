import {Graph, Node} from '@antv/x6';

export default function NodeRender(
  {
    node,
    graph
  }: {
    node: Node;
    graph: Graph;
  }) {
  console.log(node, graph); // node 是节点的配置
  return <div>1111</div>;
}
