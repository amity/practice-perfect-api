const controller = require('../../../src/features/users/controller');
const userData   = require('../../../db/seeds/data/users');

test('findById', async () => {
  expect(await controller.findById(1)).toMatchObject(userData.find(
      ({id}) => id == 1)
    );
});

test('list', async () => {
    expect(await controller.list()).toMatchObject(userData);
});

let newId;
let newUsername;

test('create', async () => {
    newUsername = "newuser" + Math.random();
    const newUser = {
      email: "newuseremail@google.com" + Math.random(),
      username: newUsername,
      password: "password",
      name: "New User",
      level: 1,
      join_date: new Date('2020-02-10T05:00:00.000Z')
    };
    const {joinDate, ...createdUser} = await controller.create(newUser);
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
