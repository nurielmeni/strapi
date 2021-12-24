'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        // Called before an entry is created
        async beforeCreate(params, data) {
            const section = params && params?.course;
            const user = params && params?.user;
            if (!section || !user) return;


            const res = await strapi.services['user-course'].validateCreate(params);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        afterCreate(result) { },
        // Called before an entry is created
        async beforeUpdate(params, data) {
            if (!data?.course || !data?.user) return;

            const res = await strapi.services['user-course'].validateUpdate(data, params.id);
            if (res && res.isValid === false)
                throw strapi.errors.badRequest(res.errMessage);
        },
        // Called after an entry is created
        afterUpdate(result) { }
    }
};
