import React from 'react'
import { Graph } from '@antv/x6'
import { ReactShape } from './node'
import { shapeMaps } from './registry'
import {getScopeShape} from "./utils/register";
import {NodeRenderNode} from "../types";


declare module '@antv/x6'{
  /**
   * 扩展 Graph 实例 id 属性，用于是有Shape 实现
   */
  interface Graph {
    id?: string;
    portal?: {
      disconnect: (id: string)=>void;
      connect: (id: string, portal: React.ReactPortal)=>void;
    }
  }
}

export class Wrap extends React.PureComponent<Wrap.Props, Wrap.State> {
  constructor(props: Wrap.Props) {
    super(props)
    this.state = { tick: 0 }
  }

  componentDidMount() {
    const { node, graph } = this.props
    node.on('change:*', ({ key }) => {
      const {shape} = node;
      const scopeShape = getScopeShape(shape, graph.id);
      // eslint-disable-next-line react/no-access-state-in-setstate
      const content = shapeMaps[scopeShape] || shapeMaps[shape]; // 优先匹配局部图形注册
      if (content) {
        const { effect } = content
        if (!effect || effect.includes(key)) {
          this.setState({ tick: this.state.tick + 1 })
        }
      }
    })
  }

  clone(elem: NodeRenderNode | React.ReactElement) {
    const { node, graph } = this.props
    return typeof (elem as React.ReactElement).type === 'string'
      ? React.cloneElement(elem as React.ReactElement)
      : React.cloneElement(elem as NodeRenderNode, { node, graph })
  }

  render() {
    const { node } = this.props
    const content = shapeMaps[node.shape]

    if (!content) {
      return null
    }

    const { component } = content
    if (React.isValidElement(component)) {
      return this.clone(component)
    }

    const FC = component as unknown as React.ComponentType;
    return this.clone(<FC />)
  }
}

export namespace Wrap {
  export interface State {
    tick: number
  }

  export interface Props {
    node: ReactShape
    graph: Graph
  }
}
