const express = require('express');
const validateSchema  = require('../middlewares/userValidation');
const validateLogin  = require('../middlewares/loginValidation');
const { createUserSchema, updateUserSchema, getByIdSchema, authorizationSchema }  = require('../schemas/userSchema');
const userLoginSchema = require('../schemas/loginSchema');

function createUserRoutes(userController){
    const router = express.Router();
    router.get('/', userController.getUsers.bind(userController));
    router.post('/', validateSchema(createUserSchema), userController.create.bind(userController));
    router.post('/login', validateLogin(userLoginSchema), userController.loginUser.bind(userController));
    router.put('/:id', validateSchema(updateUserSchema), userController.updateUser.bind(userController));
    router.delete('/', validateSchema(authorizationSchema), userController.deleteUser.bind(userController));
    router.get('/:id', validateSchema(getByIdSchema), userController.getUserById.bind(userController));
    router.post('/refresh-token', userController.createRefreshToken.bind(userController));
    router.get('/:id/feed', validateSchema(authorizationSchema), userController.getFeedNews.bind(userController));
    router.get('/reports/post-statistics', userController.getPostStatistics.bind(userController));
    return router
}

module.exports = createUserRoutes;
