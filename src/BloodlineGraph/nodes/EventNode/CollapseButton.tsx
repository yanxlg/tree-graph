/*
 * @author: yanxianliang
 * @date: 2025-06-01 19:46
 * @desc: 展开 Icon
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {useCollapseStyles} from "./styles";
import {CollapseButtonProps} from "../../types";
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import {useMemoizedFn} from "ahooks";
import {useAppendChildren} from "../../hooks/useAppendChildren";
import {Space} from "antd";
import {useHandleState, useSetHandleState} from "../../atoms/handle";
import {useCleanWithDepth} from "../../hooks/useCleanWithDepth";
import {useGraphProps} from "../../providers/ConfigProvider";


export function CollapseButton(props: CollapseButtonProps) {
  const {position, handleKey, nextDepth, relation} = props;
  const {styles, cx} = useCollapseStyles();

  const handleState = useHandleState(handleKey);
  const updateHandleState = useSetHandleState(handleKey);

  const {loading = false, collapsed = true, items} = handleState || {};
  const {count,} = relation;

  const append = useAppendChildren(nextDepth, handleKey);

  const clean = useCleanWithDepth(nextDepth);

  const {getDownstream} = useGraphProps();


  const onClick = useMemoizedFn(() => {
    if (loading) {
      return;
    }
    console.log(handleState, nextDepth,'---');
    if (collapsed) {
      // 当前展开，同级其它的隐藏，子节点都隐藏
      // 先修改状态
      if (items) { // TODO 没有生效
        clean();
        updateHandleState({
          loading: false,
          collapsed: false,
          nextDepth: nextDepth,
          items
        });
        append(items as any);
      } else {
        updateHandleState({
          loading: true,
          collapsed: true,
          nextDepth: nextDepth,
          items: items as any
        });
        clean();
        getDownstream(nextDepth).then((items) => {
          updateHandleState({
            loading: false,
            collapsed: false,
            nextDepth: nextDepth,
            items
          });
          append(items  as any);
        });
      }
    } else {
      updateHandleState({
        loading: false,
        collapsed: true,
        nextDepth: nextDepth,
        items: items as any
      });
      clean();
    }
  });

  return (
    <Space size={2} className={cx(styles.collapse, styles[position])}>
      <div
        className={cx(styles.icon, {
          [styles.loading]: loading
        })}
        onClick={loading ? undefined : onClick}
      >
        {loading ? <LoadingOutlined/> : collapsed ? <PlusOutlined/> : <MinusOutlined/>}
      </div>
      {
        collapsed && <div className={styles.count}>{count}</div>
      }
    </Space>
  )
}
