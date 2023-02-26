'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

const updateStartDate = async (entity) => {
  if (entity.start_date) {
    console.log('updateCompletionDate: alredy completed:', entity.start_date);
    return;
  }
  entity = await strapi.services['user-sections'].update(
    { id: entity.id },
    { start_date: new Date() }
  );

  // Add event log to the user "Assignment Start"
  const eventLogType = await strapi.services['event-log-type'].findOne({
    event_type: 'assignment-started'
  });
  if (eventLogType?.id) {
    // section = assignment
    const { user, section: { id, assignment_name } = {} } = entity;

    await strapi.services['event-log'].create({
      time: new Date(),
      event_log_type: eventLogType.id,
      user: user.id,
      data: JSON.stringify({ section: { id, name: assignment_name } })
    });
  }
};

const updateCompletionDate = async (entity, score) => {
  if (entity.completed_date) {
    console.log(
      'updateCompletionDate: alredy completed:',
      entity.completed_date
    );
    return;
  }

  entity = await strapi.services['user-sections'].update(
    { id: entity.id },
    {
      completed_date: new Date(),
      score: score
    }
  );

  // Add event log to the user "Assignment Completed"
  const eventLogType = await strapi.services['event-log-type'].findOne({
    event_type: 'assignment-completed'
  });
  if (eventLogType?.id) {
    // section = assignment
    const { user, score, section: { id, assignment_name } = {} } = entity;

    await strapi.services['event-log'].create({
      time: new Date(),
      event_log_type: eventLogType.id,
      user: user.id,
      data: JSON.stringify({ section: { id, name: assignment_name }, score })
    });
  }
};

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

    const { progress: progressBefore, time_accumulator = 0 } =
      (await strapi.services['user-sections'].findOne({ id })) ?? {};

    // TODO: Update the time accumulator
    console.log('time_accumulator: ', time_accumulator);
    console.log('type: ', typeof time_accumulator);

    // Time to Add in miliseconds
    const { progress, time_to_add = 0 } = ctx.request.body;

    let entity = await strapi.services['user-sections'].update(
      { id },
      {
        progress,
        time_accumulator: time_accumulator + time_to_add
      }
    );
    const { progress: progressAfter } = entity ?? {};

    // Update the completion date
    const { score } = ctx.request.body ?? {};
    if (score) await updateCompletionDate(entity, score);

    // Update the start date
    if (entity && !progressBefore && progressAfter)
      await updateStartDate(entity);

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
  }
};
