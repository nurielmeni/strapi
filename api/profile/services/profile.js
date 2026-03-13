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
      try {
        profile = await strapi.services.profile.update(
          { id: profile.id },
          { last_ping: now }
        );
      } catch (error) {
        // Profile may have been removed between findOne and update.
        if (error.message !== 'entry.notFound') {
          throw error;
        }

        profile = await strapi.services.profile.create({
          user: userId,
          last_ping: now
        });
      }
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
