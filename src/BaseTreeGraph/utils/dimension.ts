/*
 * @author: yanxianliang
 * @date: 2025-05-17 22:24
 * @desc: dimension 计算 utils
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {MindMapData, NodeConfig, ThemeConfig} from "../types";
import {getRegisteredNodeClass} from "../react-shape";
import {Node} from "@antv/x6";
import {measureTextWidth} from "./measureText";


const defaultTextMargin = 16;

function calcAutoWidth(label: string, themeConfig: ThemeConfig) {
  const fontStyle = `${themeConfig.fontSize}px ${themeConfig.fontFamily}`;
  const textWidth = measureTextWidth(label, fontStyle);
  return textWidth + defaultTextMargin * 2;
}


/**
 * 计算节点的宽度
 * @param node
 * @param themeConfig
 * @param nodeConfig
 * @param graphScope
 */
export function getNodeWidth(
  node: MindMapData,
  themeConfig: ThemeConfig,
  nodeConfig?: NodeConfig,
  graphScope?: string,
) {
  const {type, label = ''} = node;
  const ctr = getRegisteredNodeClass(type, graphScope);
  const defaults = ctr?.getDefaults() as Node.Defaults;
  const width = node.width ?? nodeConfig?.width ?? defaults?.size?.width;

  // auto 需要有间距
  const widthSize = (width === 'auto' ?
    calcAutoWidth(label, themeConfig) : width) ?? 0;
  const minWidth = node.minWidth ?? nodeConfig?.minWidth ?? widthSize;
  const maxWidth = node.maxWidth ?? nodeConfig?.maxWidth ?? widthSize;
  const absWidth = Math.min(Math.max(widthSize, minWidth), maxWidth);
  node.width = absWidth;
  return absWidth;
}

/**
 * 计算节点的高度
 * @param node
 * @param themeConfig
 * @param nodeConfig
 * @param graphScope
 */
export function getNodeHeight(
  node: MindMapData,
  themeConfig: ThemeConfig,
  nodeConfig?: NodeConfig,
  graphScope?: string
) {
  const {type} = node;
  const ctr = getRegisteredNodeClass(type, graphScope);
  const defaults = ctr?.getDefaults() as Node.Defaults;
  const absHeight = node.height ?? nodeConfig?.height ?? defaults?.size?.height;
  node.height = absHeight;
  return absHeight;
}
