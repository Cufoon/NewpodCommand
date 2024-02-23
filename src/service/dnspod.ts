import { requestPost } from './request.js';
import { getSignature } from './signature.js';
import { backendForDnspodURL } from './url.js';
import type * as Dnspod from 'tencentcloud-sdk-nodejs-dnspod/tencentcloud/services/dnspod/v20210323/dnspod_models.js';

const enum DnspodAction {
  GET_DOMAIN_LIST = 'DescribeDomainList',
  GET_DOMAIN_INFO = 'DescribeDomain',
  GET_RECORD_LIST = 'DescribeRecordList',
  SET_RECORD_STATUS = 'ModifyRecordStatus',
  ADD_RECORD = 'CreateRecord',
  DELETE_RECORD = 'DeleteRecord',
  Modify_Record = 'ModifyRecord'
}

type APIResponse<T> = { Error?: any } & T;

interface GlobalReturn<T> {
  Response: APIResponse<T>;
}

const apiRequestDNSPOD = async <T, U>(
  action: DnspodAction,
  payload?: T
): Promise<[APIResponse<U> | undefined, string | undefined]> => {
  const endpoint = 'dnspod.tencentcloudapi.com';
  const service = 'dnspod';
  const region = 'ap-guangzhou';
  const version = '2021-03-23';
  const payload2 = payload || '';
  const payloadJSON = payload2 === '' ? '' : JSON.stringify(payload2);
  const timestamp = Math.floor(Date.now() / 1000); // 单位为秒
  const authorization = await getSignature(
    { endpoint, service, region, version, action },
    timestamp,
    payloadJSON
  );
  const headers = {
    Authorization: authorization,
    'Content-Type': 'application/json; charset=utf-8',
    'X-TC-Action': action,
    'X-TC-Timestamp': timestamp.toString(),
    'X-TC-Version': version
  };
  const [data, err] = await requestPost<T | undefined, GlobalReturn<U>>(
    backendForDnspodURL,
    payload,
    {
      headers,
      withoutToken: true
    }
  );
  if (data) {
    return [data.Response, err];
  }
  return [data, err];
};

const getDomainList = async () =>
  await apiRequestDNSPOD<Dnspod.DescribeDomainListRequest, Dnspod.DescribeDomainListResponse>(
    DnspodAction.GET_DOMAIN_LIST
  );

const getDomain = async (data: Dnspod.DescribeDomainRequest) =>
  await apiRequestDNSPOD<Dnspod.DescribeDomainRequest, Dnspod.DescribeDomainResponse>(
    DnspodAction.GET_DOMAIN_INFO,
    data
  );

const getRecordListOfDomain = async (domain: string) =>
  await apiRequestDNSPOD<Dnspod.DescribeRecordListRequest, Dnspod.DescribeRecordListResponse>(
    DnspodAction.GET_RECORD_LIST,
    { Domain: domain }
  );

const setRecordStatus = async (data: Dnspod.ModifyRecordStatusRequest) =>
  await apiRequestDNSPOD<Dnspod.ModifyRecordStatusRequest, Dnspod.ModifyRecordStatusResponse>(
    DnspodAction.SET_RECORD_STATUS,
    data
  );

const addRecord = async (data: Dnspod.CreateRecordRequest) =>
  await apiRequestDNSPOD<Dnspod.CreateRecordRequest, Dnspod.CreateRecordResponse>(
    DnspodAction.ADD_RECORD,
    data
  );

const deleteRecord = async (data: Dnspod.DeleteRecordRequest) =>
  await apiRequestDNSPOD<Dnspod.DeleteRecordRequest, Dnspod.DeleteRecordResponse>(
    DnspodAction.DELETE_RECORD,
    data
  );

const modifyRecord = async (data: Dnspod.ModifyRecordRequest) =>
  await apiRequestDNSPOD<Dnspod.ModifyRecordRequest, Dnspod.ModifyRecordResponse>(
    DnspodAction.Modify_Record,
    data
  );

export const DnspodAPI = {
  getDomainList,
  getDomain,
  getRecordListOfDomain,
  setRecordStatus,
  addRecord,
  deleteRecord,
  modifyRecord
};
