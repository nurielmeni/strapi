module.exports = async (ctx, next) => {
    const { id: userId } = ctx.state.user;
    const { id: groupId } = ctx.params;

    // Get the group and verify the user is a group supervisor
    const group = await strapi.services.group.findOne({ id: groupId });
    if (!group) ctx.unauthorized(`Only a group Supervisor can assign`);

    const supervisor = group.supervisors.find(g => g.id === userId);
    if (!supervisor) ctx.unauthorized(`Only a group Supervisor can assign`);

    return await next();
};
