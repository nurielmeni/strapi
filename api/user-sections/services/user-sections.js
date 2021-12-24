'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    validateCreate: async ({ section, user }) => {
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

        return true;
    },
    validateUpdate: async ({ section, user }, id = null) => {
        if (!section || !user) return true;

        const knex = strapi.connections.default;

        if (id) {
            const assignment = await knex('user_sections')
                .where('id', id)
                .first();

            if (assignment && (assignment.user !== user || assignment.section !== section)) {
                return {
                    isValid: false,
                    errMessage: 'Can not change User or Section after assignment'
                }
            };
        }

        return true;
    }
};
