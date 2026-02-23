'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async ping(ctx) {
    const { id: userId } = ctx.state.user;
    const now = Date.now();

    // Try to find an existing profile for the user
    let profile = await strapi.services.profile.findOne({ user: userId });

    if (profile) {
      // Update existing profile by id to avoid connector "entry.notFound" errors
      profile = await strapi.services.profile.update(
        { id: profile.id },
        { last_ping: now }
      );
    } else {
      // Create a new profile if none exists
      profile = await strapi.services.profile.create({
        user: userId,
        last_ping: now
      });
    }

    return profile.last_ping;
  }
};
