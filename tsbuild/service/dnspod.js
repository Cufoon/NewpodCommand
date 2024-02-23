import { requestPost } from './request.js';
import { getSignature } from './signature.js';
import { backendForDnspodURL } from './url.js';
var DnspodAction;
(function (DnspodAction) {
    DnspodAction["GET_DOMAIN_LIST"] = "DescribeDomainList";
    DnspodAction["GET_DOMAIN_INFO"] = "DescribeDomain";
    DnspodAction["GET_RECORD_LIST"] = "DescribeRecordList";
    DnspodAction["SET_RECORD_STATUS"] = "ModifyRecordStatus";
    DnspodAction["ADD_RECORD"] = "CreateRecord";
    DnspodAction["DELETE_RECORD"] = "DeleteRecord";
    DnspodAction["Modify_Record"] = "ModifyRecord";
})(DnspodAction || (DnspodAction = {}));
const apiRequestDNSPOD = async (action, payload) => {
    const endpoint = 'dnspod.tencentcloudapi.com';
    const service = 'dnspod';
    const region = 'ap-guangzhou';
    const version = '2021-03-23';
    const payload2 = payload || '';
    const payloadJSON = payload2 === '' ? '' : JSON.stringify(payload2);
    const timestamp = Math.floor(Date.now() / 1000);
    const authorization = await getSignature({ endpoint, service, region, version, action }, timestamp, payloadJSON);
    const headers = {
        Authorization: authorization,
        'Content-Type': 'application/json; charset=utf-8',
        'X-TC-Action': action,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Version': version
    };
    const [data, err] = await requestPost(backendForDnspodURL, payload, {
        headers,
        withoutToken: true
    });
    if (data) {
        return [data.Response, err];
    }
    return [data, err];
};
const getDomainList = async () => await apiRequestDNSPOD(DnspodAction.GET_DOMAIN_LIST);
const getDomain = async (data) => await apiRequestDNSPOD(DnspodAction.GET_DOMAIN_INFO, data);
const getRecordListOfDomain = async (domain) => await apiRequestDNSPOD(DnspodAction.GET_RECORD_LIST, { Domain: domain });
const setRecordStatus = async (data) => await apiRequestDNSPOD(DnspodAction.SET_RECORD_STATUS, data);
const addRecord = async (data) => await apiRequestDNSPOD(DnspodAction.ADD_RECORD, data);
const deleteRecord = async (data) => await apiRequestDNSPOD(DnspodAction.DELETE_RECORD, data);
const modifyRecord = async (data) => await apiRequestDNSPOD(DnspodAction.Modify_Record, data);
export const DnspodAPI = {
    getDomainList,
    getDomain,
    getRecordListOfDomain,
    setRecordStatus,
    addRecord,
    deleteRecord,
    modifyRecord
};
