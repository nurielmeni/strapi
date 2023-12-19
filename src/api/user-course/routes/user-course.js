'use strict';

/**
 * user-course router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-courses',
      handler: 'user-course.find',
    },
    {
      method: 'GET',
      path: '/user-courses/count',
      handler: 'user-course.count',
    },
    {
      method: 'GET',
      path: '/user-courses/:id',
      handler: 'user-course.findOne',
    },
    {
      method: 'GET',
      path: '/user-courses/:group/:member',
      handler: 'user-course.groupMemberCourses',
      config: {
        policies: ['global::allow-group-supervisor']
      }
    },
    {
      method: 'POST',
      path: '/user-courses',
      handler: 'user-course.create',
    },
    {
      method: 'PUT',
      path: '/user-courses/:id',
      handler: 'user-course.update',
    },
    {
      method: 'DELETE',
      path: '/user-courses/:id',
      handler: 'user-course.delete',
    }
  ]
}
