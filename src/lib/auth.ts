import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { pocketBaseAdapter } from "pocketbase-better-auth";
import getPocketBaseInstance from "./pocketbase";

const pb = getPocketBaseInstance();

export const auth = betterAuth({
	database: pocketBaseAdapter({
		pb,
		usePlural: false, // IMPORTANT: Use false to match the singular schema names (user, session, account, verification)
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()], // make sure this is the last plugin in the array,
});
