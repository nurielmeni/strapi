'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */


module.exports = {
    /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
    find(params, populate) {
        return strapi.query('group').model.fetchAll({
            ...params,
            columns: ['id', 'name', 'description'],
            withRelated: [
                ...populate
            ]
        })
    },
};
