import type * as Dnspod from 'tencentcloud-sdk-nodejs-dnspod/tencentcloud/services/dnspod/v20210323/dnspod_models.js';
type APIResponse<T> = {
    Error?: any;
} & T;
export declare const DnspodAPI: {
    getDomainList: () => Promise<[APIResponse<Dnspod.DescribeDomainListResponse> | undefined, string | undefined]>;
    getDomain: (data: Dnspod.DescribeDomainRequest) => Promise<[APIResponse<Dnspod.DescribeDomainResponse> | undefined, string | undefined]>;
    getRecordListOfDomain: (domain: string) => Promise<[APIResponse<Dnspod.DescribeRecordListResponse> | undefined, string | undefined]>;
    setRecordStatus: (data: Dnspod.ModifyRecordStatusRequest) => Promise<[APIResponse<Dnspod.ModifyRecordStatusResponse> | undefined, string | undefined]>;
    addRecord: (data: Dnspod.CreateRecordRequest) => Promise<[APIResponse<Dnspod.CreateRecordResponse> | undefined, string | undefined]>;
    deleteRecord: (data: Dnspod.DeleteRecordRequest) => Promise<[APIResponse<Dnspod.DeleteRecordResponse> | undefined, string | undefined]>;
    modifyRecord: (data: Dnspod.ModifyRecordRequest) => Promise<[APIResponse<Dnspod.ModifyRecordResponse> | undefined, string | undefined]>;
};
export {};
