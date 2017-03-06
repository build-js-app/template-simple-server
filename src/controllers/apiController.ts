import helper from './_controllerHelper';

export default {
    getMessage
};

async function getMessage(req, res) {
    try {
        let message = 'Hello World from server!';

        return helper.sendData(message, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}