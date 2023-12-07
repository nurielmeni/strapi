'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        // Called before an entry is created
        async beforeCreate(params, data) {
            const section = params && params?.course;
            const user = params && params?.user;
            if (!section || !user) return;


            const res = await strapi.services['user-course'].validateCreate(params);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        async afterCreate(result) {
            // Add event log to the user "Assignment Assigned"
            const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'course-assigned' });
            if (!eventLogType?.id) return;

            const { user, course: { id, name } = {} } = result;

            await strapi.services['event-log'].create({
                time: new Date(),
                event_log_type: eventLogType.id,
                user: user.id,
                data: JSON.stringify({ course: { id, name } })
            });
        },
        // Called before an entry is updated
        async beforeUpdate(params, data) {
            if (!data?.course || !data?.user) return;

            const res = await strapi.services['user-course'].validateUpdate(data, params.id);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is updated
        afterUpdate(result, params, data) {
        }
    }
};
