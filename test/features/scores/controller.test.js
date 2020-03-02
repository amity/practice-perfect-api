'use strict';

const Boom = require('@hapi/boom');

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

    describe('findScore', () => {
        test('finds score given user and song IDs', async () => {
            const userId = 1;
            const songId = 1;
            expect(await controller.findScore(userId, songId)).toMatchObject(scoreData.find(
                ({user, song}) => user == userId && song == songId)
            );
        });

        test('fails safely when searching for a nonexistent score', async () => {
            const userId = 100;
            const songId = 100;
            expect(await controller.findScore(userId, songId)).toMatchObject(Boom.notFound());
        });

        test('handles other errors', async () => {
            const userId = {abcd: 'haha'};
            const songId = false;
            const {output} = await controller.findScore(userId, songId);
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('listByUser', () => {
        test("finds existing user's scores", async () => {
            const userId = 1;
            expect(await controller.listByUser(userId)).toMatchObject(scoreData.filter(({user}) => user == userId));
        });

        test("handles errors", async () => {
            const userId = {abcd: 'haha'};
            const {output} = await controller.listByUser(userId);
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('listBySong', () => {
        test('finds scores for a song', async () => {
            const songId = 1;
            expect(await controller.listBySong(songId)).toMatchObject(scoreData.filter(({song}) => song == songId));
        });

        test("handles errors", async () => {
            const songId = {abcd: 'haha'};
            const {output} = await controller.listBySong(songId);
            expect(output.statusCode).toEqual(400);
        });
    });

    let newId;
    const testUser = 2;
    const testSong = 2;
    const newScore = {
        user: testUser,
        song: testSong,
        score: 100
    };


    describe('create', () => {
        test('creates a new score', async () => {
            const createdScore = await controller.create(newScore);
            newId = createdScore.id;
            expect(createdScore).toMatchObject({...newScore, mode: 0});
        });

        test('handles errors', async () => {
            const {output} = await controller.create({...newScore, user: {abcd: 'haha'}});
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('update', () => {
        test('updates an existing score', async () => {
            const updatedScore = await controller.update(newId, 200);
            expect(updatedScore).toMatchObject({...newScore, score: 200});
        });

        test('fails safely when updating a nonexistent score', async () => {
            const updatedScore = await controller.update(800, 200);
            expect(updatedScore).toMatchObject(Boom.badData());
        });

        test('handles other errors', async () => {
            const {output} = await controller.update({...newScore, user: {abcd: 'haha'}});
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('clear', () => {
        test('resets score to 0 for a given user and song', async () => {
            expect(await controller.clear(testUser, testSong)).toMatchObject(
                {id: newId, score: 0}
                );
        });

        test('fails safely when clearing a nonexistent score', async () => {
            const updatedScore = await controller.clear(800, 200);
            expect(updatedScore).toMatchObject(Boom.notFound());
        });

        test('handles other errors', async () => {
            const {output} = await controller.clear(200, {abcd: 'haha'});
            expect(output.statusCode).toEqual(400);
        });
    });

});