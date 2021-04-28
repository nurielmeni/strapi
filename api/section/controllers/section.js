'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records for section on specific course.
   *
   * @return {Object}
   */
  /*
   async find(ctx) {
    let entities, query;
    const { course } = ctx.query;
    const { id: user } = ctx.state.user;

    if (!course) {
      //return ctx.unauthorized("You must provide a course");
    }

    query = { user: +user, course: +course };
    //console.log(query);

    // const userCourse = await strapi.services["user-course"].find(query);

    // if (!userCourse || !userCourse.length) {
    //     return ctx.unauthorized("User has not assigned to this course");
    // }

    query = { 'course.id': course };
    if (ctx.query._q) {
      entities = await strapi.services.section.search(ctx.query);
    } else {
      entities = await strapi.services.section.find(ctx.query);
    }

    return sanitizeEntity(entities, { model: strapi.models.course });
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  /*
  async findOne(ctx) {
    const { id } = ctx.params;
    const { id: userId } = ctx.state.user;

    return sanitizeEntity(entity, { model: strapi.models.course });
  }
  */
};
