
exports.up = function(knex) {
    return knex.schema.alterTable('users', t => {
        t.index('username');
        t.index(['email', 'password']);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', t => {
        t.dropIndex('username');
        t.dropIndex(['email', 'password']);
    });
};
