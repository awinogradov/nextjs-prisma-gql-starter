import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export type Context = {
    db: PrismaClient;
    // req: CustomApiRequest;
};
export const context = {
    db,
};
