import editUser from '../controllers/users/edit';
import userRegister from '../controllers/users/register';
import userLogin from '../controllers/users/login';
import tokenValidation from '../middlewares/tokenValidation';
import express from 'express';
const userRoutes = express.Router();

userRoutes.post('/user/register', userRegister);
userRoutes.post('/user/login', userLogin);

userRoutes.use(tokenValidation);

userRoutes.put('/user/edit', editUser);

export default userRoutes;
