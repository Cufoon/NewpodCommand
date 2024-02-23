export { initGlobalStore } from './store.js';
interface AddRecordTXTActionOptions {
    verbose?: true | undefined;
    id?: string | undefined;
    key?: string | undefined;
}
export declare const addRecordTXT: (fullDomain: string, recordValue: string, { id, key, verbose }: AddRecordTXTActionOptions) => Promise<[false] | [true, number]>;
interface DeleteRecordActionOptions {
    verbose?: true | undefined;
    id?: string | undefined;
    key?: string | undefined;
}
export declare const deleteRecord: (fullDomain: string, recordId: string, { id, key, verbose }: DeleteRecordActionOptions) => Promise<boolean>;
