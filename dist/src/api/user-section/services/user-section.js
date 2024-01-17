"use strict";
/**
 * user-section service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const { createCoreService } = require('@strapi/strapi').factories;
exports.default = createCoreService('api::user-section.user-section', ({ strapi }) => ({
    validateCreate: async ({ section, user }) => {
        var _a, _b, _c, _d;
        const result = await strapi.db
            .query('api::user-section.user-section')
            .findMany({
            where: {
                user: (_b = (_a = user === null || user === void 0 ? void 0 : user.connect) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
                section: (_d = (_c = section === null || section === void 0 ? void 0 : section.connect) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id
            }
        });
        if (result.length > 0) {
            return {
                isValid: false,
                errMessage: 'Section already assigned to user'
            };
        }
        return true;
    },
    validateUpdate: async ({ section, user }, id = null) => {
        var _a, _b;
        // If any course or user changed return false
        if (((_a = section === null || section === void 0 ? void 0 : section.connect) === null || _a === void 0 ? void 0 : _a.length) || ((_b = user === null || user === void 0 ? void 0 : user.connect) === null || _b === void 0 ? void 0 : _b.length))
            return {
                isValid: false,
                errMessage: 'Can not change User or Section after assignment'
            };
        return true;
    }
}));
//# sourceMappingURL=user-section.js.map