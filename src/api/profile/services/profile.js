'use strict';

/**
 * profile service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::profile.profile', ({ strapi }) => ({
  async ping (ctx) {
    const { id: userId } = ctx.state.user;
    const entity = await strapi.services.profile.update({ user: userId }, {
      last_ping: Date.now()
    });

    return entity.last_ping;
  },

  async getProfiles (ctx) {
    const exportToMail = process.env?.EXPORT_TO_MAIL;
    if (!exportToMail) return { status: 404, msg: 'No email to export' };

    const entity = await strapi.services.profile.find();
    return sanitizeEntity(entity, { model: strapi.models.profile });
  }
}));
