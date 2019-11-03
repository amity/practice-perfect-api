'use strict';

const Controller = require('./controller');

const PATH = '/groups';

const findById = {
    method: 'GET',
    path: PATH + '/{id}',
    handler: ({id}, h) => Controller.findById(id)
};

const create = {
    method: 'POST',
    path: PATH,
    handler: ({id, name}, h) => Controller.create(id, name)
};

const deleteById = {
    method: 'DELETE',
    path: PATH + '/{id}',
    handler: ({id}, h) => Controller.deleteById(id)
};

module.exports = [
    findById, create, deleteById
];
