'use strict';

const findById = (id) => ({
    id,
    name: "Alison Bechdel"
});

const list = () => [
    {
        id: 1234,
        name: "Alison Bechdel"
    },
    {
        id: 5678,
        name: "Steven Universe"
    }
];

const create = ({id, name}) => ({
    id,
    name
});

const deleteById = (id) => ({
    id,
    deleted: true
});

module.exports = {
    findById, list, create, deleteById
};