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

    const knex = strapi.connections.default;
    const entity = await knex.raw(`SELECT * FROM components_sections_steps WHERE id=${id}`);
    
    const step = entity && entity.rows && Array.isArray(entity.rows) && entity.rows.length ? entity.rows[0] : null;
    if (step) {
      step.drill = await strapi.services.drill.findOne(step.drill);
      step.stack = await strapi.services.drill.findOne(step.stack);
      return step;
    }

    ctx.response.status = 204;
    return ctx.response;
  }
};
