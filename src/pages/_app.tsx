import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider, useSession, signIn } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import tinykeys from 'tinykeys';
import { NextIntlProvider } from 'next-intl';

import { Theme } from '../components/Theme';
import { apolloClient } from '../utils/apolloClient';
import { GlobalStyle } from '../components/GlobalStyle';
import { ThemeChanger } from '../components/ThemeChanger';
import { NextPageWithAuth } from '../types/nextPageWithAuth';

type AppPropsWithAuth = AppProps & {
    Component: NextPageWithAuth;
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

const Root = ({ Component, pageProps }: { Component: NextPageWithAuth; pageProps: any }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            'c g': () => {
                alert("The keys 'c' and 'g' were pressed in order");
            },
        });

        return () => {
            unsubscribe();
        };
    });

    return (
        <>
            <Theme theme={theme || 'dark'} />

            <Toaster
                toastOptions={
                    {
                        // style: { borderRadius: '6px', background: notificationBackground, color: notificationColor },
                    }
                }
                position="bottom-right"
            />

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
                    <NextIntlProvider messages={pageProps.i18n}>
                        <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
                            <Root Component={Component} pageProps={pageProps} />
                        </ThemeProvider>
                    </NextIntlProvider>
                </ApolloProvider>
            </SessionProvider>
        </>
    );
};

export default App;
