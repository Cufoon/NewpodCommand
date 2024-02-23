import { setIsShowVerbose } from './store.js';
import { getSplitDomain } from './util.js';
import * as dns from './dns.js';

export { initGlobalStore } from './store.js';

interface AddRecordTXTActionOptions {
  verbose?: true | undefined;
  id?: string | undefined;
  key?: string | undefined;
}

export const addRecordTXT = async (
  fullDomain: string,
  recordValue: string,
  { id, key, verbose }: AddRecordTXTActionOptions
) => {
  setIsShowVerbose(!!verbose);
  if (id) {
    process.env.LC_DP_ID = id;
  }
  if (key) {
    process.env.LC_DP_KEY = key;
  }
  const [mainDomain, subDomain] = getSplitDomain(fullDomain);
  return await dns.addRecordTXT(mainDomain, subDomain, recordValue);
};

interface DeleteRecordActionOptions {
  verbose?: true | undefined;
  id?: string | undefined;
  key?: string | undefined;
}

export const deleteRecord = async (
  fullDomain: string,
  recordId: string,
  { id, key, verbose }: DeleteRecordActionOptions
) => {
  if (id) {
    process.env.LC_DP_ID = id;
  }
  if (key) {
    process.env.LC_DP_KEY = key;
  }
  setIsShowVerbose(!!verbose);
  const [mainDomain] = getSplitDomain(fullDomain);
  return await dns.deleteRecord(mainDomain, parseInt(recordId));
};
