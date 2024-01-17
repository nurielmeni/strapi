import { errors } from '@strapi/utils';

const { ApplicationError } = errors;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

export default {
  async beforeCreate(event) {
    const {
      params: { data },
      action
    } = event;
    const step = data?.step_type?.[0] ?? false;

    try {
      await strapi.service('api::step.step').validateStepType(step, action);
    } catch (e) {
      throw new ApplicationError(e.message);
    }
  },

  async beforeUpdate(event) {
    const {
      params: { data },
      action
    } = event;
    if ('publishedAt' in data) return;
    const step = data?.step_type?.[0] ?? false;

    try {
      await strapi.service('api::step.step').validateStepType(step, action);
    } catch (e) {
      throw new ApplicationError(e.message);
    }
  }
};
