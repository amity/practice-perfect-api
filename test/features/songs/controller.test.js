'use strict';

const Boom = require('@hapi/boom');

const controller = require('../../../src/features/songs/controller');
const knex       = require('../../../db/knex');
const songData   = require('../../../db/seeds/data/songs');

describe('Songs Controller testing', () => {

    beforeAll(async (done) => {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    });

    afterAll((done) => {
        knex.destroy(done);
    });

    describe('findbyId', () => {
        test('return song by ID', async () => {
            expect(await controller.findById(1)).toMatchObject(songData[0]);
        });

        test('fails safely when searching for a nonexistent song', async () => {
            const songId = 100;
            expect(await controller.findById(songId)).toMatchObject(Boom.notFound());
        });

        test('handles other errors', async () => {
            const songId = false;
            const {output} = await controller.findById(songId);
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('list', () => {
        test('return all songs', async () => {
            expect(await controller.list()).toMatchObject(songData);
        });
    });

    let newId;

    describe('create', () => {
        const newSong = {
            title: "New Song",
            artist: "New Artist",
            resource_url: "https://google.com",
            year: 2020,
            level: 1,
            top_score: 100
        };

        test('adds a new song', async () => {
            const createdSong = await controller.create(newSong);
            newId = createdSong.id;
            expect(createdSong).toMatchObject(newSong);
        });

        test('handles errors', async () => {
            const {output} = await controller.create({title: {abcd: 'haha'}});
            expect(output.statusCode).toEqual(400);
        });
    });

    describe('deleteById', () => {
        test('soft-deletes a song with the given ID', async () => {
            expect(await controller.deleteById(newId)).toMatchObject(
                {id: newId, title: "New Song", deleted: true}
            );
        });

        test('fails safely when deleting a nonexistent song', async () => {
            const updatedScore = await controller.deleteById(800);
            expect(updatedScore).toMatchObject(Boom.notFound());
        });

        test('handles other errors', async () => {
            const {output} = await controller.deleteById({abcd: 'haha'});
            expect(output.statusCode).toEqual(400);
        });
    });

});