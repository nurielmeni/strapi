'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const updateStartDate = async (entity) => {
  entity = await strapi.services['user-course'].update({ id: entity.id }, { start_date: new Date() });

  // Add event log to the user "Course Start"
  const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'course-started' });
  if (eventLogType?.id) {
    const { user, course: { id, name } = {} } = entity;

    await strapi.services['event-log'].create({
      time: new Date(),
      event_log_type: eventLogType.id,
      user: user.id,
      data: JSON.stringify({ course: { id, name } })
    });
  }
}

const updateCompletionDate = async (entity, score) => {
  if (entity.completed_date) {
    console.log('updateCompletionDate: alredy completed:', entity.completed_date);
    return;
  }

  entity = await strapi.services['user-course'].update({ id: entity.id }, {
    completed_date: new Date(),
    score: score
  });

  // Add event log to the user "Course Completed"
  const eventLogType = await strapi.services['event-log-type'].findOne({ event_type: 'course-completed' });
  if (eventLogType?.id) {
    const { user, score, course: { id, name } = {} } = entity;

    await strapi.services['event-log'].create({
      time: new Date(),
      event_log_type: eventLogType.id,
      user: user.id,
      data: JSON.stringify({ course: { id, name }, score })
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
      entities = await strapi.services['user-course'].search(query);
    } else {
      entities = await strapi.services['user-course'].find(query);
    }
    //console.log('entities', entities);

    return sanitizeEntity(entities, { model: strapi.models['user-course'] });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const { id } = ctx.params;


    const { progress: progressBefore } = await strapi.services['user-course'].findOne({ id }) ?? {};
    let entity = await strapi.services['user-course'].update({ id }, ctx.request.body);
    const { progress: progressAfter } = entity ?? {};

    // Update the completion date
    const { courseScore } = ctx.request.body?.progress ?? {};
    if (courseScore) await updateCompletionDate(entity, courseScore);

    // Update the start date
    if (entity && !progressBefore && progressAfter) await updateStartDate(entity);

    return sanitizeEntity(entity, { model: strapi.models['user-course'] });
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
      entities = await strapi.services['user-course'].count(query);
    } else {
      entities = await strapi.services['user-course'].count(query);
    }
    //console.log('entities', entities);

    return sanitizeEntity(entities, { model: strapi.models['user-course'] });
  }
};
