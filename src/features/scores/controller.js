'use strict';

const findScore = (user, song) => ({
    id: 11,
    user,
    song,
    score: 38
});

const listByUser = (userID) => [
    {
        id: 1,
        user: userID,
        song: 2,
        score: 38
    },
    {
        id: 2,
        user: userID,
        song: 1,
        score: 78
    }
];

const listBySong = (songID) => [
    {
        id: 1,
        user: 1,
        song: songID,
        score: 38
    },
    {
        id: 2,
        user: 2,
        song: songID,
        score: 78
    }
];

const create = ({user, song, score, mode=0}) => ({
    id: 9,
    user,
    song,
    score,
    mode,
    date: new Date().toISOString().substring(0, 10)  // just date, no time
});

const update = (id, score) => ({
    id,
    user: 2,
    song: 2,
    score,
    mode: 0,
    date: new Date().toISOString().substring(0, 10)  // just date, no time
});

const clear = (user, song) => ({
    id: 9,
    user,
    song,
    score: 80,
    deleted: true
});

module.exports = {
    findScore,
    listByUser,
    listBySong,
    create,
    update,
    clear
};
