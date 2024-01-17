"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
exports.default = {
    async beforeCreate(event) {
        var _a, _b;
        const { params: { data }, action } = event;
        const step = (_b = (_a = data === null || data === void 0 ? void 0 : data.step_type) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
        try {
            await strapi.service('api::step.step').validateStepType(step, action);
        }
        catch (e) {
            throw new ApplicationError(e.message);
        }
    },
    async beforeUpdate(event) {
        var _a, _b;
        const { params: { data }, action } = event;
        if ('publishedAt' in data)
            return;
        const step = (_b = (_a = data === null || data === void 0 ? void 0 : data.step_type) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
        try {
            await strapi.service('api::step.step').validateStepType(step, action);
        }
        catch (e) {
            throw new ApplicationError(e.message);
        }
    }
};
//# sourceMappingURL=lifecycles.js.map