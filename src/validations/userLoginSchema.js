const yup = require('../config/yup');

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

module.exports = userLoginSchema;
