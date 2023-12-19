'use strict';

/**
 * user-section service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-section.user-section', ({ strapi }) => ({
  validateCreate: async ({ section, user }) => {
    const knex = strapi.connections.default;

    const result = await knex('user_sections')
      .where('user', user)
      .where('section', section)
      .select('id');

    if (result.length > 0) {
      return {
        isValid: false,
        errMessage: 'Section already assigned to user'
      }
    };

    return true;
  },

  validateUpdate: async ({ section, user }, id = null) => {
    if (!section || !user) return true;

    const knex = strapi.connections.default;

    if (id) {
      const assignment = await knex('user_sections')
        .where('id', id)
        .first();

      if (assignment && (assignment.user !== user || assignment.section !== section)) {
        return {
          isValid: false,
          errMessage: 'Can not change User or Section after assignment'
        }
      };
    }

    return true;
  },
}));
