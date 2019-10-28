'use strict';

const endpoints = require('./features');

const PORT = 7674;
let server;

const start = async () => {
    const Hapi = require('hapi');
    server = Hapi.server({ port: PORT });
    await server.start();
    console.log(`Running on port ${PORT}!`); // eslint-disable-line no-console
};

const registerRoutes = () => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => 'Hello, world!'
    });

    server.route(endpoints);
};

start();
registerRoutes();
