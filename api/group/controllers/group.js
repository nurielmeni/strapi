'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
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

    const query = { users: +userId, ...ctx.query };

    //console.log('Query', query);
    if (ctx.query._q) {
      entities = await strapi.services.group.search(query);
    } else {
      entities = await strapi.services.group.find(query);
    }
    //console.log('entities', entities);

    return sanitizeEntity(entities, { model: strapi.models.group });
  }
};
