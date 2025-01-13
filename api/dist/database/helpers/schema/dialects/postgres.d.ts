import type { Knex } from 'knex';
import { SchemaHelper, type SortRecord, type Sql } from '../types.js';
export declare class SchemaHelperPostgres extends SchemaHelper {
    getDatabaseSize(): Promise<number | null>;
    prepQueryParams(queryParams: Sql): Sql;
    addInnerSortFieldsToGroupBy(groupByFields: (string | Knex.Raw)[], sortRecords: SortRecord[], hasRelationalSort: boolean): void;
}
