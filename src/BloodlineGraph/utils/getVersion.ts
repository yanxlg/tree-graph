/*
 * @author: yanxianliang
 * @date: 2025-06-09 10:24
 * @desc: 版本号
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */


export function isEmpty(val?: unknown) {
  return !val || typeof val === 'string' && val.trim().length === 0;
}

export function getVersion(version?: string, miniVersion?: string) {
  if (isEmpty(version)) {
    return 'N/A'; // 默认显示版本
  }
  return `${version}${isEmpty(miniVersion) ? '' : `.${miniVersion}`}`;
}
