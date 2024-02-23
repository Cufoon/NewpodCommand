export interface Service {
    endpoint: string;
    service: string;
    region: string;
    action: string;
    version: string;
}
export declare function getSignature(service: Service, timestamp: number, payload?: string): Promise<string>;
