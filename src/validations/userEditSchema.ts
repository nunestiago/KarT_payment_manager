import yup from '../config/yup';

const userEditSchema = yup.object().shape({
  nome: yup.string().nullable(true),
  email: yup.string().email().nullable(true),
  senha: yup.string().nullable(true),
  telefone: yup.string().nullable(true),
  cpf: yup.string().nullable(true),
});

export default userEditSchema;
