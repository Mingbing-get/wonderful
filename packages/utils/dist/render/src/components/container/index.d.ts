/// <reference types="react" />
import { Props as UseAnimeProps } from '../hooks/useAnime';
import { Marrow } from '@marrow/global';
import './index.scss';
declare type Props = {
    children?: Marrow[];
} & Omit<UseAnimeProps, 'animeRoot'>;
export default function MarrowContainer({ children, ...extra }: Props): JSX.Element;
export {};
