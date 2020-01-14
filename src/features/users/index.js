'use strict';

const Controller = require('./controller');

const PATH = '/users';

const findById = {
    method: 'GET',
    path: PATH + '/{id}',
    handler: ({params: {id}}, h) => Controller.findById(id)
};

const list = {
    method: 'GET',
    path: PATH,
    handler: (req, h) => Controller.list()
};

const create = {
    method: 'POST',
    path: PATH,
    handler: ({payload}, h) => Controller.create(payload)
};

const deleteById = {
    method: 'DELETE',
    path: PATH + '/{id}',
    handler: ({params: {id}}, h) => Controller.deleteById(id)
};

const login = {
    method: 'GET',
    path: PATH + '/{user}/{pass}',
    handler: ({params: {user, pass}}, h) => Controller.login(user, pass)
};

module.exports = [
    findById, list, create, deleteById, login
];
