import { getIsShowVerbose } from '../store.js';
import { uint8toHex } from './hex.js';
const encoder = new TextEncoder();
function hex(arrayBuffer) {
    const buffer = new Uint8Array(arrayBuffer);
    let s = '';
    for (const idx of buffer) {
        s = s.concat(uint8toHex[idx] || '');
    }
    return s;
}
async function signWithSHA256HMAC(message, secret) {
    const messageBuffer = encoder.encode(message);
    const key = await crypto.subtle.importKey('raw', secret, {
        name: 'HMAC',
        hash: { name: 'SHA-256' }
    }, false, ['sign', 'verify']);
    return await crypto.subtle.sign('HMAC', key, messageBuffer);
}
async function getHash(message) {
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(message);
    const r = await crypto.subtle.digest('SHA-256', messageBuffer);
    return hex(r);
}
function getDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
export async function getSignature(service, timestamp, payload = '') {
    const secretId = process.env.LC_DP_ID;
    const secretKey = process.env.LC_DP_KEY;
    if (secretId === undefined || secretId === '' || secretKey === undefined || secretKey === '') {
        return '';
    }
    const isShowVerbose = getIsShowVerbose();
    const date = getDate(timestamp);
    const signedHeaders = 'content-type;host';
    const hashedRequestPayload = await getHash(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = 'content-type:application/json; charset=utf-8\n' + 'host:' + service.endpoint + '\n';
    const canonicalRequest = httpRequestMethod +
        '\n' +
        canonicalUri +
        '\n' +
        canonicalQueryString +
        '\n' +
        canonicalHeaders +
        '\n' +
        signedHeaders +
        '\n' +
        hashedRequestPayload;
    isShowVerbose && console.log(canonicalRequest);
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = await getHash(canonicalRequest);
    const credentialScope = date + '/' + service.service + '/' + 'tc3_request';
    const stringToSign = algorithm + '\n' + timestamp + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
    isShowVerbose && console.log(stringToSign);
    const kDate = await signWithSHA256HMAC(date, encoder.encode('TC3' + secretKey));
    const kService = await signWithSHA256HMAC(service.service, kDate);
    const kSigning = await signWithSHA256HMAC('tc3_request', kService);
    const signature = hex(await signWithSHA256HMAC(stringToSign, kSigning));
    isShowVerbose && console.log(signature);
    const authorization = algorithm +
        ' ' +
        'Credential=' +
        secretId +
        '/' +
        credentialScope +
        ', ' +
        'SignedHeaders=' +
        signedHeaders +
        ', ' +
        'Signature=' +
        signature;
    isShowVerbose && console.log('Authorization:\n', authorization);
    const curlCommand = 'curl -X POST ' +
        'https://' +
        service.endpoint +
        ' -H "Authorization: ' +
        authorization +
        '"' +
        ' -H "Content-Type: application/json; charset=utf-8"' +
        ' -H "Host: ' +
        service.endpoint +
        '"' +
        ' -H "X-TC-Action: ' +
        service.action +
        '"' +
        ' -H "X-TC-Timestamp: ' +
        timestamp.toString() +
        '"' +
        ' -H "X-TC-Version: ' +
        service.version +
        '"' +
        ' -H "X-TC-Region: ' +
        service.region +
        '"' +
        " -d '" +
        payload +
        "'";
    isShowVerbose && console.log(curlCommand);
    return authorization;
}
