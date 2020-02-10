const songs = require('./data/songs');

exports.seed = function(knex) {
  return knex('songs').del()
    .then(function () {
      return knex('songs').insert(songs);
    });
};
