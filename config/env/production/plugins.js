module.exports = ({ env }) => ({
    email: {
      provider: 'gmail-2lo',
      providerOptions: {
          username: 'lms@thetalms.com',
        clientId: env('EMAIL_CLIENT_ID'),
        privateKey: env('EMAIL_PRIVATE_KEY').replace(/\\n/g, '\n'),
      },
      settings: {
        defaultFrom: 'lms@thetalms.com',
        defaultReplyTo: 'lms@thetalms.com',
      },
    },
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