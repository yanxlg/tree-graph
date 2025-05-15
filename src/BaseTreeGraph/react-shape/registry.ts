import {Graph, Node} from '@antv/x6'
import {getScopeShape} from "./utils/register";
import {NodeRenderComponent} from "../types";

export type ReactShapeConfig = Node.Properties & {
  shape: string
  component: NodeRenderComponent;
  effect?: (keyof Node.Properties)[]
  inherit?: string
}

/**
 * 全局的 shape 注册
 */
export const shapeMaps: Record<
  string,
  {
    component: NodeRenderComponent;
    effect?: (keyof Node.Properties)[]
  }
> = {}

export function register(config: ReactShapeConfig, graphScope?: string) {
  const {shape, component, effect, inherit, ...others} = config
  if (!shape) {
    throw new Error('should specify shape in config')
  }

  const actualShape = getScopeShape(shape, graphScope); // 创建私有化 scope 前缀

  if (component) {
    shapeMaps[actualShape] = {
      component,
      effect,
    }
  }

  Graph.registerNode(
    actualShape,
    {
      inherit: inherit || 'react-shape',
      ...others,
    },
    true,
  )
}

export function unRegister(shape: string, graphScope: string) {
  const actualShape = getScopeShape(shape, graphScope);
  if (shapeMaps[actualShape]) {
    delete shapeMaps[actualShape];
    Graph.unregisterNode(actualShape);
  }
}

export function unRegisterPrivateShape(graphScope: string) {
  Object.keys(shapeMaps).forEach(shape => {
    if (new RegExp(`^${graphScope}@`).test(shape)) {
      // 私有 shape，需要移除
      delete shapeMaps[shape];
      Graph.unregisterNode(shape);
    }
  })
}
