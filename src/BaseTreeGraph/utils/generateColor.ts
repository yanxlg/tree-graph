/*
 * @author: yanxianliang
 * @date: 2025-05-31 09:52
 * @desc: 根据字符串生成颜色编码
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

export function generateColor(code: string) {
  // 简单哈希，将字符串转为数字
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = code.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // 保证 32 位
  }
  // 映射到 0-360 的色相，饱和度和亮度固定
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}
