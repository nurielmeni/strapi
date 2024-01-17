'use strict';
/**
 * course controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::course.course', ({ strapi }) => ({
    /**
   * Retrieve a records for user.
   *
   * @return {Object}
   */
    async find(ctx) {
        let entities, query;
        const { id: user } = ctx.state.user;
        const user_courses = await strapi.services.course.userCourses(user);
        query = { id_in: user_courses, ...ctx.query };
        if (ctx.query._q) {
            entities = await strapi.services.course.search(query);
        }
        else {
            entities = await strapi.services.course.find(query);
        }
        return sanitizeEntity(entities, { model: strapi.models.course });
    },
    /**
     * Retrieve a record.
     *
     * @return {Object}
     */
    async findOne(ctx) {
        const { id } = ctx.params;
        const { id: user } = ctx.state.user;
        const user_courses = await strapi.services.course.userCourses(user);
        //console.log("user_courses, id", user_courses, id);
        if (!user_courses.includes(+id)) {
            return ctx.forbidden('The requested item does not belong to the user');
        }
        const entity = await strapi.services.course.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.course });
    }
}));
//# sourceMappingURL=course.js.map