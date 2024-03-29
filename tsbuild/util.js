import { ParseResultType, parseDomain, Validation } from 'parse-domain';
import { getIsShowVerbose } from './store.js';
export const getSplitDomain = (fullDomain) => {
    const parseResult = parseDomain(fullDomain, { validation: Validation.Lax });
    let mainDomain = fullDomain;
    let subDomain = '';
    if (parseResult.type === ParseResultType.Listed) {
        const { subDomains, domain, topLevelDomains } = parseResult;
        mainDomain = `${domain}.${topLevelDomains.join('.')}`;
        subDomain = subDomains.join('.');
        if (getIsShowVerbose()) {
            console.log('传入的域名');
            console.log('subDomains\t', subDomains);
            console.log('domain\t\t', domain);
            console.log('topLevelDomains\t', topLevelDomains);
        }
    }
    return [mainDomain, subDomain];
};
