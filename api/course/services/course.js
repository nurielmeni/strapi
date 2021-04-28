'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    userCourses: async (user_id) => {
        if (!user_id) return [];

        const knex = strapi.connections.default;
        const result = await knex('user_courses')
        .where('user', user_id)
        .select('course');
        
        return result.map(c => c.course);
    }
};
