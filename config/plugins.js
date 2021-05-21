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
  });