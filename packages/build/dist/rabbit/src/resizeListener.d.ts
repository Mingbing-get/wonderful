declare type ResizeListener = (clientWidth: number) => void;
declare type listenerType = 'rem2px' | 'breakpoint';
export declare function resizeListenerRegister(type: listenerType, fn: ResizeListener, execute?: boolean): void;
export declare function removeResizeListener(type: listenerType, fn?: ResizeListener): void;
export {};
