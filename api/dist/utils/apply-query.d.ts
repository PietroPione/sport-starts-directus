import type { Aggregate, Filter, Permission, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AliasMap } from './get-column-path.js';
export declare const generateAlias: (size?: number) => string;
type ApplyQueryOptions = {
    aliasMap?: AliasMap;
    isInnerQuery?: boolean;
    hasMultiRelationalSort?: boolean | undefined;
    groupWhenCases?: number[][] | undefined;
};
/**
 * Apply the Query to a given Knex query builder instance
 */
export default function applyQuery(knex: Knex, collection: string, dbQuery: Knex.QueryBuilder, query: Query, schema: SchemaOverview, cases: Filter[], permissions: Permission[], options?: ApplyQueryOptions): {
    query: Knex.QueryBuilder<any, any>;
    hasJoins: boolean;
    hasMultiRelationalFilter: boolean;
};
export type ColumnSortRecord = {
    order: 'asc' | 'desc';
    column: string;
};
export declare function applySort(knex: Knex, schema: SchemaOverview, rootQuery: Knex.QueryBuilder, query: Query, collection: string, aliasMap: AliasMap, returnRecords?: boolean): {
    sortRecords: {
        order: "asc" | "desc";
        column: any;
    }[];
    hasJoins: boolean;
    hasMultiRelationalSort: boolean;
} | {
    hasJoins: boolean;
    hasMultiRelationalSort: boolean;
    sortRecords?: never;
};
export declare function applyLimit(knex: Knex, rootQuery: Knex.QueryBuilder, limit: any): void;
export declare function applyOffset(knex: Knex, rootQuery: Knex.QueryBuilder, offset: any): void;
export declare function applyFilter(knex: Knex, schema: SchemaOverview, rootQuery: Knex.QueryBuilder, rootFilter: Filter, collection: string, aliasMap: AliasMap, cases: Filter[], permissions: Permission[]): {
    query: Knex.QueryBuilder<any, any>;
    hasJoins: boolean;
    hasMultiRelationalFilter: boolean;
};
export declare function applySearch(knex: Knex, schema: SchemaOverview, dbQuery: Knex.QueryBuilder, searchQuery: string, collection: string): void;
export declare function applyAggregate(schema: SchemaOverview, dbQuery: Knex.QueryBuilder, aggregate: Aggregate, collection: string, hasJoins: boolean): void;
export declare function joinFilterWithCases(filter: Filter | null | undefined, cases: Filter[]): Filter | null;
export {};
