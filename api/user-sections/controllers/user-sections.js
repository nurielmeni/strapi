'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

const updateStartDate = async (entity) => {
    entity = await strapi.services['user-sections'].update({ id: entity.id }, { start_date: new Date() });

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

const updateCompletionDate = async (entity, score) => {
    if (entity.completed_date) {
        console.log('updateCompletionDate: alredy completed:', entity.completed_date);
        return;
    }

    entity = await strapi.services['user-sections'].update({ id: entity.id }, {
        completed_date: new Date(),
        score: score
    });

    // Add event log to the user "Assignment Completed"
    const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'assignment-completed' });
    if (eventLogType?.id) {
        // section = assignment
        const { user, score, section: { id, name } = {} } = entity;

        await strapi.services['event-log'].create({
            time: new Date(),
            event_log_type: eventLogType.id,
            user: user.id,
            data: JSON.stringify({ section: { id, name }, score })
        });
    }
}

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

        // Update the completion date
        const { sectionScore } = ctx.request.body?.progress?.section?.[0] ?? {};
        console.log('sectionScore: ', sectionScore);
        if (sectionScore) await updateCompletionDate(entity, sectionScore);

        // Update the start date
        if (entity && !progressBefore && progressAfter) await updateStartDate(entity);

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
