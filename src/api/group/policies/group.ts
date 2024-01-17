import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

export default async (policyCtx, config, { strapi }) => {
  console.log(policyCtx);

  const { id: userId } = policyCtx.state.user;
  const { id: groupId } = policyCtx.params;

  const group = await strapi.entityService.findOne(
    'api::group.group',
    +groupId,
    {
      populate: {
        supervisor: true
      }
    }
  );
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

function error(msg: string, code: string) {
  throw new ApplicationError(msg, {
    policy: 'group',
    errCode: code
  });
}
