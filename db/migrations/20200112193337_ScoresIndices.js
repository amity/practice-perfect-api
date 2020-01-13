
exports.up = function(knex) {
    return knex.schema.alterTable('scores', t => {
        t.index(['user', 'song', 'deleted', 'mode']);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('scores', t => {
        t.dropIndex(['user', 'song', 'deleted', 'mode']);
    });
};
