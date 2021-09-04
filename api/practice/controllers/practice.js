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
  async find(ctx) {
    const { stepId, stackId } = ctx.query;
    const { id: userId } = ctx.state.user;

    // TODO: Add policy / validation for user
    const entity = await strapi.query('step').findOne({ id: stepId });

    if (entity) {
      const qStepId = stepId || entity?.step_type?.[0]?.drill?.id;
      const drill = await strapi.query('drill').findOne({ id:  qStepId});
      
      const qStackId = stackId || entity?.step_type?.[0]?.stack?.id;
      const stack = await strapi.query('stack').findOne({ id: qStackId});

      Object.assign(entity, { drill });
      Object.assign(entity, { stack });
      return entity;
    }

    ctx.response.status = 204;
    return ctx.response;
  }

};
