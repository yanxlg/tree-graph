/*
 * @author: yanxianliang
 * @date: 2025-06-03 19:47
 * @desc: 样式
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {createStyles} from 'antd-style';

export const useStyles = createStyles(({css}) => {
  return {
    container: css`
      position: absolute;
      top: 10px;
      left: 10px;
      right: 52px;
      padding: 5px 10px;
      z-index: 200;
    `,
    item: css`
      display: flex;
      align-items: center;
    `,
    tag: css`
      width: 14px;
      height: 14px;
      border-radius: 2px;
      margin-right: 3px;
    `,
    label: css`
      font-size: 14px;
      color: #474747;
    `
  }
});
