'use strict';

const SUPER_ADMIN_CODE = 'strapi-super-admin';

const isSuperAdmin = (user) => {
  if (!user) {
    return false;
  }

  const roles = Array.isArray(user.roles)
    ? user.roles
    : user.role
      ? [user.role]
      : [];

  return roles.some((role) => role?.code === SUPER_ADMIN_CODE);
};

module.exports = {
  async statusGroupIndexes(ctx) {
    if (!isSuperAdmin(ctx.state.user)) {
      return ctx.forbidden('Only Super Admin can access this endpoint');
    }

    const status = await strapi.services.maintenance.getGroupIndexesStatus();
    return status;
  },

  async createGroupIndexes(ctx) {
    if (!isSuperAdmin(ctx.state.user)) {
      return ctx.forbidden('Only Super Admin can run this action');
    }

    const force = Boolean(ctx.request.body?.force);
    const result = await strapi.services.maintenance.createGroupIndexes({
      force
    });
    return result;
  }
};
