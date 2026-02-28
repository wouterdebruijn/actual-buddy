import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import PocketBase from "pocketbase";
import { pocketBaseAdapter } from "pocketbase-better-auth";

const pb = new PocketBase(
	process.env.POCKETBASE_URL || "http://localhost:8090",
);
await pb
	.collection("_superusers")
	.authWithPassword(
		process.env.PCOKETBASE_ADMIN_EMAIL!,
		process.env.POCKETBASE_ADMIN_PASSWORD!,
	);

export const auth = betterAuth({
	database: pocketBaseAdapter({
		pb,
		usePlural: false, // IMPORTANT: Use false to match the singular schema names (user, session, account, verification)
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()], // make sure this is the last plugin in the array
});
