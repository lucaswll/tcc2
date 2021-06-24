exports.up = function(knex){
    return knex.schema.createTable('spaces', table => {
        table.increments('id').primary();
        table.string('space_name');
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('spaces')
}