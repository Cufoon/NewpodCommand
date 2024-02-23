import { DnspodAPI } from './service/dnspod.js';
export const addRecordTXT = async (domain, subDomain, recordValue) => {
    try {
        const [d, e] = await DnspodAPI.addRecord({
            Domain: domain,
            RecordType: 'TXT',
            RecordLine: '默认',
            Value: recordValue,
            SubDomain: subDomain,
            TTL: 600
        });
        if (e || !d) {
            return [false];
        }
        if (d.RecordId === undefined || d.RecordId === null) {
            return [false];
        }
        return [true, d.RecordId];
    }
    catch (err) {
        console.log(err);
        return [false];
    }
};
export const deleteRecord = async (domain, recordId) => {
    try {
        const [d, e] = await DnspodAPI.deleteRecord({
            Domain: domain,
            RecordId: recordId
        });
        if (e || !d) {
            return false;
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
