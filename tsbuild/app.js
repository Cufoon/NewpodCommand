#!/usr/bin/env node
import { Command, Option } from '@commander-js/extra-typings';
import { APP_VERSION_INFO } from './version.js';
import { addRecordTXT, deleteRecord } from './api.js';
import { initGlobalStore } from './store.js';
initGlobalStore();
const program = new Command();
program
    .name('newpod')
    .description('A cli tool to manage dnspod.')
    .version(APP_VERSION_INFO, '-v, --version', 'Output the version information')
    .helpOption('-h, --help', 'The help information')
    .option('-V', 'Alias for --version')
    .passThroughOptions()
    .action((options, command) => {
    if (options.V === true) {
        console.log(APP_VERSION_INFO);
    }
    else {
        console.log(command.helpInformation());
    }
})
    .helpCommand('help [command]', 'Display help for command');
program
    .command('version')
    .description('Output the version information')
    .action(() => console.log(APP_VERSION_INFO));
program
    .command('addTXT')
    .alias('txt')
    .description('Add a TXT record')
    .argument('<fullDomain>', 'The full domain to add TXT record.')
    .argument('<recordValue>', 'The TXT record value.')
    .option('-v, --verbose', 'Show more detail information')
    .addOption(new Option('-i, --id <id>', 'The dnspod api user secret id.').env('LC_DP_ID'))
    .addOption(new Option('-k, --key <key>', 'The dnspod api user secret key.').env('LC_DP_KEY'))
    .action(async (fullDomain, recordValue, { id, key, verbose }) => {
    const [isSuccess, rid] = await addRecordTXT(fullDomain, recordValue, { id, key, verbose });
    if (isSuccess) {
        console.log(rid);
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});
program
    .command('delete')
    .alias('del')
    .description('Delete a record')
    .argument('<fullDomain>', 'The domain.')
    .argument('<recordId>', 'The record id.')
    .option('-v, --verbose', 'Show more detail information')
    .addOption(new Option('-i, --id <id>', 'The dnspod api user secret id.').env('LC_DP_ID'))
    .addOption(new Option('-k, --key <key>', 'The dnspod api user secret key.').env('LC_DP_KEY'))
    .action(async (fullDomain, recordId, { id, key, verbose }) => {
    const isSuccess = await deleteRecord(fullDomain, recordId, { id, key, verbose });
    if (isSuccess) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});
program.parse();
