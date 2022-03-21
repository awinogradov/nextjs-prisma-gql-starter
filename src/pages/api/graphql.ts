import { NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { getServerSession } from 'next-auth/next';

import { context } from '../../../graphql/context';
import { schema } from '../../../graphql/schema';
import { authOptions } from '../../utils/auth';
import { CustomApiRequest } from '../../types/customApiRequest';

const Cors = require('micro-cors'); // https://studio.apollographql.com/
const cors = Cors();
const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
        return { ...context, req };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), require('apollo-tracing').plugin()],
});
const startServer = apolloServer.start();

export default cors(async function handler(req: CustomApiRequest, res: NextApiResponse) {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    const session = await getServerSession({ req, res }, authOptions);

    if (session) {
        req.session = session;
    }

    await startServer;
    return await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
});

export const config = {
    api: {
        bodyParser: false,
    },
};
