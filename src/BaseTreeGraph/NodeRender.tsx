import {Graph, Node} from '@antv/x6';

export default function NodeRender(
  {
    node,
    graph
  }: {
    node: Node;
    graph: Graph;
  }) {
  const render = node.getProp('render');
  if (render) {
    return render({
      node,
      graph
    });
  }
  return <div>not found render</div>;
}
