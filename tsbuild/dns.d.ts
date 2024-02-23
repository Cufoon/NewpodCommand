export declare const addRecordTXT: (domain: string, subDomain: string, recordValue: string) => Promise<[false] | [true, number]>;
export declare const deleteRecord: (domain: string, recordId: number) => Promise<boolean>;
