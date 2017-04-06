import * as Joi from 'joi';
import helper from './_controllerHelper';
import itemRepository from '../repositories/itemRepository';

export default {
    getItems,
    addItem,
    updateItem,
    removeItem
};

async function getItems(req, res) {
    try {
        let items = await itemRepository.getItems();

        return helper.sendData(items, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function addItem(req, res) {
    try {
        let data = await helper.loadSchema(req.body, {
            name: Joi.string().required()
        });

        let item = await itemRepository.addItem(data);

        return helper.sendData(item, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function updateItem(req, res) {
    try {
        let data = await helper.loadSchema(req.body, {
            id: Joi.number().required(),
            name: Joi.string().required()
        });

        await itemRepository.updateItem(data);

        return helper.sendData(data, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function removeItem(req, res) {
    try {
        let data = await helper.loadSchema(req.params, {
            id: Joi.number().required()
        });

        await itemRepository.removeItem(data.id);

        return helper.sendData({}, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}
