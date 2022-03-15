import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
    const { data: session } = useSession();

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
