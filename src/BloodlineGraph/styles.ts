/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:07
 * @desc: 样式 hook
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {createStyles} from 'antd-style';


export const useStyles = createStyles(({css}) => {
  return {
    graph: css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #F2F7FAFF;
    `,
  }
})
