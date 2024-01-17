"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
exports.default = {
    async beforeCreate(event) {
        const { params: { data }, action } = event;
        const { course, user } = data;
        if (!course || !user)
            return;
        const res = await strapi
            .service('api::user-course.user-course')
            .validateCreate(data);
        if (res && res.isValid === false)
            throw new ApplicationError(res.errMessage);
    },
    async afterCreate(event) {
        var _a, _b, _c, _d;
        // Add event log to the user "Assignment Assigned"
        const eventLogType = await strapi.db
            .query('api::event-log-type.event-log-type')
            .findOne({
            where: { event_type: 'course-assigned' }
        });
        if (!(eventLogType === null || eventLogType === void 0 ? void 0 : eventLogType.id))
            return;
        const { user, course } = event.params.data;
        const userId = (_b = (_a = user === null || user === void 0 ? void 0 : user.connect) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
        const courseId = (_d = (_c = course === null || course === void 0 ? void 0 : course.connect) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id;
        if (!userId || !courseId)
            return;
        const currentCourse = await strapi.entityService.findOne('api::course.course', courseId);
        await strapi.entityService.create('api::event-log.event-log', {
            data: {
                time: new Date(),
                event_log_type: eventLogType.id,
                user: user.id,
                data: JSON.stringify({
                    course: { id: currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.id, name: currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.name }
                })
            }
        });
    },
    async beforeUpdate(event) {
        const { params: { data } } = event;
        const res = await strapi
            .service('api::user-course.user-course')
            .validateUpdate(data);
        if (res && res.isValid === false)
            throw new ApplicationError(res.errMessage);
    }
};
//# sourceMappingURL=lifecycles.js.map