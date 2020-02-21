'use strict';

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

  test('findById', async () => {
    expect(await controller.findById(1)).toMatchObject(userData[0]);
  });

  test('list', async () => {
      expect(await controller.list()).toMatchObject(userData);
  });

  let newId;
  let newUsername;

  test('create', async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // avoid millisecond-errors
      newUsername = "newuser" + Math.random();
      const newUser = {
        email: "newuseremail@google.com" + Math.random(),
        username: newUsername,
        password: "password",
        name: "New User",
        level: 1,
        join_date: date
      };
      const createdUser = await controller.create(newUser);
      newId = createdUser.id;
      expect(createdUser).toMatchObject(newUser);
  });

  test('deleteById', async () => {
      expect(await controller.deleteById(newId)).toMatchObject(
          {id: newId, username: newUsername, deleted: true}
      );
  });


  test('login', async () => {
    expect(await controller.login(userData[0].username, userData[0].password)).toMatchObject(
        userData[0]
    );
  });

});