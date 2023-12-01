import { observable } from "@trpc/server/observable";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  randomNumber: publicProcedure.subscription(() => {
    return observable((emit) => {
      const interval = setInterval(() => {
        emit.next(Math.random());
      }, 300);
      return () => {
        clearInterval(interval);
      };
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
