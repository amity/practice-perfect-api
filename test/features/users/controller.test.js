'use strict';

const Boom = require('@hapi/boom');

const controller = require('../../../src/features/users/controller');
const knex       = require('../../../db/knex');
const userData   = require('../../../db/seeds/data/users');


describe('Users Controller testing', () => {

  beforeAll(async (done) => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    done();
  });

  afterAll((done) => {
    knex.destroy(done);
  });


  describe('findById', () => {
    test('returns a user by ID', async () => {
      expect(await controller.findById(1)).toMatchObject(userData[0]);
    });

    test('fails safely when searching for a nonexistent user', async () => {
      const userId = 100;
      expect(await controller.findById(userId)).toMatchObject(Boom.notFound());
    });

    test('handles other errors', async () => {
        const userId = {abcd: 'haha'};
        const {output} = await controller.findById(userId);
        expect(output.statusCode).toEqual(400);
    });
  });

  describe('list', () => {
    test('lists all users', async () => {
        expect(await controller.list()).toMatchObject(userData);
    });
  });

  let newId;
  let newUsername;

  describe('create', () => {
    test('creates a new user', async () => {
      const date = new Date();
      date.setHours(0, 0, 0, 0); // avoid millisecond-errors
        newUsername = "newuser" + Math.random();
        const newUser = {
          email: newUsername,
          password: "password",
          name: "New User",
          join_date: date
        };
        const createdUser = await controller.create(newUser);
        newId = createdUser.id;
        expect(createdUser).toMatchObject({...newUser, username: newUsername, level: 1});
    });

    test('handles errors', async() => {
      const {output} = await controller.create({user: {abcd: 'haha'}});
      expect(output.statusCode).toEqual(400);
    });
  });

  describe('deleteById', () => {
    test('soft-deletes a user', async () => {
        expect(await controller.deleteById(newId)).toMatchObject(
            {id: newId, username: newUsername, deleted: true}
        );
    });

    test('fails safely when attempting to delete a nonexistent user', async () => {
      const userId = 100;
      expect(await controller.deleteById(userId)).toMatchObject(Boom.notFound());
    });

    test('handles other errors', async() => {
      const {output} = await controller.deleteById({user: {abcd: 'haha'}});
      expect(output.statusCode).toEqual(400);
    });
  });


  describe('login', () => {
    test('checks whether a given username and password match an existing user', async () => {
      expect(await controller.login(userData[0].username, userData[0].password)).toMatchObject(
          userData[0]
      );
    });

    test('fails safely when attempting to login to a nonexistent user', async () => {
      expect(await controller.login(800, 800)).toMatchObject(Boom.notFound());
    });

    test('handles other errors', async() => {
      const {output} = await controller.login({user: {abcd: 'haha'}});
      expect(output.statusCode).toEqual(400);
    });
  });

});
