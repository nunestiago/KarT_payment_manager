exports.up = function (knex) {
  return knex.schema.createTable('clientes', (table) => {
    table.increments('id');
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('cpf', 11).notNullable();
    table.string('telefone', 11).notNullable();
    table.string('cep', 8);
    table.string('logradouro');
    table.string('bairro');
    table.string('cidade');
    table.string('complemento');
    table.string('ponto_referencia');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clientes');
};
