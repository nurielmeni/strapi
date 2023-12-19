'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  // Called before an entry is created
  async beforeCreate (params, data) {
    const step = params?.step_type?.[0] ?? false;

    try {
      await strapi.services.step.validateStepType(step);
    } catch (e) {
      throw strapi.errors.badRequest(e.message);
    }


  },
  // Called after an entry is created
  //afterCreate(result) { },
  // Called before an entry is created
  async beforeUpdate (params, data) {
    if ('published_at' in data) return;
    const step = data?.step_type?.[0] ?? false;

    try {
      await strapi.services.step.validateStepType(step);
    } catch (e) {
      throw strapi.errors.badRequest(e.message);
    }

  },
  // Called after an entry is created
  //afterUpdate(result) { }
};
