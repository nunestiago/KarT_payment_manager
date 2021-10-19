import yup from '../config/yup';

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

export default userLoginSchema;
