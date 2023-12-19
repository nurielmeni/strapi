'use strict';

/**
 * section service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { validateTermsOfTransitionRange } = require('../../../general/validateTermsOfTransitionRange');

module.exports = createCoreService('api::section.section', ({ strapi }) => ({
  validateTermsOfTransitionRange
}));
