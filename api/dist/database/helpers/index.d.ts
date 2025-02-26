import type { SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import * as dateHelpers from './date/index.js';
import * as fnHelpers from './fn/index.js';
import * as geometryHelpers from './geometry/index.js';
import * as schemaHelpers from './schema/index.js';
import * as sequenceHelpers from './sequence/index.js';
import * as numberHelpers from './number/index.js';
import * as nullableUpdateHelper from './nullable-update/index.js';
export declare function getHelpers(database: Knex): {
    date: dateHelpers.postgres | dateHelpers.oracle | dateHelpers.mysql | dateHelpers.mssql | dateHelpers.sqlite;
    st: geometryHelpers.postgres | geometryHelpers.mssql | geometryHelpers.mysql | geometryHelpers.sqlite | geometryHelpers.oracle | geometryHelpers.redshift;
    schema: schemaHelpers.cockroachdb | schemaHelpers.mssql | schemaHelpers.mysql | schemaHelpers.postgres | schemaHelpers.sqlite | schemaHelpers.oracle | schemaHelpers.redshift;
    sequence: sequenceHelpers.mysql | sequenceHelpers.postgres;
    number: numberHelpers.cockroachdb | numberHelpers.mssql | numberHelpers.postgres | numberHelpers.sqlite | numberHelpers.oracle;
    nullableUpdate: nullableUpdateHelper.postgres | nullableUpdateHelper.oracle;
};
export declare function getFunctions(database: Knex, schema: SchemaOverview): fnHelpers.postgres | fnHelpers.mssql | fnHelpers.mysql | fnHelpers.sqlite | fnHelpers.oracle;
export type Helpers = ReturnType<typeof getHelpers>;
