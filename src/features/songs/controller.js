'use strict';

const findById = (id) => {
    return {
        id,
        name: "Superunknown",
        artist: "Soundgarden"
    };
};

const list = () => [
    {
        id: 1,
        name: "Superunknown",
        artist: "Soundgarden",
        level: 1
    },
    {
        id: 2,
        name: "Fences",
        artist: "Paramore",
        level: 2
    }
];

const create = ({id, name, artist}) => ({
    id,
    name,
    artist
});

const deleteById = (id) => ({
    id,
    deleted: true
});

module.exports = {
    findById,
    list,
    create,
    deleteById
};
