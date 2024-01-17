'use strict';
/**
 * event-log controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::event-log.event-log', ({ strapi }) => ({
    /**
   * Create a record.
   *
   * @return {Object}
   */
    async create(ctx) {
        const user = ctx.state.user;
        if (!user)
            return ctx.forbidden('An event log must have a valid User');
        //TODO: Accept user id: validate can log to user
        const { time = new Date(), event_log_type, data } = ctx.request.body;
        let eventLogType;
        // event_log_type - String - event type name
        // event_log_type - Number - event type id
        if (typeof event_log_type === 'string') {
            eventLogType = await strapi.services['event-log-type'].findOne({
                event_type: event_log_type
            });
        }
        else if (typeof event_log_type === 'number') {
            eventLogType = await strapi.services['event-log-type'].findOne({
                id: event_log_type
            });
        }
        if (!eventLogType)
            return ctx.forbidden('An event log must have a valid Event Log Type(event_log_type)');
        const entity = await strapi.services['event-log'].create({
            time: time,
            event_log_type: eventLogType.id,
            user: user.id,
            data: data && JSON.stringify(data)
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
        var _a, _b;
        let { user } = ctx.query;
        ctx.query.user = +user || ((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.state) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id);
        ctx.query._sort = 'time:DESC';
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services['event-log'].search(ctx.query);
        }
        else {
            entities = await strapi.services['event-log'].find(ctx.query);
        }
        return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models['event-log'] }));
    },
    async userTimeByDays(ctx) {
        const { id: userId } = ctx.params;
        if (!userId)
            return ctx.forbidden('An event query must have a valid User');
        let { days = 7, start_date: startDate } = ctx.query;
        const weekTime = days * 24 * 60 * 60 * 1000;
        startDate = startDate
            ? new Date(startDate).setHours(0, 0, 0, 0)
            : new Date(Date.now() - weekTime).setHours(0, 0, 0, 0);
        const endDate = new Date(startDate + weekTime).setHours(0, 0, 0, 0);
        const entities = await strapi.services['event-log'].find({
            user: userId,
            time_gte: startDate,
            time_lte: endDate,
            event_log_type_in: [1, 2],
            _sort: 'time:DESC'
        });
        // By Date login/logout events
        const byDateEvents = [];
        for (const entity of entities) {
            const { event_log_type: { event_type: eventType }, time } = entity;
            byDateEvents.push({ eventType, time });
        }
        return {
            userId,
            startDate,
            endDate,
            byDateEvents
        };
    }
}));
//# sourceMappingURL=event-log.js.map