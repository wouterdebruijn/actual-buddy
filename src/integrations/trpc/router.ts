import actualRouter from "./actual-router";
import { createTRPCRouter } from "./init";
import pocketBaseRouter from "./pocketbase-router";

export const trpcRouter = createTRPCRouter({
	actual: actualRouter,
	pocketbase: pocketBaseRouter,
});
export type TRPCRouter = typeof trpcRouter;
