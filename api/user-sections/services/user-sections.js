'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    validateAssignment: async (section, user, id = null) => {
        if (!section || !user) return true;

        const knex = strapi.connections.default;
        const result = await knex('user_sections')
            .where('user', user)
            .where('section', section)
            .select('id');

        if (result.length > 0) {
            return {
                isValid: false,
                errMessage: 'Section already assigned to user'
            }
        };

        if (id) {
            const assignment = await knex('user_sections')
                .where('id', id)
                .first();

            if (assignment && (assignment.user !== user || assignment.section !== section)) {
                return {
                    isValid: false,
                    errMessage: 'Can not change user or course after assignment'
                }
            };
        }
        return true;
    }
};
