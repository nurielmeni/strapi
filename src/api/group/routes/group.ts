export default {
  routes: [
    {
      method: 'GET',
      path: '/groups',
      handler: 'group.find'
    },
    // {
    //   method: 'GET',
    //   path: '/groups/count',
    //   handler: 'group.count',
    // },
    {
      method: 'GET',
      path: '/groups/assigned',
      handler: 'group.findAssigned'
    },
    {
      method: 'GET',
      path: '/groups/:id',
      handler: 'group.findOne'
    },
    {
      method: 'POST',
      path: '/groups',
      handler: 'group.create'
    },
    {
      method: 'PUT',
      path: '/groups/:id',
      handler: 'group.update'
    },
    {
      method: 'DELETE',
      path: '/groups/:id',
      handler: 'group.delete'
    },
    {
      method: 'POST',
      path: '/groups/:id',
      handler: 'group.assign',
      config: {
        policies: ['group']
      }
    }
  ]
};
