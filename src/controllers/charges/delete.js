const knex = require('../../config/knexConnect');

const deleteCharge = async (req, res) => {
  const charge = req.body;
  try {
    const deleteCharge = await knex('cobrancas').where('id', charge.id).del();
    console.log(deleteCharge);
    if (deleteCharge === 0) {
      return res
        .status(400)
        .json(
          'Erro ao tentar apagar cobrança, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cobrança foi excluída');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { deleteCharge };
