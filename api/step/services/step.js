'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const retrieveTypeFromComponent = (cType, name) => {
    if (!cType) throw strapi.errors.badRequest('Could not extract type');
    return cType?.__component.split(`${name}.`, 2)?.[1] ?? false;
}

const validateFilter = async (id, stepType) => {
    // Handle filter step
    if (typeof id !== 'number')
        throw strapi.errors.badRequest(`The drill id is not valid: ${id}`);

    const drill = await strapi.query('drill').findOne({ id });

    if (drill?.drill_category !== 'Filter')
        throw strapi.errors.badRequest('The drill must be of category: Filter');

}

const validateContent = async (id) => {
    // Handle stack step
    if (typeof id !== 'number')
        throw strapi.errors.badRequest(`The stack id is not valid: ${id}`);

    const stack = await strapi.query('stack').findOne({ id });
    const stackType = retrieveTypeFromComponent(stack?.stackSource?.[0], 'stack');
    if (stackType !== 'content')
        throw strapi.errors.badRequest('The drill must be of type: Content');
}

const validateStepType = async (step) => {
    if (!step)
        throw strapi.errors.badRequest('Could not get the dynamic step');

    // 1. Get the step type
    const stepType = retrieveTypeFromComponent(step, 'step');
    if (!stepType)
        throw strapi.errors.badRequest('Could not get the step type');


    if (stepType === 'html') {
        await validateContent(step?.stack, stepType);
        return;
    }

    if (stepType === 'filter') {
        await validateFilter(step?.drill, stepType);
        return;
    }

    // 2. Get the drill and drill type
    const drill = await strapi.query('drill').findOne({ id: step?.drill });
    const drillType = retrieveTypeFromComponent(drill?.drill_type?.[0], 'drill');
    if (!drill || !drillType)
        throw strapi.errors.badRequest('Could not get the step drill or type');

    if (!drillType.includes(stepType))
        throw strapi.errors.badRequest(`Drill type must be ${stepType}`);

    // 3. Get the stack and stack type
    const stack = await strapi.query('stack').findOne({ id: step?.stack });
    const stackType = retrieveTypeFromComponent(stack?.stackSource?.[0], 'stack');
    if (!stack || !stackType)
        throw strapi.errors.badRequest('Could not get the step stack or type');

    // 4. Validate all match
    if (!stackType.includes(stepType))
        throw strapi.errors.badRequest(`Stack type must be ${stepType}`);

}

module.exports = {
    validateStepType
};
