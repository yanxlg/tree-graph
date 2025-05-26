import {useGraph} from './hooks/useGraph';
import './nodeTypes';
import './tools';
import {BaseTreeGraphProps} from './types';
import './edgeTypes';
import './index.less';


// 支持 svg 节点注册，svg性能会好些，没有 react 开销
// top 节点注册
//register({
//  shape: 'topic',
//  component: NodeRender,
//})

export default function BaseTreeGraph(props: BaseTreeGraphProps) {
  const {GraphView, register, unRegister} = useGraph(props); // 使用的地方直接使用一个hooks 即可
  return GraphView;
}
