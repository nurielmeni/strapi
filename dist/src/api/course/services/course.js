'use strict';
/**
 * course service
 */
const { createCoreService } = require('@strapi/strapi').factories;
const { validateTermsOfTransitionRange } = require('../../../general/validateTermsOfTransitionRange');
module.exports = createCoreService('api::course.course', ({ strapi }) => ({
    async userCourses(user_id) {
        if (!user_id)
            return [];
        const knex = strapi.connections.default;
        const result = await knex('user_courses')
            .where('user', user_id)
            .select('course');
        return result.map(c => c.course);
    },
    validateTermsOfTransitionRange
}));
//# sourceMappingURL=course.js.map