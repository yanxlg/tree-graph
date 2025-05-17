/*
 * @author: yanxianliang
 * @date: 2025-05-16 23:49
 * @desc: 检测文字宽度
 *
 * TODO 文本溢出可以参考下内置方案，textWrap 属性 https://x6.antv.antgroup.com/api/registry/attr#textwrap 看是否能满足
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

/**
 * 计算文案宽度，根据内容自动计算节点宽度
 * @param text
 * @param fontStyle
 */
export function measureTextWidth(text: string, fontStyle = '14px Arial, helvetica, sans-serif') {
  context!.font = fontStyle; // 设置字体样式
  return context!.measureText(text).width;
}


/**
 * 文本宽度是否超出了允许的最大宽度
 * @param text
 * @param maxWidth
 * @param fontStyle
 */
export function isTextOverflow(text: string, maxWidth: number, fontStyle: string) {
  const textWidth = measureTextWidth(text, fontStyle);
  return textWidth > maxWidth;
}


const ellipsisCalcCache = new Map<string, number>();

const ellipsis = '...';


function calcEllipsisWidth(fontStyle: string){
  if(ellipsisCalcCache.has(fontStyle)){
    return ellipsisCalcCache.get(fontStyle)!;
  }
  const width = measureTextWidth(ellipsis, fontStyle);
  ellipsisCalcCache.set(fontStyle, width);
  return width;
}


/**
 * 文本根据宽度计算溢出显示结果
 * @param text
 * @param maxWidth
 * @param fontStyle
 */
export function truncateTextWithEllipsis(text: string,maxWidth: number, fontStyle: string) {
  if(!isTextOverflow(text, maxWidth, fontStyle)){
    return text;
  }
  const ellipsisWidth = calcEllipsisWidth(fontStyle);
  const contentMaxWidth = maxWidth - ellipsisWidth;

  let low = 0, high = text.length;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const currentText = text.substring(0, mid);
    if (measureTextWidth(currentText) <= contentMaxWidth) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return text.substring(0, high) + ellipsis;
}
