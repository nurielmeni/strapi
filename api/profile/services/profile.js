'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    async ping(ctx) {
        const { id: userId } = ctx.state.user;
        const entity = await strapi.services.profile.update({ user: userId }, {
            last_ping: Date.now()
        });

        return entity.last_ping;
    }
};
