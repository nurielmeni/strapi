module.exports = ({ env }) => ({
  host: env("HOST", process.env.HOST || "0.0.0.0"),
  port: env.int("PORT", process.env.PORT || 4000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'c3855edc9259862c16345a794a7f6246'),
    },
  },
});
