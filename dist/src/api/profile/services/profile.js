'use strict';
/**
 * profile service
 */
const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::profile.profile', ({ strapi }) => ({
    async ping(ctx) {
        const { id: userId } = ctx.state.user;
        const entity = await strapi.services.profile.update({ user: userId }, {
            last_ping: Date.now()
        });
        return entity.last_ping;
    },
    async getProfiles(ctx) {
        var _a;
        const exportToMail = (_a = process.env) === null || _a === void 0 ? void 0 : _a.EXPORT_TO_MAIL;
        if (!exportToMail)
            return { status: 404, msg: 'No email to export' };
        const entity = await strapi.services.profile.find();
        return sanitizeEntity(entity, { model: strapi.models.profile });
    }
}));
//# sourceMappingURL=profile.js.map