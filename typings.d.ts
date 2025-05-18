declare module '@antv/hierarchy' {

  type TreeNode<T> = {
    id?: string;
    data?: T;
    name?: string;
    preH?: number;
    preV?: number;
    hgap?: number;
    vgap?: number;
    height?: number;
    width?: number | 'auto';
    label?: string;
    children?: T[];
  }

  interface MindmapLayout<T> extends T {
    execute: () => T;
  }

  type Options<T> = {
    direction: 'H' | 'V' | 'LR' | 'RL' | 'TB' | 'BT';
    getId?: (node: T) => string;
    getPreH?: (node: T) => number;
    getPreV?: (node: T) => number;
    getHGap?: (node: T) => number;
    getVGap?: (node: T) => number;
    getChildren?: (node: T) => Array<T>;
    getHeight?: (node: T) => number | undefined;
    getWidth?: (node: T) => number | undefined;
    getSide?: () => 'left' | 'right'
  }

  export function mindmap<T extends TreeNode<T>>(root: T, options: Options<T>): Required<T>;
}
