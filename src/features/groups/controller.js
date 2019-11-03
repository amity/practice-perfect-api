'use strict';

const findById = (id) => ({
    id,
    name: "Ms. Frizzle's Class"
});

const create = ({id, name}) => ({
    id,
    name
});

const deleteById = (id) => ({
    id,
    deleted: true
});

module.exports = {
    findById, create, deleteById
};
