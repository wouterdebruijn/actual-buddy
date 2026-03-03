import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth.server";

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) {
			throw redirect({
				to: "/auth/sign-in",
				search: { redirect: location.href },
			});
		}

		return { user: session.user };
	},
});
