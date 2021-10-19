import yup from '../config/yup';

const chargeRegisterSchema = yup.object().shape({
  cliente_id: yup.string().required('Cliente é campo obrigatório'),
  descricao: yup.string().required('Descrição é campo obrigatório'),
  status: yup.bool().required('Status é campo obrigatório'),
  valor: yup.number().min(1).required('Valor é campo obrigatório'),
  vencimento: yup.date().required('Vencimento é campo obrigatório'),
});

export default chargeRegisterSchema;
