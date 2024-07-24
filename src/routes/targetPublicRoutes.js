const express = require('express');

function createTargetPublicRoutes(targetPublicController){
    const router = express.Router();
    router.post('/', targetPublicController.createTargetPublic.bind(targetPublicController));
    router.get('/', targetPublicController.getTargetPublic.bind(targetPublicController));
    router.delete('/:id', targetPublicController.deleteTargetPublic.bind(targetPublicController));
    return router
}

module.exports = createTargetPublicRoutes;
