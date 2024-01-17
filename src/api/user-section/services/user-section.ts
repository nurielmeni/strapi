/**
 * user-section service
 */

const { createCoreService } = require('@strapi/strapi').factories;

export default createCoreService(
  'api::user-section.user-section',
  ({ strapi }) => ({
    validateCreate: async ({ section, user }) => {
      const result = await strapi.db
        .query('api::user-section.user-section')
        .findMany({
          where: {
            user: user?.connect?.[0]?.id,
            section: section?.connect?.[0]?.id
          }
        });

      if (result.length > 0) {
        return {
          isValid: false,
          errMessage: 'Section already assigned to user'
        };
      }

      return true;
    },

    validateUpdate: async ({ section, user }, id = null) => {
      // If any course or user changed return false
      if (section?.connect?.length || user?.connect?.length)
        return {
          isValid: false,
          errMessage: 'Can not change User or Section after assignment'
        };

      return true;
    }
  })
);
