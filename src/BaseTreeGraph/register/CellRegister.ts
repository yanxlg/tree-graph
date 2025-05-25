/*
 * @author: yanxianliang
 * @date: 2025-05-21 20:48
 * @desc: 节点注册
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Node} from '@antv/hierarchy';
import {Cell} from "@antv/x6";


type CellRef = {
  node?: Node,
  cell: Cell
}

export class CellRegister {
  private cellRef = new Map<string, CellRef>();

  public addCell(ref: CellRef) {
    this.cellRef.set(ref.cell.id, ref);
  }

  public hasCell(id: string) {
    return this.cellRef.has(id);
  }

  public removeCell(id: string) {
    this.cellRef.delete(id);
  }

  public getCell(id: string) {
    return this.cellRef.get(id);
  }

  public getNode(id: string) {
    return this.cellRef.get(id)?.node;
  }

  public getCellIds() {
    return Array.from(this.cellRef.keys());
  }

  public clear(){
    this.cellRef.clear();
  }

  public diff(registry: CellRegister) {
    // 对比返回差量
    const removeItems: string[] = [];
    const updateItems: Cell[] = [];
    const addItems: Cell[] = [];

    const allCellIds = new Set([...this.getCellIds(), ...registry.getCellIds()]);

    allCellIds.forEach(cellId => {
      const check1 = this.hasCell(cellId);
      const check2 = registry.hasCell(cellId);
      if (check1 && !check2) {
        // 删除的元素
        removeItems.push(cellId);
      }
      if (check1 && check2) {
        // 更新， 更新需要diff x,y
        const beforeNode = this.getCell(cellId)?.node;
        const afterNode = registry.getCell(cellId)?.node;
        if(beforeNode && afterNode && (beforeNode.x!==afterNode.x || beforeNode.y!==afterNode.y)) {
          updateItems.push(registry.getCell(cellId)!.cell);
        }
      }
      if (!check1 && check2) {
        addItems.push(registry.getCell(cellId)!.cell)
      }
    });

    return {
      removeItems,
      updateItems,
      addItems
    }
  }

  public replaceWith(registry: CellRegister) {
    this.cellRef = registry.cellRef;
  }
}
