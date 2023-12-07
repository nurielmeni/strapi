module.exports = ({ env }) => ({
  host: env("HOST", process.env.HOST || "0.0.0.0"),
  port: env.int("PORT", process.env.PORT || 4000),
  url: env('PUBLIC_URL', process.env.PUBLIC_URL || 'https://api.example.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', process.env.ADMIN_JWT_SECRET || ''),
    },
  },
});
