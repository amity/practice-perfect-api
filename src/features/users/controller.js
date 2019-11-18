'use strict';

const Boom = require('@hapi/boom');

const knex = require('../../../db/knex');
const TABLE = 'users';

const findById = async (id) => {
    try {
        const user = await knex(TABLE).where('id', id);
        return user.length ? user[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

const list = async () => {
    try {
        return await knex(TABLE).where('deleted', false);
    } catch (e) { return Boom.badRequest(e.message); }
};

const create = async ({username, email, password, name, level}) => {
    try {
        const newUser = await knex(TABLE)
            .returning('*')
            .insert({
                username,
                email,
                password,
                name,
                level,
                deleted: false,
                join_date: new Date().toISOString().substring(0, 10)  // just date, no time
            });
        return newUser.length ? newUser[0] : Boom.badData();
    } catch (e) { return Boom.badRequest(e.message); }
};

const deleteById = async (id) => {
    try {
        const user = await knex(TABLE)
            .returning(['id', 'username', 'deleted'])
            .where('id', id)
            .update('deleted', true);
        return user.length ? user[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

module.exports = {
    findById,
    list,
    create,
    deleteById
};