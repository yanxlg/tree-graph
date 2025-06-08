/*
 * @author: yanxianliang
 * @date: 2025-06-03 19:33
 * @desc: 图例
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */


import {useStyles} from "./styles";
import {useMemo} from "react";
import {codeToColor} from "../../utils/codeToColor";
import {Space} from "antd";
import {useNodesManager} from "../../providers/NodesManagerProvider";

export const Legend = () => {
  const {styles} = useStyles();
  const {nodes} = useNodesManager();
  const legendList = useMemo(() => {
    const typeMap = new Map<string, {
      type: string;
      label: string;
      color: string;
    }>();
    nodes.forEach(node => {
      const {data} = node;
      const {type, typeLabel, color} = data || {};
      if (type && typeLabel) {
        typeMap.set(type, {
          type: type,
          color: codeToColor(color || type),
          label: typeLabel,
        });
      }
    })
    return Array.from(typeMap.values());
  }, [nodes])
  if (legendList.length === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Space size={10}>
        {
          legendList.map(legend => (
            <div key={legend.type} className={styles.item}>
              <div className={styles.tag} style={{backgroundColor: legend.color}}/>
              <div className={styles.label}>
                {legend.label}
              </div>
            </div>
          ))
        }
      </Space>
    </div>
  )
}
