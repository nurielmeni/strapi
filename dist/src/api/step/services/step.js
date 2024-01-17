"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
/**
 * step service
 */
const { ApplicationError } = utils_1.errors;
const { createCoreService } = require('@strapi/strapi').factories;
const retrieveTypeFromComponent = (cType, name) => {
    var _a, _b;
    if (!cType)
        throw new ApplicationError('Could not extract type');
    const str = (_b = (_a = cType === null || cType === void 0 ? void 0 : cType.__component.split(`${name}.`, 2)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : false;
    if (!str)
        return false;
    return str.endsWith('s') ? str.slice(0, -1) : str;
};
const validateStepType = async (step, action) => {
    var _a, _b, _c, _d, _e, _f;
    if (!step)
        throw new ApplicationError('Could not get the dynamic step');
    // 1. Get the step type
    const stepTypeComponentName = step === null || step === void 0 ? void 0 : step.__component;
    const shortStepTypeComponentName = retrieveTypeFromComponent(step, 'step');
    if (!stepTypeComponentName)
        throw new Error('No step type component found');
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
    if (!(stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.drill) || !(stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.stack)) {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError('You must assign a step and a drill');
    }
    const drillType = retrieveTypeFromComponent((_b = (_a = stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.drill) === null || _a === void 0 ? void 0 : _a.drill_type) === null || _b === void 0 ? void 0 : _b[0], 'drill');
    if (!drillType) {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError('Could not get the step drill or type');
    }
    const stackType = retrieveTypeFromComponent((_d = (_c = stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.stack) === null || _c === void 0 ? void 0 : _c.stack_source) === null || _d === void 0 ? void 0 : _d[0], 'stack');
    if (!stackType) {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError('Could not get the step stack or type');
    }
    if (stepTypeComponentName === 'step.filter') {
        if (((_e = stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.drill) === null || _e === void 0 ? void 0 : _e.drill_category) !== 'Filter') {
            action === 'beforeCreate' &&
                (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
            throw new ApplicationError('The drill must be of category: Filter');
        }
        return;
    }
    if (stepTypeComponentName === 'step.html') {
        if (!stackType.includes('content')) {
            action === 'beforeCreate' &&
                (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
            throw new ApplicationError('The stack must be of type: Content');
        }
        return;
    }
    if (((_f = stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.drill) === null || _f === void 0 ? void 0 : _f.drill_category) === 'Filter') {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError('Filter Drills can be assigned only to Filter Steps.');
    }
    if (!drillType.includes(shortStepTypeComponentName)) {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError(`Drill type must be ${shortStepTypeComponentName}`);
    }
    if (!stackType.includes(shortStepTypeComponentName)) {
        action === 'beforeCreate' &&
            (await removeComponents(stepTypeComponentName, stepTypeComponent === null || stepTypeComponent === void 0 ? void 0 : stepTypeComponent.id));
        throw new ApplicationError(`Stack type must be ${shortStepTypeComponentName}`);
    }
};
// Removes Components if could not create (Not leaving rabish)
async function removeComponents(stepTypeComponentName, id) {
    const deleted = await strapi.db.query(stepTypeComponentName).delete({
        where: { id: id },
        populate: {
            stack: { populate: { stack_source: true } },
            drill: { populate: { drill_type: true } }
        }
    });
}
exports.default = createCoreService('api::step.step', ({ strapi }) => ({
    validateStepType
}));
//# sourceMappingURL=step.js.map