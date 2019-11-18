
exports.up = function(knex) {
    return knex.schema.alterTable('scores', t => {
        t.integer('user').notNullable().alter();
        t.integer('song').notNullable().alter();
        t.integer('score').notNullable().defaultTo(0).alter();
        t.integer('mode').notNullable().defaultTo(0).alter();

        t.foreign('user').references('users.id');
        t.foreign('song').references('songs.id');
      });
  };

  exports.down = function(knex) {
      return knex.schema.alterTable('scores', t => {
        t.integer('user').nullable().alter();
        t.integer('song').nullable().alter();
        t.integer('score').nullable().defaultTo(null).alter();
        t.integer('mode').nullable().defaultTo(null).alter();

        t.dropForeign('user');
        t.dropForeign('song');
      });
  };
