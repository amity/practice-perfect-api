
exports.up = function(knex) {
  return knex.schema.alterTable('songs', t => {
      t.string('title').notNullable().alter();
      t.string('resource_url').notNullable().alter();
      t.boolean('deleted').notNullable().defaultTo(false).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('songs', t => {
        t.string('title').nullable().alter();
        t.string('resource_url').nullable().alter();
        t.boolean('deleted').nullable().defaultTo(null).alter();
    });
};
