import yup from '../config/yup';

const userRegisterSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

export default userRegisterSchema;
