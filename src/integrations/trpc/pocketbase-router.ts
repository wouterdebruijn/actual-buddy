import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import getPocketBaseInstance from "@/lib/pocketbase";
import { protectedProcedure } from "./init";

const pb = getPocketBaseInstance();

const pocketBaseRouter = {
	user: {
		budget: {
			list: protectedProcedure.query(async ({ ctx }) => {
				// User is now available from context
				const userId = ctx.user.id;

				const records = await pb.collection("budget").getFullList({
					filter: `user = '${userId}'`,
				});
				return records;
			}),
			create: protectedProcedure
				.input(
					z.object({
						name: z.string(),
						amount: z.number(),
					}),
				)
				.mutation(async ({ input, ctx }) => {
					const { name, amount } = input;
					// User ID comes from authenticated context
					const userId = ctx.user.id;

					const record = await pb.collection("budget").create({
						user: userId,
						name,
						amount,
					});
					return record;
				}),
		},
	},
} satisfies TRPCRouterRecord;

export default pocketBaseRouter;
