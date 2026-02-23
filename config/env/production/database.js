// const parse = require('pg-connection-string').parse;
// const config = parse(process.env.DATABASE_URL);
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        // host: config.host,
        // port: config.port,
        // database: config.database,
        // username: config.user,
        // password: config.password,
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: {
          rejectUnauthorized: false
        }
      },
      options: {}
    }
  }
});
