'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

function isValidPing(user) {

}

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.forbidden('An event log must have a valid User');

        //TODO: Accept user id: validate can log to user 

        const { time = new Date(), event_log_type } = ctx.request.body;
        let eventLogType;
        // event_log_type - String - event type name
        // event_log_type - Number - event type id
        if (typeof event_log_type === 'string') {
            eventLogType = await strapi.services['event-log-type'].findOne({ event_type: event_log_type });
        } else if (typeof event_log_type === 'number') {
            eventLogType = await strapi.services['event-log-type'].findOne({ id: event_log_type });
        }

        if (!eventLogType) return ctx.forbidden('An event log must have a valid Event Log Type(event_log_type)');

        const entity = await strapi.services['event-log'].create({
            time: time,
            event_log_type: eventLogType.id,
            user: user.id
        });
        return sanitizeEntity(entity, { model: strapi.models['event-log'] });
    },

    /**
     * Retrieve a record.
     *
     * @return {Object}
     */

    async findOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi.services['event-log'].findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models['event-log'] });
    },

    /**
     * Retrieve a record.
     *
     * @return {Object}
     */

    async find(ctx) {
        let { user } = ctx.query;
        ctx.query.user = +user || ctx?.state?.user?.id;
        ctx.query._sort = 'time:DESC';

        let entities;
        if (ctx.query._q) {
            entities = await strapi.services['event-log'].search(ctx.query);
        } else {
            entities = await strapi.services['event-log'].find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['event-log'] }));
    },
};
