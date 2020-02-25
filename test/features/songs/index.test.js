'use strict';

const Hapi = require('hapi');
const knex = require('../../../db/knex');

const songs    = require('../../../src/features/songs/index');
const songData = require('../../../db/seeds/data/songs');

const PATH = '/songs';

const server = Hapi.server();
server.route(songs);

describe('Songs Integration testing', () => {

  beforeAll(async (done) => {
    await server.start();
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  afterAll(async (done) => {
    await server.stop();
    knex.destroy(done);
  });

  // Necessary due to JSON.parse's interactions with SQL dates.

  test('findById', async () => {
      const testId = 1;
      const injectOptions = {
        method: 'GET',
        url: PATH + '/' + testId
      };

      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.payload)).toMatchObject(songData[0]);
  });

  test('list', async () => {
    const injectOptions = {
      method: 'GET',
      url: PATH
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject(songData);
  });

  let newId;
  test('create', async () => {
    const newSong = {
      title: "New Song",
      artist: "harunemuri",
      level: 1,
      resource_url: "google.com",
      year: 2040,
      top_score: 8008135
    };
    const injectOptions = {
      method: 'POST',
      url: PATH,
      payload: newSong
    };

    const response = await server.inject(injectOptions);
    const createdSong = JSON.parse(response.payload);
    newId = createdSong.id;

    expect(response.statusCode).toEqual(200);
    expect(createdSong).toMatchObject(newSong);
  });

  test('deleteById', async () => {
    const injectOptions = {
      method: 'DELETE',
      url: PATH + '/' + newId
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject({id: newId, title: "New Song", deleted: true});
  });

});
