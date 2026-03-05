import { initTRPC, TRPCError } from "@trpc/server";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import superjson from "superjson";
import { auth } from "@/lib/auth";

// Create context from request headers
export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
	const headers = opts.req.headers;

	// Get session from better-auth using the request headers
	const session = await auth.api.getSession({ headers });

	return {
		session,
		user: session?.user,
	};
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session || !ctx.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You must be logged in to access this resource",
		});
	}

	return next({
		ctx: {
			...ctx,
			session: ctx.session,
			user: ctx.user,
		},
	});
});
