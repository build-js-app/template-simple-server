import helper from './_controllerHelper';
import pathHelper from '../helpers/pathHelper';

export default {
    home,
    getMessage
};

async function home(req, res) {
    try {
        return res.sendFile(pathHelper.getClientRelative('index.html'));
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getMessage(req, res) {
    try {
        let message = 'Hello World from server!';

        return helper.sendData(message, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}