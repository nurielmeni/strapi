'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a records for profile.
   * Not implemented as restricted in usee permitions
   * 
   * @return {Object}
    async ping(ctx) {
        const { id: userId } = ctx.state.user;
        const profile = await strapi.services.profile.findOne({ user: userId });
        const ts = new Date();
        return ts;
    }
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const { profile: userProfile } = ctx.state.user;
    let entity;

    if (Number(id) !== Number(userProfile)) {
      return ctx.forbidden();
    }

    try {
      entity = await strapi.services.profile.findOne({ id });
      // Profile with this id was not found
      if (entity === null) {
        return ctx.notFound();
      }
      return sanitizeEntity(entity, { model: strapi.models.profile });
    } catch (error) {
      return ctx.internalServerError();
    }
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;
    const { id: userId } = ctx.state.user;
    const body = ctx.request.body;

    let entity;

    const [profile] = await strapi.services.profile.find({
      id: +id,
      'user.id': userId
    });

    if (!profile) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await strapi.services.profile.update({ id }, body);

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const { id: userId } = ctx.state.user;
    const body = ctx.request.body;

    const [profile] = await strapi.services.profile.find({
      'user.id': userId
    });

    // If the user has a profile assign to him, it will be updated 
    // If the user has no profile assign to him, it will be created 
    let entity;
    if (!profile) {
      entity = await strapi.services.profile.create({
        user: userId,
        ...body
      });
    } else {
      entity = await strapi.services.profile.update({ id: profile.id }, body);
    }


    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

};
