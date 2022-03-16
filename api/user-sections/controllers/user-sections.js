'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Retrieve a records for user.
     *
     * @return {Object}
     */

    async find(ctx) {
        const { id: userId } = ctx.state.user;
        let entities;

        const query = { user: +userId, ...ctx.query };

        //console.log('Query', query);
        if (ctx.query._q) {
            entities = await strapi.services['user-sections'].search(query);
        } else {
            entities = await strapi.services['user-sections'].find(query);
        }
        //console.log('entities', entities);

        return sanitizeEntity(entities, { model: strapi.models['user-sections'] });
    },

    /**
   * Retrieve a records for user.
   *
   * @return {Object}
   */

    async count(ctx) {
        const { id: userId } = ctx.state.user;
        let entities;

        const query = { user: +userId, ...ctx.query };

        //console.log('Query', query);
        if (ctx.query._q) {
            entities = await strapi.services['user-sections'].count(query);
        } else {
            entities = await strapi.services['user-sections'].count(query);
        }
        //console.log('entities', entities);

        return sanitizeEntity(entities, { model: strapi.models['user-sections'] });
    },

};
