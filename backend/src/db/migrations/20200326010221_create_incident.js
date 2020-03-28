
exports.up = function(knex) {
    return knex.schema.createTable('incident', function(table) {
        table.increments() // id numerica
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        table.string('ngo_id').notNullable() // chave estrangeira que referencia o id da ONG
        table.foreign('ngo_id').references('id').inTable('ngo')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incident')
};
