import * as _ from 'lodash';
import * as Joi from 'joi';

import config from '../config';
import logger from '../logger';

export default {
    sendData,
    sendFailureMessage,
    loadSchema
};

function sendFailureMessage(error, res) {
    let statusCode = 500;
    let message = 'Server Error';
    let status = 'error';

    //Joi validation error
    if (error.isValidationError) {
        statusCode = 400;
        message = error.message;
        status = 'validation error';
    }

    if (statusCode === 500) {
        //log unexpected errors
        console.log(error);
    }

    logError(error);

    res.status(statusCode).send({
        status,
        message
    });
}

function logError(error) {
    if (error.isValidationError) return;

    if (config.isDevLocal) {
        console.log(error);
    }

    logger.error(error);
}

function sendData(data, res) {
    res.status(200).send({
        status: 'ok',
        data
    });
}

function loadSchema(data, schema): Promise<any> {
    let validationOptions = {
        stripUnknown: true
    };

    return new Promise((resolve, reject) => {
        Joi.validate(data, schema, validationOptions, (err, val) => {
            if (!err) return resolve(val);

            let error = null;

            if (err.name !== 'ValidationError') {
                error = new Error('Unsupported Validation Error');
                return reject(err);
            }

            let validationMessage = err.details[0].message;

            error = new Error('Validation Error');
            error.isValidationError = true;
            error.message = validationMessage;

            return reject(error);
        });
    });
}