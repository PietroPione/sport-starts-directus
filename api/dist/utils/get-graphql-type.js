import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLScalarType, GraphQLString } from 'graphql';
import { GraphQLJSON } from 'graphql-compose';
import { GraphQLBigInt } from '../services/graphql/types/bigint.js';
import { GraphQLDate } from '../services/graphql/types/date.js';
import { GraphQLGeoJSON } from '../services/graphql/types/geojson.js';
import { GraphQLHash } from '../services/graphql/types/hash.js';
export function getGraphQLType(localType, special) {
    if (special.includes('conceal')) {
        return GraphQLHash;
    }
    switch (localType) {
        case 'boolean':
            return GraphQLBoolean;
        case 'bigInteger':
            return GraphQLBigInt;
        case 'integer':
            return GraphQLInt;
        case 'decimal':
        case 'float':
            return GraphQLFloat;
        case 'csv':
            return new GraphQLList(GraphQLString);
        case 'json':
            return GraphQLJSON;
        case 'geometry':
            return GraphQLGeoJSON;
        case 'time':
        case 'timestamp':
        case 'dateTime':
        case 'date':
            return GraphQLDate;
        case 'hash':
            return GraphQLHash;
        default:
            return GraphQLString;
    }
}
