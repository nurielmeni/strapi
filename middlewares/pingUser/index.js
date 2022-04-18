module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                await next();
                if (!ctx?.state?.admin && ctx?.state?.user) {
                    strapi.services.profile.ping(ctx);
                }
            });
        },
    };
};