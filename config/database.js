module.exports = ({ env }) => {
  const databaseUrl = env('DATABASE_URL');

  console.log('DATABASE_URL:', databaseUrl); // Log the DATABASE_URL for debugging

  if (databaseUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: databaseUrl,
          ssl: false
        }
      }
    };
  }

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false)
      }
    }
  };
};
