/*
 * @author: yanxianliang
 * @date: 2025-05-15 18:47
 * @desc: topic node 定义
 *
 * Copyright (c) 2025 by yanxianliang, All Rights Reserved.
 */
import {Graph, Model} from "@antv/x6";
import {CollapsedRect} from "./CollapsedRect";
import {merge} from "lodash";
import {IHoverActiveNode} from "../types";

class TopicNode extends CollapsedRect implements IHoverActiveNode{
  static defaults =
    merge({}, CollapsedRect.defaults, {
      attrs: {
        body: {
          rx: 6,
          ry: 6,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          strokeWidth: 1,
          cursor: 'pointer',
          event: 'topic:click',
          hoverable: true,
          class: 'x6-selected-rect'
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          'pointer-events': 'none',
        },
      },
    }, {shape: 'topic'})


  init() {
    super.init();
    // console.log(this.findView(this));
    // mouse 事件应该绑定在 body 元素上，不应该监听全局的
  }

  onMouseOver(){
    console.log('sssss');
    this.attr('body/filter', 'url(#topic-hover-shadow)');
  }

  onMouseOut(){
    this.attr('body/filter', 'none');
  }
}

Graph.registerNode('topic', TopicNode, true);
