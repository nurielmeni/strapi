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

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const { id: userId } = ctx.state.user;
    let entity;

    if (Number(id) !== Number(userId)) {
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
    console.log(ctx);
    const { id } = ctx.params;
    const { id: userId } = ctx.state.user;

    let entity;

    const [profile] = await strapi.services.profile.find({
      id: +id,
      'user.id': userId
    });

    if (!profile) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    //console.log("Profile Body", ctx.request.body);
    entity = await strapi.services.profile.update({ id }, ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const { id: userId } = ctx.state.user;

    const entity = await strapi.services.profile.create({
      user: userId,
      ...ctx.request.body
    });

    return sanitizeEntity(entity, { model: strapi.models.profile });
  }
};
