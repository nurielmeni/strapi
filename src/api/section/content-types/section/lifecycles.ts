import { errors } from '@strapi/utils';

const { ApplicationError } = errors;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

async function validateStepTot(event) {
  const {
    params: {
      data: { step }
    },
    model: {
      attributes: {
        step: { component }
      }
    },
    action
  } = event;

  if (!step || !Array.isArray(step)) return;

  const stepIds = step.map((s) => s.id);

  const stepTot = await strapi.db.query(component).findMany({
    where: { id: { $in: stepIds } },
    populate: {
      terms_of_transition: true
    }
  });

  const tot = stepTot.map((s) => s.terms_of_transition);

  const res = await strapi
    .service('api::section.section')
    .validateTermsOfTransitionRange(tot);

  if (res && res.isValid === false)
    throw new ApplicationError(res?.errMessage?.message ?? 'Unknown error');
}

export default {
  async beforeCreate(event) {
    await validateStepTot(event);
  },
  async beforeUpdate(event) {
    await validateStepTot(event);
  }
};
