import { createFileRoute, redirect } from "@tanstack/react-router";
import z, { email } from "zod";
import { useAppForm } from "@/hooks/demo.form";
import { getSession } from "@/lib/auth.server";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/sign-in")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getSession();

		if (session?.user.id) {
			throw redirect({ to: "/" });
		}

		return {};
	},
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

const signInForm = z.object({
	email: email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

function RouteComponent() {
	const search = Route.useSearch();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: signInForm,
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
					callbackURL: search.redirect,
				},
				{
					onRequest: (ctx) => {
						//show loading
					},
					onSuccess: (ctx) => {
						//redirect to the dashboard or sign in page
					},
					onError: (ctx) => {
						// display the error message
						alert(ctx.error.message);
					},
				},
			);

			console.log("Sign in response:", { data, error });
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<form.AppField name="email">
				{(field) => (
					<field.TextField
						label="Email"
						placeholder="Enter your email"
						autoComplete="email"
						autoFocus
					/>
				)}
			</form.AppField>

			<form.AppField name="password">
				{(field) => (
					<field.TextField
						label="Password"
						autoComplete="new-password"
						type="password"
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubscribeButton label="Sign In" />
			</form.AppForm>
		</form>
	);
}
