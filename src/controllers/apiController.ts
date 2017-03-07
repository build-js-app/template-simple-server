import helper from './_controllerHelper';
import itemRepository from '../repositories/itemRepository';

export default {
    getMessage,
    getItems
};

async function getMessage(req, res) {
    try {
        let message = 'Hello World from server!';

        return helper.sendData(message, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function getItems(req, res) {
    try {
        let items = await itemRepository.getList();

        return helper.sendData(items, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}