/*
 * @author: yanxianliang
 * @date: 2025-06-07 11:45
 * @desc: Handle 自定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Handle, HandleProps} from '@xyflow/react'
import {useStyles} from "./styles";

export default function (props: HandleProps) {
  const {styles} = useStyles();
  return (
    <Handle {...props} className={styles.handle}/>
  )
}
