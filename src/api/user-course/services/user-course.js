'use strict';

/**
 * user-course service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-course.user-course', ({ strapi }) => ({
  validateCreate: async ({ course, user }) => {

    const result = await strapi.db.query('api::user-course.user-course').findMany({
      where: {
        user: user?.connect?.[0]?.id,
        course: course?.connect?.[0]?.id,
      },
    });


    if (result.length > 0) {
      return {
        isValid: false,
        errMessage: 'Course already assigned to user'
      }
    };

    return true;
  },
  validateUpdate: async ({ course, user }) => {
    // If any course or user changed return false
    if (course?.connect?.length || user?.connect?.length) return {
      isValid: false,
      errMessage: 'Can not change User or Course after assignment'
    };

    return true;
  }
}));
