/*
 * @author: yanxianliang
 * @date: 2025-06-02 20:25
 * @desc: cells
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {atom} from "jotai/index";
import {EdgeType, NodeType} from "../types";
import {initialNodes, initialEdges} from "../utils/layout";
import { focusAtom } from 'jotai-optics';

export const cellsAtom = atom<{
  nodes: NodeType[];
  edges: EdgeType[];
}>({
  nodes: initialNodes,
  edges: initialEdges
});

export const nodeAtom = focusAtom(cellsAtom, (optic) => optic.prop('nodes'))

export const edgeAtom = focusAtom(cellsAtom, (optic) => optic.prop('edges'))
