/// <reference types="react" />
import { Props as UseAnimeProps } from '../hooks/useAnime';
import './index.scss';
declare type Props = {
    src: string;
} & Omit<UseAnimeProps, 'animeRoot'>;
export default function MarrowImg({ src, ...extra }: Props): JSX.Element;
export {};
