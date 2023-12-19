'use strict';

/**
 * stack service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stack.stack');