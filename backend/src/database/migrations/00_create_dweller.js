exports.up = function(knex){
    return knex.schema.createTable('dwellers', table => {
        table.increments('id').primary();
        table.string('name').notNullable;
        //table.string('images').notNullable;
        table.string('whatsapp').notNullable;
        table.string('building').notNullable;
        table.string('ap').notNullable;
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('dwellers')
}