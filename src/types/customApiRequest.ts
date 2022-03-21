import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

export interface CustomApiRequest extends NextApiRequest {
    session: Session;
}
