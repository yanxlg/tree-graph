/*
 * @author: yanxianliang
 * @date: 2025-06-01 20:44
 * @desc: EventGroupNode
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import React, {useState} from "react";
import {Handle, NodeProps, Position} from "@xyflow/react";
import {EventGroupNodeType} from "../../types";
import {isEqual} from "lodash";
import {useStyles} from "./styles";
import ArrowsAltOutlined from '@ant-design/icons/ArrowsAltOutlined';
import ShrinkOutlined from '@ant-design/icons/ShrinkOutlined';
import {Pagination, Spin, Space} from 'antd';
import {useMemoizedFn, useRequest} from "ahooks";
import {EventNode} from "../EventNode";
import {useMeasure} from "../../hooks/useMeasure";
import {useGraphProps} from "../../providers/ConfigProvider";

export const EventGroupNode = React.memo((props: NodeProps<EventGroupNodeType>) => {
  const {data, id} = props;
  const {title, depth, color, type} = data;
  const {styles, cx} = useStyles({color, type});
  const [expanded, setExpanded] = useState(false);
  const {getChildren} = useGraphProps();

  const {loading, data: pageData, run} = useRequest(async () => {
    return await getChildren();
  }, {
    manual: true,
  });

  const {total = 0, list = []} = pageData || {};

  const onToggleCollapse = useMemoizedFn(() => {
    setExpanded(!expanded);
    if (!pageData) {
      run();
    }
  });

  const ref = useMeasure(id, true);

  return (
    <div ref={ref} className={styles.group}>
      <Handle className={styles.handle} type="target" position={depth > 0 ? Position.Left : Position.Right}
              id={'input'}/>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.icon} onClick={onToggleCollapse}>
        {!expanded ? <ArrowsAltOutlined/> : <ShrinkOutlined/>}
      </div>
      <div className={cx(styles.content, {
        [styles.hide]: !expanded
      })}>
        <Spin size={'small'} spinning={loading}>
          <Space direction={'vertical'}>
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
        <Pagination
          pageSize={3}
          total={total}
          showSizeChanger={false}
          showQuickJumper={false}
          showLessItems
          size={'small'}
          rootClassName={styles.pagination}
        />
      </div>
    </div>
  )
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
