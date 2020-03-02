'use strict';

const Boom = require('@hapi/boom');

const knex = require('../../../db/knex');
const TABLE = 'songs';

const findById = async (id) => {
    try {
        const song = await knex(TABLE).where('id', id);
        return song.length ? song[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

const list = async () => await knex(TABLE).where('deleted', false);

const create = async ({title, artist, resource_url, year, level, top_score}) => {
    try {
        const song = await knex(TABLE)
            .returning('*')
            .insert({
                title,
                artist,
                resource_url,
                year,
                level,
                top_score
            });
        return song[0];
    } catch (e) { return Boom.badRequest(e.message); }
};

const deleteById = async (id) => {
    try {
        const song = await knex(TABLE)
            .returning(['id', 'title', 'deleted'])
            .where('id', id)
            .update('deleted', true);
        return song.length ? song[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

module.exports = {
    findById,
    list,
    create,
    deleteById
};
