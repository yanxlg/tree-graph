/*
 * @author: yanxianliang
 * @date: 2025-06-02 21:56
 * @desc: ConfigProvider
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {GraphProps} from "../types";
import React, {useContext, useMemo} from "react";

const ConfigContext = React.createContext<GraphProps>({} as GraphProps);

export const ConfigProvider = (props: {
  config: GraphProps;
  children: React.ReactNode;
}) => {
  const {config, children} = props;
  return (
    <ConfigContext.Provider value={config}>
      {useMemo(()=>children,[])}
    </ConfigContext.Provider>
  )
}

export const useGraphProps = ()=>{
  return useContext(ConfigContext);
}
