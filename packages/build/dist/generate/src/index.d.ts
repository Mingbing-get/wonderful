export declare type StatusType = 'running' | 'pause' | 'inactive';
export declare type VideoType = 'webm';
export declare type StopType = {
    action: 'download';
    type: VideoType;
} | {
    action: 'function';
    fn: (data: Blob[]) => void;
};
export default class Generate {
    private canvas;
    private recorder;
    private recordBox?;
    private data;
    private base64List;
    private type;
    private startInterval?;
    private status;
    constructor();
    private initCanvas;
    private initRecorder;
    setRecordBox(box: HTMLElement): void;
    start(): void;
    stop(): void;
    createImage(): Promise<void>;
    generateByServe(): Promise<void>;
    draw(): Promise<void>;
    download(): void;
}
