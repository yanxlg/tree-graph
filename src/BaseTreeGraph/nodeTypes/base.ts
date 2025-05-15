
import {Graph} from "@antv/x6";

Graph.registerNode(
  'topic',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'img',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        strokeWidth: 1,
      },
      img: {
        ref: 'body',
        refX: '100%',
        refY: '50%',
        refY2: -8,
        width: 16,
        height: 16,
        'xlink:href':
          'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ',
        event: 'add:topic',
        class: 'topic-image',
      },
      label: {
        fontSize: 14,
        fill: '#262626',
      },
    },
  },
  true,
);

Graph.registerNode(
  'topic-child',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
      {
        tagName: 'path',
        selector: 'line',
      },
    ],
    attrs: {
      body: {
        fill: 'transparent',
        strokeWidth: 0,
        stroke: '#5F95FF',
      },
      label: {
        fontSize: 14,
        fill: '#262626',
        textVerticalAnchor: 'bottom',
      },
      line: {
        stroke: '#5F95FF',
        strokeWidth: 2,
        d: 'M 0 15 L 60 15',
      },
    },
  },
  true,
)
