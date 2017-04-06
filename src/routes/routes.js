import homeController from '../controllers/homeController';
import itemController from '../controllers/itemController';

export default {
    init: initRoutes
};

function initRoutes(app) {
    app.get('/api/message', homeController.getMessage);

    initItemRoutes(app);

    //all other routes are rendered as home (for client side routing)
    app.get('*', homeController.home);
}

function initItemRoutes(app) {
    app.get('/api/items', itemController.getItems);
    app.post('/api/items', itemController.addItem);
    app.put('/api/items', itemController.updateItem);
    app.delete('/api/items/:id', itemController.removeItem);
}