exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          user: 1,
          song: 1,
          score: 98,
          mode: 0,
          date: '2019-11-14',
          deleted: false
        },
        {
          id: 2,
          user: 1,
          song: 2,
          score: 98,
          mode: 0,
          date: '2019-11-15',
          deleted: false
        },
        {
          id: 3,
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
