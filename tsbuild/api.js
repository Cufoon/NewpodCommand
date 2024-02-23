import { setIsShowVerbose } from './store.js';
import { getSplitDomain } from './util.js';
import * as dns from './dns.js';
export { initGlobalStore } from './store.js';
export const addRecordTXT = async (fullDomain, recordValue, { id, key, verbose }) => {
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
export const deleteRecord = async (fullDomain, recordId, { id, key, verbose }) => {
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
