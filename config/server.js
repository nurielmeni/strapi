module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env("URL", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'c3855edc9259862c16345a794a7f6246'),
    },
  },
});
