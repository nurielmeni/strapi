import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::group.group',
  ({ strapi }) => ({
    async findOne(ctx) {
      await this.validateQuery(ctx);

      const {
        params: { id }
      } = ctx;
      const entity = await strapi.service('api::group.group').findOne(id);

      // transformResponse correctly formats the data and meta fields of your results to return to the API
      return this.transformResponse(entity);
    },

    async findAssigned(ctx) {
      await this.validateQuery(ctx);

      // Perform whatever custom actions are needed
      const entity = await strapi
        .service('api::group.group')
        .findAssigned(ctx.state?.user?.id);

      // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
      // const sanitizedResults = await this.sanitizeOutput(entity, ctx);

      // transformResponse correctly formats the data and meta fields of your results to return to the API
      return this.transformResponse(entity);
    },
    async assign(ctx) {},
    async assignEntities({ entityType, entityId, group, validMembersId }) {}
  })
);
