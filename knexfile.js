'use strict';

const base = {
  client: 'postgresql',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  }
};

const development = {
  ...base,
  connection: {
    host: 'localhost',
    database: 'practice-perfect-db',
    user: 'postgres',
    port: 5432,
    password: '',
  }
};

const production = {
  ...base,
  connection: {
    host: '34.67.115.95',
    database: 'postgres',
    user: 'postgres',
    password: 'cs98',
  }
};

module.exports = {
  development,
  production
};
