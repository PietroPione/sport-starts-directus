import { ForbiddenError } from '@directus/errors';
export function createCollectionForbiddenError(path, collection) {
    const pathSuffix = path === '' ? 'root' : `"${path}"`;
    return new ForbiddenError({
        reason: `You don't have permission to access collection "${collection}" or it does not exist. Queried in ${pathSuffix}.`,
    });
}
export function createFieldsForbiddenError(path, collection, fields) {
    const pathSuffix = path === '' ? 'root' : `"${path}"`;
    const fieldStr = fields.map((field) => `"${field}"`).join(', ');
    return new ForbiddenError({
        reason: fields.length === 1
            ? `You don't have permission to access field ${fieldStr} in collection "${collection}" or it does not exist. Queried in ${pathSuffix}.`
            : `You don't have permission to access fields ${fieldStr} in collection "${collection}" or they do not exist. Queried in ${pathSuffix}.`,
    });
}
