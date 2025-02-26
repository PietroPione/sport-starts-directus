import { parseFilterKey } from '../../../utils/parse-filter-key.js';
export async function parseCurrentLevel(schema, collection, children, query) {
    const primaryKeyField = schema.collections[collection].primary;
    const columnsInCollection = Object.keys(schema.collections[collection].fields);
    const columnsToSelectInternal = [];
    const nestedCollectionNodes = [];
    for (const child of children) {
        if (child.type === 'field' || child.type === 'functionField') {
            const { fieldName } = parseFilterKey(child.name);
            if (columnsInCollection.includes(fieldName)) {
                columnsToSelectInternal.push(child.fieldKey);
            }
            continue;
        }
        if (!child.relation)
            continue;
        if (child.type === 'm2o') {
            columnsToSelectInternal.push(child.relation.field);
        }
        if (child.type === 'a2o') {
            columnsToSelectInternal.push(child.relation.field);
            columnsToSelectInternal.push(child.relation.meta.one_collection_field);
        }
        nestedCollectionNodes.push(child);
    }
    const isAggregate = (query.group || (query.aggregate && Object.keys(query.aggregate).length > 0)) ?? false;
    /** Always fetch primary key in case there's a nested relation that needs it. Aggregate payloads
     * can't have nested relational fields
     */
    if (isAggregate === false && columnsToSelectInternal.includes(primaryKeyField) === false) {
        columnsToSelectInternal.push(primaryKeyField);
    }
    /** Make sure select list has unique values */
    const columnsToSelect = [...new Set(columnsToSelectInternal)];
    const fieldNodes = columnsToSelect.map((column) => children.find((childNode) => (childNode.type === 'field' || childNode.type === 'functionField') && childNode.fieldKey === column) ?? {
        type: 'field',
        name: column,
        fieldKey: column,
    });
    return { fieldNodes, nestedCollectionNodes, primaryKeyField };
}
