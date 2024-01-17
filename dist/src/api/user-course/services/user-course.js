'use strict';
/**
 * user-course service
 */
const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::user-course.user-course', ({ strapi }) => ({
    validateCreate: async ({ course, user }) => {
        var _a, _b, _c, _d;
        const result = await strapi.db.query('api::user-course.user-course').findMany({
            where: {
                user: (_b = (_a = user === null || user === void 0 ? void 0 : user.connect) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
                course: (_d = (_c = course === null || course === void 0 ? void 0 : course.connect) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id,
            },
        });
        if (result.length > 0) {
            return {
                isValid: false,
                errMessage: 'Course already assigned to user'
            };
        }
        ;
        return true;
    },
    validateUpdate: async ({ course, user }) => {
        var _a, _b;
        // If any course or user changed return false
        if (((_a = course === null || course === void 0 ? void 0 : course.connect) === null || _a === void 0 ? void 0 : _a.length) || ((_b = user === null || user === void 0 ? void 0 : user.connect) === null || _b === void 0 ? void 0 : _b.length))
            return {
                isValid: false,
                errMessage: 'Can not change User or Course after assignment'
            };
        return true;
    }
}));
//# sourceMappingURL=user-course.js.map