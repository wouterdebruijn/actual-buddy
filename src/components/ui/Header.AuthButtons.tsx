import { Button, Group } from "@mantine/core";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { signOut } from "@/lib/auth-client";

export default function HeaderAuthButtons() {
	const context = useRouteContext({ from: "/_authed/_layout" });
	const isAuthenticated = !!context.user;

	const navigate = useNavigate();

	async function signOutHandler() {
		await signOut();
		navigate({ to: "/auth/sign-in" });
	}

	return (
		<Group className="ml-auto pr-6">
			{isAuthenticated ? (
				<Button variant="outline" onClick={() => signOutHandler()}>
					Sign Out
				</Button>
			) : (
				<>
					<Link to="/auth/sign-up">
						<Button variant="outline">Sign Up</Button>
					</Link>
					<Link to="/auth/sign-in">
						<Button variant="filled">Sign In</Button>
					</Link>
				</>
			)}
		</Group>
	);
}
