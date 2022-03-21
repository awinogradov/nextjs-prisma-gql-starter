import type { NextPage } from 'next';

export type NextPageWithAuthAuth = NextPage & {
    auth?: boolean;
};
