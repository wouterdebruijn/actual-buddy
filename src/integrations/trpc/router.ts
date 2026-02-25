import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import actualRouter from "./actual-router";
import { createTRPCRouter, publicProcedure } from "./init";

const todos = [
	{ id: 1, name: "Get groceries" },
	{ id: 2, name: "Buy a new phone" },
	{ id: 3, name: "Finish the project" },
];

const todosRouter = {
	list: publicProcedure.query(() => todos),
	add: publicProcedure
		.input(z.object({ name: z.string() }))
		.mutation(({ input }) => {
			const newTodo = { id: todos.length + 1, name: input.name };
			todos.push(newTodo);
			return newTodo;
		}),
	remove: publicProcedure
		.input(z.object({ id: z.number() }))
		.mutation(({ input }) => {
			const index = todos.findIndex((t) => t.id === input.id);
			if (index !== -1) {
				todos.splice(index, 1);
				return { success: true };
			}
			return { success: false, message: "Todo not found" };
		}),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
	todos: todosRouter,
	actual: actualRouter,
});
export type TRPCRouter = typeof trpcRouter;
