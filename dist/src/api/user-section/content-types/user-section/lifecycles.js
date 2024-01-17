"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
exports.default = {
    async beforeCreate(event) {
        const { params: { data }, action } = event;
        const { section, user } = data;
        if (!section || !user)
            return;
        const res = await strapi
            .service('api::user-section.user-section')
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
            where: { event_type: 'assignment-assigned' }
        });
        if (!(eventLogType === null || eventLogType === void 0 ? void 0 : eventLogType.id))
            return;
        const { user, section } = event.params.data;
        const userId = (_b = (_a = user === null || user === void 0 ? void 0 : user.connect) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
        const sectionId = (_d = (_c = section === null || section === void 0 ? void 0 : section.connect) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.id;
        if (!userId || !sectionId)
            return;
        const currentsection = await strapi.entityService.findOne('api::section.section', sectionId);
        await strapi.entityService.create('api::event-log.event-log', {
            data: {
                time: new Date(),
                event_log_type: eventLogType.id,
                user: user.id,
                data: JSON.stringify({
                    course: { id: currentsection === null || currentsection === void 0 ? void 0 : currentsection.id, name: currentsection === null || currentsection === void 0 ? void 0 : currentsection.name }
                })
            }
        });
    },
    async beforeUpdate(event) {
        const { params: { data } } = event;
        const res = await strapi
            .service('api::user-section.user-section')
            .validateUpdate(data);
        if (res && res.isValid === false)
            throw new ApplicationError(res.errMessage);
    }
};
//# sourceMappingURL=lifecycles.js.map