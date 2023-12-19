'use strict';

/**
 * group service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::group.group', ({ strapi }) => ({
  /**
 * Promise to fetch all records
 *
 * @return {Promise}
 */
  async findAssigned (userId) {
    const knex = strapi.connections.default;

    const start = Date.now();
    console.log('GROUPS findAssigned <<<: ', userId, start);

    const result = await knex('public.groups_supervisors_data')
      .select()
      .where('user_id', userId);

    const end = Date.now();
    console.log('GROUPS findAssigned >>>: ', userId, end);
    console.log('GROUPS TIMESPAN >>>: ', end - start);

    return result;
  },

  async assignCourses (courseId, validMembersId, tmDate = null) {
    let countAssigned = 0;
    let countSkipped = 0;

    for (const memberId of validMembersId) {
      try {
        const entity = await strapi.services['user-course'].create({
          course: courseId,
          user: memberId,
          TM_date: tmDate
        });
        if (entity) countAssigned += 1;
      } catch (e) {
        countSkipped += 1;
      }
    }

    return { countAssigned, countSkipped };
  },

  async assignAssignments (assignmentId, validMembersId, tmDate = null) {
    let countAssigned = 0;
    let countSkipped = 0;

    for (const memberId of validMembersId) {
      try {
        const entity = await strapi.services['user-sections'].create({
          section: assignmentId,
          user: memberId,
          TM_date: tmDate
        });
        if (entity) countAssigned += 1;
      } catch (e) {
        countSkipped += 1;
      }
    }
    return { countAssigned, countSkipped };
  },

  async addStudent (groupId, studentId) {
    // The many-to-many table name in the database
    const tableName = 'groups_students__users_groups';
    const knex = strapi.connections.default;

    const res = await knex(tableName).insert({
      user_id: studentId,
      group_id: groupId
    });
    return res;
  }
}));
