exports.seed = function(knex) {
  return knex('songs').del()
    .then(function () {
      return knex('songs').insert([
        {
          id: 1,
          title: 'Superunknown',
          artist: 'Soundgarden',
          resource_url: 'https://storage.googleapis.com/practiceperfect-songs/reve.musicxml',
          year: 1994,
          level: 1,
          top_score: 898989,
          deleted: false
        },
        {
          id: 2,
          title: 'Fences',
          artist: 'Paramore',
          resource_url: 'https://storage.googleapis.com/practiceperfect-songs/reve.musicxml',
          year: 2007,
          level: 1,
          top_score: 898989,
          deleted: false
        },
        {
          id: 3,
          title: 'Closer',
          artist: 'Nine Inch Nails',
          resource_url: '',
          year: 1994,
          level: 1,
          top_score: 898989,
          deleted: false
        }
      ]);
    });
};
