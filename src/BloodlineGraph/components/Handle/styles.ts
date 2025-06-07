/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:07
 * @desc: 样式 hook
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {createStyles} from 'antd-style';

export const useStyles = createStyles(({css}) => ({
  handle: css`
    visibility: hidden;
    width: 0;
    height: 0;
    min-width: 0;
    min-height: 0;
    border: none;
  `
}))
