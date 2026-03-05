import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import getPocketBaseInstance from "@/lib/pocketbase";
import { Collections, type Create } from "@/types/pocketbase-types";
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
						budgetId: z.string(),
					}),
				)
				.mutation(async ({ input, ctx }) => {
					const { budgetId } = input;
					// User ID comes from authenticated context
					const userId = ctx.user.id;

					const budget: Create<Collections.Budget> = {
						user: userId,
						budgetId,
					};

					const record = await pb.collection(Collections.Budget).create(budget);
					return record;
				}),
		},
	},
} satisfies TRPCRouterRecord;

export default pocketBaseRouter;
