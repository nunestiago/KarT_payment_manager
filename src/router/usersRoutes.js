const express = require('express');

const { userRegister } = require('../controllers/users');

const userRouter = express();

userRouter.post('/user/register', userRegister);

module.exports = userRouter;
