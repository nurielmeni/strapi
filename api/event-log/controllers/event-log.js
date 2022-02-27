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
        ;

        const { time = new Date(), event_log_type } = ctx.request.body;
        if (!event_log_type) return ctx.forbidden('An event log must have a valid Event Log Type(event_log_type)');

        const entity = await strapi.services['event-log'].create({
            time: time,
            event_log_type: event_log_type,
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
};
