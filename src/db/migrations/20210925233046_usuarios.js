exports.up = function (knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id');
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('senha').notNullable();
    table.string('cpf', 11);
    table.string('telefone', 11);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios');
};
