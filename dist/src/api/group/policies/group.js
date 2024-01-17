"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const { ApplicationError } = utils_1.errors;
exports.default = async (policyCtx, config, { strapi }) => {
    console.log(policyCtx);
    const { id: userId } = policyCtx.state.user;
    const { id: groupId } = policyCtx.params;
    const group = await strapi.entityService.findOne('api::group.group', +groupId, {
        populate: {
            supervisor: true
        }
    });
    if (!group) {
        error(`The group id: ${groupId} does not exist`, 'GROUP_NOT_EXIST');
    }
    const supervisor = group.supervisor.find((s) => s.id === +userId);
    if (!supervisor) {
        error('Only a group Supervisor can assign', 'NOT_GROUP_SUP');
        return policyCtx.unauthorized(`Only group Supervisor can assign`);
    }
    return true;
};
function error(msg, code) {
    throw new ApplicationError(msg, {
        policy: 'group',
        errCode: code
    });
}
//# sourceMappingURL=group.js.map