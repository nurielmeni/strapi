'use strict';

const STORE_KEY = 'group-indexes-created';

const GROUP_INDEXES = [
  {
    tableName: 'groups_students__users_groups',
    columns: ['user_id', 'group_id'],
    indexName: 'idx_groups_students__users_groups_uid_gid'
  },
  {
    tableName: 'groups_supervisors__users_supervised_groups',
    columns: ['user_id', 'group_id'],
    indexName: 'idx_groups_supervisors__users_supervised_groups_uid_gid'
  },
  {
    tableName: 'groups_users__users_groups',
    columns: ['user_id', 'group_id'],
    indexName: 'idx_groups_users__users_groups_uid_gid'
  },
  {
    tableName: 'groups__admin_users',
    columns: ['user_id', 'group_id'],
    indexName: 'idx_groups__admin_users_uid_gid'
  },
  {
    tableName: 'groups_assignments__sections_groups',
    columns: ['section_id', 'group_id'],
    indexName: 'idx_groups_assignments__sections_groups_sid_gid'
  }
];

const GROUP_VIEWS = [
  {
    viewName: 'groups_data',
    requiredTables: [
      'groups_students__users_groups',
      'groups_supervisors__users_supervised_groups',
      'groups_assignments__sections_groups',
      'courses_groups__groups_courses'
    ],
    createSql: `
      CREATE OR REPLACE VIEW public.groups_data AS
      SELECT
        student_g.group_id,
        student_g.user_id AS students,
        NULL::integer AS supervisors,
        NULL::integer AS courses,
        NULL::integer AS assignments
      FROM groups_students__users_groups student_g
      UNION
      SELECT
        supervisor_g.group_id,
        NULL::integer AS students,
        supervisor_g.user_id AS supervisors,
        NULL::integer AS courses,
        NULL::integer AS assignments
      FROM groups_supervisors__users_supervised_groups supervisor_g
      UNION
      SELECT
        groups_assignments__sections_groups.group_id,
        NULL::integer AS students,
        NULL::integer AS supervisors,
        NULL::integer AS courses,
        groups_assignments__sections_groups.section_id AS assignments
      FROM groups_assignments__sections_groups
      UNION
      SELECT
        courses_groups__groups_courses.group_id,
        NULL::integer AS students,
        NULL::integer AS supervisors,
        courses_groups__groups_courses.course_id AS courses,
        NULL::integer AS assignments
      FROM courses_groups__groups_courses;
    `
  },
  {
    viewName: 'groups_summary',
    requiredTables: [
      'groups_students__users_groups',
      'groups_supervisors__users_supervised_groups',
      'groups_assignments__sections_groups',
      'courses_groups__groups_courses'
    ],
    createSql: `
      CREATE OR REPLACE VIEW public.groups_summary AS
      SELECT
        group_id,
        count(students) AS students,
        count(supervisors) AS supervisors,
        count(courses) AS courses,
        count(assignments) AS assignments
      FROM (
        SELECT
          student_g.group_id,
          student_g.user_id AS students,
          NULL::integer AS supervisors,
          NULL::integer AS courses,
          NULL::integer AS assignments
        FROM groups_students__users_groups student_g
        UNION
        SELECT
          supervisor_g.group_id,
          NULL::integer AS students,
          supervisor_g.user_id AS supervisors,
          NULL::integer AS courses,
          NULL::integer AS assignments
        FROM groups_supervisors__users_supervised_groups supervisor_g
        UNION
        SELECT
          groups_assignments__sections_groups.group_id,
          NULL::integer AS students,
          NULL::integer AS supervisors,
          NULL::integer AS courses,
          groups_assignments__sections_groups.section_id AS assignments
        FROM groups_assignments__sections_groups
        UNION
        SELECT
          courses_groups__groups_courses.group_id,
          NULL::integer AS students,
          NULL::integer AS supervisors,
          courses_groups__groups_courses.course_id AS courses,
          NULL::integer AS assignments
        FROM courses_groups__groups_courses
      ) group_data
      GROUP BY group_id
      ORDER BY group_id;
    `
  },
  {
    viewName: 'groups_supervisors_data',
    requiredTables: [
      'groups_supervisors__users_supervised_groups',
      'users-permissions_user',
      'groups'
    ],
    createSql: `
      CREATE OR REPLACE VIEW public.groups_supervisors_data AS
      SELECT
        user_p.id AS user_id,
        user_p.username,
        groups_summary.students AS student_count,
        groups_summary.supervisors AS supervisor_count,
        groups_summary.assignments AS assignment_count,
        groups_summary.courses AS course_count,
        groups.id AS group_id,
        groups.name AS group_name,
        groups.subtitle AS group_subtitle,
        groups.description AS group_description
      FROM groups_supervisors__users_supervised_groups s_g
      LEFT JOIN "users-permissions_user" user_p ON user_p.id = s_g.user_id
      LEFT JOIN groups_summary ON s_g.group_id = groups_summary.group_id
      LEFT JOIN groups ON groups.id = s_g.group_id;
    `
  }
];

const getStore = () =>
  strapi.store({
    environment: strapi.config.environment,
    type: 'core',
    name: 'maintenance'
  });

const getCreatedFlag = async () => {
  const store = getStore();
  return Boolean(await store.get({ key: STORE_KEY }));
};

const setCreatedFlag = async () => {
  const store = getStore();
  await store.set({ key: STORE_KEY, value: true });
};

const indexExists = async (knex, tableName, indexName) => {
  const result = await knex('pg_indexes')
    .select('tablename', 'indexname')
    .where({ tablename: tableName, indexname: indexName });

  return result.length > 0;
};

const ensureIndex = async (knex, tableName, columns, indexName) => {
  const tableExists = await knex.schema.hasTable(tableName);
  if (!tableExists) {
    return {
      tableName,
      indexName,
      status: 'table_missing'
    };
  }

  const exists = await indexExists(knex, tableName, indexName);
  if (exists) {
    return {
      tableName,
      indexName,
      status: 'already_exists'
    };
  }

  await knex.schema.alterTable(tableName, (t) => {
    t.index(columns, indexName);
  });

  return {
    tableName,
    indexName,
    status: 'created'
  };
};

const ensureView = async (knex, viewName, requiredTables, createSql) => {
  const missingTables = [];

  for (const tableName of requiredTables) {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
      missingTables.push(tableName);
    }
  }

  if (missingTables.length > 0) {
    return {
      viewName,
      status: 'table_missing',
      missingTables
    };
  }

  await knex.raw(createSql);

  return {
    viewName,
    status: 'created_or_replaced'
  };
};

module.exports = {
  async getGroupIndexesStatus() {
    const created = await getCreatedFlag();

    return {
      created,
      totalIndexes: GROUP_INDEXES.length,
      totalViews: GROUP_VIEWS.length
    };
  },

  async createGroupIndexes({ force = false } = {}) {
    const alreadyCreated = await getCreatedFlag();

    const knex = strapi.connections.default;
    const results = [];
    const viewResults = [];

    for (const indexDefinition of GROUP_INDEXES) {
      const result = await ensureIndex(
        knex,
        indexDefinition.tableName,
        indexDefinition.columns,
        indexDefinition.indexName
      );

      results.push(result);
    }

    for (const viewDefinition of GROUP_VIEWS) {
      const viewResult = await ensureView(
        knex,
        viewDefinition.viewName,
        viewDefinition.requiredTables,
        viewDefinition.createSql
      );

      viewResults.push(viewResult);
    }

    await setCreatedFlag();

    return {
      skipped: false,
      previouslyMarkedAsCreated: alreadyCreated,
      createdCount: results.filter((r) => r.status === 'created').length,
      alreadyExistsCount: results.filter((r) => r.status === 'already_exists')
        .length,
      tableMissingCount: results.filter((r) => r.status === 'table_missing')
        .length,
      viewCreatedOrReplacedCount: viewResults.filter(
        (r) => r.status === 'created_or_replaced'
      ).length,
      viewTableMissingCount: viewResults.filter(
        (r) => r.status === 'table_missing'
      ).length,
      force,
      results,
      viewResults
    };
  }
};
