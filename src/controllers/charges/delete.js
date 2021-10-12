// const knex = require('../../config/knexConnect');
// const chargeRegisterSchema = require('../../validations/chargeRegisterSchema');

// const deleteCharge = async (req, res) => {
//   const charge = req.body;
//   const { id } = req.user;
//   try {
//     const editCharge = await knex('cobrancas').where('id', charge.id).del();

//     if (editCharge === 0) {
//       return res
//         .status(400)
//         .json(
//           'Erro ao tentar cadastrar cobrança, favor entrar em contato com suporte da KarT Devs.',
//         );
//     }

//     return res.status(200).json('Cobrança editada com sucesso!');
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// module.exports = { deleteCharge };
