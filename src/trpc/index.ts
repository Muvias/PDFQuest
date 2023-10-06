import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    })

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      })
    }

    return { sucess: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await db.file.findMany({
      where: {
        userId
      }
    })
  }),
  deleteFile: privateProcedure.input(
    z.object({ id: z.string() })
  ).mutation(async ({ ctx, input }) => {
    const { userId } = ctx

    const file = await db.file.findFirst({
      where: {
        id: input.id,
        userId
      }
    })

    if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

    await db.file.delete({
      where: {
        id: file.id
      }
    })

    return file
  })
});

export type AppRouter = typeof appRouter;