import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider, useSession, signIn } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';

import { Theme } from '../components/Theme';
import { apolloClient } from '../utils/apolloClient';
import { GlobalStyle } from '../components/GlobalStyle';
import { ThemeChanger } from '../components/ThemeChanger';
import { NextPageWithAuthAuth } from '../types/nextPageWithAuth';

type AppPropsWithAuth = AppProps & {
    Component: NextPageWithAuthAuth;
};

const Auth = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    const isUser = !!session?.user;

    useEffect(() => {
        if (status === 'loading') return;
        if (!isUser) signIn();
    }, [isUser, status]);

    return isUser ? <>{children}</> : null;
};

const Root = ({ Component, pageProps }: { Component: NextPageWithAuthAuth; pageProps: any }) => {
    const { theme } = useTheme();

    return (
        <>
            <Theme theme={theme || 'dark'} />

            <ThemeChanger />

            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </>
    );
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) => {
    return (
        <>
            <GlobalStyle />

            <SessionProvider session={session}>
                <ApolloProvider client={apolloClient}>
                    <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
                        <Root Component={Component} pageProps={pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </SessionProvider>
        </>
    );
};

export default App;
