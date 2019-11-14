exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'soph_iest',
          email: 'sophie.a.debs@gmail.com',
          password: 'cs98',
          name: 'Sophie Debs',
          join_date: '2019-11-14',
          level: 1,
          deleted: false
        },
        {
          id: 2,
          username: 'abigailychen',
          email: 'abigailychen@gmail.com',
          password: 'cs98',
          name: 'Abby Chen',
          join_date: '2019-11-14',
          level: 2,
          deleted: false
        },
        {
          id: 3,
          username: 'seandartmouth',
          email: 'sean.k.hawkins.20@gmail.com',
          password: 'cs98',
          name: 'Sean Hawkins',
          join_date: '2019-11-14',
          level: 1,
          deleted: false
        },
        {
          id: 4,
          username: 'a-matusewicz',
          email: 'anna.d.mat@gmail.com',
          password: 'cs98',
          name: 'Anna Matusewicz',
          join_date: '2019-11-14',
          level: 3,
          deleted: false
        }
      ]);
    });
};
