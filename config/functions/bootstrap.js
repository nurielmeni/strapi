'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */
const indexExists = async (tableName, indexName) => {
    const knex = strapi.connections.default;
    const result = await knex('pg_indexes')
        .select('tablename', 'indexname')
        .where({ 'tablename': tableName, 'indexname': indexName })

    // Lodash's groupBy method can be used to
    // return a grouped key-value object generated from
    // the response
    console.log('indexExists: ', tableName, indexName);
    return result.length > 0;
}

module.exports = async () => {
    const knex = strapi.connections.default;
    await knex.schema.alterTable('groups_students__users_groups', async t => {
        if (await indexExists('groups_students__users_groups', 'idx_groups_students__users_groups_uid_gid')) return;

        t.index(['user_id', 'group_id'], 'idx_groups_students__users_groups_uid_gid')
    });
    await knex.schema.alterTable('groups_supervisors__users_supervised_groups', async t => {
        if (await indexExists('groups_supervisors__users_supervised_groups', 'idx_groups_supervisors__users_supervised_groups_uid_gid')) return;

        t.index(['user_id', 'group_id'], 'idx_groups_supervisors__users_supervised_groups_uid_gid')
    });
    await knex.schema.alterTable('groups_users__users_groups', async t => {
        if (await indexExists('groups_users__users_groups', 'idx_groups_users__users_groups_uid_gid')) return;

        t.index(['user_id', 'group_id'], 'idx_groups_users__users_groups_uid_gid')
    });
    await knex.schema.alterTable('groups__admin_users', async t => {
        if (await indexExists('groups__admin_users', 'idx_groups__admin_users_uid_gid')) return;

        t.index(['user_id', 'group_id'], 'idx_groups__admin_users_uid_gid')
    });
    await knex.schema.alterTable('groups_assignments__sections_groups', async t => {
        if (await indexExists('groups_assignments__sections_groups', 'idx_groups_assignments__sections_groups_sid_gid')) return;

        t.index(['section_id', 'group_id'], 'idx_groups_assignments__sections_groups_sid_gid')
    });
}