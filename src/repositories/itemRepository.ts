import pathHelper from '../helpers/pathHelper';
import * as fs from 'fs-extra';
import * as _ from 'lodash';

export default {
    getItems,
    addItem,
    updateItem,
    removeItem
};

const dataPath = pathHelper.getLocalRelative('data.json');
const initDataPath = pathHelper.getDataRelative('data.json');
let dataCache = null;

function getData() {
    if (!dataCache) {
        if (fs.existsSync(dataPath)) {
            dataCache = fs.readJsonSync(dataPath);
        } else {
            dataCache = fs.readJsonSync(initDataPath);
        }
    }

    return dataCache;
}

function saveData() {
    fs.writeJSONSync(dataPath, dataCache);
}

function getItems() {
    let data = getData();

    return data.items;
}

function addItem(item) {
    let data = getData();

    let maxId = _.max(data.items.map(x => x.id));

    item  = {
        id: maxId ? maxId + 1 : 1,
        ...item
    };

    data.items.push(item);

    saveData();

    return item;
}

function updateItem(item) {
    let data = getData();

    let index = _.findIndex(data.items, x => x.id === item.id);

    if (index === -1) throw new Error(`Cannot find item with ID ${item.id}`);

    data.items[index] = item;

    saveData();
}

function removeItem(id) {
    let data = getData();

    _.remove(data.items, x => x.id === id);

    saveData();
}
