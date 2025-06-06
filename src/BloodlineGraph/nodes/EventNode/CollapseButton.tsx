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
import {useMemoizedFn} from "ahooks";
import {useAppendChildren} from "../../hooks/useAppendChildren";
import {Space} from "antd";
import {useHandleState, useSetHandleState} from "../../atoms/handle";
import {useCleanWithDepth} from "../../hooks/useCleanWithDepth";
import {useGraphProps} from "../../providers/ConfigProvider";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";


export function CollapseButton(props: CollapseButtonProps) {
  const {position, handleKey, nextDepth, relation, node} = props;
  const {styles, cx} = useCollapseStyles();
  const {getRelation} = useGraphProps();

  const handleState = useHandleState(handleKey);
  const updateHandleState = useSetHandleState(handleKey);

  const {loading = false, collapsed = true, items, hasRelations} = handleState || {};
  const {count} = relation;

  const append = useAppendChildren(nextDepth, handleKey);

  const clean = useCleanWithDepth(nextDepth);

  // TODO 需要优化
  const onClick = useMemoizedFn(() => {
    if (loading) {
      return;
    }
    if (collapsed) {
      if (items) {
        clean();
        updateHandleState({
          hasRelations: true,
          loading: false,
          collapsed: false,
          nextDepth: nextDepth,
          items
        });
        append(items as any);
      } else {
        updateHandleState({
          hasRelations: true,
          loading: true,
          collapsed: true,
          nextDepth: nextDepth,
          items: items as any
        });
        clean();
        getRelation(nextDepth, position === 'right' ? 'down' : 'up', node, relation).then((items) => {
          const hasRelations = items.length > 0;
          relation.count = items.length;
          updateHandleState({
            loading: false,
            collapsed: false,
            nextDepth: nextDepth,
            items,
            hasRelations
          });
          append(items as any);
        });
      }
    } else {
      updateHandleState({
        hasRelations: true,
        loading: false,
        collapsed: true,
        nextDepth: nextDepth,
        items: items as any
      });
      clean();
    }
  });

  if (hasRelations === false) {
    return null;
  }

  return (
    <Space
      size={2}
      className={cx(styles.collapse, styles[position])}
    >
      <div
        className={cx(styles.icon, {
          [styles.loading]: loading
        })}
        onClick={loading ? undefined : onClick}
      >
        {loading ? <LoadingOutlined/> : collapsed ? <PlusOutlined/> : <MinusOutlined/>}
      </div>
      <div className={styles.count}>{count}</div>
    </Space>
  )
}
