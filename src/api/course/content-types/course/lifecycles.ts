import { errors } from '@strapi/utils';

const { ApplicationError } = errors;
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

async function validateSectionTot(event) {
  const {
    params: {
      data: { course_sections }
    },
    model: {
      attributes: {
        course_sections: { component }
      }
    },
    action
  } = event;

  if (!course_sections || !Array.isArray(course_sections)) return;

  const courseSectionsIds = course_sections.map((s) => s.id);

  const sectionTot = await strapi.db.query(component).findMany({
    where: { id: { $in: courseSectionsIds } },
    populate: {
      section_terms_of_transition: true
    }
  });

  const tot = sectionTot.map((s) => s.section_terms_of_transition);

  const res = await strapi
    .service('api::course.course')
    .validateTermsOfTransitionRange(tot);

  if (res && res.isValid === false)
    throw new ApplicationError(res?.errMessage?.message ?? 'Unknown error');
}

export default {
  // Called before an entry is created
  async beforeCreate(event) {
    await validateSectionTot(event);
  },
  // Called after an entry is created
  afterCreate(event) {},
  // Called before an entry is created
  async beforeUpdate(event) {
    await validateSectionTot(event);
  },
  // Called after an entry is created
  afterUpdate(event) {}
};
