/*
 * @author: yanxianliang
 * @date: 2025-06-02 20:04
 * @desc: color to rgba
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
export function toRGBA(color: unknown, alpha = 1) {
  /**
   * 参数校验
   */
  if (typeof color !== 'string') return 'rgba(0,0,0,1)';
  alpha = Math.min(1, Math.max(0, alpha)); // 限制透明度范围 [3](@ref)

  /**
   * 处理 HEX 格式（支持 #RGB、#RRGGBB、#RRGGBBAA）
   */
  if (color.startsWith('#')) {
    let hex = color.replace('#', '');
    /**
     * 扩展缩写格式 #RGB → #RRGGBB [1](@ref)
     */
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    /**
     * 提取颜色分量
     */
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    /**
     * 优先使用传入的 alpha 参数 [3](@ref)
     */
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /**
   * 处理 RGB/RGBA 格式（如 rgb(255,0,0)、rgba(255,0,0,0.5)）
   */
  const rgbMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))\)/i,
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /**
   * 默认返回黑色
   */
  return 'rgba(0,0,0,1)';
}
