import { SchemaHelper } from '../types.js';
export declare class SchemaHelperSQLite extends SchemaHelper {
    preColumnChange(): Promise<boolean>;
    postColumnChange(): Promise<void>;
    getDatabaseSize(): Promise<number | null>;
    addInnerSortFieldsToGroupBy(): void;
}
