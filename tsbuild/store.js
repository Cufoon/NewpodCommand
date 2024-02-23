const defaultGlobalData = {
    showVerbose: false
};
export const initGlobalStore = () => {
    globalThis.cufoon_store_for_newpod = { store: { ...defaultGlobalData } };
};
const getGlobalStore = () => globalThis.cufoon_store_for_newpod;
export const getIsShowVerbose = () => {
    return getGlobalStore().store.showVerbose;
};
export const setIsShowVerbose = (v) => {
    getGlobalStore().store.showVerbose = v;
};
