const express = require('express');

const { userRegister, userLogin } = require('../controllers/users');

const userRouter = express();

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);

module.exports = userRouter;
