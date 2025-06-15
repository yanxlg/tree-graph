/*
 * @author: yanxianliang
 * @date: 2025-06-09 09:45
 * @desc: 画布控制器
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */

import {shallow} from "zustand/shallow";
import {Fragment} from "react/jsx-runtime";
import {memo, RefObject, useEffect, useState} from "react";
import {ControlButton, ControlProps, Panel, ReactFlowState, useReactFlow, useStore, useStoreApi} from "@xyflow/react";
import cc from 'classcat';
import {FitViewIcon, LockIcon, MinusIcon, PlusIcon, UnlockIcon} from "./icons";
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';
import FullscreenExitOutlined from '@ant-design/icons/FullscreenExitOutlined';

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});


function Controls(
  {
    style,
    showZoom = true,
    showFitView = true,
    showInteractive = true,
    showFullscreen = true,
    containerRef,
    fitViewOptions,
    onZoomIn,
    onZoomOut,
    onFitView,
    onInteractiveChange,
    className,
    children,
    position = 'bottom-left',
    orientation = 'vertical',
    'aria-label': ariaLabel = 'React Flow controls',
  }: ControlProps & {
    showFullscreen?: boolean;
    containerRef?: RefObject<HTMLDivElement | null>
  }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const store = useStoreApi();
  const {isInteractive, minZoomReached, maxZoomReached} = useStore(selector, shallow);
  const {zoomIn, zoomOut, fitView} = useReactFlow();
  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };
  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };
  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };
  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
    onInteractiveChange?.(!isInteractive);
  };

  const onToggleFullscreen = () => {
    // setIsFullscreen(!isFullscreen);
    if (!document.fullscreenElement) {
      if (containerRef?.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => {});
      }
    } else {
      document.exitFullscreen().then(() => {});
    }
  }

  useEffect(() => {
    const fullscreenChange = ()=>{
      const isFullscreen = document.fullscreenElement === containerRef?.current;
      setIsFullscreen(isFullscreen);
    }
    if(showFullscreen){
      document.addEventListener('fullscreenchange', fullscreenChange);
    }
    return ()=>{
      document.removeEventListener('fullscreenchange', fullscreenChange);
    }
  }, []);

  const orientationClass = orientation === 'horizontal' ? 'horizontal' : 'vertical';
  return (
    <Panel
      className={cc(['react-flow__controls', orientationClass, className])}
      position={position}
      style={style}
      data-testid={"rf__controls"}
      aria-label={ariaLabel}
    >
      {
        showZoom && (
          <Fragment>
            <ControlButton
              onClick={onZoomInHandler}
              className={"react-flow__controls-zoomin"}
              title={'放大'}
              aria-label={'zoom in'}
              disabled={maxZoomReached}
            >
              <PlusIcon/>
            </ControlButton>
            <ControlButton
              onClick={onZoomOutHandler}
              className={"react-flow__controls-zoomout"}
              title={'缩小'}
              aria-label={'zoom out'}
              disabled={minZoomReached}
            >
              <MinusIcon/>
            </ControlButton>
          </Fragment>
        )
      }
      {
        showFitView && (
          <ControlButton
            className={"react-flow__controls-fitview"}
            onClick={onFitViewHandler}
            title={'自适应'}
            aria-label={'fit view'}
          >
            <FitViewIcon/>
          </ControlButton>
        )
      }
      {
        showFullscreen &&
        <ControlButton
          className={"react-flow__controls-fullscreen"}
          onClick={onToggleFullscreen}
          title={isFullscreen ? '取消全屏' : '全屏'}
          aria-label={"toggle fullscreen"}
        >
          {
            isFullscreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>
          }
        </ControlButton>
      }
      {
        showInteractive && (
          <ControlButton
            className={"react-flow__controls-interactive"}
            onClick={onToggleInteractivity}
            title={isInteractive ? '解锁' : '锁定'}
            aria-label={"toggle interactivity"}
          >
            {
              isInteractive ? <UnlockIcon/> : <LockIcon/>
            }
          </ControlButton>
        )
      }
      {children}
    </Panel>
  )
}

export default memo(Controls);
