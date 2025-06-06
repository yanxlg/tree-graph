/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:07
 * @desc: 样式 hook
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {createStyles} from 'antd-style';
import {codeToColor} from "../../utils/codeToColor";
import {toRGBA} from "../../utils/toRGBA";
import {EVENT_GROUP_NODE_WIDTH, EVENT_NODE_WIDTH} from "../../constants";

export const useStyles = createStyles(({token, css, prefixCls}, props: { color?: string; type: string }) => {
  const themeColor = props.color || codeToColor(props.type);
  const bgColor = toRGBA(themeColor, 0.1);

  return {
    handle: css`
      visibility: hidden;
    `,
    group: css`
      border: 1px solid ${themeColor};
      width: ${EVENT_GROUP_NODE_WIDTH}px;
      min-height: 80px;
      position: relative;
      box-sizing: border-box;
      &:before{
        content: '';
        display: block;
        position: absolute;
        width: 15px;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: ${themeColor};
      }
      &.expanded{
        border-style: dashed;
        &:before{
          display: none;
        }
      }
    `,
    title: css`
      padding: 5px 5px 5px 20px;
      font-size: 14px;
    `,
    count: css`
      font-size: 12px;
      position: absolute;
      right: 26px;
      height: 12px;
      line-height: 12px;
      top: 10px;
      color: #7d7d7d;
    `,
    icon: css`
      position: absolute;
      right: 8px;
      top: 5px;
      font-size: 14px;
      color: #1677ff;
      cursor: pointer;
    `,
    content: css`
      padding: 10px ${(EVENT_GROUP_NODE_WIDTH - EVENT_NODE_WIDTH) / 2}px;
    `,
    hide: css`
      //visibility: hidden;
      //position: absolute;
      //top: 0;
      //bottom: 0;
      display: none;
    `,
    pagination: css`
      margin-top: 12px!important;
      justify-content: center;
    `
  }
})
