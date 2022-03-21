import {
    makeSchema,
    queryType,
    mutationType,
    asNexusMethod,
    objectType,
    enumType,
    arg,
    nonNull,
    stringArg,
    intArg,
} from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { join } from 'path';

const DateTime = asNexusMethod(DateTimeResolver, 'DateTime');
const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
});

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.string('email');
        t.string('name');
        t.string('image');
        t.field('created_at', { type: 'DateTime' });
        t.field('updated_at', { type: 'DateTime' });
    },
});

const Query = queryType({
    definition(t) {
        t.list.field('users', {
            type: 'User',
            args: {
                sortBy: arg({ type: 'SortOrder' }),
            },
            resolve: async (_, { sortBy }, { db }) =>
                db.user.findMany({
                    orderBy: { created_at: sortBy || undefined },
                }),
        });
    },
});

// const Mutation = mutationType({
//     definition(t) {

//     },
// });

export const schema = makeSchema({
    types: [Query, /*Mutation,*/ DateTime, SortOrder, User],
    outputs: {
        schema: join(process.cwd(), 'graphql/schema.graphql'),
        typegen: join(process.cwd(), 'graphql/generated/nexus.d.ts'),
    },
    contextType: {
        module: join(process.cwd(), 'graphql/context.ts'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'db',
            },
        ],
    },
});
