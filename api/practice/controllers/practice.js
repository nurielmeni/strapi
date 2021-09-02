'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { id: userId } = ctx.state.user;
    console.log('Practice', id, userId);

    const entity = await strapi.query('step').findOne({ id });
    console.log('Practice:entity:', entity);


    if (entity) {
      const drill = await strapi.query('drill').findOne({ id: entity?.step_type?.[0]?.drill?.id });
      console.log('Practice:drill:', drill);

      const stack = await strapi.query('stack').findOne({ id: entity?.step_type?.[0]?.stack?.id });
      console.log('Practice:stack:', stack);

      Object.assign(entity, { drill });
      Object.assign(entity, { stack });
      return entity;
    }

    ctx.response.status = 204;
    return ctx.response;
  }
};
