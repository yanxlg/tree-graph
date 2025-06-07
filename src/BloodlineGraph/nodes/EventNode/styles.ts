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
const lineWidth = 15;


export const useStyles = createStyles(({css}, props: { color?: string; type: string }) => {
  const themeColor = props.color || codeToColor(props.type);
  const bgColor = toRGBA(themeColor, 0.4);
  return {
    box: css`
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    `,
    event: css`
      width: ${EVENT_NODE_WIDTH}px;
      box-sizing: border-box;
      background-color: ${bgColor};
      position: relative;
      min-height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: center;

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
      padding: 5px 5px 5px ${lineWidth+5}px;
      font-size: 14px;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: content-box!important;
    `,
    eventVersion: css`
      position: relative;
      color: #000;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      padding: 5px 5px 5px ${lineWidth+5}px;
      box-sizing: content-box!important;
    `,
    inGroup: css`
      position: relative;
    `
  }
})

export const useVersionStyle = createStyles(({css})=>{
  return {
    danger: css`
      color: #ff4d4f!important;
    `,
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
    width: 16,
    height: 16,
    borderRadius: 2,
    border: '1px solid rgba(5, 5, 5, 0.06)',
    backgroundColor: '#fff',
    fontSize: 12,
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
