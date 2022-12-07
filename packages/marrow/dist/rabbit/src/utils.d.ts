export declare function getLocation(dom: HTMLElement): {
    top: number;
    left: number;
};
export declare type Rem2pxProps = {
    baseWidth?: number;
    baseMobilePx?: number;
    breakPoint?: number;
    pcPx?: number;
};
export declare function rem2px(clientWidth: number, { baseWidth, baseMobilePx, breakPoint, pcPx }?: Rem2pxProps): void;
