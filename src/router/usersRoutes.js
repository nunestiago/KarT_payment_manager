const express = require('express');

const { userRegister, userLogin } = require('../controllers/users');
const tokenValidation = require('../middlewares/tokenValidation');

const userRouter = express();

userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);
userRouter.use(tokenValidation);

module.exports = userRouter;
