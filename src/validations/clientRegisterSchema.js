const yup = require('../config/yup');

const clientRegisterSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  telefone: yup.string().required(),
  cep: yup.string().nullable(true),
  logradouro: yup.string().nullable(true),
  bairro: yup.string().nullable(true),
  cidade: yup.string().nullable(true),
  complemento: yup.string().nullable(true),
  ponto_referencia: yup.string().nullable(true),
});

module.exports = clientRegisterSchema;
