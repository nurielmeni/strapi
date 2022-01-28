'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */


module.exports = {
    /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
    find(params, populate) {
        return strapi.query('group').model.fetchAll({
            ...params,
            columns: ['id', 'name', 'description'],
            withRelated: [
                ...populate
            ]
        })
    },
    async assignCourses(courseId, validMembersId) {
        let countAssigned = 0;
        let countSkipped = 0;

        for (const memberId of validMembersId) {
            try {
                const entity = await strapi.services['user-course'].create({
                    course: courseId,
                    user: memberId
                });
                if (entity) countAssigned += 1;
            } catch (e) {
                countSkipped += 1
            }
        }

        return { countAssigned, countSkipped };
    },

    async assignAssignments(assignmentId, validMembersId) {
        let countAssigned = 0;
        let countSkipped = 0;

        for (const memberId of validMembersId) {
            try {
                const entity = await strapi.services['user-sections'].create({
                    section: assignmentId,
                    user: memberId
                });
                if (entity) countAssigned += 1;
            } catch (e) {
                countSkipped += 1
            }
        }
        return { countAssigned, countSkipped };
    }
};
