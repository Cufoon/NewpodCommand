export interface NewpodGlobal {
    showVerbose: boolean;
}
export interface NewpodGlobalHolder {
    store: NewpodGlobal;
}
export declare const initGlobalStore: () => void;
export declare const getIsShowVerbose: () => boolean;
export declare const setIsShowVerbose: (v: boolean) => void;
