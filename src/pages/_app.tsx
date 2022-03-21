import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider, useSession, signIn } from 'next-auth/react';

import { GlobalStyle } from '../components/GlobalStyle';
import { apolloClient } from '../utils/apolloClient';
import { NextPageWithAuthAuth } from '../types/nextPageWithAuth';

type AppPropsWithAuth = AppProps & {
    Component: NextPageWithAuthAuth;
};

function Auth({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const isUser = !!session?.user;
    useEffect(() => {
        if (status === 'loading') return;
        if (!isUser) signIn();
    }, [isUser, status]);

    return isUser ? <>{children}</> : null;
}

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {
    return (
        <>
            <GlobalStyle />

            <SessionProvider session={session}>
                <ApolloProvider client={apolloClient}>
                    {Component.auth ? (
                        <Auth>
                            <Component {...pageProps} />
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </ApolloProvider>
            </SessionProvider>
        </>
    );
}

export default App;
