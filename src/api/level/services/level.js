'use strict';

/**
 * level service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::level.level');