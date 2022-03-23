import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import useSWR from 'swr';

import { createFetcher } from '../utils/createFetcher';

const fetcher = createFetcher(() => ({
    users: {
        id: true,
        name: true,
        email: true,
        image: true,
        created_at: true,
        posts: {
            id: true,
            title: true,
        }
    },
}))

const Home: NextPage = () => {
    const { data: session } = useSession();

    const { data, error } = useSWR('users', fetcher());

    return (
        <>
            <Head>
                <title>NextJS+Prisma+GQL Starter</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>Welcome!</div>

            {session ? (
                <>
                    Signed in as {session!.user?.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                    {session.user.role === 'ADMIN' && (
                        <div>
                            {data?.users && data.users.map((user) => <div key={user.id}>{JSON.stringify(user)}</div>)}
                        </div>
                    )}
                </>
            ) : (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
        </>
    );
};

export default Home;
