'use strict';

/**
 * event-log router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-log.event-log');