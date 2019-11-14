'use strict';

const Controller = require('./controller');

const PATH = '/scores';
const LEADERBOARDS_PATH = '/leaderboards';

const findScore = {
    method: 'GET',
    path: PATH + '/{userID}/{songID}',
    handler: ({params: {userID, songID}}, h) => Controller.findScore(userID, songID)
};

const listByUser = {
    method: 'GET',
    path: PATH + '/{userID}',
    handler: ({params: {userID}}, h) => Controller.listByUser(userID)
};

const listBySong = {
    method: 'GET',
    path: LEADERBOARDS_PATH + '/{songID}',
    handler: ({params: {songID}}, h) => Controller.listBySong(songID)
};

const create = {
    method: 'POST',
    path: PATH,
    handler: (req, h) => Controller.create(req.payload)
};

const update = {
    method: 'POST',
    path: PATH + '/{id}',
    handler: (req, h) => Controller.update(req.params.id, req.payload.score)
};

const clear = {
    method: 'DELETE',
    path: PATH + '/{userID}/{songID}',
    handler: ({params: {userID, songID}}, h) => Controller.clear(userID, songID)
};

module.exports = [
    findScore,
    listByUser,
    listBySong,
    create,
    update,
    clear
];
