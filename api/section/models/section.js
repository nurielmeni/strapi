'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    // Called before an entry is created
    beforeCreate(params, { Step }) {
      const res = strapi.services.section.validateTermsOfTransitionRange(Step);
      if (!res.isValid) throw strapi.errors.badRequest(res.errMessage);
    },
    // Called after an entry is created
    afterCreate(result) {},
    // Called before an entry is created
    beforeUpdate(params, { Step }) {
      const res = strapi.services.section.validateTermsOfTransitionRange(Step);
      if (!res.isValid) throw strapi.errors.badRequest(res.errMessage);
    },
    // Called after an entry is created
    afterUpdate(result) {}
  }
};
