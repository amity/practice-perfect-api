'use strict';

exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('username');
        table.string('email');
        table.string('password');
        table.string('name');
        table.integer('level');
        table.date('join_date');
        table.boolean('deleted');
      });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
