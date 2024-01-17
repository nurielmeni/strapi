"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
async function validateStepTot(event) {
    var _a, _b;
    const { params: { data: { step } }, model: { attributes: { step: { component } } }, action } = event;
    if (!step || !Array.isArray(step))
        return;
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
        throw new ApplicationError((_b = (_a = res === null || res === void 0 ? void 0 : res.errMessage) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Unknown error');
}
exports.default = {
    async beforeCreate(event) {
        await validateStepTot(event);
    },
    async beforeUpdate(event) {
        await validateStepTot(event);
    }
};
//# sourceMappingURL=lifecycles.js.map