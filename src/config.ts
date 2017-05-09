import * as _ from 'lodash';
import * as fs from 'fs-extra';

import pathHelper from './helpers/pathHelper';

let logConfig = true;
let config = {
    port: 5000,
    isDevLocal: process.env.NODE_ENV !== 'production',
    appVersion: '0.0.1'
};

function tryReadConfigFile(path) {
    try {
        return fs.readJsonSync(path);
    } catch (err) {
        return {};
    }
}

let defaultFile = tryReadConfigFile(pathHelper.getDataRelative('config.json'));
_.merge(config, defaultFile);

let localFile = tryReadConfigFile(pathHelper.getLocalRelative('config.local.json'));
_.merge(config, localFile);

if (logConfig) {
    console.log('App configuration:');
    console.log(JSON.stringify(config, null, 2));
}

export default config;