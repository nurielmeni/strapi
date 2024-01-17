import { errors } from '@strapi/utils';
import stack from '../../stack/controllers/stack';

/**
 * step service
 */
const { ApplicationError } = errors;

const { createCoreService } = require('@strapi/strapi').factories;

const retrieveTypeFromComponent = (cType, name) => {
  if (!cType) throw new ApplicationError('Could not extract type');
  const str = cType?.__component.split(`${name}.`, 2)?.[1] ?? false;
  if (!str) return false;
  return str.endsWith('s') ? str.slice(0, -1) : str;
};

const validateStepType = async (step, action: string) => {
  if (!step) throw new ApplicationError('Could not get the dynamic step');

  // 1. Get the step type
  const stepTypeComponentName = step?.__component;
  const shortStepTypeComponentName = retrieveTypeFromComponent(step, 'step');
  if (!stepTypeComponentName) throw new Error('No step type component found');

  const stepTypeComponent = await strapi.db
    .query(stepTypeComponentName)
    .findOne({
      where: { id: step.id },
      populate: {
        stack: { populate: { stack_source: true } },
        drill: { populate: { drill_type: true } }
      }
    });

  // Removes Components if could not create (Not leaving rabish)
  if (!stepTypeComponent?.drill || !stepTypeComponent?.stack) {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError('You must assign a step and a drill');
  }

  const drillType = retrieveTypeFromComponent(
    stepTypeComponent?.drill?.drill_type?.[0],
    'drill'
  );
  if (!drillType) {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError('Could not get the step drill or type');
  }

  const stackType = retrieveTypeFromComponent(
    stepTypeComponent?.stack?.stack_source?.[0],
    'stack'
  );
  if (!stackType) {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError('Could not get the step stack or type');
  }

  if (stepTypeComponentName === 'step.filter') {
    if (stepTypeComponent?.drill?.drill_category !== 'Filter') {
      action === 'beforeCreate' &&
        (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
      throw new ApplicationError('The drill must be of category: Filter');
    }
    return;
  }

  if (stepTypeComponentName === 'step.html') {
    if (!stackType.includes('content')) {
      action === 'beforeCreate' &&
        (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
      throw new ApplicationError('The stack must be of type: Content');
    }
    return;
  }

  if (stepTypeComponent?.drill?.drill_category === 'Filter') {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError(
      'Filter Drills can be assigned only to Filter Steps.'
    );
  }

  if (!drillType.includes(shortStepTypeComponentName)) {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError(
      `Drill type must be ${shortStepTypeComponentName}`
    );
  }

  if (!stackType.includes(shortStepTypeComponentName)) {
    action === 'beforeCreate' &&
      (await removeComponents(stepTypeComponentName, stepTypeComponent?.id));
    throw new ApplicationError(
      `Stack type must be ${shortStepTypeComponentName}`
    );
  }
};

// Removes Components if could not create (Not leaving rabish)
async function removeComponents(stepTypeComponentName: string, id: number) {
  const deleted = await strapi.db.query(stepTypeComponentName).delete({
    where: { id: id },
    populate: {
      stack: { populate: { stack_source: true } },
      drill: { populate: { drill_type: true } }
    }
  });
}

export default createCoreService('api::step.step', ({ strapi }) => ({
  validateStepType
}));
