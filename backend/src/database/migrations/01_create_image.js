 exports.up = function(knex){
    return knex.schema.createTable('images', table => {
        table.increments('id').primary();
        table.string('image_name');
        table.string('url');
        table.string('key');

        table.integer('dweller_id')
            .notNullable()
            .references('id')
            .inTable('dwellers')
    })
}

exports.down = function(knex){
    return knex.schema.dropTable('images')
}