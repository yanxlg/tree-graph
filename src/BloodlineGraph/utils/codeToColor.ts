/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:25
 * @desc: code 自动生成颜色
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

function hslToRgba(h: number, s: number, l: number, a = 1) {
  h /= 360, s /= 100, l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      return t < 1 / 6 ? p + (q - p) * 6 * t
        : t < 1 / 2 ? q
          : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6
            : p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a})`;
}


const colorMap: Record<string, string> = {
  API: '#A0BFF4',
  APPLICATION: '#90D7EA',
  TABLE: '#7CC0EA',
  DATA_SOURCE: '#029BD6',
  SAMPLE: '#17B8B7',
  CDP: '#23C671',
  FEATURE: '#85BF98',
  ONLINE_MODEL_SERVICE: '#ABC88B',
  OFFLINE_MODEL_SERVICE: '#A0D97C',
  EVENT: '#69C069',
  EXPERIMENT: '#AEAF4C',
  ACTION: '#3FB10C',
  CAMPAIGN_PLAN: '#057E26',
  DECISION: '#5E7B3C',
  CREDIT: '#E4CA48',
  VIPSHIP: '#F7ACA7',
  CREDITTOOLS: '#FF9F7B',
  RTA: '#C86C62',
}


export function codeToColor(code: string) {
  if (colorMap[code]) {
    return colorMap[code];
  }
  // 简单哈希，将字符串转为数字
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = code.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // 保证 32 位
  }
  // 映射到 0-360 的色相，饱和度和亮度固定
  const hue = Math.abs(hash) % 360;
  return hslToRgba(hue, 65, 55);
  // return `hsl(${hue}, 65%, 55%)`;
}
