module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        await next();
        if (!ctx?.state?.admin && ctx?.state?.user) {
          // Do not block the response path, but always handle failures.
          strapi.services.profile.ping(ctx).catch((error) => {
            strapi.log.warn('profile.ping failed: %s', error.message);
          });
        }
      });
    }
  };
};
