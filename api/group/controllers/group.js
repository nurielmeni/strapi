'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a records for group.
   *
   * @return {Object}
   */

  async findAssigned(ctx) {
    const { id: userId } = ctx.state.user;

    const res = await strapi.services.group.findAssigned(+userId);
    return res;
  },

  /**
   * Assign users to courses and assignments.
   *
   * @return {Object}
   */

  async assign(ctx) {
    const { courseId, assignmentId, membersId } = ctx.request.body;
    const { id: groupId } = ctx.params;

    if (!courseId && !assignmentId)
      return ctx.badData('Course or Assignment required');
    if (!membersId || !Array.isArray(membersId) || membersId.length < 1)
      return ctx.badData('At least one Member required');

    const group = await strapi.services.group.findOne({ id: groupId });
    const validMembersId = membersId.filter((m) =>
      group.students.find((gm) => gm.id === m)
    );
    if (!validMembersId || validMembersId.length < 1)
      return ctx.badData('At least one valid Member required');

    const total = { countAssigned: 0, countSkipped: 0 };

    if (courseId && Array.isArray(courseId) && courseId.length > 0) {
      for (const currCourseId of courseId) {
        const course = group.courses.find((c) => c.id === currCourseId);
        if (course) {
          const res = await strapi.services.group.assignCourses(
            course.id,
            validMembersId
          );
          total.countAssigned += res.countAssigned;
          total.countSkipped += res.countSkipped;
        }
      }
      return total;
    }

    if (
      assignmentId &&
      Array.isArray(assignmentId) &&
      assignmentId.length > 0
    ) {
      for (const currAssignmentId of assignmentId) {
        const assignment = group.assignments.find(
          (a) => a.id === currAssignmentId
        );
        if (assignment) {
          const res = await strapi.services.group.assignAssignments(
            assignment.id,
            validMembersId
          );
          total.countAssigned += res.countAssigned;
          total.countSkipped += res.countSkipped;
        }
      }
      return total;
    }
    return total;
  },

  async assignEntities(entityType, entityId, group, validMembersId) {
    const groupEntity = group[entityType].find((e) => e.id === +entityId);
    if (!groupEntity)
      return ctx.badData(
        `The assignment id ${entityId}, was not found in group id ${group.id}`
      );
    await validMembersId.forEach(async (id) => {
      try {
        const entity = await strapi.services['user-sections'].create({
          section: +entityId,
          user: id
        });
        if (entity) countAssigned += 1;
      } catch (e) {
        console.log(
          'user:',
          memberId,
          ', assignment:',
          assignmentId,
          e.message
        );
      }
    });
  },

  async update(ctx) {
    console.log(ctx);
  }
};
