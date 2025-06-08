/*
 * @author: yanxianliang
 * @date: 2025-06-08 09:36
 * @desc: 数据响应式
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {useEffect} from 'react';
import isPlainObject from 'lodash/isPlainObject';
import {useCreation, useUpdate} from 'ahooks';

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

const cbMap = new WeakMap(); // 回调函数存储


function registerCb(proxy: object, cb: () => void) {
  if (!cbMap.has(proxy)) {
    const cbSet = new Set<Function>();
    cbSet.add(cb);
    cbMap.set(proxy, cbSet);
  } else {
    const cbSet = cbMap.get(proxy)!;
    cbSet.add(cb);
  }
}

function unregisterCb(proxy: object, cb: () => void){
  if (cbMap.has(proxy)) {
    const cbSet = cbMap.get(proxy)! as Set<Function>;
    cbSet.delete(cb);
  }
}

export function createObserver<T extends Record<string, any>>(initialVal: T): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }



  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      // https://github.com/alibaba/hooks/issues/1317
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!descriptor?.configurable && !descriptor?.writable) {
        return res;
      }

      // Only proxy plain object or array,
      // otherwise it will cause: https://github.com/alibaba/hooks/issues/2080
      return isPlainObject(res) || Array.isArray(res) ? createObserver(res) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  const cb = ()=>{
    const cbSet = cbMap.get(proxy) as Set<Function>;
    if(cbSet){
      cbSet.forEach((callback)=>{
        callback();
      })
    }
  }

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}


function useReactive<S extends Record<string, any>>(proxy: S): S {
  const update = useUpdate();

  useEffect(()=>{
    return ()=>{
      unregisterCb(proxy, update);
    }
  },[]);

  return useCreation(() => {
    registerCb(proxy,update);
    return proxy;
  }, []);
}

export default useReactive;
