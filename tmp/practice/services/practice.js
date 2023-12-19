'use strict';

/**
 * practice service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::practice.practice');