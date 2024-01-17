"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
/**
 * group service
 */
const { createCoreService } = strapi_1.factories;
const metaPopulation = {
    area: {
        fields: ['id', 'name']
    },
    level: {
        fields: ['id', 'name']
    },
    tags: {
        fields: ['id', 'name']
    }
};
const groupPopulation = {
    students: {
        fields: ['username'],
        filters: {
            blocked: { $not: true }
        },
        populate: {
            profile: {
                fields: ['id', 'firstname', 'lastname']
            }
        }
    },
    supervisors: {
        fields: ['username'],
        filters: {
            blocked: { $not: true }
        },
        populate: {
            profile: {
                fields: ['id', 'firstname', 'lastname']
            }
        }
    },
    courses: {
        fields: ['name', 'subtitle', 'description', 'is_resetYes'],
        populate: metaPopulation
    },
    assignments: {
        fields: ['name', 'subtitle', 'description', 'is_reset', 'assignment_name'],
        populate: metaPopulation
    }
};
exports.default = createCoreService('api::group.group', ({ strapi }) => ({
    async findOne(id) {
        return await strapi.entityService.findOne('api::group.group', id, {
            fields: ['id', 'name', 'description'],
            publicationState: 'live',
            sort: { createdAt: 'desc' },
            populate: groupPopulation
        });
    },
    async findAssigned(userId) {
        return await strapi.entityService.findMany('api::group.group', {
            fields: ['id', 'name', 'description', 'subtitle'],
            filters: {
                $or: [
                    {
                        supervisors: {
                            id: { $eq: userId }
                        }
                    },
                    {
                        students: {
                            id: { $eq: userId }
                        }
                    }
                ]
            },
            publicationState: 'live',
            sort: { createdAt: 'desc' },
            populate: groupPopulation
        });
    },
    async assignCourses(courseId, validMembersId) {
        let countAssigned = 0;
        let countSkipped = 0;
        for (const memberId of validMembersId) {
            try {
                const entity = await strapi.entityService.create('api::user-course.user-course', {
                    data: {
                        course: courseId,
                        user: memberId
                    }
                });
                if (entity)
                    countAssigned += 1;
            }
            catch (e) {
                countSkipped += 1;
            }
        }
        return { countAssigned, countSkipped };
    },
    async assignAssignments(assignmentId, validMembersId) {
        let countAssigned = 0;
        let countSkipped = 0;
        for (const memberId of validMembersId) {
            try {
                const entity = await strapi.entityService.create('api::user-course.user-course', {
                    data: {
                        section: assignmentId,
                        user: memberId
                    }
                });
                if (entity)
                    countAssigned += 1;
            }
            catch (e) {
                countSkipped += 1;
            }
        }
        return { countAssigned, countSkipped };
    },
    async addStudent(groupId, studentId) {
        // The many-to-many table name in the database
        // const tableName = 'groups_students__users_groups';
        // const res = await knex(tableName).insert({
        //     user_id: studentId,
        //     group_id: groupId
        // });
        // return res;
    }
}));
//# sourceMappingURL=group.js.map