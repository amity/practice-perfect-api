'use strict';

const Boom = require('@hapi/boom');

const knex = require('../../../db/knex');
const TABLE = 'scores';

const findScore = async (user, song) => {
    try {
        const score = await knex(TABLE).where({user, song});
        return score.length ? score[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

const listByUser = async (userID) => {
    try {
        return await knex(TABLE).where('user', userID);
    } catch (e) { return Boom.badRequest(e.message); }
};

const listBySong = async (songID) => {
    try {
        return await knex(TABLE).where('song', songID);
    } catch (e) { return Boom.badRequest(e.message); }
};

const create = async ({user, song, score, mode=0}) => {
    try {
        const newScore = await knex(TABLE)
            .returning('*')
            .insert({
                user,
                song,
                score,
                mode,
                date: new Date().toISOString().substring(0, 10)  // just date, no time
            });
        return newScore.length ? newScore[0] : Boom.badData();
    } catch (e) { return Boom.badRequest(e.message); }
};

const update = async (id, score) => {
    try {
        const newScore = await knex(TABLE)
            .returning('*')
            .where('id', id)
            .update({
                score,
                date: new Date().toISOString().substring(0, 10)  // just date, no time
            });
        return newScore.length ? newScore[0] : Boom.badData();
    } catch (e) { return Boom.badRequest(e.message); }
};

const clear = async (user, song) => {
    try {
        const clearedScore = await knex(TABLE)
            .returning(['id', 'score'])
            .where({user, song})
            .update('score', 0);
        return clearedScore.length ? clearedScore[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

module.exports = {
    findScore,
    listByUser,
    listBySong,
    create,
    update,
    clear
};
