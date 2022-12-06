/// <reference types="react" />
import { Props as UseAnimeProps } from '../hooks/useAnime';
import './index.scss';
declare type Props = {
    text: string;
} & Omit<UseAnimeProps, 'animeRoot'>;
export default function MarrowText({ text, ...extra }: Props): JSX.Element;
export {};
