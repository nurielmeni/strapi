'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
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

        const query = { user: +userId, ...ctx.query };

        //console.log('Query', query);
        if (ctx.query._q) {
            entities = await strapi.services['user-sections'].search(query);
        } else {
            entities = await strapi.services['user-sections'].find(query);
        }
        //console.log('entities', entities);

        return sanitizeEntity(entities, { model: strapi.models['user-sections'] });
    },

    /**
     * Update a record.
     *
     * @return {Object}
     */
    async update(ctx) {
        const { id } = ctx.params;


        const { progress: progressBefore } = await strapi.services['user-sections'].findOne({ id }) ?? {};
        let entity = await strapi.services['user-sections'].update({ id }, ctx.request.body);
        const { progress: progressAfter } = entity ?? {};

        // Update the start date
        if (entity && !progressBefore && progressAfter) {
            entity = await strapi.services['user-sections'].update({ id }, { start_date: new Date() });

            // Add event log to the user "Assignment Start"
            const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'assignment-started' });
            if (eventLogType?.id) {
                // section = assignment
                const { user, section: { id, name } = {} } = entity;

                await strapi.services['event-log'].create({
                    time: new Date(),
                    event_log_type: eventLogType.id,
                    user: user.id,
                    data: JSON.stringify({ section: { id, name } })
                });
            }
        }

        return sanitizeEntity(entity, { model: strapi.models['user-sections'] });
    },

    /**
   * Retrieve a records for user.
   *
   * @return {Object}
   */

    async count(ctx) {
        const { id: userId } = ctx.state.user;
        let entities;

        const query = { user: +userId, ...ctx.query };

        //console.log('Query', query);
        if (ctx.query._q) {
            entities = await strapi.services['user-sections'].count(query);
        } else {
            entities = await strapi.services['user-sections'].count(query);
        }
        //console.log('entities', entities);

        return sanitizeEntity(entities, { model: strapi.models['user-sections'] });
    },

};
