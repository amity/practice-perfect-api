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

const list = async () => await knex(TABLE).where('deleted', false);

const create = async ({email, username=email, password, name, level=1}) => {
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
        return newUser[0];
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

const login = async (username, password) => {
    try {
        const user = await knex(TABLE)
            .where({username, password, 'deleted': false});
        return user.length ? user[0] : Boom.notFound();
    } catch (e) { return Boom.badRequest(e.message); }
};

module.exports = {
    findById,
    list,
    create,
    deleteById,
    login
};