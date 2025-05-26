declare module '@antv/hierarchy' {

  type TreeNode<T> = {
    id: string;
    type: string;
    data: T;
    preH: number;
    preV: number;
    hgap: number;
    vgap: number;
    x: number;
    y: number;
    height?: number;
    width?: number | 'auto';
    label?: string;
    collapsed?: boolean;
    children?: Array<TreeNode<T>>;
    [key: string]: any;
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
    getChildren?: (node: T) => Array<T> | undefined;
    getHeight?: (node: T) => number | undefined;
    getWidth?: (node: T) => number | undefined;
    getSide?: (node: T, index: number) => 'left' | 'right'
  }

  export type Node = Omit<TreeNode<any>, 'children'> & {
    parent?: Node;
    children?: Node[];
  }

  export function mindmap<T>(root: T, options: Options<T>): TreeNode<T>;
}
