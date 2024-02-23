declare module globalThis {
  let cufoon_store_for_newpod: NewpodGlobalHolder;
}

export interface NewpodGlobal {
  showVerbose: boolean;
}

export interface NewpodGlobalHolder {
  store: NewpodGlobal;
}

const defaultGlobalData: NewpodGlobal = {
  showVerbose: false
};

export const initGlobalStore = () => {
  globalThis.cufoon_store_for_newpod = { store: { ...defaultGlobalData } };
};

const getGlobalStore = () => globalThis.cufoon_store_for_newpod;

export const getIsShowVerbose = () => {
  return getGlobalStore().store.showVerbose;
};

export const setIsShowVerbose = (v: boolean) => {
  getGlobalStore().store.showVerbose = v;
};
