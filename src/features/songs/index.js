'use strict';

const Controller = require('./controller');

const PATH = '/songs';

const findById = {
    method: 'GET',
    path: PATH + '/{id}',
    handler: ({params}, h) => Controller.findById(params)
};

const list = {
    method: 'GET',
    path: PATH,
    handler: (req, h) => Controller.list()
};

const create = {
    method: 'POST',
    path: PATH,
    handler: ({id, name, artist}, h) => Controller.create(id, name)
};

const deleteById = {
    method: 'DELETE',
    path: PATH + '/{id}',
    handler: ({id}, h) => Controller.deleteById(id)
};

module.exports = [
    findById, list, create, deleteById
];
