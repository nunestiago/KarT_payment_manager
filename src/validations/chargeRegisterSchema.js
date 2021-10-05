const yup = require('../config/yup');

const chargeRegisterSchema = yup.object().shape({
  cliente_id: yup.string().required(),
  descricao: yup.string().required(),
  status: yup.bool().required(),
  valor: yup.number().min(1).required(),
  vencimento: yup.date().required(),
});

module.exports = chargeRegisterSchema;
