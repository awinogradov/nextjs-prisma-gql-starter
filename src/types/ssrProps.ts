import { GetServerSideProps } from 'next';

type R = { [key: string]: any };
type ParserQuery = NodeJS.Dict<string | string[]>;

export type SSRProps<Q extends ParserQuery = ParserQuery> = GetServerSideProps<R, Q>;
