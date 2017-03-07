import pathHelper from '../helpers/pathHelper';
let jsonfile = require('jsonfile');

export default {
    getList
}

const dataJson = pathHelper.getDataRelative('data.json');

function getList() {
    let data = jsonfile.readFileSync(dataJson);

    if (data && data.items) return data.items;

    return [];
}