import homeController from '../controllers/homeController';
import apiController from '../controllers/apiController';
import helper from './routeHelper';

export default {
    init: initRoutes
};

function initRoutes(app) {
    helper.init(app);

    helper.get('/api/message', apiController.getMessage);

    helper.get('/api/items', apiController.getItems);

    //all other routes are rendered as home (for client side routing)
    helper.get('*', homeController.home);
}