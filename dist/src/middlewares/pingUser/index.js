module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                var _a, _b;
                await next();
                if (!((_a = ctx === null || ctx === void 0 ? void 0 : ctx.state) === null || _a === void 0 ? void 0 : _a.admin) && ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.state) === null || _b === void 0 ? void 0 : _b.user)) {
                    strapi.services.profile.ping(ctx);
                }
            });
        },
    };
};
//# sourceMappingURL=index.js.map