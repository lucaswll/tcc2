exports.up = function(knex){
    return knex.schema.createTable('dweller_space', table => {
        table.increments('id').primary();

        table.integer('dweller_id')
            .notNullable()
            .references('id')
            .inTable('dwellers')

        table.integer('space_id')
            .notNullable()
            .references('id')
            .inTable('spaces')
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('dweller_space')
}