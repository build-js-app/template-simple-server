let app = null;
import config from '../config';

export default {
    init,
    get: getRout,
    put: putRout,
    post: postRout,
    delete: deleteRout
}

function init(expressApp) {
    app = expressApp;
}

function getRout(route, handler) {
    let handlers = getHandlers(handler);

    app.get(route, handlers)
}

function putRout(route, handler) {
    let handlers = getHandlers(handler);

    app.put(route, handlers)
}

function postRout(route, handler) {
    let handlers = getHandlers(handler);

    app.post(route, handlers)
}

function deleteRout(route, handler) {
    let handlers = getHandlers(handler);

    app.delete(route, handlers)
}

function getHandlers(handler) {
    let handlers = [];

    handlers.push(handler);

    return handlers;
}