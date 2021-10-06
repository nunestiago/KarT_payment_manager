const knex = require('../../config/knexConnect');
const chargeRegisterSchema = require('../../validations/chargeRegisterSchema');

const postCharge = async (req, res) => {
  const charge = req.body;
  const { id } = req.user;

  try {
    await chargeRegisterSchema.validate(charge);
    charge.usuario_id = id;
    const newClient = await knex('cobrancas').insert(charge);

    if (!newClient.rowCount) {
      return res
        .status(400)
        .json(
          'Erro ao tentar cadastrar cobrança, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cobrança cadastrada com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { postCharge };
