/*
 * @author: yanxianliang
 * @date: 2025-06-01 20:44
 * @desc: EventGroupNode
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import React, {useEffect, useState} from "react";
import {Handle, NodeProps, Position, useUpdateNodeInternals} from "@xyflow/react";
import {EventGroupNodeType} from "../../types";
import {isEqual} from "lodash";
import {useStyles} from "./styles";
import ArrowsAltOutlined from '@ant-design/icons/ArrowsAltOutlined';
import ShrinkOutlined from '@ant-design/icons/ShrinkOutlined';
import {Pagination, Spin, Space} from 'antd';
import {useMemoizedFn, usePagination, useUpdateEffect} from "ahooks";
import {EventNode} from "../EventNode";
import {useMeasure} from "../../hooks/useMeasure";
import {useGraphProps} from "../../providers/ConfigProvider";
import {useCleanWithDepth} from "../../hooks/useCleanWithDepth";
import {useCollapseWithDepth} from "../../atoms/handle";
import {useInstanceRegister} from "../../providers/NodeInstanceProvider";

export const EventGroupNode = React.memo((props: NodeProps<EventGroupNodeType>) => {
  const {data, id} = props;
  const {title, depth, color, type, totalCount} = data;
  const {styles, cx} = useStyles({color, type});
  const [expanded, setExpanded] = useState(false);
  const {getChildren} = useGraphProps();
  const {setInstance, removeInstance} = useInstanceRegister();


  useEffect(() => {
    const instance = {
      setExpanded,
    };
    setInstance(depth, instance);
    return () => {
      removeInstance(depth, instance);
    }
  }, []);

  const {loading, data: pageData, pagination, run} = usePagination(async (params) => {
    const current = params.current;
    const pageSize = params.pageSize;
    return await getChildren(data, pageSize, current);
  }, {
    manual: true,
  });

  const nextDepth = depth > 0 ? depth + 1 : depth - 1;

  const clean = useCleanWithDepth(nextDepth);
  const {total = 0, list = []} = pageData || {};

  const collapseDepth = useCollapseWithDepth();
  const updateNodeInternals = useUpdateNodeInternals();

  const onToggleCollapse = useMemoizedFn(() => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
  });

  useUpdateEffect(() => {
    if (!expanded) {
      clean(); // 后续的全部收起来，折叠状态也需要变化
      collapseDepth(depth);
    }
    if (expanded) {
      if (!pageData) {
        run({
          current: 1,
          pageSize: 5
        });
      }
    }
  }, [expanded]);


  useUpdateEffect(() => {
    updateNodeInternals(id);
  }, [list]);

  const onPaginationChange = useMemoizedFn((current: number, pageSize: number) => {
    clean(); // 后续的全部收起来，折叠状态也需要变化
    collapseDepth(depth);
    pagination.onChange(current, pageSize);
  });

  const ref = useMeasure(id, true);

  return (
    <div ref={ref} className={cx(styles.group, {
      expanded: expanded
    })}>
      <Handle
        className={styles.handle}
        type="target"
        position={depth > 0 ? Position.Left : Position.Right}
        id={'input'}
      />
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.count}>
        {totalCount || 0}个
      </div>
      <div className={styles.icon} onClick={onToggleCollapse}>
        {!expanded ? <ArrowsAltOutlined/> : <ShrinkOutlined/>}
      </div>
      <div className={cx(styles.content, {
        [styles.hide]: !expanded
      })}>
        <Spin size={'small'} spinning={loading}>
          <Space direction={'vertical'} size={12}>
            {
              list?.map(event => (
                <EventNode
                  key={event.id}
                  inGroup
                  measure={false}
                  id={event.id}
                  data={{
                    ...event,
                    depth,
                  }}
                />
              ))
            }
          </Space>
        </Spin>
        {
          total > pagination.pageSize ? (
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              onChange={onPaginationChange}
              total={total}
              showSizeChanger={false}
              showQuickJumper={false}
              showLessItems
              size={'small'}
              rootClassName={styles.pagination}
            />
          ) : null
        }
      </div>
    </div>
  )
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
