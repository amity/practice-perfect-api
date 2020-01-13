exports.seed = function(knex) {
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert([
        {
          user: 1,
          song: 1,
          score: 98,
          mode: 0,
          date: '2019-11-14',
          deleted: false
        },
        {
          user: 1,
          song: 2,
          score: 98,
          mode: 0,
          date: '2019-11-15',
          deleted: false
        },
        {
          user: 2,
          song: 1,
          score: 108,
          mode: 0,
          date: '2019-11-14',
          deleted: false
        }
      ]);
    });
};
