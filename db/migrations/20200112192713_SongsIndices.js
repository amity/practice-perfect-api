
exports.up = function(knex) {
    return knex.schema.alterTable('songs', t => {
        t.index(['deleted', 'level']);
        t.index('title');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('songs', t => {
        t.dropIndex(['deleted', 'level']);
        t.dropIndex('title');
    });
};
