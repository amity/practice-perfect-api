
exports.up = function(knex) {
    return knex.schema.alterTable('users', t => {
        t.string('username').notNullable().alter();
        t.string('password').notNullable().alter();
        t.boolean('deleted').notNullable().defaultTo(false).alter();

        t.unique('username');
        t.unique('email');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', t => {
        t.string('username').nullable().alter();
        t.string('password').nullable().alter();
        t.boolean('deleted').nullable().defaultTo(null).alter();

        t.dropUnique('username');
        t.dropUnique('email');
    });
};
