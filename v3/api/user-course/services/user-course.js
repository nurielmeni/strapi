'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    validateCreate: async ({ course, user }) => {
        const knex = strapi.connections.default;

        const result = await knex('user_courses')
            .where('user', user)
            .where('course', course)
            .select('id');

        if (result.length > 0) {
            return {
                isValid: false,
                errMessage: 'Course already assigned to user'
            }
        };

        return true;
    },
    validateUpdate: async ({ course, user }, id = null) => {
        if (!course || !user) return true;

        const knex = strapi.connections.default;

        if (id) {
            const assignment = await knex('user_courses')
                .where('id', id)
                .first();

            if (assignment && (assignment.user !== user || assignment.course !== course)) {
                return {
                    isValid: false,
                    errMessage: 'Can not change User or Course after assignment'
                }
            };
        }

        return true;
    }
};
