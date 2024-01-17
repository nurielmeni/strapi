"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::group.group', ({ strapi }) => ({
    async findOne(ctx) {
        await this.validateQuery(ctx);
        const { params: { id } } = ctx;
        const entity = await strapi.service('api::group.group').findOne(id);
        // transformResponse correctly formats the data and meta fields of your results to return to the API
        return this.transformResponse(entity);
    },
    async findAssigned(ctx) {
        var _a, _b;
        await this.validateQuery(ctx);
        // Perform whatever custom actions are needed
        const entity = await strapi
            .service('api::group.group')
            .findAssigned((_b = (_a = ctx.state) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id);
        // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
        // const sanitizedResults = await this.sanitizeOutput(entity, ctx);
        // transformResponse correctly formats the data and meta fields of your results to return to the API
        return this.transformResponse(entity);
    },
    async assign(ctx) { },
    async assignEntities({ entityType, entityId, group, validMembersId }) { }
}));
//# sourceMappingURL=group.js.map