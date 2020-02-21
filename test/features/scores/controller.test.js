'use strict';

const controller = require('../../../src/features/scores/controller');
const knex       = require('../../../db/knex');
const scoreData   = require('../../../db/seeds/data/scores');

describe('Scores Controller testing', () => {

    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    afterAll((done) => {
        knex.destroy(done);
    });

    test('findScore', async () => {
        const userId = 1;
        const songId = 1;
        expect(await controller.findScore(userId, songId)).toMatchObject(scoreData.find(
        ({user, song}) => user == userId && song == songId)
        );
    });

    test('listByUser', async () => {
        const userId = 1;
        expect(await controller.listByUser(userId)).toMatchObject(scoreData.filter(({user}) => user == userId));
    });

    test('listBySong', async () => {
        const songId = 1;
        expect(await controller.listBySong(songId)).toMatchObject(scoreData.filter(({song}) => song == songId));
    });

    let newId;
    const testUser = 2;
    const testSong = 2;
    const newScore = {
        user: testUser,
        song: testSong,
        score: 100,
        mode: 0
    };

    test('create', async () => {
        const createdScore = await controller.create(newScore);
        newId = createdScore.id;
        expect(createdScore).toMatchObject(newScore);
    });

    test('update', async () => {
        const createdScore = await controller.update(newId, 200);
        expect(createdScore).toMatchObject({...newScore, score: 200});
    });

    test('clear', async () => {
        expect(await controller.clear(testUser, testSong)).toMatchObject(
            {id: newId, score: 0}
        );
    });

});