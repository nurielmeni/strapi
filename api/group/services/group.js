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
    async findAssigned() {
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
        return await strapi.query('group').model.fetchAll({
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
    },

    async addStudent(groupId, studentId) {
        // The many-to-many table name in the database
        const tableName = 'groups_students__users_groups';
        const knex = strapi.connections.default;

        const res = await knex(tableName).insert({
            user_id: studentId,
            group_id: groupId
        });
        return res;
    }
};
