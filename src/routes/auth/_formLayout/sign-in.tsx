import { createFileRoute, redirect } from "@tanstack/react-router";
import z, { email } from "zod";
import Title from "@/components/basic/Title";
import { useAppForm } from "@/hooks/demo.form";
import { getSession } from "@/lib/auth.server";
import { signIn } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/_formLayout/sign-in")({
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
			await signIn.email({
				email: value.email,
				password: value.password,
				callbackURL: search.redirect ?? "/",
			});
		},
	});

	return (
		<div>
			<Title color="text">Welcome back!</Title>

			<div className="mb-4">Please sign in to your account to continue.</div>
			<div className="mb-8">
				Don't have an account?{" "}
				<a href="/auth/sign-up" className="text-blue-500">
					Sign up
				</a>
			</div>
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
		</div>
	);
}
