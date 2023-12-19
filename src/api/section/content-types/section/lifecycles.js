'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  // Called before an entry is created
  beforeCreate (params, data) {
    const steps = data && data?.Step;
    if (!steps || !Array.isArray(steps)) return;

    const tot = steps.map((s) => s.terms_of_transition);

    const res = strapi.services.section.validateTermsOfTransitionRange(tot);
    if (res && res.isValid === false)
      throw strapi.errors.badRequest(res.errMessage);
  },
  // Called after an entry is created
  //afterCreate(result) {},
  // Called before an entry is created
  beforeUpdate (params, data) {
    const steps = data && data?.Step;
    if (!steps || !Array.isArray(steps)) return;

    const tot = steps.map((s) => s.terms_of_transition);

    const res = strapi.services.section.validateTermsOfTransitionRange(tot);
    if (res && res.isValid === false)
      throw strapi.errors.badRequest(res.errMessage);
  },
  // Called after an entry is created
  //afterUpdate(result) {}
};
