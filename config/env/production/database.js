const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = parse(env('DATABASE_URL', ''));

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: config.host || env('DATABASE_HOST'),
          port: config.port || env.int('DATABASE_PORT', 25060),
          database: config.database || env('DATABASE_NAME'),
          username: config.user || env('DATABASE_USERNAME'),
          password: config.password || env('DATABASE_PASSWORD'),
          ssl: { rejectUnauthorized: false }
        },
        options: {
          ssl: true
        }
      }
    }
  };
};
