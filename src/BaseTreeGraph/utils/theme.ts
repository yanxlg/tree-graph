/*
 * @author: yanxianliang
 * @date: 2025-05-17 16:12
 * @desc: theme 获取
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {BaseTreeGraphProps} from "../types";

export const getTheme = (theme: BaseTreeGraphProps['theme'])=>{
  return {
    ...theme,
    fontSize: theme?.fontSize ?? 14,
    fontFamily: theme?.fontFamily ?? 'Arial, helvetica, sans-serif',
    primaryColor: theme?.primaryColor ?? '#5F95FF',
  }
}
