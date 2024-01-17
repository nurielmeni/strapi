import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

export default {
  async beforeCreate(event) {
    const {
      params: { data },
      action
    } = event;
    const { course, user } = data;
    if (!course || !user) return;

    const res = await strapi
      .service('api::user-course.user-course')
      .validateCreate(data);
    if (res && res.isValid === false)
      throw new ApplicationError(res.errMessage);
  },

  async afterCreate(event) {
    // Add event log to the user "Assignment Assigned"
    const eventLogType = await strapi.db
      .query('api::event-log-type.event-log-type')
      .findOne({
        where: { event_type: 'course-assigned' }
      });
    if (!eventLogType?.id) return;
    const { user, course } = event.params.data;
    const userId = user?.connect?.[0]?.id;
    const courseId = course?.connect?.[0]?.id;
    if (!userId || !courseId) return;

    const currentCourse = await strapi.entityService.findOne(
      'api::course.course',
      courseId
    );
    await strapi.entityService.create('api::event-log.event-log', {
      data: {
        time: new Date(),
        event_log_type: eventLogType.id,
        user: user.id,
        data: JSON.stringify({
          course: { id: currentCourse?.id, name: currentCourse?.name }
        })
      }
    });
  },

  async beforeUpdate(event) {
    const {
      params: { data }
    } = event;

    const res = await strapi
      .service('api::user-course.user-course')
      .validateUpdate(data);
    if (res && res.isValid === false)
      throw new ApplicationError(res.errMessage);
  }
};
