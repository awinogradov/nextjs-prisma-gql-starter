import { PrismaClient } from '@prisma/client';

import { CustomApiRequest } from '../src/types/customApiRequest';

const db = new PrismaClient();

export type Context = {
    db: PrismaClient;
    req: CustomApiRequest;
};
export const context = {
    db,
};
