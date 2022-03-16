'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        // Called before an entry is created
        async beforeCreate(data) {
            const section = data && data?.section;
            const user = data && data?.user;
            if (!section || !user) throw strapi.errors.badRequest('You must provide a user and a section.');


            const res = await strapi.services['user-sections'].validateCreate(data);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        async afterCreate(result, data) {
            // Add event log to the user "Assignment Assigned"
            const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'assignment-assigned' });
            if (!eventLogType?.id) return;

            const { user, section: { id, assignment_name } = {} } = result;

            await strapi.services['event-log'].create({
                time: new Date(),
                event_log_type: eventLogType.id,
                user: user.id,
                data: JSON.stringify({ section: { id, assignment_name } })
            });
        },
        // Called before an entry is updated
        async beforeUpdate(params, data) {
            if (!data?.section || !data?.user) return;

            const res = await strapi.services['user-sections'].validateUpdate(data, params.id);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is updated
        afterUpdate(result) {
        }
    }
};
