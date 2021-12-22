'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        // Called before an entry is created
        async beforeCreate(params, data) {
            const section = params && params?.section;
            const user = params && params?.user;
            if (!section || !user) return;


            const res = await strapi.services['user-sections'].validateAssignment(section, user);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        afterCreate(result) { },
        // Called before an entry is created
        async beforeUpdate(params, data) {
            const section = data && data?.section;
            const user = data && data?.user;
            if (!section || !user) return;


            const res = await strapi.services['user-sections'].validateAssignment(section, user, params.id);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        afterUpdate(result) { }
    }
};
