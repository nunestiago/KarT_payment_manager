const yup = require('../config/yup');

const userRegisterSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

module.exports = userRegisterSchema;
