const express = require('express');
const { clientRegister } = require('../controllers/clients');

const { userRegister, userLogin, editUser } = require('../controllers/users');
const tokenValidation = require('../middlewares/tokenValidation');

const userRouter = express();

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);

userRouter.use(tokenValidation);

userRouter.put('/user/edit', editUser);
userRouter.post('/client/register', clientRegister);

module.exports = userRouter;
