'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a records for user.
   *
   * @return {Object}
   */

  async find(ctx) {
    const { id: userId } = ctx.state.user;
    let entities;

    const query = { students: +userId, ...ctx.query };
    const populate = [
      'students',
      'students.profile',
      'supervisors',
      'supervisors.profile',
      'courses',
      'courses.area',
      'courses.level',
      'courses.tags',
      'assignments',
      'assignments.area',
      'assignments.level',
      'assignments.tags',
    ];

    //console.log('Query', query);
    if (ctx.query._q) {
      entities = await strapi.services.group.search(query);
    } else {
      entities = await strapi.services.group.find(query, populate);
    }
    //console.log('entities', entities);

    return sanitizeEntity(entities, { model: strapi.models.group });
  },

  /**
   * Retrieve a records for user.
   *
   * @return {Object}
   */

  async assign(ctx) {
    const { courseId, assignmentId, membersId } = ctx.request.body;
    const { id: groupId } = ctx.params;

    if (!courseId && !assignmentId) return ctx.badData('Course or Assignment required');
    if (!membersId || !Array.isArray(membersId) || membersId.length < 1) return ctx.badData('At least one Member required');

    const group = await strapi.services.group.findOne({ id: groupId });
    const validMembersId = membersId.filter(m => group.students.find(gm => gm.id === m));
    if (!validMembersId || validMembersId.length < 1) return ctx.badData('At least one valid Member required');


    if (courseId && Array.isArray(courseId) && courseId.length > 0) {
      const total = { countAssigned: 0, countSkipped: 0 }
      for (const currCourseId of courseId) {
        const course = group.courses.find(c => c.id === currCourseId);
        if (course) {
          const res = await strapi.services.group.assignCourses(course.id, validMembersId);
          total.countAssigned += res.countAssigned;
          total.countSkipped += res.countSkipped;
        }
      }
      return total;
    }

    if (assignmentId) {
      const total = { countAssigned: 0, countSkipped: 0 }
      for (const currAssignmentId of courseId) {
        const assignment = group.assignments.find(a => a.id === currAssignmentId);
        if (assignment) {
          const res = await strapi.services.group.assignAssignments(assignment.id, validMembersId);
          total.countAssigned += res.countAssigned;
          total.countSkipped += res.countSkipped;
        }
      }
      return total;
    }
  },

  async assignEntities(entityType, entityId, group, validMembersId) {
    const groupEntity = group[entityType].find(e => e.id === +entityId);
    if (!groupEntity) return ctx.badData(`The assignment id ${entityId}, was not found in group id ${group.id}`);
    await validMembersId.forEach(async id => {
      try {
        const entity = await strapi.services['user-sections'].create({
          section: +entityId,
          user: id
        });
        if (entity) countAssigned += 1;
      } catch (e) {
        console.log('user:', memberId, ', assignment:', assignmentId, e.message);
      }
    });
  }
};
