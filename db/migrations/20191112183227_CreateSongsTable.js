'use strict';

exports.up = function (knex) {
    return knex.schema.createTable('songs', (table) => {
        table.increments('id');
        table.string('title');
        table.string('artist');
        table.string('resource_url');
        table.integer('year');
        table.integer('level');
        table.integer('top_score');
        table.boolean('deleted');
      });
};

exports.down = function (knex) {
    return knex.schema.dropTable('songs');
};
