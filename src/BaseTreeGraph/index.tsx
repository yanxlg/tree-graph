import {register} from './react-shape';
import NodeRender from "./NodeRender";
import {useEffect} from "react";
import {useGraph} from './hooks/useGraph';


// 支持 svg 节点注册，svg性能会好些，没有 react 开销
// top 节点注册
register({
  shape: 'topic',
  width: 100,
  height: 100,
  component: NodeRender,
})


export default function BaseTreeGraph() {
  const {GraphView, register, unRegister, getGraph} = useGraph(); // 使用的地方直接使用一个hooks 即可

  useEffect(() => {
    const graph = getGraph()!;
    // for test code
    graph.addNode({
      shape: 'topic',
      x: 60,
      y: 100,
    });

    graph.zoomToFit({padding: 10, maxScale: 1}); // zommToFit 方法使用

    return () => {
      /**
       * 组件卸载自动回收
       */
      graph.dispose(true);
    }
  }, []);

  return GraphView;
}
