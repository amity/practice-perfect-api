const scores = require('./data/scores');

exports.seed = function(knex) {
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert(scores);
    });
};
