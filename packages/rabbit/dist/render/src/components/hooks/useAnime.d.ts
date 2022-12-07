import React from 'react';
import { Animation, TimeLineParams, StartStyle } from '@marrow/global';
export declare type Props = {
    id: string;
    animeRoot: React.RefObject<HTMLElement>;
    animation?: Animation[];
    timeLineParams?: TimeLineParams;
    startStyle?: StartStyle;
    appearTime?: number;
    completeIsDestroy?: boolean;
};
export default function useAnime({ id, animeRoot, animation, timeLineParams, startStyle, appearTime, completeIsDestroy }: Props): void;
