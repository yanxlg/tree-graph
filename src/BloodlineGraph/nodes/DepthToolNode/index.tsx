/*
 * @author: yanxianliang
 * @date: 2025-06-04 13:10
 * @desc: DepthToolNode
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {NodeProps,Node} from "@xyflow/react";
import {DepthToolbarData} from "../../types";
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import {Tooltip, Button} from "antd";
import {useStyles} from "./styles";
import {useInstanceRegister} from "../../providers/NodeInstanceProvider";
import {useCallback, useEffect} from "react";

function numberToChinese(num: number): string {
  const units = ['', '十', '百', '千'];
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const absNum = Math.abs(num);

  if (absNum === 0) return chars[0];
  if (absNum < 10) return chars[absNum];
  if (absNum < 20) return '十' + (absNum % 10 === 0 ? '' : chars[absNum % 10]);
  if (absNum < 100) {
    const ten = Math.floor(absNum / 10);
    const unit = absNum % 10;
    return chars[ten] + '十' + (unit === 0 ? '' : chars[unit]);
  }
  // 超过99可自行扩展
  return String(num);
}


export default function (props: NodeProps<Node<DepthToolbarData>>){
  const {data} = props;
  const {depth, count} = data || {};
  const {styles} = useStyles();
  const {instanceMap} = useInstanceRegister();

  const onExpandAll = useCallback(()=>{
    const instanceSet = instanceMap.get(depth);
    if(instanceSet){
      instanceSet.forEach(instance=>{
        if(instance && instance.setExpanded){
          instance.setExpanded(true);
        }
      })
    }
  },[])

  const onCollapseAll = useCallback(()=>{
    const instanceSet = instanceMap.get(depth);
    if(instanceSet){
      instanceSet.forEach(instance=>{
        if(instance && instance.setExpanded){
          instance.setExpanded(false);
        }
      })
    }
  },[])

  if(!count || !depth){
    console.log('不显示');
    return null;
  }
  console.log('显示');

  useEffect(() => {
    console.log('xin')
  }, []);

  return (
    <div className={styles.toolbar}>
      {
        depth < 0?(
          <>
            <span className={styles.label}>依赖上游</span>
            <Tooltip title={'表示 查询对象的产出或执行依赖这些上游业务对象'}><QuestionCircleOutlined/></Tooltip>
          </>
        ):(
          <>
            <span className={styles.label}>影响下游</span>
            <Tooltip title={'表示 查询对象如果下线或修改逻辑，将影响这些下游业务对象的产出或执行'}><QuestionCircleOutlined/></Tooltip>
          </>
        )
      }
      <span className={styles.depth}>
        {numberToChinese(depth)}级 （{count}）
      </span>
      <Button type={'link'} size={'small'} onClick={onExpandAll}>全部展开</Button>
      <Button type={'link'} size={'small'} onClick={onCollapseAll}>全部收起</Button>
    </div>
  )
}
