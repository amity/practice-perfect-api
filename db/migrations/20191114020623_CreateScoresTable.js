'use strict';

exports.up = function (knex) {
    return knex.schema.createTable('scores', (table) => {
        table.increments('id');
        table.integer('user');
        table.integer('song');
        table.integer('score');
        table.integer('mode');
        table.date('date');
        table.boolean('deleted');
      });
};

exports.down = function (knex) {
    knex.schema.dropTable('scores');
};
