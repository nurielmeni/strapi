module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'), // ✅ FIXED
        password: env('DATABASE_PASSWORD'),
        ssl: {
          rejectUnauthorized: false
        }
      },
      options: {
        pool: {
          min: 0,
          max: 2 // very important for small DO DBs
        }
      }
    }
  }
});
