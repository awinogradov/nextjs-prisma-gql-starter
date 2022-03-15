import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyle } from '../components/GlobalStyle';
import { apolloClient } from '../utils/apolloClient';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <GlobalStyle />

            <SessionProvider session={session}>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
