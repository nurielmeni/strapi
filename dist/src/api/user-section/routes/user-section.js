'use strict';
/**
 * user-section router
 */
module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/user-sections',
            handler: 'user-section.find',
        },
        {
            method: 'GET',
            path: '/user-sections/count',
            handler: 'user-section.count',
        },
        {
            method: 'GET',
            path: '/user-sections/:id',
            handler: 'user-section.findOne',
        },
        {
            method: 'GET',
            path: '/user-sections/:group/:member',
            handler: 'user-section.groupMemberSections',
            config: {
                policies: ['global::allow-group-supervisor']
            }
        },
        {
            method: 'POST',
            path: '/user-sections',
            handler: 'user-section.create',
        },
        {
            method: 'PUT',
            path: '/user-sections/:id',
            handler: 'user-section.update',
        },
        {
            method: 'DELETE',
            path: '/user-sections/:id',
            handler: 'user-section.delete',
        }
    ]
};
//# sourceMappingURL=user-section.js.map