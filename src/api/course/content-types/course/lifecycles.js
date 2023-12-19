'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  // Called before an entry is created
  beforeCreate (params, data) {
    const sections = data && data?.CourseSections;
    if (!sections || !Array.isArray(sections)) return;

    const tot = sections.map((s) => s.section_terms_of_transition);

    const res = strapi.services.course.validateTermsOfTransitionRange(tot);
    if (res && res.isValid === false)
      throw strapi.errors.badRequest(res.errMessage);
  },
  // Called after an entry is created
  afterCreate (result) { },
  // Called before an entry is created
  beforeUpdate (params, data) {
    const sections = data && data?.CourseSections;
    if (!sections || !Array.isArray(sections)) return;

    const tot = sections.map((s) => s.section_terms_of_transition);

    const res = strapi.services.course.validateTermsOfTransitionRange(tot);
    if (res && res.isValid === false)
      throw strapi.errors.badRequest(res.errMessage);
  },
  // Called after an entry is created
  afterUpdate (result) { }
};

