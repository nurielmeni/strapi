module.exports = async (ctx, next) => {
  const { id: userId } = ctx.state.user;
  const { group: groupId, member: memberId } = ctx.params;

  // Get the group and verify the user is a group supervisor
  const group = await strapi.services.group.findOne({ id: +groupId });
  if (!group)
    return ctx.unauthorized(`Could not find the requested group: ${groupId}`);

  const supervisor = group.supervisors.find((s) => s.id === +userId);
  if (!supervisor)
    return ctx.unauthorized(`Only a group Supervisor can list user sections`);

  return await next();
};
