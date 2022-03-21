import { createClient } from '../../graphql/generated/genql';

export const gql = createClient({
    url: '/api/graphql',
});
