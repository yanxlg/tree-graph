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
import {EVENT_NODE_WIDTH} from "../../constants";

const borderWidth = 2;
const lineWidth = 6;


export const useStyles = createStyles(({css}, props: { color?: string; type: string }) => {
  const themeColor = props.color || codeToColor(props.type);
  const bgColor = toRGBA(themeColor, 0.1);
  return {
    event: css`
      width: ${EVENT_NODE_WIDTH}px;
      box-sizing: border-box;
      background-color: ${bgColor};
      &:before {
        box-sizing: border-box;
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        border: ${borderWidth}px solid ${themeColor};
      }

      &:after {
        box-sizing: border-box;
        content: '';
        display: block;
        position: absolute;
        width: ${lineWidth}px;
        left: 0;
        top: 0;
        height: 100%;
        background-color: ${themeColor};
        z-index: -1;
      }
    `,
    title: css`
      padding: 12px 12px;
      font-size: 16px;
      height: 16px;
      line-height: 16px;
      color: #262626;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    eventVersion: css`
      position: relative;
      color: #bfbfbf;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      padding: 12px 12px;
      margin-top: -12px;
    `,
    inGroup: css`
      position: relative;
    `
  }
})


export const useCollapseStyles = createStyles(({css}) => ({
  collapse: css`
    position: absolute;
    display: flex;
    top: 50%;
    align-items: center;
    transform: translate3d(0, -50%, 0);
  `,
  left: css`
    right: 100%;
    flex-direction: row-reverse;
    margin-right: 2px;
  `,
  right: css`
    left: 100%;
    flex-direction: row;
    margin-left: 2px;
  `,
  loading: css`
    cursor: not-allowed;
  `,
  icon: {
    display: 'flex',
    width: 12,
    height: 12,
    borderRadius: 12,
    border: '1px solid #d9d9d9',
    backgroundColor: '#fff',
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1677ff',
    cursor: 'pointer',
  },
  count: {
    fontSize: 10,
    color: '#333'
  }
}))


export const useConnectorStyles = createStyles(({css}) => ({
  handle: css`
    visibility: hidden;
  `
}))
