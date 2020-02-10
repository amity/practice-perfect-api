const controller = require('../../../src/features/songs/controller');
const songData   = require('../../../db/seeds/data/songs');

test('findById', async () => {
  expect(await controller.findById(11)).toMatchObject(songData.find(
      ({id}) => id == 11)
    );
});

test('list', async () => {
    expect(await controller.list()).toMatchObject(songData);
  });

let newId;

test('create', async () => {
    const newSong = {
        title: "New Song",
        artist: "New Artist",
        resource_url: "https://google.com",
        year: 2020,
        level: 1,
        top_score: 100
    };
    const createdSong = await controller.create(newSong);
    newId = createdSong.id;
    expect(createdSong).toMatchObject(newSong);
});

test('deleteById', async () => {
    expect(await controller.deleteById(newId)).toMatchObject(
        {id: newId, title: "New Song", deleted: true}
    );
});


