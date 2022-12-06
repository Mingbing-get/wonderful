import anime from 'animejs'

export type Animation = anime.AnimeAnimParams;
export type TimeLineParams = Omit<anime.AnimeParams, 'targets'>;

export type TransformAllType = 'translate' | 'scale' | 'rotate'
export type TransformType = 'translateX' | 'translateY' | 'translateZ' | 'scaleX' | 'scaleY' | 'rotateX' | 'rotateY' | 'rotateZ';
export type StartStyle = React.CSSProperties & Partial<Record<TransformType, number | string>>;

export type ElementType = 'container' | 'img' | 'text';

export type BaseMarrow = {
  id: string;

  type: ElementType;
  appearTime?: number;
  completeIsDestroy?: boolean;
  name?: string;
  timeLineParams?: TimeLineParams;
  startStyle?: StartStyle;
  animation?: Animation[];
}

export type MarrowContainer = {
  type: 'container';
  elementName: '容器',
  children?: Marrow[];
} & BaseMarrow;

export type MarrowImg = {
  type: 'img';
  elementName: '图片',
  src: string;
} & BaseMarrow;

export type MarrowText = {
  type: 'text';
  elementName: '文本',
  text: string;
} & BaseMarrow;

export type Marrow = MarrowContainer | MarrowImg | MarrowText;