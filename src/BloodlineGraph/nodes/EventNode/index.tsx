/*
 * @author: yanxianliang
 * @date: 2025-06-01 18:59
 * @desc: 事件节点
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {useStyles} from "./styles";
import {EventData} from "../../types";
import React from "react";
import {isEqual} from 'lodash';
import {useMeasure} from "../../hooks/useMeasure";
import {Upstream} from "./Upstream";
import {Downstream} from "./Downstream";

export const EventNode = React.memo((props:{
  id: string;
  data: EventData;
  measure?: boolean;
  inGroup?: boolean;
}) => {
  const {data, id, measure = true, inGroup} = props;
  const {title, color, type, depth} = data;
  const {styles, cx} = useStyles({color, type});
  const ref = useMeasure(id, measure); // 在 group 中，不需要

  return (
    <div ref={ref} className={cx(styles.event,{
      [styles.inGroup]: inGroup
    })}>
      <Upstream event={data} depth={depth}/>
      <div className={styles.title}>
        {title}
      </div>
      <Downstream event={data} depth={depth} versionClassName={styles.eventVersion}/>
    </div>
  )
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));


