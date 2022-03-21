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
const Role = enumType({
    name: 'Role',
    members: ['USER', 'ADMIN'],
});

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.string('email');
        t.string('name');
        t.string('image');
        t.field('role', { type: 'Role' });
        t.field('created_at', { type: 'DateTime' });
        t.field('updated_at', { type: 'DateTime' });
        t.list.field('posts', { type: 'Post' });
    },
});

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('content');
        t.field('author', { type: 'User' });
        t.string('author_id');
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
                    include: {
                        posts: true
                    }
                }),
        });

        t.list.field('posts', {
            type: 'Post',
            args: {
                sortBy: arg({ type: 'SortOrder' }),
            },
            resolve: async (_, { sortBy }, { db, req }) => {
                const user = await db.user.findUnique({ where: { id: req.session.user.id }});

                if (!user) return null;

                return db.post.findMany({
                    where: { author_id: user.id },
                    orderBy: { created_at: sortBy || undefined },
                })
            },
        });
    },
});

const Mutation = mutationType({
    definition(t) {
        t.field('createPost', {
            type: 'Post',
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve: async (_, { title, content }, { db, req }) => {
                const user = await db.user.findUnique({ where: { id: req.session.user.id }});

                if (!user) return null;

                try {
                    return db.post.create({
                        data: {
                            title,
                            content,
                            author_id: user.id,
                        },
                    });
                } catch (error) {
                    throw Error(`${error}`);
                }
            },
        });
    },
});

export const schema = makeSchema({
    types: [Query, Mutation, DateTime, SortOrder, Role, User, Post],
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
