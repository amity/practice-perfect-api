'use strict';

const Hapi = require('hapi');

const endpoints = require('./features');

const PORT = process.env.PORT || 7674;

const server = Hapi.server({
  port: PORT
});

server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => 'Hello, world!'
});

server.route(endpoints);

const start = async () => {
  try {
    await server.start();
  }
  catch (e) {
    console.log(e); // eslint-disable-line no-console
    process.exit(418);
  }
  console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
};

start();