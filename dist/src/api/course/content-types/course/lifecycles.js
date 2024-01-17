"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
async function validateSectionTot(event) {
    var _a, _b;
    const { params: { data: { course_sections } }, model: { attributes: { course_sections: { component } } }, action } = event;
    if (!course_sections || !Array.isArray(course_sections))
        return;
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
        throw new ApplicationError((_b = (_a = res === null || res === void 0 ? void 0 : res.errMessage) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Unknown error');
}
exports.default = {
    // Called before an entry is created
    async beforeCreate(event) {
        await validateSectionTot(event);
    },
    // Called after an entry is created
    afterCreate(event) { },
    // Called before an entry is created
    async beforeUpdate(event) {
        await validateSectionTot(event);
    },
    // Called after an entry is created
    afterUpdate(event) { }
};
//# sourceMappingURL=lifecycles.js.map