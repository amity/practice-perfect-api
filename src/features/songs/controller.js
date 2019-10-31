'use strict';

const findById = (id) => {
    console.log(id);
    return {
        id,
        name: "Superunknown",
        artist: "Soundgarden"
    };
};

const list = () => [
    {
        id: 1234,
        name: "Superunknown",
        artist: "Soundgarden"
    },
    {
        id: 5678,
        name: "Fences",
        artist: "Paramore"
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
    findById, list, create, deleteById
};