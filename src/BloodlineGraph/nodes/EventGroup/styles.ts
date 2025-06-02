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
      border: 2px solid ${themeColor};
      width: ${EVENT_GROUP_NODE_WIDTH}px;
      position: relative;
    `,
    title: css`
      padding: 6px;
    `,
    icon: css`
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 12px;
      color: #808080;
      cursor: pointer;
    `,
    content: css`
      padding: 10px ${(EVENT_GROUP_NODE_WIDTH - EVENT_NODE_WIDTH) / 2}px;
    `,
    hide: css`
      display: none;
    `,
    pagination: css`
      margin-top: 12px;
      justify-content: center;
    `
  }
})
