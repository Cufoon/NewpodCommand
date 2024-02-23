import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const nowDate = new Date();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packagePath = resolve(__dirname, '../package.json');
const appFilePath = resolve(__dirname, '../tsbuild/app.js');
const appInfoFilePath = resolve(__dirname, '../tsbuild/version.js');
const appInfoFileTsPath = resolve(__dirname, '../tsbuild/version.d.ts');

const packageInfo = JSON.parse(fs.readFileSync(packagePath).toString());
const appVersion = packageInfo.version;

const dataApp = fs.readFileSync(appFilePath);

fs.writeFileSync(appFilePath, '#!/usr/bin/env node\n');
fs.appendFileSync(appFilePath, dataApp);

const nowVersion = `NewpodCommand v${appVersion}(${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString()})`;
const dataAppInfoPlaceholder = fs.readFileSync(appInfoFilePath).toString();
const dataAppInfo = dataAppInfoPlaceholder.replace(
  'cufoon_application_version_info_placehodler',
  `${nowVersion} @Cufoon`
);
fs.writeFileSync(appInfoFilePath, dataAppInfo);

const dataAppInfoPlaceholderTs = fs.readFileSync(appInfoFileTsPath).toString();
const dataAppInfoTs = dataAppInfoPlaceholderTs.replace(
  'cufoon_application_version_info_placehodler',
  `${nowVersion} @Cufoon`
);
fs.writeFileSync(appInfoFileTsPath, dataAppInfoTs);
