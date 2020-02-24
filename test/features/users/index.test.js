'use strict';

const Hapi = require('hapi');
const knex = require('../../../db/knex');

const users    = require('../../../src/features/users/index');
const userData = require('../../../db/seeds/data/users');

const PATH = '/users';

const server = Hapi.server();
server.route(users);

describe('Users Integration testing', () => {

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
  const wrapJoinDate = (obj) => ({...obj, join_date: `${obj.join_date.toISOString()}`});

  test('findById', async () => {
      const testId = 1;
      const injectOptions = {
        method: 'GET',
        url: PATH + '/' + testId
      };

      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);

      const payload = JSON.parse(response.payload);
      expect(payload).toMatchObject(wrapJoinDate(userData[0]));
  });

  test('list', async () => {
    const injectOptions = {
      method: 'GET',
      url: PATH
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);

    const payload = JSON.parse(response.payload);
    expect(payload).toMatchObject(userData.map(obj => wrapJoinDate(obj)));
  });

  const newUsername ="newuser" + Math.random();
  let newId;
  test('create', async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // avoid millisecond-errors
    const newUser = {
      email: "newuseremail@google.com" + Math.random(),
      username: newUsername,
      password: "password",
      name: "New User",
      level: 1,
      join_date: new Date(date)
    };
    const injectOptions = {
      method: 'POST',
      url: PATH,
      payload: newUser
    };

    const response = await server.inject(injectOptions);
    const createdUser = JSON.parse(response.payload);
    newId = createdUser.id;

    expect(response.statusCode).toEqual(200);
    expect(createdUser).toMatchObject(wrapJoinDate(newUser));
  });

  test('deleteById', async () => {
    const injectOptions = {
      method: 'DELETE',
      url: PATH + '/' + newId
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);

    const payload = JSON.parse(response.payload);
    expect(payload).toMatchObject({id: newId, username: newUsername, deleted: true});
});

  test('login', async () => {
    const userId = userData[0].username;
    const userPass = userData[0].password;
    const injectOptions = {
      method: 'GET',
      url: PATH + '/' + userId + '/' + userPass
    };

    const response = await server.inject(injectOptions);
    expect(response.statusCode).toEqual(200);
    const payload = JSON.parse(response.payload);
    expect(payload).toMatchObject(wrapJoinDate(userData[0]));
  });

});
