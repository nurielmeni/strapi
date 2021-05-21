module.exports = ({ env }) => ({
    upload: {
      provider: 'digitalocean',
      providerOptions: {
          key: env('SPACES_KEY'),
          secret: env('SPACES_SECRET'),
          region: env('SPACES_REGION'),
          space: env('SPACES_SPACE'),
          cdn: env('SPACES_CDN'),
      },
    },
  });