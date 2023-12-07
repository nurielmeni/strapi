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
      const step = {
        id: entity?.id,
        step_name: entity?.step_name ?? '',
        step_type: entity?.step_type
      };

      const qDrillId = entity?.step_type?.[0]?.drill?.id;
      let drill, stack;
      if (qDrillId) {
        const rawDrill = await strapi.query('drill').findOne({ id: qDrillId });
        drill = sanitizeEntity(rawDrill, { model: strapi.models.drill });
      }

      const qStackId = stackId || entity?.step_type?.[0]?.stack?.id;
      if (qStackId) {
        const rawStack = await strapi.query('stack').findOne({ id: qStackId });
        stack = sanitizeEntity(rawStack, { model: strapi.models.stack });
      }

      const sectionStep = {
        id: 'practice',
        name: 'Practice',
        terms_of_transition: [],
        step,
        drill,
        stack
      };

      return sectionStep;
    }

    ctx.response.status = 204;
    return ctx.response;
  }

};
