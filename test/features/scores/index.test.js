'use strict';

const Hapi = require('hapi');
const knex = require('../../../db/knex');

const scores    = require('../../../src/features/scores/index');
const scoreData = require('../../../db/seeds/data/scores');

const PATH = '/scores';

const server = Hapi.server();
server.route(scores);

describe('Scores Integration testing', () => {

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
  const wrapDate = (obj) => ({...obj, date: `${obj.date.toISOString()}`});

  test('findScore', async () => {
      const userId = 1;
      const songId = 1;
      const injectOptions = {
        method: 'GET',
        url: PATH + '/' + userId + '/' + songId
      };

      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.payload)).toMatchObject(wrapDate(scoreData[0]));
  });

  test('listByUser', async () => {
    const userId = 1;
    const injectOptions = {
      method: 'GET',
      url: PATH + '/' + userId
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject(scoreData
        .filter((({user}) => user == userId))
        .map(obj => wrapDate(obj)));
  });

  test('listBySong', async () => {
    const songId = 1;
    const injectOptions = {
      method: 'GET',
      url: '/leaderboards' + '/' + songId
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject(scoreData
        .filter((({song}) => song == songId))
        .map(obj => wrapDate(obj)));
  });

  let newId;
  const user = 2;
  const song = 2;
  test('create', async () => {
    const newScore = {
      user,
      song,
      score: 83,
      mode: 0,
    };
    const injectOptions = {
      method: 'POST',
      url: PATH,
      payload: newScore
    };

    const response = await server.inject(injectOptions);
    const createdScore = JSON.parse(response.payload);
    newId = createdScore.id;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    expect(response.statusCode).toEqual(200);
    expect(createdScore).toMatchObject(wrapDate({...newScore, date}));
  });

  test('update', async () => {
    const updatedScore = {
        score: 93
    };
    const injectOptions = {
      method: 'POST',
      url: PATH + '/' + newId,
      payload: updatedScore
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject({id: newId, score: updatedScore.score});
  });

  test('clear', async () => {
    const injectOptions = {
      method: 'DELETE',
      url: PATH + '/' + user + '/' + song
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.payload)).toMatchObject({id: newId, score: 0});
  });

});
